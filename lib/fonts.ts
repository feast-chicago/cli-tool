import fs from "fs-extra";
import { join } from "path";

interface GoogleFont {
  family: string;
  category: string;
}

interface GoogleFontsResponse {
  items: GoogleFont[];
}

export async function fetchGoogleFonts(): Promise<Map<string, string>> {
  const apiKey = process.env.GOOGLE_WEB_FONTS_API_KEY;
  if (!apiKey) throw new Error("Missing GOOGLE_WEB_FONTS_API_KEY in .env");

  const res = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`,
  );

  if (!res.ok) throw new Error("Failed to fetch Google Web Fonts.");

  const json = (await res.json()) as GoogleFontsResponse;

  // Return a map with the font name and Next.js import name.
  return new Map(
    json.items.map((font) => [font.family, font.family.replace(/\s+/g, "_")]),
  );
}

export async function writeFonts(
  rootPath: string,
  primaryFont: string,
  secondaryFont: string | null,
  fontMap: Map<string, string>,
) {
  const primaryNextFont = fontMap.get(primaryFont) ?? "Inter";
  const secondaryNextFont = secondaryFont
    ? (fontMap.get(secondaryFont) ?? "Inter")
    : "Inter";
  const content = `import { ${[...new Set([primaryNextFont, secondaryNextFont])].sort().join(", ")} } from "next/font/google";

export const primaryFont = ${primaryNextFont}({
  subsets: ["latin"],
  variable: "--font-primary",
});

export const secondaryFont = ${secondaryNextFont}({
  subsets: ["latin"],
  variable: "--font-secondary",
});`;

  await fs.writeFile(join(rootPath, "lib", "fonts.ts"), content);
}
