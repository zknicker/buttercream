import { createDefaultDesignSystem, defaultDarkTheme, defaultLightTheme } from "./defaults.ts";
import type { DesignSystem, ThemeTokens } from "./design-system.ts";

type ThemePath = readonly [section: keyof ThemeTokens, key: string];

const variablePaths = {
  accent: ["colors", "accent"],
  "accent-foreground": ["colors", "accentForeground"],
  "accent-soft": ["colors", "accentSoft"],
  background: ["colors", "background"],
  backdrop: ["colors", "backdrop"],
  border: ["colors", "border"],
  card: ["colors", "card"],
  "card-foreground": ["colors", "cardForeground"],
  danger: ["colors", "danger"],
  "danger-foreground": ["colors", "dangerForeground"],
  "danger-soft": ["colors", "dangerSoft"],
  default: ["colors", "default"],
  "default-foreground": ["colors", "defaultForeground"],
  foreground: ["colors", "foreground"],
  ring: ["colors", "ring"],
  success: ["colors", "success"],
  "success-foreground": ["colors", "successForeground"],
  "success-soft": ["colors", "successSoft"],
  warning: ["colors", "warning"],
  "warning-foreground": ["colors", "warningForeground"],
  "warning-soft": ["colors", "warningSoft"],
  "form-radius": ["corners", "formRadius"],
  radius: ["corners", "radius"],
  "font-size-scale": ["density", "fontSize"],
  "spacing-scale": ["density", "spacing"],
  "disabled-opacity": ["effects", "disabledOpacity"],
  "field-border": ["effects", "fieldBorder"],
  "field-shadow": ["effects", "fieldShadow"],
  "overlay-shadow": ["effects", "overlayShadow"],
  "bc-hard-shadow": ["effects", "hardShadowColor"],
  "bc-hard-shadow-depth": ["effects", "hardShadowDepth"],
  "font-heading": ["typography", "fontHeading"],
  "font-sans": ["typography", "fontSans"],
  "letter-spacing": ["typography", "letterSpacing"],
  "line-height": ["typography", "lineHeight"],
} as const satisfies Record<string, ThemePath>;

const numericVariables = new Set([
  "disabled-opacity",
  "font-size-scale",
  "line-height",
  "spacing-scale",
]);

export function exportGlobalCss(designSystem: DesignSystem): string {
  const customCss = designSystem.rules.customCss.trim();

  return [
    '@import "tailwindcss";',
    '@import "@buttercream/styles";',
    "",
    "@layer theme {",
    '  [data-theme="light"],',
    '  [data-theme="default"] {',
    serializeTheme(designSystem.theme.light, 4),
    "  }",
    "",
    '  [data-theme="dark"] {',
    serializeTheme(designSystem.theme.dark, 4),
    "  }",
    "}",
    ...(customCss ? ["", customCss] : []),
    "",
  ].join("\n");
}

export function importThemeCss(css: string, current?: DesignSystem): DesignSystem {
  const imported = structuredClone(current ?? createDefaultDesignSystem());

  const lightVariables = extractVariables(findThemeBlock(css, "light"));
  const darkVariables = extractVariables(findThemeBlock(css, "dark"));

  imported.theme.light = applyVariables(defaultLightTheme, lightVariables);
  imported.theme.dark = applyVariables(defaultDarkTheme, darkVariables);

  return imported;
}

function serializeTheme(theme: ThemeTokens, indentation: number): string {
  const prefix = " ".repeat(indentation);

  return Object.entries(variablePaths)
    .map(([variable, path]) => `${prefix}--${variable}: ${getThemeValue(theme, path)};`)
    .join("\n");
}

function getThemeValue(theme: ThemeTokens, [section, key]: ThemePath): string | number {
  const record = theme[section] as Record<string, string | number>;
  return record[key] ?? "";
}

function applyVariables(base: ThemeTokens, variables: Map<string, string>): ThemeTokens {
  const theme = structuredClone(base);

  for (const [variable, path] of Object.entries(variablePaths)) {
    const value = variables.get(variable);
    if (value === undefined) {
      continue;
    }

    const [section, key] = path;
    const record = theme[section] as Record<string, string | number>;
    record[key] = numericVariables.has(variable) ? Number(value) : value;
  }

  return theme;
}

function extractVariables(block: string): Map<string, string> {
  const variables = new Map<string, string>();
  const pattern = /--([a-z0-9-]+)\s*:\s*([^;}{]+);/giu;

  for (const match of block.matchAll(pattern)) {
    const name = match[1];
    const value = match[2];
    if (name && value) {
      variables.set(name, value.trim());
    }
  }

  return variables;
}

function findThemeBlock(css: string, theme: "light" | "dark"): string {
  const selector = new RegExp(`\\[data-theme=(?:"|')${theme}(?:"|')\\]`, "iu");
  const match = selector.exec(css);
  if (!match) {
    return "";
  }

  const openingBrace = css.indexOf("{", match.index);
  if (openingBrace === -1) {
    return "";
  }

  let depth = 0;
  for (let index = openingBrace; index < css.length; index += 1) {
    if (css[index] === "{") {
      depth += 1;
    } else if (css[index] === "}") {
      depth -= 1;
      if (depth === 0) {
        return css.slice(openingBrace + 1, index);
      }
    }
  }

  return "";
}
