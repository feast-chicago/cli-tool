import pkg from "enquirer";
import { AnswersSchema } from "../../schema";
import ora from "ora";
import { fetchGoogleFonts } from "../fonts";

export async function gatherAnswers() {
  const { prompt } = pkg;

  const businessIdentityAnswers = await prompt([
    { type: "input", name: "name", message: "Business name?" },
    { type: "input", name: "tagline", message: "Short tagline?" },
    { type: "input", name: "description", message: "Description?" },
    { type: "input", name: "phone", message: "Business phone?" },
    { type: "input", name: "email", message: "Business email?" },
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
      name: "business_address_line_1",
      message: "Business address line 1?",
    },
    {
      type: "input",
      name: "business_address_line_2",
      message: "Business address line 2?",
    },
    {
      type: "input",
      name: "business_address_city",
      message: "Business address city?",
      initial: "Chicago",
    },
    {
      type: "select",
      name: "business_address_state",
      message: "Business address state?",
      choices: [
        "IL",
        // "IN",
      ],
    },
    {
      type: "input",
      name: "business_address_zip",
      message: "Business address zip code?",
    },
    {
      type: "input",
      name: "business_address_country",
      message: "Business address country?",
      initial: "USA",
    },
  ])) as {
    business_address_line_1: string;
    business_address_line_2: string | null;
    business_address_city: string;
    business_address_state: string;
    business_address_zip: string;
    business_address_country: string;
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
        billing_address_line_1: businessAddressAnswers.business_address_line_1,
        billing_address_line_2: businessAddressAnswers.business_address_line_2,
        billing_address_city: businessAddressAnswers.business_address_city,
        billing_address_state: businessAddressAnswers.business_address_state,
        billing_address_zip: businessAddressAnswers.business_address_zip,
        billing_address_country:
          businessAddressAnswers.business_address_country,
      }
    : await prompt([
        {
          type: "input",
          name: "billing_address_line_1",
          message: "Billing address line 1?",
        },
        {
          type: "input",
          name: "billing_address_line_2",
          message: "Billing address line 2?",
        },
        {
          type: "input",
          name: "billing_address_city",
          message: "Billing address city?",
        },
        {
          type: "input",
          name: "billing_address_state",
          message: "Billing address state?",
        },
        {
          type: "input",
          name: "billing_address_zip",
          message: "Billing address zip code?",
        },
        {
          type: "input",
          name: "billing_address_country",
          message: "Billing address country?",
          initial: "USA",
        },
      ]);

  const fontSpinner = ora("Fetching Google Web Fonts...").start();
  let fontMap: Map<string, string>;
  try {
    fontMap = await fetchGoogleFonts();
    fontSpinner.succeed("✅ Google Web Fonts successfully loaded");
  } catch {
    fontSpinner.warn(
      "Could not fetch Google Web Fonts. Using defaults instead...",
    );
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
      initial: "#000000",
    },
    {
      type: "input",
      name: "secondary_brand_color",
      message: "Secondary brand color (hex)?",
      initial: "#000000",
    },
    {
      type: "input",
      name: "accent_brand_color",
      message: "Accent brand color (hex)?",
      initial: "#000000",
    },
    {
      type: "input",
      name: "background_color",
      message: "Background color (hex)?",
      initial: "#f5f5f5",
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
    { type: "input", name: "admin_first_name", message: "Admin first name?" },
    { type: "input", name: "admin_last_name", message: "Admin last name?" },
    { type: "input", name: "admin_phone", message: "Admin phone?" },
    { type: "input", name: "admin_email", message: "Admin email?" },
  ]);

  const answers = AnswersSchema.parse({
    ...businessIdentityAnswers,
    ...businessAddressAnswers,
    ...billingAddressAnswers,
    ...themeAnswers,
    ...adminAnswers,
  });

  return { answers, fontMap };
}
