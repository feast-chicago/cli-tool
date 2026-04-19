import pkg from "enquirer";
import { AnswersSchema, Settings } from "../../schema";
import { fetchGoogleFonts } from "../fonts";
import { exmampleAnswers } from "../../exampleData";

export async function gatherAnswers() {
  const { prompt } = pkg;

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

  const {
    name,
    tagline,
    description,
    phone,
    email,
    business_address,
    billing_address,
    theme,
    admin,
  } = exmampleAnswers;
  const { line_1, line_2, city, zip_code, country } = business_address;
  const {
    primary_brand_color,
    secondary_brand_color,
    accent_brand_color,
    background_color,
  } = theme;
  const { first_name, last_name } = admin;

  const businessIdentityAnswers = await prompt([
    {
      type: "input",
      name: "name",
      message: "Business name?",
      initial: name,
    },
    {
      type: "input",
      name: "tagline",
      message: "Short tagline?",
      initial: tagline,
    },
    {
      type: "input",
      name: "description",
      message: "Description?",
      initial: description,
    },
    {
      type: "input",
      name: "phone",
      message: "Business phone?",
      initial: phone,
    },
    {
      type: "input",
      name: "email",
      message: "Business email?",
      initial: email,
    },
    {
      type: "select",
      name: "category",
      message: "Business category?",
      choices: ["Restaurant", "Cafe", "Bar", "Bakery", "Food truck", "Other"],
    },
    {
      type: "select",
      name: "location_type",
      message: "Location type?",
      choices: ["brick-and-mortar", "mobile", "hybrid", "multi-unit"],
    },
  ]);

  const businessAddressAnswers = (await prompt([
    {
      type: "input",
      name: "line_1",
      message: "Business address line 1?",
      initial: line_1,
    },
    {
      type: "input",
      name: "line_2",
      message: "Business address line 2?",
      initial: line_2,
    },
    {
      type: "input",
      name: "city",
      message: "Business address city?",
      initial: city,
    },
    {
      type: "select",
      name: "state",
      message: "Business address state?",
      choices: [
        "IL",
        // "IN",
      ],
    },
    {
      type: "input",
      name: "zip_code",
      message: "Business address zip code?",
      initial: zip_code,
    },
    {
      type: "input",
      name: "country",
      message: "Business address country?",
      initial: country,
    },
  ])) as {
    line_1: string;
    line_2: string | null;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };

  const { is_billing_same_as_business } = (await prompt([
    {
      type: "select",
      name: "is_billing_same_as_business",
      message: "Is the billing address the same as the business address?",
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
    },
  ])) as { is_billing_same_as_business: boolean };

  const billingAddressAnswers = is_billing_same_as_business
    ? {
        line_1: businessAddressAnswers.line_1,
        line_2: businessAddressAnswers.line_2,
        city: businessAddressAnswers.city,
        state: businessAddressAnswers.state,
        zip_code: businessAddressAnswers.zip_code,
        country: businessAddressAnswers.country,
      }
    : await prompt([
        {
          type: "input",
          name: "line_1",
          message: "Billing address line 1?",
        },
        {
          type: "input",
          name: "line_2",
          message: "Billing address line 2?",
        },
        {
          type: "input",
          name: "city",
          message: "Billing address city?",
        },
        {
          type: "input",
          name: "state",
          message: "Billing address state?",
        },
        {
          type: "input",
          name: "zip_code",
          message: "Billing address zip code?",
        },
        {
          type: "input",
          name: "country",
          message: "Billing address country?",
          initial: "USA",
        },
      ]);

  const themeAnswers = await prompt([
    {
      type: "select",
      name: "platform_theme",
      message: "Platform theme?",
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
      name: "primary_brand_color",
      message: "Primary brand color (hex)?",
      initial: primary_brand_color,
    },
    {
      type: "input",
      name: "secondary_brand_color",
      message: "Secondary brand color (hex)?",
      initial: secondary_brand_color,
    },
    {
      type: "input",
      name: "accent_brand_color",
      message: "Accent brand color (hex)?",
      initial: accent_brand_color,
    },
    {
      type: "input",
      name: "background_color",
      message: "Background color (hex)?",
      initial: background_color,
    },
    {
      type: "autocomplete",
      name: "primary_font",
      message: "Primary brand font?",
      choices: [...fontMap.keys()],
      maxChoices: 10,
    },
    {
      type: "autocomplete",
      name: "secondary_font",
      message: "Secondary brand font?",
      choices: [...fontMap.keys()],
      maxChoices: 10,
    },
    {
      type: "select",
      name: "radius",
      message: "Radius size?",
      choices: ["Default", "None", "Small", "Medium", "Large"],
    },
    {
      type: "confirm",
      name: "is_dark_mode_enabled",
      message: "Enable dark mode?",
      initial: true,
    },
  ]);

  const adminAnswers = await prompt([
    {
      type: "input",
      name: "first_name",
      message: "Admin first name?",
      initial: first_name,
    },
    {
      type: "input",
      name: "last_name",
      message: "Admin last name?",
      initial: last_name,
    },
    {
      type: "input",
      name: "phone",
      message: "Admin phone?",
      initial: admin.phone,
    },
    {
      type: "input",
      name: "email",
      message: "Admin email?",
      initial: admin.email,
    },
  ]);

  const settingsAnswers = await prompt<{ settings: string[] }>([
    {
      type: "multiselect",
      name: "settings",
      message:
        "Select the features you'd like to enable for your platform.\n  Tip: Use arrow keys to scroll and the Space bar to toggle options.\n",
      choices: [
        {
          name: "is_menu_page_enabled",
          message: "Menu page",
          hint: "Showcase your menu to customers.",
        },
        {
          name: "is_online_ordering_enabled",
          message: "Online ordering",
          hint: "Allow customers to order ahead of time.",
        },
        {
          name: "is_pos_enabled",
          message: "POS Integration",
          hint: "Showcase your menu to customers.",
          disabled: "Coming soon!",
        },
        {
          name: "is_reservations_enabled",
          message: "Reservations",
          hint: "Allow customers to reserve a table ahead of time.",
        },
        {
          name: "is_rewards_enabled",
          message: "Rewards Program",
          hint: "Allow customers to earn rewards for their purchases.",
        },
        {
          name: "is_shop_page_enabled",
          message: "Shop page",
          hint: "Showcase your menu to customers.",
        },
      ],
    },
  ]);

  const selectedSettings = settingsAnswers.settings;
  const settings: Settings = {
    is_menu_page_enabled: selectedSettings.includes("is_menu_page_enabled"),
    is_online_ordering_enabled: selectedSettings.includes(
      "is_online_ordering_enabled",
    ),
    is_pos_enabled: selectedSettings.includes("is_pos_enabled"),
    is_reservations_enabled: selectedSettings.includes(
      "is_reservations_enabled",
    ),
    is_rewards_enabled: selectedSettings.includes("is_rewards_enabled"),
    is_shop_page_enabled: selectedSettings.includes("is_shop_page_enabled"),
  };

  const answers = AnswersSchema.parse({
    ...businessIdentityAnswers,
    business_address: { ...businessAddressAnswers },
    billing_address: { ...billingAddressAnswers },
    theme: { ...themeAnswers },
    admin: { ...adminAnswers },
    settings,
  });

  return { answers, fontMap };
}
