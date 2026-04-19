import { join } from "path";
import { Answers } from "../../../schema";
import { fetchGoogleFonts, writeFonts } from "../../fonts";
import fs from "fs-extra";
import ora from "ora";
import { buildConfig } from "../../../utils/buildConfig";
import { createTheme, generateCssVariables } from "../../theme";

export async function updateRepository(orgId: string, answers: Answers) {
  // const fontSpinner = ora("Fetching Google Web Fonts...").start();
  let fontMap: Map<string, string>;
  try {
    fontMap = await fetchGoogleFonts();
    // fontSpinner.succeed("✅ Google Web Fonts successfully loaded");
  } catch {
    await console.error(
      "Could not fetch Google Web Fonts. Using defaults instead...",
    );
    // fontSpinner.warn(
    //   "Could not fetch Google Web Fonts. Using defaults instead...",
    // );
    fontMap = new Map([
      ["Inter", "Inter"],
      ["Roboto", "Roboto"],
      ["Playfair Display", "Playfair_Display"],
      ["Lato", "Lato"],
      ["Merriweather", "Merriweather"],
      ["Montserrat", "Montserrat"],
      ["Source Sans 3", "Source_Sans_3"],
      ["DM Sans", "DM_Sans"],
    ]);
  }

  // Copy the template to a new directory named after the business.
  const templatePath = join(process.cwd(), "../template");

  // Update the config file with test data.
  const configSpinner = ora("Updating the config file...").start();
  const configContent = buildConfig(answers, orgId);
  await fs.writeFile(join(templatePath, "feast.config.ts"), configContent);
  configSpinner.succeed("✅ feast.config.ts successfully updated");

  // Copy the schema file to the new directory
  const schemaSpinner = ora("Updating the schema file...").start();
  await fs.copy(
    join(process.cwd(), "schema.ts"),
    join(templatePath, "schema.ts"),
  );
  schemaSpinner.succeed("✅ schema.ts successfully updated");

  // Create a fonts file for the custom selected Google Web Fonts to the new directory
  const fontSpinner = ora(
    `Creating a fonts file for "${answers.name}"...`,
  ).start();

  await writeFonts(
    templatePath,
    answers.theme.primary_font,
    answers.theme.secondary_font,
    fontMap,
  );
  fontSpinner.succeed("✅ fonts.ts successfully updated");

  // Generate CSS variables from the user's preferences and write them to globals.css.
  const themeSpinner = ora(
    `Creating a globals.css file for "${answers.name}"...`,
  ).start();
  const cssTheme = createTheme({ ...answers.theme });
  const cssVars = generateCssVariables(cssTheme);

  // Read the existing globals.css from the copied template.
  const cssPath = join(templatePath, "app", "globals.css");
  let css = await fs.readFile(cssPath, "utf8");

  // Replace the :root and .dark blocks with the generated ones.
  // TODO: Ensure no extra whitespace is accidentally added or removed in the process.
  css = css
    .replace(/:root\s*\{[\s\S]*?\}/, "")
    .replace(/\.dark\s*\{[\s\S]*?\}/, "");
  css += "\n" + cssVars;

  // Write the updated CSS back to the file.
  await fs.writeFile(cssPath, css);
  themeSpinner.succeed("✅ globals.css successfully updated");
}
