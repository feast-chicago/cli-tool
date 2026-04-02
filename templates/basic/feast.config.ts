import { FeastConfig } from "./types/feast";

const config: FeastConfig = {
  business: {
    name: "Business Name",
    tagline: "Your tagline here",
    category: ["restaurant"],
    supabaseId: "example",
  },
  theme: {
    primary: "#000000",
    accent: "#F5F5F5",
    font: "inter",
    radius: "soft",
    darkMode: false,
  },
  hours: {
    mon: [[900, 1700]],
    tue: [[900, 1700]],
    wed: [[900, 1700]],
    thu: [[900, 1700]],
    fri: [[900, 1700]],
    sat: null,
    sun: null,
    isOpen: true,
  },
  features: {
    hasMenu: true,
    hasOnlineOrders: true,
    hasTestimonials: true,
  },
  integrations: {
    analyticsId: null,
    facebookUsername: null,
    instagramUsername: null,
    tiktokUsername: null,
    xUsername: null,
  },
  meta: {
    seoDescription: "",
    keywords: [],
  },
};

export default config;
