import { SOCIAL_PLATFORMS, SocialPlatform } from "../schema";

export function toProperCase(text: string) {
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

export function buildSocialUrl(
  platform: SocialPlatform,
  handle: string,
): string {
  const trimmedInput = handle.trim();
  if (!trimmedInput) return "";
  if (/^https?:\/\//i.test(trimmedInput)) return trimmedInput;
  const { baseUrl } = SOCIAL_PLATFORMS[platform];
  if (platform === "whatsapp")
    return `${baseUrl}${trimmedInput.replace(/\D/g, "")}`;
  return `${baseUrl}${trimmedInput.replace(/^@/, "")}`;
}
