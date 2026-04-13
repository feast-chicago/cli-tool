import z from "zod";

export const AnswersSchema = z.object({
  // Business identity
  name: z.string().min(1),
  tagline: z.string().min(1).nullable(),
  description: z.string().min(1).nullable(),
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
  // Business address
  business_address_line_1: z.string().min(1),
  business_address_line_2: z.string().min(1).nullable(),
  business_address_city: z.string().min(1),
  business_address_state: z.string().min(1),
  business_address_zip: z.string().min(1),
  business_address_country: z.string().min(1),
  // Billing address
  billing_address_line_1: z.string().min(1),
  billing_address_line_2: z.string().min(1).nullable(),
  billing_address_city: z.string().min(1),
  billing_address_state: z.string().min(1),
  billing_address_zip: z.string().min(1),
  billing_address_country: z.string().min(1),
  // Theme
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
    .min(4)
    .nullable(),
  accent_brand_color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .min(4)
    .nullable(),
  background_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  primary_font: z.string().min(1),
  secondary_font: z.string().min(1).nullable(),
  radius: z.enum(["Default", "None", "Small", "Medium", "Large"]),
  is_dark_mode_enabled: z.boolean(),
  // Admin identity — needed in Clerk and Supabase(?)
  admin_first_name: z.string().min(1),
  admin_last_name: z.string().min(1),
  admin_phone: z.string().min(1),
  admin_email: z.email(),
});

export const ClerkProvisionSchema = z.object({
  first_name: AnswersSchema.shape.admin_first_name,
  last_name: AnswersSchema.shape.admin_last_name,
  phone: AnswersSchema.shape.admin_phone,
  email: AnswersSchema.shape.admin_email,
  businesses: z.array(z.string()).min(1),
});

export const SupabaseBusinessSchema = z.object({
  // info
  id: z.string().min(1),
  name: AnswersSchema.shape.name,
  tagline: AnswersSchema.shape.tagline,
  description: AnswersSchema.shape.description,
  phone: AnswersSchema.shape.phone,
  email: AnswersSchema.shape.email,
  category: AnswersSchema.shape.category,
  location_type: AnswersSchema.shape.location_type,
  business_address_line_1: AnswersSchema.shape.business_address_line_1,
  business_address_line_2: AnswersSchema.shape.business_address_line_2,
  business_address_city: AnswersSchema.shape.business_address_city,
  business_address_state: AnswersSchema.shape.business_address_state,
  business_address_zip: AnswersSchema.shape.business_address_zip,
  business_address_country: AnswersSchema.shape.business_address_country,
  billing_address_line_1: AnswersSchema.shape.billing_address_line_1,
  billing_address_line_2: AnswersSchema.shape.billing_address_line_2,
  billing_address_city: AnswersSchema.shape.billing_address_city,
  billing_address_state: AnswersSchema.shape.billing_address_state,
  billing_address_zip: AnswersSchema.shape.billing_address_zip,
  billing_address_country: AnswersSchema.shape.billing_address_country,
  // theme
  platform_theme: AnswersSchema.shape.platform_theme,
  primary_brand_color: AnswersSchema.shape.primary_brand_color,
  secondary_brand_color: AnswersSchema.shape.secondary_brand_color,
  accent_brand_color: AnswersSchema.shape.accent_brand_color,
  background_color: AnswersSchema.shape.background_color,
  primary_font: AnswersSchema.shape.primary_font,
  secondary_font: AnswersSchema.shape.secondary_font,
  radius: AnswersSchema.shape.radius,
  is_dark_mode_enabled: AnswersSchema.shape.is_dark_mode_enabled,
  // admin
  admin_first_name: AnswersSchema.shape.admin_first_name,
  admin_last_name: AnswersSchema.shape.admin_last_name,
  admin_phone: AnswersSchema.shape.admin_phone,
  admin_email: AnswersSchema.shape.admin_email,
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
  created_at: z.date(),
  updated_at: z.date(),
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

export const ThemeSchema = z.object({
  platform_theme: AnswersSchema.shape.platform_theme,
  primary_brand_color: AnswersSchema.shape.primary_brand_color,
  secondary_brand_color: AnswersSchema.shape.secondary_brand_color,
  accent_brand_color: AnswersSchema.shape.accent_brand_color,
  background_color: AnswersSchema.shape.background_color,
  primary_font: AnswersSchema.shape.primary_font,
  secondary_font: AnswersSchema.shape.secondary_font,
  radius: AnswersSchema.shape.radius,
  is_dark_mode_enabled: AnswersSchema.shape.is_dark_mode_enabled,
});

export type FeastConfig = z.infer<typeof ConfigSchema>;
export type Answers = z.infer<typeof AnswersSchema>;
export type SupabaseBusiness = z.infer<typeof SupabaseBusinessSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
