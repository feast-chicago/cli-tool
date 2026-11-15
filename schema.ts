import { IconType } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaThreads,
  FaTiktok,
  FaXTwitter,
  FaYelp,
  FaYoutube,
} from "react-icons/fa6";
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

// COMPONENT SCHEMAS
export const AlignmentSchema = z.enum(["left", "center", "right", "justify"]);
export const BorderSchema = z.object({
  width: z.number().int(),
  color: z.string(),
  style: z.enum(["Solid", "Dashed", "Dotted"]),
});
export const HeadingLevelSchema = z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]);
const LinkTypeSchema = z.enum([
  "site_page",
  "external_link",
  "email",
  "phone",
  "document",
]);
const LinkSchema = z
  .object({
    type: LinkTypeSchema,
    value: z.string().nullable(),
  })
  .nullable();
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
const SizeSchema = z.enum(["default", "extra small", "small", "large"]);
export const TextFormatSchema = z.array(
  z.enum(["bold", "italic", "underline", "strikethrough"]),
);
const VariantSchema = z.enum([
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
]);

const BasePropsSchema = z.object({
  alignment: AlignmentSchema,
  backgroundColor: HexColorSchema,
  border: BorderSchema,
  margin: MarginSchema,
  padding: PaddingSchema,
});
export const ButtonSchema = BasePropsSchema.extend({
  // color: HexColorSchema,
  textFormat: TextFormatSchema,
  isFullWidth: z.boolean(),
  label: z.string(),
  link: LinkSchema,
  size: SizeSchema,
  variant: VariantSchema,
});
export const DividerSchema = BasePropsSchema.extend({
  color: HexColorSchema,
  style: z.enum(["solid", "dashed", "dotted", "double", "ellipsis", "blank"]),
  thickness: z.number().int(),
});
const ImageSchema = BasePropsSchema.extend({
  alt: z.string().default(""),
  size: z.number(),
  isFullWidthOnMobile: z.boolean(),
  imageUrl: z.url().nullable(),
  link: LinkSchema,
  fit: z.enum(["cover", "contain"]),
  caption: z.string().nullable(),
  showCaption: z.boolean(),
});
const MapSchema = BasePropsSchema.extend({
  heading: z.string().nullable(),
  addressIndex: z.number().int().min(0), // multi-unit: which address
  zoom: z.number().int().min(1).max(21),
  height: z.number().int().min(150).max(700),
  mapType: z.enum(["default", "satellite"]),
  showAddress: z.boolean(),
  details: z.string().nullable(), // parking, drive-thru, etc.
  showGoogleMapsButton: z.boolean(),
  showAppleMapsButton: z.boolean(),
  buttonVariant: VariantSchema,
});
export const SocialPlatformSchema = z.enum([
  "facebook",
  "instagram",
  "tiktok",
  "x",
  "youtube",
  "yelp",
  "linkedin",
  "threads",
]);
const SocialLinkSchema = z.object({
  id: z.string(),
  platform: SocialPlatformSchema,
  value: z.string(), // Handle
});
export const SocialSchema = BasePropsSchema.extend({
  links: z.array(SocialLinkSchema),
  variant: z.enum(["brand", ...VariantSchema.options]),
  display: z.enum(["icon", "text", "icon & text"]),
  shape: z.enum(["rounded", "pill", "square"]),
  size: SizeSchema,
  layout: z.enum(["row", "column"]),
  gap: z.number().int().min(0).max(50),
});
const TextSchema = BasePropsSchema.extend({
  body: z.string(),
  color: HexColorSchema,
  textFormat: TextFormatSchema,
});
const HeaderSchema = TextSchema.extend({
  level: HeadingLevelSchema,
});

export type Alignment = z.infer<typeof AlignmentSchema>;
export type BaseProps = z.infer<typeof BasePropsSchema>;
export type Border = z.infer<typeof BorderSchema>;
export type Button = z.infer<typeof ButtonSchema>;
export type Divider = z.infer<typeof DividerSchema>;
export type Header = z.infer<typeof HeaderSchema>;
export type Image = z.infer<typeof ImageSchema>;
export type Link = z.infer<typeof LinkSchema>;
export type LinkType = z.infer<typeof LinkTypeSchema>;
export type Map = z.infer<typeof MapSchema>;
export type Social = z.infer<typeof SocialSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type SocialPlatform = z.infer<typeof SocialPlatformSchema>;
export type Spacing = z.infer<typeof MarginSchema>; // PaddingSchema could also be used.
export type Text = z.infer<typeof TextSchema>;
export type TextFormat = z.infer<typeof TextFormatSchema>;

// DEFAULT COMPONENT PROPS — Used when adding a new component
const defaultBaseProps: BaseProps = {
  alignment: "left",
  backgroundColor: "",
  border: { width: 0, color: "#000000", style: "Solid" },
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
  padding: { top: 10, bottom: 10, left: 20, right: 20 },
};
const defaultButton: Button = {
  ...defaultBaseProps,
  alignment: "center",
  // color: "#ffffff",
  textFormat: [],
  isFullWidth: false,
  label: "Button",
  link: null,
  size: "default",
  variant: "default",
};
const defaultDivider: Divider = {
  ...defaultBaseProps,
  alignment: "center",
  color: "#000000",
  style: "solid",
  thickness: 1,
};
const defaultImage: Image = {
  ...defaultBaseProps,
  alignment: "center",
  alt: "Image",
  size: 20,
  isFullWidthOnMobile: false,
  imageUrl: null,
  link: null,
  fit: "contain",
  caption: null,
  showCaption: false,
};
const defaultMap: Map = {
  ...defaultBaseProps,
  alignment: "center",
  heading: "Our Location",
  addressIndex: 0,
  zoom: 1,
  height: 150,
  mapType: "default",
  showAddress: false,
  details: null, // parking, drive-thru, etc.
  showGoogleMapsButton: true,
  showAppleMapsButton: true,
  buttonVariant: "default",
};
const defaultSocial: Social = {
  ...defaultBaseProps,
  alignment: "center",
  links: [],
  variant: "brand",
  display: "icon",
  shape: "pill",
  size: "default",
  layout: "row",
  gap: 10,
};
const defaultText: Text = {
  ...defaultBaseProps,
  body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
  color: "#000000",
  textFormat: [],
};
const defaultHeaderProps: Header = {
  ...defaultText,
  body: "Header",
  level: "h1",
};

export const DEFAULT_PROPS: Record<PageComponent["type"], unknown> = {
  button: defaultButton,
  divider: defaultDivider,
  header: defaultHeaderProps,
  image: defaultImage,
  map: defaultMap,
  text: defaultText,
  social: defaultSocial,
};

// SITE AND PAGE SCHEMAS
export const PAGE_KEYS = [
  "home",
  "about",
  "menu",
  "shop",
  "gallery",
  "catering",
] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

export const PageComponentSchema = z.object({
  id: z.string(),
  type: z.enum([
    "button",
    "divider",
    "header",
    "image",
    "map",
    "social",
    "text",
  ]),
  props: z.record(z.string(), z.unknown()).optional(), // Component-specific config
  isVisible: z.boolean().default(true),
});
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
  // TODO: Add more fields, including but not limited to Stripe, Apple Maps, Google, etc.
});

export const MenuItemSchema = z.object({
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

// SOCIAL PLATFORMS
export const SOCIAL_PLATFORMS: Record<
  SocialPlatform,
  {
    label: string;
    Icon: IconType;
    brandColor: string;
    baseUrl: string;
    placeholder: string;
  }
> = {
  facebook: {
    label: "Facebook",
    Icon: FaFacebook,
    brandColor: "#1877F2",
    baseUrl: "https://facebook.com/",
    placeholder: "yourpage",
  },
  instagram: {
    label: "Instagram",
    Icon: FaInstagram,
    brandColor: "#E4405F",
    baseUrl: "https://instagram.com/",
    placeholder: "@yourhandle",
  },
  tiktok: {
    label: "TikTok",
    Icon: FaTiktok,
    brandColor: "#000000",
    baseUrl: "https://tiktok.com/@",
    placeholder: "@yourhandle",
  },
  x: {
    label: "X",
    Icon: FaXTwitter,
    brandColor: "#000000",
    baseUrl: "https://x.com/",
    placeholder: "@yourhandle",
  },
  youtube: {
    label: "YouTube",
    Icon: FaYoutube,
    brandColor: "#FF0000",
    baseUrl: "https://youtube.com/@",
    placeholder: "@yourchannel",
  },
  yelp: {
    label: "Yelp",
    Icon: FaYelp,
    brandColor: "#D32323",
    baseUrl: "https://yelp.com/biz/",
    placeholder: "business-slug or full URL",
  },
  linkedin: {
    label: "LinkedIn",
    Icon: FaLinkedin,
    brandColor: "#0A66C2",
    baseUrl: "https://linkedin.com/company/",
    placeholder: "company-name or full URL",
  },
  threads: {
    label: "Threads",
    Icon: FaThreads,
    brandColor: "#000000",
    baseUrl: "https://threads.net/@",
    placeholder: "@yourhandle or full URL",
  },
};
