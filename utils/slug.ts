export function createSlug(text: string): string {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/['’]/g, "") // Remove straight and curly apostrophes
    .trim() // Remove leading/trailing whitespace
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric clusters with one hyphen
    .replace(/^-+|-+$/g, ""); // Remove hyphens from the start or end
}
