// tailwind.config.ts
import type { Config } from "tailwindcss";
import type { FeastConfig } from "./types/feast";

const feast = require("./feast.config") as FeastConfig;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: feast.theme.primary,
        accent: feast.theme.accent,
      },
      fontFamily: {
        sans: [feast.theme.font, "sans-serif"],
      },
      borderRadius: {
        DEFAULT:
          feast.theme.radius === "sharp"
            ? "0px"
            : feast.theme.radius === "soft"
              ? "8px"
              : "16px",
      },
    },
  },
  plugins: [],
};

export default config;
