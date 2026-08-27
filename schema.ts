import z from "zod";

// Old Address Schema
/* const AddressSchema = z.object({
  line_1: z.string().min(1),
  line_2: z.string().nullable(),
  city: z.string().min(1),
  state: z.string().min(1),
  zip_code: z.string().min(1),
  country: z.string().min(1),
}); */

const AddressSchema = z.object({
  street_number: z.string().min(1),
  street_name: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  state_code: z.string().min(1),
  zip_code: z.string().min(1),
  country: z.string().min(1),
  formatted_address: z.string().min(1),
});

const AdminSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone: z.number().int().positive(),
  email: z.email(),
});

const SettingsSchema = z.object({
  is_menu_page_enabled: z.boolean(),
  is_online_ordering_enabled: z.boolean(),
  is_scheduled_ordering_enabled: z.boolean(),
  is_group_ordering_enabled: z.boolean(),
  is_pos_enabled: z.boolean(),
  is_reservations_enabled: z.boolean(),
  is_bill_splitting_enabled: z.boolean(),
  is_customer_accounts_enabled: z.boolean(),
  is_rewards_enabled: z.boolean(),
  is_shop_page_enabled: z.boolean(),
  is_catering_enabled: z.boolean(),
});

const HexColorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/);

const GoogleFilesSchema = z.object({
  "100": z.string().nullable(),
  "200": z.string().nullable(),
  "300": z.string().nullable(),
  "500": z.string().nullable(),
  "600": z.string().nullable(),
  "700": z.string().nullable(),
  "800": z.string().nullable(),
  "900": z.string().nullable(),
  regular: z.string().nullable(),
  "100italic": z.string().nullable(),
  "200italic": z.string().nullable(),
  "300italic": z.string().nullable(),
  italic: z.string().nullable(),
  "500italic": z.string().nullable(),
  "600italic": z.string().nullable(),
  "700italic": z.string().nullable(),
  "800italic": z.string().nullable(),
  "900italic": z.string().nullable(),
});

const GoogleFontSchema = z.object({
  family: z.string().min(1),
  variants: z.array(z.string().min(1)),
  subsets: z.array(z.string().min(1)),
  version: z.string().min(1),
  lastModified: z.string().min(1),
  files: GoogleFilesSchema,
  category: z.string().min(1),
  kind: z.string().min(1),
  menu: z.string().min(1),
});

export const ThemeSchema = z.object({
  platform_theme: z.enum([
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
  ]),
  primary_logo_url: z.string().nullable(),
  secondary_logo_url: z.string().nullable(),
  primary_brand_color: HexColorSchema,
  secondary_brand_color: HexColorSchema.nullable(),
  primary_font: GoogleFontSchema,
  secondary_font: GoogleFontSchema,
  letter_spacing: z.number(),
  padding: z.number(),
  radius: z.enum(["Default", "None", "Small", "Medium", "Large"]),
  is_dark_mode_enabled: z.boolean(),
});

export const AnswersSchema = z.object({
  // Business identity
  name: z.string().min(1),
  tagline: z.string().nullable(),
  description: z.string().nullable(),
  phone: z.number().int().positive(),
  email: z.email(),
  category: z.enum([
    "Restaurant",
    "Cafe",
    "Bar",
    "Bakery",
    "Food truck",
    "Other",
  ]),
  location_type: z.enum(["brick-and-mortar", "mobile", "hybrid", "multi-unit"]),
  business_address: z.array(AddressSchema),
  billing_address: AddressSchema,
  theme: ThemeSchema,
  admin: AdminSchema,
  settings: SettingsSchema,
});

export const ClerkProvisionSchema = z.object({
  first_name: AdminSchema.shape.first_name,
  last_name: AdminSchema.shape.last_name,
  phone: AdminSchema.shape.phone,
  email: AdminSchema.shape.email,
  businesses: z.array(z.string()).min(1),
});

export const PageComponentSchema = z.object({
  id: z.string(), // unique instance id e.g. "hero-1"
  type: z.enum([
    "hero",
    "menu",
    "hours",
    "gallery",
    "testimonials",
    "cta",
    "map",
    "about",
    "catering",
    "shop",
  ]),
  props: z.record(z.string(), z.unknown()).optional(), // Component-specific config
  visible: z.boolean().default(true),
});

export const LayoutSchema = z.array(PageComponentSchema);

export const BusinessSchema = AnswersSchema.extend({
  // info
  id: z.string().min(1),
  created_at: z.date(),
  updated_at: z.date(),
  layout: LayoutSchema,
  // hours: z.object({
  //   mon: z.array(z.array(z.int())).nullable(),
  //   tue: z.array(z.array(z.int())).nullable(),
  //   wed: z.array(z.array(z.int())).nullable(),
  //   thu: z.array(z.array(z.int())).nullable(),
  //   fri: z.array(z.array(z.int())).nullable(),
  //   sat: z.array(z.array(z.int())).nullable(),
  //   sun: z.array(z.array(z.int())).nullable(),
  //   isBusinessOpen: z.boolean(),
  // }),
  // seo_description: z.string(),
  // keywords: z.array(z.string()),
  // features
  // has_online_orders: z.boolean(),
  // has_public_menu: z.boolean(),
  // has_reservations: z.boolean(),
  // integrations
  // analyticsId: z.string().nullable(),
  // facebookUsername: z.string().nullable(),
  // instagramUsername: z.string().nullable(),
  // tiktokUsername: z.string().nullable(),
  // xUsername: z.string().nullable(),
  // yelpUsername: z.string().nullable(),
  // TODO: Add more fields, including but not limited to Stripe, Apple Maps, Google, etc.
});

export const SupabaseMenuItemSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  priceCents: z.number().int(),
  category: z.string().nullable(),
  imageUrl: z.string().nullable(),
});

export const ConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
});

export const BusinessMetadataSchema = z.object({
  id: z.string(),
  role: z.string(),
});

export type Address = z.infer<typeof AddressSchema>;
export type Admin = z.infer<typeof AdminSchema>;
export type Answers = z.infer<typeof AnswersSchema>;
export type Business = z.infer<typeof BusinessSchema>;
export type BusinessMetadata = z.infer<typeof BusinessMetadataSchema>;
export type FeastConfig = z.infer<typeof ConfigSchema>;
export type GoogleFont = z.infer<typeof GoogleFontSchema>;
export type Layout = z.infer<typeof LayoutSchema>;
export type PageComponent = z.infer<typeof PageComponentSchema>;
export type Settings = z.infer<typeof SettingsSchema>;
export type Theme = z.infer<typeof ThemeSchema>;

export interface StorageItem {
  id: string;
  path: string;
  fullPath: string;
}
