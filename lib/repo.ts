import "@dotenvx/dotenvx/config";
import fs from "fs-extra";
import ora from "ora";
import { join } from "path";
import { Answers } from "../schema";
import { buildConfig } from "../utils/buildConfig";
import { buildUtils } from "../utils/buildUtils";

export async function updateRepo(answers: Answers, orgId: string) {
  // Copy the template to a new directory named after the business.
  const templatePath = join(process.cwd(), "../site-template");
  const typesPath = join(process.cwd(), "../feast-works/types");

  // Update the config file with test data.
  const configSpinner = ora("Updating the config file...").start();
  const configContent = buildConfig(answers, orgId);
  await fs.writeFile(join(templatePath, "feast.config.ts"), configContent);
  configSpinner.succeed("✅ feast.config.ts successfully updated");

  // Copy the schema file to the site-template and feast-works directories
  const schemaSpinner = ora(
    "Updating the schema and types-related files...",
  ).start();
  await fs.copy(
    join(process.cwd(), "schema.ts"),
    join(templatePath, "schema.ts"),
  );
  await fs.copy(join(process.cwd(), "schema.ts"), join(typesPath, "feast.ts"));
  await fs.copy(
    join(process.cwd(), "clerk.d.ts"),
    join(typesPath, "clerk.d.ts"),
  );
  schemaSpinner.succeed("✅ schema.ts successfully updated");

  // Overwrite the utils.ts file to include the most updated theme/CSS generation functions.
  const utilsSpinner = ora(
    `Updating the utils.ts file for ${answers.name}...`,
  ).start();
  const utilsContent = buildUtils();
  await fs.writeFile(join(templatePath, "lib", "utils.ts"), utilsContent);
  utilsSpinner.succeed("✅ utils.ts successfully updated");
}

export async function addDomain(slug: string) {
  const domain = `${slug}.${process.env.FEAST_DOMAIN!}`;
  const teamId = process.env.VERCEL_TEAM_ID!;
  const token = process.env.VERCEL_TOKEN!;
  const projectId = process.env.VERCEL_PROJECT_ID!;

  // Add subdomain to Vercel project
  const domainSpinner = ora(`Adding domain: ${domain}...`).start();
  const siteUrl = `https://${domain}`;
  try {
    const res = await fetch(
      `https://api.vercel.com/v10/projects/${projectId}/domains?teamId=${teamId}&slug=${slug}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: domain }),
      },
    );

    if (!res.ok) {
      throw new Error(`❌ Error ${res.status}: Failed to add domain`);
    }

    domainSpinner.succeed(`✅ Domain successfully configured: ${siteUrl}`);
  } catch (err) {
    domainSpinner.fail("❌ Domain configuration failed");
    throw err;
  }
}
