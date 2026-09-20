import z from "zod";

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
  primary_color: HexColorSchema,
  primary_color_foreground: HexColorSchema,
  secondary_color: HexColorSchema.nullable(),
  secondary_color_foreground: HexColorSchema.nullable(),
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
  slug: z.string().min(1),
  site_urls: z.array(z.string()),
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

// ——————————————— LAYOUT COMPONENTS ———————————————

const AlignmentSchema = z.enum(["left", "center", "right", "justify"]);
const FormatSchema = z.array(
  z.enum(["bold", "italic", "underline", "strikethrough"]),
);

export const BorderSchema = z.object({
  width: z.number(),
  color: z.string(),
  style: z.enum(["Solid", "Dashed", "Dotted"]),
});

const ButtonPropsSchema = z.object({
  label: z.string().min(1),
  href: z.string().nullable(),
  openInNewTab: z.boolean().default(true).nullable(),
  action: z.function().nullable(),
  variant: z
    .enum(["default", "outline", "secondary", "ghost", "destructive", "link"])
    .default("default"),
});

const DividerPropsSchema = z.object({
  style: z.enum(["line", "dots", "blank"]).default("line"),
  spacing: z.enum(["sm", "md", "lg"]).default("md"),
});

const HoursPropsSchema = z.object({
  heading: z.string().default("Hours"),
  showMap: z.boolean().default(true),
  showPhone: z.boolean().default(true),
  showEmail: z.boolean().default(false),
  layout: z.enum(["vertical", "horizontal"]).default("vertical"),
});

const ImagePropsSchema = z.object({
  url: z.url().nullable(),
  alt: z.string().default(""),
  fit: z.enum(["cover", "contain"]).default("cover"),
  caption: z.string().nullable(),
  maxWidth: z.enum(["sm", "md", "lg", "full"]).default("full"),
});

const LinkPropsSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  openInNewTab: z.boolean().default(false),
});

const LogoPropsSchema = z.object({
  type: z.enum(["square", "header"]),
  maxWidth: z.enum(["sm", "md", "lg", "full"]).default("full"),
});

const MapPropsSchema = z.object({
  heading: z.string().default("Find us"),
  height: z.enum(["sm", "md", "lg"]).default("md"),
  // lat/lng pulled from business address in Supabase at runtime
});

const MarginSchema = z.object({
  top: z.number(),
  bottom: z.number(),
  left: z.number(),
  right: z.number(),
});

const PaddingSchema = z.object({
  top: z.number(),
  bottom: z.number(),
  left: z.number(),
  right: z.number(),
});

const ReviewsPropsSchema = z.object({
  heading: z.string().default("Reviews"),
  displayStyle: z.enum(["grid", "list", "carousel"]).default("grid"),
});

const SocialMediaHandlePropsSchema = z.object({
  platform: z.enum(["Facebook", "Google", "Instagram", "X", "Yelp"]).nullable(),
  username: z.string().nullable(),
});

const TextPropsSchema = z.object({
  alignment: AlignmentSchema,
  backgroundColor: HexColorSchema,
  body: z.string(),
  border: BorderSchema,
  color: HexColorSchema,
  format: FormatSchema,
  margin: MarginSchema,
  padding: PaddingSchema,
});

export type ButtonProps = z.infer<typeof ButtonPropsSchema>;
export type DividerProps = z.infer<typeof DividerPropsSchema>;
export type HoursProps = z.infer<typeof HoursPropsSchema>;
export type ImageProps = z.infer<typeof ImagePropsSchema>;
export type LinkProps = z.infer<typeof LinkPropsSchema>;
export type LogoProps = z.infer<typeof LogoPropsSchema>;
export type MapProps = z.infer<typeof MapPropsSchema>;
export type SocialMediaHandleProps = z.infer<
  typeof SocialMediaHandlePropsSchema
>;
export type TextProps = z.infer<typeof TextPropsSchema>;
export type ReviewsProps = z.infer<typeof ReviewsPropsSchema>;

// ——————————————————————————————————————————————————

export const PageComponentSchema = z.object({
  id: z.string(),
  type: z.enum([
    "button",
    "divider",
    "header",
    "hours",
    "image",
    "link",
    "logo",
    "map",
    "reviews",
    "social",
    "text",
  ]),
  props: z.record(z.string(), z.unknown()).optional(), // Component-specific config
  isVisible: z.boolean().default(true),
});
// Default props for each component type, used when adding a new component.
const defaultButtonProps: ButtonProps = {
  label: "Button",
  href: null,
  openInNewTab: null,
  action: null,
  variant: "default",
};
const defaultDividerProps: DividerProps = { style: "line", spacing: "md" };
const defaultHeaderProps: TextProps = {
  alignment: "left",
  backgroundColor: "",
  body: "Header",
  border: {
    width: 0,
    color: "#000000",
    style: "Solid",
  },
  color: "#000000",
  format: [],
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
  padding: { top: 10, bottom: 10, left: 20, right: 20 },
};
const defaultHoursProps: HoursProps = {
  heading: "Hours",
  showMap: false,
  showPhone: false,
  showEmail: false,
  layout: "vertical",
};
const defaultImageProps: ImageProps = {
  url: null,
  alt: "Image",
  fit: "contain",
  caption: null,
  maxWidth: "full",
};
const defaultLinkProps: LinkProps = {
  label: "Link",
  href: "/",
  openInNewTab: false,
};
const defaultLogoProps: LogoProps = { type: "square", maxWidth: "md" };
const defaultMapProps: MapProps = { heading: "Our Location", height: "md" };
const defaultSocialMediaHandleProps: SocialMediaHandleProps = {
  platform: null,
  username: null,
};
const defaultTextProps: TextProps = {
  alignment: "left",
  backgroundColor: "",
  body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
  border: {
    width: 0,
    color: "#000000",
    style: "Solid",
  },
  color: "#000000",
  format: [],
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
  padding: { top: 10, bottom: 10, left: 20, right: 20 },
};
const defaultReviewsProps: ReviewsProps = {
  heading: "Reviews",
  displayStyle: "grid",
};

export const DEFAULT_PROPS: Record<PageComponent["type"], unknown> = {
  button: defaultButtonProps,
  divider: defaultDividerProps,
  header: defaultHeaderProps,
  hours: defaultHoursProps,
  image: defaultImageProps,
  link: defaultLinkProps,
  logo: defaultLogoProps,
  map: defaultMapProps,
  reviews: defaultReviewsProps,
  text: defaultTextProps,
  social: defaultSocialMediaHandleProps,
};

export const PAGE_KEYS = [
  "home",
  "about",
  "menu",
  "shop",
  "gallery",
  "catering",
] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

export const PageLayoutSchema = z.array(PageComponentSchema);
export const SiteLayoutSchema = z.object({
  home: PageLayoutSchema.default([]),
  about: PageLayoutSchema.default([]),
  menu: PageLayoutSchema.default([]),
  shop: PageLayoutSchema.default([]),
  gallery: PageLayoutSchema.default([]),
  catering: PageLayoutSchema.default([]),
});

export type PageComponent = z.infer<typeof PageComponentSchema>;
export type PageLayout = z.infer<typeof PageLayoutSchema>;
export type SiteLayout = z.infer<typeof SiteLayoutSchema>;

export const BusinessSchema = AnswersSchema.extend({
  // info
  id: z.string().min(1),
  created_at: z.date(),
  updated_at: z.date(),
  layout: SiteLayoutSchema,
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

export type Settings = z.infer<typeof SettingsSchema>;
export type Theme = z.infer<typeof ThemeSchema>;

export interface StorageItem {
  id: string;
  path: string;
  fullPath: string;
}
