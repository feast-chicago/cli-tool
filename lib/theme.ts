import { oklch, parse } from "culori";
import { Theme } from "../schema";
import { formatNumber } from "../utils/math";

interface ThemeVars {
  "--background": string;
  "--foreground": string;
  "--card": string;
  "--card-foreground": string;
  "--popover": string;
  "--popover-foreground": string;
  "--primary": string;
  "--primary-foreground": string;
  "--secondary": string;
  "--secondary-foreground": string;
  "--muted": string;
  "--muted-foreground": string;
  "--accent": string;
  "--accent-foreground": string;
  "--destructive": string;
  "--border": string;
  "--input": string;
  "--ring": string;
  "--chart-1": string;
  "--chart-2": string;
  "--chart-3": string;
  "--chart-4": string;
  "--chart-5": string;
  "--radius"?: string;
  "--sidebar": string;
  "--sidebar-foreground": string;
  "--sidebar-primary": string;
  "--sidebar-primary-foreground": string;
  "--sidebar-accent": string;
  "--sidebar-accent-foreground": string;
  "--sidebar-border": string;
  "--sidebar-ring": string;
}

function toOklchValues(hex: string): string {
  const color = oklch(parse(hex));
  if (!color) throw new Error(`Invalid hex: ${hex}`);
  return `${formatNumber(color.l)} ${formatNumber(color.c)} ${formatNumber(color.h ?? 0)}`;
}

function getForeground(hex: string): string {
  const color = oklch(parse(hex));
  if (!color) throw new Error(`Invalid hex: ${hex}`);
  return color.l > 0.6 ? "0.205 0 0" : "0.985 0 0";
}

function getRadius(radius: Theme["radius"]): string {
  const defaultRem = "0.625rem";
  switch (radius) {
    case "None":
      return "0rem";
    case "Small":
      return "0.45rem";
    case "Default":
      return defaultRem;
    case "Medium":
      return defaultRem;
    case "Large":
      return "0.875rem";
    default:
      return defaultRem;
  }
}

export function createTheme(theme: Theme) {
  // Keep arguments as Hex code values for when users are able to choose these values.
  const lightBase = toOklchValues("#ffffff"); // oklch(1 0 0)
  const lightBaseFg = toOklchValues("#0a0a0a"); // oklch(0.145 0 0)

  const darkBase = toOklchValues("#0a0a0a"); // oklch(0.145 0 0)
  const darkBaseFg = toOklchValues("#fafafa"); // oklch(0.985 0 0)
  const darkCardAndPopover = toOklchValues("#171717"); // oklch(0.205 0 0)

  const primary = toOklchValues(theme.primary_brand_color);
  const primaryFg = getForeground(theme.primary_brand_color);

  const secondary = (isDark: boolean) =>
    theme.secondary_brand_color
      ? theme.secondary_brand_color.toLowerCase() === "#f5f5f5"
        ? isDark
          ? "0.269 0 0"
          : "0.97 0 0"
        : toOklchValues(theme.secondary_brand_color)
      : isDark
        ? "0.269 0 0"
        : "0.97 0 0";
  const secondaryFg = (isDark: boolean) =>
    theme.secondary_brand_color
      ? theme.secondary_brand_color.toLowerCase() === "#f5f5f5"
        ? isDark
          ? "0.985 0 0"
          : "0.205 0 0"
        : getForeground(theme.secondary_brand_color)
      : isDark
        ? "0.985 0 0"
        : "0.205 0 0";

  const lightMutedAndAccent = toOklchValues("#f5f5f5"); // oklch(0.97 0 0)
  const lightMutedAndAccentFg = toOklchValues("#171717"); // oklch(0.205 0 0)

  const darkMutedAndAccent = toOklchValues("#262626"); // oklch(0.269 0 0)
  const darkMutedFg = toOklchValues("#a1a1a1"); // oklch(0.708 0 0)
  const darkAccentFg = darkBaseFg; // oklch(0.985 0 0)

  const lightBorderAndInput = toOklchValues("#e5e5e5"); // oklch(0.922 0 0)
  const darkBorder = "oklch(1 0 0 / 10%)";
  const lightRing = primary || "#a1a1a1"; // oklch(0.708 0 0)
  const darkRing = primary || "#737373"; // oklch(0.556 0 0)

  const radius = getRadius(theme.radius);

  // Chart colors — 5 tints derived from primary
  // TODO: Use uicolors.app to help create logic to make 5 tints.
  const primaryColor = oklch(parse(theme.primary_brand_color))!;
  const chartColors = [0.87, 0.556, 0.439, 0.371, 0.269].map(
    (l) =>
      `oklch(${formatNumber(l)} ${formatNumber(Math.min(primaryColor.c * 0.6, 0.12))} ${formatNumber(primaryColor.h ?? 0)})`,
  );

  const light: ThemeVars = {
    "--background": `oklch(${lightBase})`,
    "--foreground": `oklch(${lightBaseFg})`,
    "--card": `oklch(${lightBase})`,
    "--card-foreground": `oklch(${lightBaseFg})`,
    "--popover": `oklch(${lightBase})`,
    "--popover-foreground": `oklch(${lightBaseFg})`,
    "--primary": `oklch(${primary})`,
    "--primary-foreground": `oklch(${primaryFg})`,
    "--secondary": `oklch(${secondary(false)})`,
    "--secondary-foreground": `oklch(${secondaryFg(false)})`,
    "--muted": `oklch(${lightMutedAndAccent})`,
    "--muted-foreground": "oklch(0.556 0 0)",
    "--accent": `oklch(${lightMutedAndAccent})`,
    "--accent-foreground": `oklch(${lightMutedAndAccentFg})`,
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": `oklch(${lightBorderAndInput})`,
    "--input": `oklch(${lightBorderAndInput})`,
    "--ring": `oklch(${lightRing})`,
    "--chart-1": chartColors[0],
    "--chart-2": chartColors[1],
    "--chart-3": chartColors[2],
    "--chart-4": chartColors[3],
    "--chart-5": chartColors[4],
    "--radius": radius,
    "--sidebar": "oklch(0.985 0 0)",
    "--sidebar-foreground": `oklch(${lightBaseFg})`,
    "--sidebar-primary": `oklch(${primary})`,
    "--sidebar-primary-foreground": `oklch(${primaryFg})`,
    "--sidebar-accent": `oklch(${lightMutedAndAccent})`,
    "--sidebar-accent-foreground": `oklch(${lightMutedAndAccentFg})`,
    "--sidebar-border": `oklch(${lightBorderAndInput})`,
    "--sidebar-ring": `oklch(${lightRing})`,
  };

  const dark: ThemeVars = {
    "--background": `oklch(${darkBase})`,
    "--foreground": `oklch(${darkBaseFg})`,
    "--card": `oklch(${darkCardAndPopover})`,
    "--card-foreground": `oklch(${darkBaseFg})`,
    "--popover": `oklch(${darkCardAndPopover})`,
    "--popover-foreground": `oklch(${darkBaseFg})`,
    "--primary": `oklch(${primary})`,
    "--primary-foreground": `oklch(${primaryFg})`,
    "--secondary": `oklch(${secondary(true)})`,
    "--secondary-foreground": `oklch(${secondaryFg(true)})`,
    "--muted": `oklch(${darkMutedAndAccent})`,
    "--muted-foreground": `oklch(${darkMutedFg})`,
    "--accent": `oklch(${darkMutedAndAccent})`,
    "--accent-foreground": `oklch(${darkAccentFg})`,
    "--destructive": "oklch(0.704 0.191 22.216)",
    "--border": darkBorder,
    "--input": "oklch(1 0 0 / 15%)",
    "--ring": `oklch(${darkRing})`,
    "--chart-1": chartColors[0],
    "--chart-2": chartColors[1],
    "--chart-3": chartColors[2],
    "--chart-4": chartColors[3],
    "--chart-5": chartColors[4],
    "--sidebar": `oklch(${darkCardAndPopover})`,
    "--sidebar-foreground": `oklch(${darkAccentFg})`,
    "--sidebar-primary": `oklch(${primary})`,
    "--sidebar-primary-foreground": `oklch(${primaryFg})`,
    "--sidebar-accent": `oklch(${darkMutedAndAccent})`,
    "--sidebar-accent-foreground": `oklch(${darkAccentFg})`,
    "--sidebar-border": darkBorder,
    "--sidebar-ring": `oklch(${darkRing})`,
  };

  return {
    light,
    dark,
    primaryFont: theme.primary_font,
    secondaryFont: theme.secondary_font,
  };
}

export function generateCssVariables(
  createdTheme: ReturnType<typeof createTheme>,
): string {
  const toVars = (vars: ThemeVars) =>
    Object.entries(vars)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n");

  const fontCss = `\n  --font-primary: "${createdTheme.primaryFont}";\n  --font-secondary: "${createdTheme.secondaryFont}";\n}`;
  const lightVars = `:root {\n${toVars(createdTheme.light)}${fontCss}`;
  const darkVars = `.dark {\n${toVars(createdTheme.dark)}${fontCss}`;

  // Replace default CSS with custom light and dark theme
  return `${lightVars}\n\n${darkVars}`.trim();
}
