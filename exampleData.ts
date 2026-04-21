import { Address, Admin, Answers, Settings, Theme } from "./schema";

const business_address: Address = {
  line_1: "123 N Main St",
  line_2: "",
  city: "Chicago",
  state: "IL",
  zip_code: "60600",
  country: "USA",
};
const billing_address = business_address;
const theme: Theme = {
  platform_theme: "basic",
  primary_brand_color: "#B5451B", // Terracotta
  secondary_brand_color: "#3B7A57", // Forest
  accent_brand_color: "#D4A017", // Gold
  background_color: "#FAF7F2", // Cream
  primary_font: "Inter",
  secondary_font: "Inter",
  radius: "Default",
  is_dark_mode_enabled: false,
};
const admin: Admin = {
  first_name: "John",
  last_name: "Doe",
  phone: "7735550100",
  email: "john@test.com",
};
const settings: Settings = {
  is_menu_page_enabled: true,
  is_online_ordering_enabled: true,
  is_pos_enabled: true,
  is_reservations_enabled: false,
  is_rewards_enabled: true,
  is_shop_page_enabled: false,
};

export const exampleOrgId = "org_3CS2GyhazeMC3QLKLlWMiqoUWWL";
export const exmampleAnswers: Answers = {
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
