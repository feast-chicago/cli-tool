import "@dotenvx/dotenvx/config";
import fs from "fs-extra";
import ora from "ora";
import { join } from "path";
import { Answers } from "../schema";
import { buildUtils } from "../utils/buildUtils";

export async function updateRepo(answers: Answers) {
  const clientSitePath = join(process.cwd(), "../client-site");
  const feastWorksPath = join(process.cwd(), "../feast-works");

  // Copy the schema files to the client-site and feast-works directories
  const schemaSpinner = ora(
    "Updating the schema and types-related files...",
  ).start();
  await fs.copy(
    join(process.cwd(), "schema.ts"),
    join(clientSitePath, "schema.ts"), // Copy the schema file to the client site.
  );
  await fs.copy(
    join(process.cwd(), "schema.ts"),
    join(feastWorksPath, "schema.ts"), // Copy the schema file to the FEAST Works site.
  );
  await fs.copy(
    join(process.cwd(), "clerk.d.ts"),
    join(feastWorksPath, "clerk.d.ts"), // Copy the Clerk types file to the FEAST Works site.
  );
  schemaSpinner.succeed("✅ schema.ts successfully updated");

  // Overwrite the utils.ts file to include the most updated theme/CSS generation functions.
  const utilsSpinner = ora(
    `Updating the utils.ts file for ${answers.name}...`,
  ).start();
  const utilsContent = buildUtils();
  await fs.writeFile(join(clientSitePath, "lib", "utils.ts"), utilsContent);
  utilsSpinner.succeed("✅ utils.ts successfully updated");

  // Copy the Blocks file from to the feast-works repo to the client-site repo
  const blocksSpinner = ora('Updating "block" components...').start();
  await fs.copy(
    join(feastWorksPath, "app/admin/builder/_components", "Blocks.tsx"),
    join(clientSitePath, "components", "Blocks.tsx"),
  );
  blocksSpinner.succeed("✅ Blocks.tsx successfully updated");
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
