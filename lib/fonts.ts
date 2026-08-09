import "@dotenvx/dotenvx/config";
import { GoogleFont } from "../schema";

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
  return new Map(json.items.map((font) => [font.family, JSON.stringify(font)]));
}
