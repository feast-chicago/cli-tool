import * as fs from "fs";
import { join } from "path";

function getFileContentsWithoutImports(filePath: string): string {
  // 1. Read the raw file text
  const fileContent = fs.readFileSync(filePath, "utf8");

  // 2. Regex to match 'import ... from ...;' or multiline 'import {\n...\n} from ...;'
  // It looks for "import", grabs everything until "from '...'", and clears through the semicolon.
  const importRegex = /import\s+[\s\S]*?from\s+['"].*?['"];?\r?\n?/g;

  // 3. Replace all matching import blocks with empty strings and clean up leading whitespace
  return fileContent.replace(importRegex, "").trimStart();
}

export function buildUtils(): string {
  const formatNumberText = getFileContentsWithoutImports(
    join(process.cwd(), "utils", "math.ts"),
  );

  const codeText = getFileContentsWithoutImports(
    join(process.cwd(), "lib", "theme.ts"),
  );

  return `${[
    'import { Theme } from "@/schema";',
    'import { clsx, type ClassValue } from "clsx";',
    'import { oklch, parse } from "culori";',
    'import { twMerge } from "tailwind-merge";',
    "",
    `export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
    formatNumberText,
    codeText,
  ]
    .join("\n")
    .trim()}
`;
}
