// tailwind.config.ts
import type { Config } from "tailwindcss";
import { FeastConfig } from "./schema";

const feast = require("./feast.config") as FeastConfig;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        none: "0",
        default: feast.theme.radius === "Default" ? "0.5rem" : "0",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: feast.theme.primary_brand_color,
        secondary: feast.theme.secondary_brand_color,
        accent: feast.theme.accent_brand_color,
      },
      fontFamily: {
        sans: [feast.theme.primary_font, "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
