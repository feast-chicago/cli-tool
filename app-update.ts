#!/usr/bin/env tsx

import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import chalk from "chalk";
import { updateBusiness } from "./lib/cli/supabase";
import { updateRepo } from "./lib/cli/repo/updateRepo";
import { exampleOrgId, exmampleAnswers } from "./exampleData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, ".env.local") });

console.log(chalk.bold.hex("#F5853F")("\nFEAST App CLI Tool\n"));

// 1. Update Supabase with business info.
await updateBusiness(exmampleAnswers, exampleOrgId);

// 2. Update the template in its current directory.
await updateRepo(exmampleAnswers, exampleOrgId);
