import { execa } from "execa";
import fs from "fs-extra";
import ora from "ora";
import { join } from "path";
import { Answers } from "../../../schema";
import { buildConfig } from "../../../utils/buildConfig";
import { buildUtils } from "../../../utils/buildUtils";
import { createTheme, generateCssVariables } from "../../theme";

export async function createRepo(
  answers: Answers,
  orgId: string,
  slug: string,
) {
  // Copy the template to a new directory named after the business.
  const templatePath = join(process.cwd(), "../site-template");
  const rootPath = join(process.cwd(), `../clients/${slug}-site`);

  const copySpinner = ora(
    `Copying a "${answers.theme.platform_theme}" template for ${answers.name}...`,
  ).start();
  await fs.copy(templatePath, rootPath);
  copySpinner.succeed(`✅ Template successfully copied to ${rootPath}`);

  // Overwrite the template config file with the business' info.
  const configSpinner = ora(
    `Creating a config file for ${answers.name}...`,
  ).start();
  const configContent = buildConfig(answers, orgId);
  await fs.writeFile(join(rootPath, "feast.config.ts"), configContent);
  configSpinner.succeed("✅ feast.config.ts successfully created");

  // Ensure the most updated version of the schema is added to the new directory.
  const schemaSpinner = ora(
    `Creating a schema file for ${answers.name}...`,
  ).start();
  await fs.copy(join(process.cwd(), "schema.ts"), join(rootPath, "schema.ts"));
  schemaSpinner.succeed("✅ schema.ts successfully created");

  // Generate CSS variables from the user's preferences and write them to globals.css.
  const themeSpinner = ora(
    `Creating a globals.css file for ${answers.name}...`,
  ).start();
  const cssTheme = createTheme({ ...answers.theme });
  const cssVars = generateCssVariables(cssTheme);

  // Read the existing globals.css from the copied template.
  const cssPath = join(rootPath, "app", "globals.css");
  let css = await fs.readFile(cssPath, "utf8");

  // Replace the :root and .dark blocks with the generated ones.
  css = css
    .replace(/:root\s*\{[\s\S]*?\}/, "")
    .replace(/\.dark\s*\{[\s\S]*?\}/, "")
    .trimEnd();

  css += "\n" + cssVars;

  // Write the updated CSS back to the file.
  await fs.writeFile(cssPath, css);
  themeSpinner.succeed("✅ globals.css successfully created");

  // Overwrite the utils.ts file to include the most updated theme/CSS generation functions.
  const utilsSpinner = ora(
    `Updating the utils.ts file for ${answers.name}...`,
  ).start();
  const utilsContent = buildUtils();
  await fs.writeFile(join(rootPath, "lib", "utils.ts"), utilsContent);
  utilsSpinner.succeed("✅ utils.ts successfully updated");

  // Verify that dependencies are fully installed in the new directory.
  const installSpinner = ora("Installing dependencies...").start();
  try {
    await execa("npm", ["install"], { cwd: rootPath });
    installSpinner.succeed("✅ Dependencies successfully installed");
  } catch (err) {
    installSpinner.fail("❌ Installation failed");
    throw err;
  }

  return { rootPath };
}
