#!/usr/bin/env tsx

import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import chalk from "chalk";
import { updateBusiness } from "./lib/cli/supabase";
import { Address, Admin, Answers, Settings, Theme } from "./schema";
import { updateRepository } from "./lib/cli/repo/updateRepo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, ".env.local") });

console.log(chalk.bold.hex("#F5853F")("\nFEAST App Generator\n"));

const orgId = "org_3CS2GyhazeMC3QLKLlWMiqoUWWL";

const business_address: Address = {
  line_1: "123 N Main St",
  line_2: "",
  city: "Chicago",
  state: "IL",
  zip: "60600",
  country: "USA",
};
const billing_address = business_address;
const theme: Theme = {
  platform_theme: "basic",
  primary_brand_color: "#000000",
  secondary_brand_color: "#000000",
  accent_brand_color: "#000000",
  background_color: "#000000",
  primary_font: "Inter",
  secondary_font: "Inter",
  radius: "Default",
  is_dark_mode_enabled: false,
};
const admin: Admin = {
  first_name: "Jamal",
  last_name: "Riley",
  phone: "7735550100",
  email: "jamal@test.com",
};
const settings: Settings = {
  is_menu_page_enabled: true,
  is_online_ordering_enabled: true,
  is_pos_enabled: true,
  is_reservations_enabled: false,
  is_rewards_enabled: true,
  is_shop_page_enabled: false,
};
const answers: Answers = {
  name: "Example Restaurant",
  tagline: "An example tagline.",
  description:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.",
  phone: "3125550100",
  email: "test@example.com",
  category: "Restaurant",
  location_type: "brick-and-mortar",
  business_address,
  billing_address,
  theme,
  admin,
  settings,
};

// 1. Update Supabase with business info.
await updateBusiness(answers, orgId);

// 2. Update the template in its current directory.
await updateRepository(orgId, answers);
