import { execa } from "execa";
import ora from "ora";
import { Answers, FeastConfig } from "../../schema";
import { join } from "path";
import fs from "fs-extra";
import { createTheme, generateCssVariables } from "../theme";
import { writeFonts } from "../fonts";
import { gatherAnswers } from "./prompts";

export async function createRepository(
  orgId: string,
  slug: string,
  answers: Answers,
) {
  // Copy the template to a new directory named after the business.
  const templatePath = join(process.cwd(), "../template");
  const rootPath = join(process.cwd(), `../clients/${slug}-site`);

  const copySpinner = ora(
    `Copying a "${answers.platform_theme}"-themed template for "${answers.name}"...`,
  ).start();
  await fs.copy(templatePath, rootPath);
  copySpinner.succeed(`✅ Template successfully copied to ${rootPath}`);

  // Create a config file with the business info and theme preferences to be used by the app.
  const configSpinner = ora(
    `Creating a config file for "${answers.name}"...`,
  ).start();
  const configContent = `module.exports = ${JSON.stringify(buildConfig(answers, orgId), null, 2)}\n`;
  await fs.writeFile(join(rootPath, "feast.config.ts"), configContent);
  configSpinner.succeed("✅ feast.config.ts successfully created");

  // Copy the schema file to the new directory
  const schemaSpinner = ora(
    `Creating a schema file for "${answers.name}"...`,
  ).start();
  await fs.copy(join(process.cwd(), "schema.ts"), join(rootPath, "schema.ts"));
  schemaSpinner.succeed("✅ schema.ts successfully created");

  // Copy the schema file to the new directory
  const fontSpinner = ora(
    `Creating a fonts file for "${answers.name}"...`,
  ).start();

  const { fontMap } = await gatherAnswers();
  await writeFonts(
    rootPath,
    answers.primary_font,
    answers.secondary_font,
    fontMap,
  );
  fontSpinner.succeed("✅ fonts.ts successfully created");

  // Generate CSS variables from the user's preferences and write them to globals.css.
  const themeSpinner = ora(
    `Creating a globals.css file for "${answers.name}"...`,
  ).start();
  const theme = createTheme({
    platform_theme: answers.platform_theme,
    primary_brand_color: answers.primary_brand_color,
    secondary_brand_color: answers.secondary_brand_color,
    accent_brand_color: answers.accent_brand_color,
    background_color: answers.background_color,
    primary_font: answers.primary_font,
    secondary_font: answers.secondary_font,
    radius: answers.radius,
    is_dark_mode_enabled: answers.is_dark_mode_enabled,
  });
  const cssVars = generateCssVariables(theme);

  // Read the existing globals.css from the copied template.
  const cssPath = join(rootPath, "app", "globals.css");
  let css = await fs.readFile(cssPath, "utf8");

  // Replace the :root and .dark blocks with the generated ones.
  // TODO: Ensure no extra whitespace is accidentally added or removed in the process.
  css = css
    .replace(/:root\s*\{[\s\S]*?\}/, "")
    .replace(/\.dark\s*\{[\s\S]*?\}/, "");
  css += "\n" + cssVars;

  // Write the updated CSS back to the file.
  await fs.writeFile(cssPath, css);
  themeSpinner.succeed("✅ globals.css successfully created");

  // Install dependencies in the new directory.
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

function buildConfig(answers: Answers, id: string): FeastConfig {
  const { name, description } = answers;
  return { id, name, description };
}
