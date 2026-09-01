import "@dotenvx/dotenvx/config";
import { execa } from "execa";
import fs from "fs-extra";
import { Octokit } from "octokit";
import ora from "ora";
import { join } from "path";
import { Answers } from "../schema";
import { buildConfig } from "../utils/buildConfig";
import { buildUtils } from "../utils/buildUtils";
import { fetchGoogleFonts } from "./fonts";
import { createTheme, generateCssVariables } from "./theme";

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

export async function updateRepo(answers: Answers, orgId: string) {
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

  // Generate CSS variables from the user's preferences and write them to globals.css.
  const themeSpinner = ora(
    `Updating the globals.css file for ${answers.name}...`,
  ).start();
  const cssTheme = createTheme({ ...answers.theme });
  const cssVars = generateCssVariables(cssTheme);

  // Read the existing globals.css from the copied template.
  const cssPath = join(templatePath, "app", "globals.css");
  let css = await fs.readFile(cssPath, "utf8");

  // Replace the :root and .dark blocks with the generated ones.
  css = css
    .replace(/:root\s*\{[\s\S]*?\}/, "")
    .replace(/\.dark\s*\{[\s\S]*?\}/, "")
    .trimEnd();

  css += "\n\n" + cssVars;

  // Write the updated CSS back to the file.
  await fs.writeFile(cssPath, css);
  themeSpinner.succeed("✅ globals.css successfully updated");

  // Overwrite the utils.ts file to include the most updated theme/CSS generation functions.
  const utilsSpinner = ora(
    `Updating the utils.ts file for ${answers.name}...`,
  ).start();
  const utilsContent = buildUtils();
  await fs.writeFile(join(templatePath, "lib", "utils.ts"), utilsContent);
  utilsSpinner.succeed("✅ utils.ts successfully updated");
}

export async function deployRepo(
  name: string,
  rootPath: string,
  slug: string,
): Promise<{
  repoUrl: string;
  siteUrl: string;
}> {
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
  const GITHUB_ORG = process.env.GITHUB_ORG!;
  const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
  const FEAST_DOMAIN = process.env.FEAST_DOMAIN!;

  // 1. Initialize git
  const gitSpinner = ora("Initializing git...").start();
  try {
    await fs.remove(join(rootPath, ".git")); // Removes the copied .git folder so that Git can be properly initialized.
    await execa("git", ["init"], { cwd: rootPath });
    await execa("git", ["add", "."], { cwd: rootPath });
    await execa("git", ["commit", "-m", "Initial commit"], { cwd: rootPath });
    await execa("git", ["branch", "-M", "main"], { cwd: rootPath });
    gitSpinner.succeed("✅ Git initialized");
  } catch (err) {
    gitSpinner.fail("❌ Git init failed");
    throw err;
  }

  // 2. Create GitHub repository
  const githubSpinner = ora(
    `Creating GitHub repo: ${GITHUB_ORG}/${slug}...`,
  ).start();
  let repoUrl: string;
  try {
    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
    });

    const res = await octokit.request(`POST /orgs/${GITHUB_ORG}/repos`, {
      org: GITHUB_ORG,
      name: slug,
      description: `FEAST site for ${name}.`,
      private: true,
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
      },
    });

    if (res.status !== 201) {
      throw new Error("❌ GitHub repository creation failed");
    }

    repoUrl = `https://github.com/${GITHUB_ORG}/${slug}`;
    githubSpinner.succeed(`✅ GitHub repository created: ${repoUrl}`);
  } catch (err) {
    githubSpinner.fail("❌ GitHub repository creation failed");
    throw err;
  }

  // 3. Push to GitHub
  const pushSpinner = ora("Pushing to GitHub...").start();
  try {
    const remoteUrl = `https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/${slug}.git`;
    await execa("git", ["remote", "add", "origin", remoteUrl], {
      cwd: rootPath,
    });
    await execa("git", ["push", "-u", "origin", "main"], { cwd: rootPath });
    pushSpinner.succeed("✅ Push to GitHub successful");
  } catch (err) {
    pushSpinner.fail("❌ Push to GitHub failed");
    throw err;
  }

  // 4. Create Vercel project
  const vercelSpinner = ora("Creating Vercel project...").start();
  try {
    const environmentVariables = [
      {
        key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
        target: "production",
        value: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
        type: "plain",
      },
      {
        key: "CLERK_SECRET_KEY",
        target: "production",
        value: process.env.CLERK_SECRET_KEY!,
        type: "encrypted",
      },
      {
        key: "NEXT_PUBLIC_SUPABASE_URL",
        target: "production",
        value: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        type: "plain",
      },
      {
        key: "SUPABASE_SERVICE_ROLE_KEY",
        target: "production",
        value: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        type: "encrypted",
      },
    ];

    const res = await fetch(
      `https://api.vercel.com/v11/projects?teamId=${VERCEL_TEAM_ID}&slug=${slug}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          environmentVariables,
          framework: "nextjs",
          name: slug,
        }),
      },
    );

    if (!res.ok) {
      console.error(JSON.stringify(res));
      throw new Error("❌ Vercel project creation failed");
    }

    vercelSpinner.succeed("✅ Vercel project created");
  } catch (err) {
    console.error(err);
    vercelSpinner.fail("❌ Vercel project creation failed");
    throw err;
  }

  // 5. Add subdomain to Vercel project
  const domainSpinner = ora(
    `Adding domain: ${slug}.${FEAST_DOMAIN}...`,
  ).start();
  const siteUrl = `https://${slug}.${FEAST_DOMAIN}`;
  try {
    const res = await fetch(
      `https://api.vercel.com/v10/projects/${slug}/domains?teamId=${VERCEL_TEAM_ID}&slug=${slug}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: `${slug}.${FEAST_DOMAIN}` }),
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

  // 6. Trigger initial deployment
  const deploySpinner = ora("Triggering initial deployment...").start();
  try {
    const res = await fetch(
      `https://api.vercel.com/v13/deployments?forceNew=1&teamId=${VERCEL_TEAM_ID}&slug=${slug}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: slug,
          gitSource: {
            org: GITHUB_ORG,
            ref: "main",
            repo: slug,
            type: "github",
          },
        }),
      },
    );

    if (!res.ok) {
      throw new Error(`❌ Error ${res.status}: Deployment trigger failed`);
    }

    deploySpinner.succeed("✅ Deployment successfully triggered");
  } catch (err) {
    deploySpinner.fail("❌ Deployment trigger failed");
    throw err;
  }

  return { repoUrl, siteUrl };
}
