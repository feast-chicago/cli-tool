// types/feast.d.ts
export interface FeastConfig {
  business: {
    name: string;
    tagline: string | null;
    category: (
      | "restaurant"
      | "cafe"
      | "bar"
      | "bakery"
      | "food truck"
      | "other"
    )[];
    supabaseId: string | null;
  };
  theme: {
    primary: string;
    accent: string;
    font: string;
    radius: "sharp" | "soft" | "round";
    darkMode: boolean;
  };
  hours: {
    mon: [number, number][] | null;
    tue: [number, number][] | null;
    wed: [number, number][] | null;
    thu: [number, number][] | null;
    fri: [number, number][] | null;
    sat: [number, number][] | null;
    sun: [number, number][] | null;
    note?: string;
    isOpen: boolean;
  };
  features: {
    hasMenu: boolean;
    hasOnlineOrders: boolean;
    hasTestimonials: boolean;
    hasGoogleMap: boolean;
  };
  integrations: {
    analyticsId: string | null;
    facebookUsername: string | null;
    instagramUsername: string | null;
    tiktokUsername: string | null;
    xUsername: string | null;
  };
  meta: {
    seoDescription: string;
    keywords: string[];
  };
}
