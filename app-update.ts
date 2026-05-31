#!/usr/bin/env tsx

import chalk from "chalk";
import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { exampleOrgId, exmampleAnswers } from "./exampleData";
import { updateRepo } from "./lib/cli/repo/updateRepo";
import { updateBusiness } from "./lib/cli/supabase";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, ".env.local") });

console.log(chalk.bold.hex("#F5853F")("\nFEAST App CLI Tool\n"));

// 1. Update Supabase with business info.
await updateBusiness(exmampleAnswers, exampleOrgId);

// 2. Update the template in its current directory.
await updateRepo(exmampleAnswers, exampleOrgId);
