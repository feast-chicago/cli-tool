#!/usr/bin/env tsx

import chalk from "chalk";
import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { provisionClient } from "./lib/clerk";
import { gatherAnswers } from "./lib/prompts";
import { createBusiness } from "./lib/supabase";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, ".env.local") });

console.log(chalk.bold.hex("#fd6f3b")("\nFEAST App CLI Tool\n"));

// 1. Gather answers from the user via prompts.
export const { answers, fontMap } = await gatherAnswers();

// 2. Provision Clerk org and user.
const { userEmail, password, orgId } = await provisionClient(answers);

// 3. Seed Supabase with business info.
await createBusiness(answers, orgId);

// Output next steps for the user.
console.log(chalk.green(`\n  Done! Your site is now live.`));
console.log(chalk.green(`  Website Link: ${answers.site_urls[0]}\n`));

console.log(
  chalk.yellow(
    `  Your FEAST Works account credentials:\n  Email Address:      ${userEmail}:\n  Temporary Password: ${password}`,
  ),
);
