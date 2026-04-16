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
});

export const ClerkProvisionSchema = z.object({
  first_name: AdminSchema.shape.first_name,
  last_name: AdminSchema.shape.last_name,
  phone: AdminSchema.shape.phone,
  email: AdminSchema.shape.email,
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
  business_address: AddressSchema,
  billing_address: AddressSchema,
  theme: ThemeSchema,
  admin: AdminSchema,
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

export type FeastConfig = z.infer<typeof ConfigSchema>;
export type Answers = z.infer<typeof AnswersSchema>;
export type SupabaseBusiness = z.infer<typeof SupabaseBusinessSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
