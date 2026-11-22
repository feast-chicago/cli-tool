import { SOCIAL_PLATFORMS, SocialPlatform } from "../schema";

export function toProperCase(text: string | null) {
  if (!text) return "";

  const arr = text.split(" ");
  const result: string[] = [];

  for (const word of arr) {
    const firstLetter = word[0];
    const restOfWord = word.slice(1);
    const properWord = `${firstLetter.toUpperCase()}${restOfWord}`;
    result.push(properWord);
  }

  return result.join(" ");
}

export function buildSocialUrl(platform: SocialPlatform, raw: string): string {
  const value = raw.trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value; // full URLs still pass through
  return `${SOCIAL_PLATFORMS[platform].baseUrl}${value.replace(/^@/, "")}`;
}
