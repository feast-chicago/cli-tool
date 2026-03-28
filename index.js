#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pkg from 'enquirer';
import fs from "fs-extra";
import { execa } from "execa";
import ora from "ora";
import chalk from "chalk";

const { prompt } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(chalk.bold("\n  FEAST Website Generator\n"));

const answers = await prompt([
  { type: "input", name: "businessName", message: "Business name?" },
  { type: "input", name: "tagline", message: "Short tagline?" },
  {
    type: "select",
    name: "category",
    message: "Business category?",
    choices: ["restaurant", "cafe", "bar", "bakery", "food truck", "other"],
  },
  {
    type: "select",
    name: "style",
    message: "Website style?",
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
    name: "primary",
    message: "Primary brand color (hex)?",
    initial: "#000000",
  },
  {
    type: "input",
    name: "businessId",
    message: "Business ID?",
    initial: "my-feast-site",
  },
]);

const templatePath = join(
  __dirname,
  "templates",
  `${answers.category}-${answers.style}`,
);
const destPath = join(process.cwd(), answers.businessId);

const copySpinner = ora("Copying template...").start();
await fs.copy(templatePath, destPath);
copySpinner.succeed("Template copied");

const configSpinner = ora("Writing config...").start();
const configContent = `module.exports = ${JSON.stringify(buildConfig(answers), null, 2)}\n`;
await fs.writeFile(join(destPath, "feast.config.ts"), configContent);
configSpinner.succeed("feast.config.ts written");

const installSpinner = ora("Installing dependencies...").start();
try {
  await execa("npm", ["install"], { cwd: destPath });
  installSpinner.succeed("Dependencies installed");
} catch (err) {
  installSpinner.fail("Installation failed");
  throw err;
}

console.log(
  chalk.green(`\n  Done! Your site is ready at ./${answers.businessId}`),
);
console.log(chalk.dim(`  cd ${answers.businessId} && npm run dev\n`));

function buildConfig(answers) {
  return {
    business: {
      name: answers.businessName,
      tagline: answers.tagline,
      category: answers.category,
      supabaseId: answers.businessId,
    },
    theme: {
      primary: answers.primary,
      accent: "#F5F5F5",
      font: "inter",
      radius: "soft",
      darkMode: false,
    },
    hours: {
      mon: [[900, 1700]],
      tue: [[900, 1700]],
      wed: [[900, 1700]],
      thu: [[900, 1700]],
      fri: [[900, 1700]],
      sat: null,
      sun: null,
      isOpen: true,
    },
    features: {
      hasMenu: true,
      hasOnlineOrders: true,
      hasTestimonials: true,
      hasGoogleMap: true,
    },
    integrations: {
      analyticsId: null,
      facebookUsername: null,
      instagramUsername: null,
      tiktokUsername: null,
      xUsername: null,
    },
    meta: {
      seoDescription: "",
      keywords: [],
    },
  };
}
