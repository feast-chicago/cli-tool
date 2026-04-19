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
  "--destructive-foreground": string;
  "--border": string;
  "--input": string;
  "--ring": string;
  "--radius": string;
  "--chart-1": string;
  "--chart-2": string;
  "--chart-3": string;
  "--chart-4": string;
  "--chart-5": string;
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
  return color.l > 0.5 ? "0.145 0 0" : "0.985 0 0";
}

function getRadius(radius: Theme["radius"]): string {
  switch (radius) {
    case "None":
      return "0rem";
    case "Small":
      return "0.25rem";
    case "Default":
      return "0.625rem";
    case "Medium":
      return "0.875rem";
    case "Large":
      return "1.25rem";
  }
}

export function createTheme(theme: Theme) {
  const primary = toOklchValues(theme.primary_brand_color);
  const primaryFg = getForeground(theme.primary_brand_color);

  const secondary = theme.secondary_brand_color
    ? toOklchValues(theme.secondary_brand_color)
    : "0.97 0 0";
  const secondaryFg = theme.secondary_brand_color
    ? getForeground(theme.secondary_brand_color)
    : "0.205 0 0";

  const accent = theme.accent_brand_color
    ? toOklchValues(theme.accent_brand_color)
    : "0.97 0 0";
  const accentFg = theme.accent_brand_color
    ? getForeground(theme.accent_brand_color)
    : "0.205 0 0";

  const background = toOklchValues(theme.background_color);
  const backgroundFg = getForeground(theme.background_color);

  const bgColor = oklch(parse(theme.background_color))!;
  const isLightBg = bgColor.l > 0.5;

  // Create a slightly elevated surface color from background
  // by nudging lightness up slightly for light themes, down for dark

  const cardL = isLightBg
    ? formatNumber(Math.min(bgColor.l + 0.02, 1))
    : formatNumber(Math.max(bgColor.l + 0.04, 0));
  const card = `${cardL} ${formatNumber(bgColor.c)} ${formatNumber(bgColor.h ?? 0)}`;
  const mutedL = isLightBg
    ? formatNumber(Math.max(bgColor.l - 0.03, 0))
    : formatNumber(Math.min(bgColor.l + 0.08, 1));
  const muted = `${mutedL} ${formatNumber(bgColor.c)} ${formatNumber(bgColor.h ?? 0)}`;

  const radius = getRadius(theme.radius);

  // chart colors — 5 tints derived from primary
  const primaryColor = oklch(parse(theme.primary_brand_color))!;
  const chartColors = [0.87, 0.7, 0.55, 0.4, 0.27].map(
    (l) =>
      `oklch(${formatNumber(l)} ${formatNumber(Math.min(primaryColor.c * 0.6, 0.12))} ${formatNumber(primaryColor.h ?? 0)})`,
  );

  const light: ThemeVars = {
    "--background": `oklch(${background})`,
    "--foreground": `oklch(${backgroundFg})`,
    "--card": `oklch(${card})`,
    "--card-foreground": `oklch(${backgroundFg})`,
    "--popover": `oklch(${card})`,
    "--popover-foreground": `oklch(${backgroundFg})`,
    "--primary": `oklch(${primary})`,
    "--primary-foreground": `oklch(${primaryFg})`,
    "--secondary": `oklch(${secondary})`,
    "--secondary-foreground": `oklch(${secondaryFg})`,
    "--muted": `oklch(${muted})`,
    "--muted-foreground": `oklch(${isLightBg ? "0.556 0 0" : "0.708 0 0"})`,
    "--accent": `oklch(${accent})`,
    "--accent-foreground": `oklch(${accentFg})`,
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--destructive-foreground": "oklch(0.985 0 0)",
    "--border": `oklch(${isLightBg ? "0.922 0 0" : "1 0 0 / 10%"})`,
    "--input": `oklch(${isLightBg ? "0.922 0 0" : "1 0 0 / 15%"})`,
    "--ring": `oklch(${primary})`,
    "--radius": radius,
    "--chart-1": chartColors[0],
    "--chart-2": chartColors[1],
    "--chart-3": chartColors[2],
    "--chart-4": chartColors[3],
    "--chart-5": chartColors[4],
    "--sidebar": `oklch(${isLightBg ? "0.985 0 0" : "0.205 0 0"})`,
    "--sidebar-foreground": `oklch(${backgroundFg})`,
    "--sidebar-primary": `oklch(${primary})`,
    "--sidebar-primary-foreground": `oklch(${primaryFg})`,
    "--sidebar-accent": `oklch(${muted})`,
    "--sidebar-accent-foreground": `oklch(${backgroundFg})`,
    "--sidebar-border": `oklch(${isLightBg ? "0.922 0 0" : "1 0 0 / 10%"})`,
    "--sidebar-ring": `oklch(${primary})`,
  };

  // dark mode inverts primary and nudges background to near-black
  // while preserving the hue of the chosen background color
  const dark: ThemeVars = {
    "--background": `oklch(0.145 ${formatNumber(bgColor.c)} ${formatNumber(bgColor.h ?? 0)})`,
    "--foreground": "oklch(0.985 0 0)",
    "--card": `oklch(0.205 ${formatNumber(bgColor.c)} ${formatNumber(bgColor.h ?? 0)})`,
    "--card-foreground": "oklch(0.985 0 0)",
    "--popover": `oklch(0.205 ${formatNumber(bgColor.c)} ${formatNumber(bgColor.h ?? 0)})`,
    "--popover-foreground": "oklch(0.985 0 0)",
    "--primary": `oklch(${primaryFg})`,
    "--primary-foreground": `oklch(${primary})`,
    "--secondary": `oklch(${secondary})`,
    "--secondary-foreground": `oklch(${secondaryFg})`,
    "--muted": "oklch(0.269 0 0)",
    "--muted-foreground": "oklch(0.708 0 0)",
    "--accent": `oklch(${accent})`,
    "--accent-foreground": `oklch(${accentFg})`,
    "--destructive": "oklch(0.704 0.191 22.216)",
    "--destructive-foreground": "oklch(0.985 0 0)",
    "--border": "oklch(1 0 0 / 10%)",
    "--input": "oklch(1 0 0 / 15%)",
    "--ring": `oklch(${primary})`,
    "--radius": radius,
    "--chart-1": chartColors[0],
    "--chart-2": chartColors[1],
    "--chart-3": chartColors[2],
    "--chart-4": chartColors[3],
    "--chart-5": chartColors[4],
    "--sidebar": "oklch(0.205 0 0)",
    "--sidebar-foreground": "oklch(0.985 0 0)",
    "--sidebar-primary": `oklch(${primary})`,
    "--sidebar-primary-foreground": `oklch(${primaryFg})`,
    "--sidebar-accent": "oklch(0.269 0 0)",
    "--sidebar-accent-foreground": "oklch(0.985 0 0)",
    "--sidebar-border": "oklch(1 0 0 / 10%)",
    "--sidebar-ring": `oklch(${primary})`,
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

  // always write both blocks — the .dark class is toggled by is_dark_mode_enabled
  // in the root layout, not by whether the block exists in CSS
  return `${lightVars}\n\n${darkVars}`.trim();
}
