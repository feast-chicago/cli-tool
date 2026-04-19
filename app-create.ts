#!/usr/bin/env tsx

import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import chalk from "chalk";
import { gatherAnswers } from "./lib/cli/prompts";
import { provisionClient } from "./lib/cli/clerk";
import { createBusiness } from "./lib/cli/supabase";
import { createRepository } from "./lib/cli/repo/createRepo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, ".env.local") });

console.log(chalk.bold.hex("#F5853F")("\nFEAST App Generator\n"));

// 1. Gather answers from the user via prompts.
export const { answers, fontMap } = await gatherAnswers();

// 2. Provision Clerk org and user.
const { userEmail, password, orgId, slug } = await provisionClient(answers);

// 3. Seed Supabase with business info.
await createBusiness(answers, orgId);

// 4. Copy the template to a new directory.
const { rootPath } = await createRepository(orgId, slug, answers);

// TODO: 5. Deploy site to GitHub/Vercel.

// Output next steps for the user.
console.log(chalk.green(`\n  Done! Your project is ready at ${rootPath}`));
console.log(
  chalk.yellow(`  Temporary password for ${userEmail}:\n  ${password}`),
);
console.log(
  chalk.black(
    `  Use the following commands to get started:\n  cd ${rootPath} && npm run dev\n`,
  ),
);
