#!/usr/bin/env tsx

import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pkg from "enquirer";
import fs from "fs-extra";
import { execa } from "execa";
import ora from "ora";
import chalk from "chalk";
import { createClerkClient } from "@clerk/backend";
import generator from "generate-password";
import { AnswersSchema, SupabaseBusinessSchema } from "./schema";
import { Answers, Config } from "./templates/basic/types/feast";
import { supabase } from "./supabase";

const { prompt } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, ".env.local") });

console.log(chalk.bold.hex("#F5853F")("\nFEAST Website Generator\n"));

// 1. Gather answers from the user via prompts.
const businessIdentityAnswers = await prompt([
  { type: "input", name: "name", message: "Business name?" },
  { type: "input", name: "tagline", message: "Short tagline?" },
  { type: "input", name: "description", message: "Description?" },
  { type: "input", name: "phone", message: "Business phone?" },
  { type: "input", name: "email", message: "Business email?" },
  {
    type: "select",
    name: "category",
    message: "Business category?",
    choices: ["Restaurant", "Cafe", "Bar", "Bakery", "Food truck", "Other"],
  },
  {
    type: "select",
    name: "location_type",
    message: "Location type?",
    choices: ["brick-and-mortar", "mobile", "hybrid", "multi-unit"],
  },
]);

const businessAddressAnswers = (await prompt([
  {
    type: "input",
    name: "business_address_line_1",
    message: "Business address line 1?",
  },
  {
    type: "input",
    name: "business_address_line_2",
    message: "Business address line 2?",
  },
  {
    type: "input",
    name: "business_address_city",
    message: "Business address city?",
    initial: "Chicago",
  },
  {
    type: "select",
    name: "business_address_state",
    message: "Business address state?",
    choices: [
      "IL",
      // "IN",
    ],
  },
  {
    type: "input",
    name: "business_address_zip",
    message: "Business address zip code?",
  },
  {
    type: "input",
    name: "business_address_country",
    message: "Business address country?",
    initial: "USA",
  },
])) as {
  business_address_line_1: string;
  business_address_line_2: string | null;
  business_address_city: string;
  business_address_state: string;
  business_address_zip: string;
  business_address_country: string;
};

const { is_billing_same_as_business } = (await prompt([
  {
    type: "select",
    name: "is_billing_same_as_business",
    message: "Is the billing address the same as the business address?",
    choices: [
      { name: "Yes", value: true },
      { name: "No", value: false },
    ],
  },
])) as { is_billing_same_as_business: boolean };

const billingAddressAnswers = is_billing_same_as_business
  ? {
      billing_address_line_1: businessAddressAnswers.business_address_line_1,
      billing_address_line_2: businessAddressAnswers.business_address_line_2,
      billing_address_city: businessAddressAnswers.business_address_city,
      billing_address_state: businessAddressAnswers.business_address_state,
      billing_address_zip: businessAddressAnswers.business_address_zip,
      billing_address_country: businessAddressAnswers.business_address_country,
    }
  : await prompt([
      {
        type: "input",
        name: "billing_address_line_1",
        message: "Billing address line 1?",
      },
      {
        type: "input",
        name: "billing_address_line_2",
        message: "Billing address line 2?",
      },
      {
        type: "input",
        name: "billing_address_city",
        message: "Billing address city?",
      },
      {
        type: "input",
        name: "billing_address_state",
        message: "Billing address state?",
      },
      {
        type: "input",
        name: "billing_address_zip",
        message: "Billing address zip code?",
      },
      {
        type: "input",
        name: "billing_address_country",
        message: "Billing address country?",
        initial: "USA",
      },
    ]);

const styleAnswers = await prompt([
  {
    type: "select",
    name: "platform_style",
    message: "Platform style?",
    choices: [
      "basic",
      // "minimalist",
      // "immersive",
      // "haute",
      // "modern",
      // "chain",
      // "moody",
      // "friendly",
      // "neighborhood",
      // "retro",
    ],
  },
  {
    type: "input",
    name: "primary_brand_color",
    message: "Primary brand color (hex)?",
    initial: "#000000",
  },
  {
    type: "input",
    name: "secondary_brand_color",
    message: "Secondary brand color (hex)?",
    initial: "#000000",
  },
  {
    type: "input",
    name: "accent_brand_color",
    message: "Accent brand color (hex)?",
    initial: "#000000",
  },
  {
    type: "select",
    name: "primary_font",
    message: "Primary brand font (CSS font-family)?",
    // TODO: Connect to Google Fonts API to provide a better selection experience.
    // TODO: Add secondary font choice.
    choices: [
      "Inter, sans-serif",
      "Arial, sans-serif",
      "Helvetica, sans-serif",
      "Times New Roman, serif",
      "Georgia, serif",
      "Courier New, monospace",
      "Verdana, sans-serif",
      "Tahoma, sans-serif",
      "Trebuchet MS, sans-serif",
      "Impact, sans-serif",
    ],
  },
  {
    type: "confirm",
    name: "has_dark_mode",
    message: "Add a dark mode?",
    initial: true,
  },
]);

const adminAnswers = await prompt([
  { type: "input", name: "admin_first_name", message: "Admin first name?" },
  { type: "input", name: "admin_last_name", message: "Admin last name?" },
  { type: "input", name: "admin_phone", message: "Admin phone?" },
  { type: "input", name: "admin_email", message: "Admin email?" },
]);

const answers = AnswersSchema.parse({
  ...businessIdentityAnswers,
  ...businessAddressAnswers,
  ...billingAddressAnswers,
  ...styleAnswers,
  ...adminAnswers,
});

// 2. Provision Clerk org and user.
const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});
const slug = createSlug(answers.name);
const password = generator.generate({
  length: 8,
  numbers: true,
  symbols: true,
  uppercase: true,
  strict: true, // Guarantees at least one of each character type
});

async function provisionClient(answers: Answers) {
  // 1. Create the org first so we have its ID for user metadata
  const org = await clerk.organizations.createOrganization({
    name: answers.name,
    slug,
  });

  // 2. Create the user with org ID already baked into metadata
  // TODO: Prompt should ask if it's for an existing user (just ask email) or new user (ask name, email, password)
  const user = await clerk.users.createUser({
    emailAddress: [answers.admin_email],
    password,
    firstName: answers.admin_first_name,
    lastName: answers.admin_last_name,
    publicMetadata: {
      businesses: [
        {
          id: org.id,
          role: "owner",
          permissions: [],
        },
      ],
    },
    privateMetadata: {
      isOnboardingComplete: false,
      // stripeCustomerId: null,
    },
  });

  // 3. Add the user to the org as admin
  await clerk.organizations.createOrganizationMembership({
    organizationId: org.id,
    userId: user.id,
    role: "org:admin",
  });

  return { userId: user.id, orgId: org.id };
}

const clerkSpinner = ora(
  `Provisioning Clerk with ${answers.name + "'" + answers.name[answers.name.length - 1] === "s" ? "" : "s"} information..`,
).start();
let userId: string;
let orgId: string;

try {
  ({ userId, orgId } = await provisionClient(answers));
  clerkSpinner.succeed(
    `✅ Clerk provisioning complete\n  ➡️ Business ID: ${orgId}`,
  );
} catch (err) {
  clerkSpinner.fail("❌ Clerk provisioning failed");
  throw err;
}

// 3. Seed Supabase with business info.
const supabaseSpinner = ora(
  `Seeding Supabase with ${answers.name + "'" + answers.name[answers.name.length - 1] === "s" ? "" : "s"} information...`,
).start();

const created_at = new Date();
const newBusiness = SupabaseBusinessSchema.parse({
  id: orgId,
  ...answers,
  created_at,
  updated_at: created_at,
});

const { data, error } = await supabase()
  .from("businesses")
  .insert([newBusiness])
  .select()
  .single();

if (error || !data) {
  supabaseSpinner.fail("❌ Supabase seed failed");
  throw error;
}

supabaseSpinner.succeed(`✅ "${data.name}" successfully seeded in Supabase!`);

// 4. Copy the template to a new directory named after the business.
function createSlug(text: string): string {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/['’]/g, "") // Remove straight and curly apostrophes
    .trim() // Remove leading/trailing whitespace
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric clusters with one hyphen
    .replace(/^-+|-+$/g, ""); // Remove hyphens from the start or end
}

const templatePath = join(__dirname, "templates", `${answers.platform_style}`);
const destPath = `../clients/${slug}`;
const fullDestPath = join(process.cwd(), destPath);

const copySpinner = ora(
  `Copying the "${answers.platform_style}" template for "${answers.name}"...`,
).start();
await fs.copy(templatePath, fullDestPath);
copySpinner.succeed(`✅ Template successfully copied to ${destPath}`);

// 5. Install dependencies in the new directory.
const installSpinner = ora("Installing dependencies...").start();
try {
  await execa("npm", ["install"], { cwd: fullDestPath });
  installSpinner.succeed("✅ Dependencies successfully installed");
} catch (err) {
  installSpinner.fail("❌ Installation failed");
  throw err;
}

// 6. Create a config file with the business info and style preferences to be used by the app.
function buildConfig(answers: Answers, id: string): Config {
  const {
    platform_style,
    primary_brand_color,
    secondary_brand_color,
    accent_brand_color,
    primary_font,
    has_dark_mode,
  } = answers;
  return {
    id,
    theme: {
      platform_style,
      primary_brand_color,
      secondary_brand_color,
      accent_brand_color,
      primary_font,
      has_dark_mode,
    },
  };
}

const configSpinner = ora(
  `Creating a config file for "${data.name}"...`,
).start();
const configContent = `module.exports = ${JSON.stringify(buildConfig(answers, orgId), null, 2)}\n`;
await fs.writeFile(join(fullDestPath, "feast.config.ts"), configContent);
configSpinner.succeed("✅ feast.config.ts successfully created");

/* 
TODO: deploy site to Vercel and provide the user with the URL
*/

console.log(chalk.green(`\n  Done! Your project is ready at ${destPath}`));
console.log(
  chalk.yellow(`  Temporary password for ${answers.admin_email}: ${password}`),
);
console.log(chalk.black("  Use the following commands to get started:"));
console.log(chalk.dim(`  cd ${destPath} && npm run dev\n`));
