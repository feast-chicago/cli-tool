import z from "zod";

const AddressSchema = z.object({
  line_1: z.string().min(1),
  line_2: z.string().nullable(),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1),
});

const AdminSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone: z.string().min(1),
  email: z.email(),
});

const SettingsSchema = z.object({
  is_menu_page_enabled: z.boolean(),
  is_online_ordering_enabled: z.boolean(),
  is_pos_enabled: z.boolean(),
  is_reservations_enabled: z.boolean(),
  is_rewards_enabled: z.boolean(),
  is_shop_page_enabled: z.boolean(),
});

const ThemeSchema = z.object({
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
  primary_brand_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondary_brand_color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .nullable(),
  accent_brand_color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .nullable(),
  background_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  primary_font: z.string().min(1),
  secondary_font: z.string().nullable(),
  radius: z.enum(["Default", "None", "Small", "Medium", "Large"]),
  is_dark_mode_enabled: z.boolean(),
});

export const AnswersSchema = z.object({
  // Business identity
  name: z.string().min(1),
  tagline: z.string().nullable(),
  description: z.string().nullable(),
  phone: z.string().min(1),
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
  business_address: AddressSchema,
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

export const BusinessSchema = AnswersSchema.extend({
  // info
  id: z.string().min(1),
  created_at: z.date(),
  updated_at: z.date(),
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

export type Address = z.infer<typeof AddressSchema>;
export type Admin = z.infer<typeof AdminSchema>;
export type Answers = z.infer<typeof AnswersSchema>;
export type Business = z.infer<typeof BusinessSchema>;
export type FeastConfig = z.infer<typeof ConfigSchema>;
export type Settings = z.infer<typeof SettingsSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
