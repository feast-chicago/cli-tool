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
