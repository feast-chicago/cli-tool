import { Address, Admin, Answers, GoogleFont, Settings, Theme } from "./schema";

export const InterFont: GoogleFont = {
  family: "Inter",
  variants: [
    "100",
    "200",
    "300",
    "regular",
    "500",
    "600",
    "700",
    "800",
    "900",
    "100italic",
    "200italic",
    "300italic",
    "italic",
    "500italic",
    "600italic",
    "700italic",
    "800italic",
    "900italic",
  ],
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "greek-ext",
    "latin",
    "latin-ext",
    "vietnamese",
  ],
  version: "v20",
  lastModified: "2025-09-10",
  files: {
    "100":
      "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
    "200":
      "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
    "300":
      "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
    "500":
      "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
    "600":
      "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
    "700":
      "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
    "800":
      "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
    "900":
      "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
    regular:
      "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
    "100italic":
      "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTc2dphjZ-Ek-7MeA.ttf",
    "200italic":
      "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTcWdthjZ-Ek-7MeA.ttf",
    "300italic":
      "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTch9thjZ-Ek-7MeA.ttf",
    italic:
      "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTc2dthjZ-Ek-7MeA.ttf",
    "500italic":
      "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTc69thjZ-Ek-7MeA.ttf",
    "600italic":
      "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTcB9xhjZ-Ek-7MeA.ttf",
    "700italic":
      "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTcPtxhjZ-Ek-7MeA.ttf",
    "800italic":
      "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTcWdxhjZ-Ek-7MeA.ttf",
    "900italic":
      "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTccNxhjZ-Ek-7MeA.ttf",
  },
  category: "sans-serif",
  kind: "webfonts#webfont",
  menu: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZlhjQ.ttf",
};

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
  primary_brand_color: "#b5451b", // Terracotta
  secondary_brand_color: "#f5f5f5", // Dark: #262626
  primary_font: InterFont,
  secondary_font: InterFont,
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
  is_scheduled_ordering_enabled: false,
  is_group_ordering_enabled: false,
  is_pos_enabled: false,
  is_reservations_enabled: false,
  is_bill_splitting_enabled: false,
  is_customer_accounts_enabled: true,
  is_rewards_enabled: true,
  is_shop_page_enabled: false,
  is_catering_enabled: true,
};

export const exampleOrgId = "org_3EUnXGKFGGqs8w2mABeVmtTPLog";
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
