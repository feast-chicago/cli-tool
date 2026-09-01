#!/usr/bin/env tsx

import chalk from "chalk";
import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { provisionClient } from "./lib/clerk";
import { gatherAnswers } from "./lib/prompts";
import { createRepo, deployRepo } from "./lib/repo";
import { createBusiness } from "./lib/supabase";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, ".env.local") });

console.log(chalk.bold.hex("#fd6f3b")("\nFEAST App CLI Tool\n"));

// 1. Gather answers from the user via prompts.
export const { answers, fontMap } = await gatherAnswers();

// 2. Provision Clerk org and user.
const { userEmail, password, orgId, slug } = await provisionClient(answers);

// 3. Seed Supabase with business info.
await createBusiness(answers, orgId);

// 4. Copy the template to a new directory.
const { rootPath } = await createRepo(answers, orgId, slug);

// 5. Deploy site to GitHub/Vercel.
const { repoUrl, siteUrl } = await deployRepo(answers.name, rootPath, slug);

// Output next steps for the user.
console.log(chalk.green(`\n  Done! Your project is ready at ${rootPath}\n`));
console.log(chalk.blue(`  GitHub Link:  ${repoUrl}`));
console.log(chalk.blue(`  Site Link:    ${siteUrl}`));
console.log(
  chalk.blue(
    "  Note: Your website make take up to a few minutes to be fully online.\n",
  ),
);
console.log(
  chalk.yellow(
    `  Your FEAST Works account credentials:\n  Email Address:     ${userEmail}:\n  Temporary Password: ${password}`,
  ),
);
console.log(
  chalk.white(
    `  Use the following commands to get started:\n  cd ${rootPath} && npm run dev\n`,
  ),
);
