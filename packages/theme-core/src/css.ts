import { createDefaultDesignSystem, defaultDarkTheme, defaultLightTheme } from "./defaults.ts";
import { type DesignSystem, skeletonStyleSchema, type ThemeTokens } from "./design-system.ts";

type ThemePath = readonly [section: keyof ThemeTokens, key: string];
type ThemeValue = string | number | boolean;

/**
 * Every authored token, and only authored tokens. Derived tokens (`*-hover`, `*-soft*`,
 * `background-secondary`, `surface-hover`, the `radius-*` steps, the `text-*` scale, …) are
 * computed in `@buttercream/styles` and never serialized or imported here.
 */
const variablePaths = {
  accent: ["colors", "accent"],
  "accent-foreground": ["colors", "accentForeground"],
  backdrop: ["colors", "backdrop"],
  background: ["colors", "background"],
  border: ["colors", "border"],
  danger: ["colors", "danger"],
  "danger-foreground": ["colors", "dangerForeground"],
  default: ["colors", "default"],
  "default-foreground": ["colors", "defaultForeground"],
  focus: ["colors", "focus"],
  foreground: ["colors", "foreground"],
  link: ["colors", "link"],
  muted: ["colors", "muted"],
  overlay: ["colors", "overlay"],
  "overlay-foreground": ["colors", "overlayForeground"],
  separator: ["colors", "separator"],
  success: ["colors", "success"],
  "success-foreground": ["colors", "successForeground"],
  surface: ["colors", "surface"],
  "surface-foreground": ["colors", "surfaceForeground"],
  "surface-secondary": ["colors", "surfaceSecondary"],
  "surface-tertiary": ["colors", "surfaceTertiary"],
  warning: ["colors", "warning"],
  "warning-foreground": ["colors", "warningForeground"],
  "field-background": ["fields", "background"],
  "field-border": ["fields", "border"],
  "field-focus": ["fields", "focus"],
  "field-foreground": ["fields", "foreground"],
  "field-placeholder": ["fields", "placeholder"],
  "field-radius": ["corners", "fieldRadius"],
  radius: ["corners", "radius"],
  "neutral-base": ["neutrals", "base"],
  "neutral-vibrant": ["neutrals", "vibrant"],
  "font-size-scale": ["density", "fontSize"],
  "spacing-scale": ["density", "spacing"],
  "border-width": ["effects", "borderWidth"],
  "cursor-interactive": ["effects", "cursorPointer"],
  "disabled-opacity": ["effects", "disabledOpacity"],
  "field-border-width": ["effects", "fieldBorderWidth"],
  "ring-offset-width": ["effects", "ringOffsetWidth"],
  "shadow-field": ["effects", "shadowField"],
  "shadow-overlay": ["effects", "shadowOverlay"],
  "shadow-surface": ["effects", "shadowSurface"],
  "skeleton-animation": ["effects", "skeleton"],
  "font-heading": ["typography", "fontHeading"],
  "font-mono": ["typography", "fontMono"],
  "font-sans": ["typography", "fontSans"],
  "letter-spacing": ["typography", "letterSpacing"],
  "line-height": ["typography", "lineHeight"],
} as const satisfies Record<string, ThemePath>;

const numericVariables = new Set([
  "disabled-opacity",
  "font-size-scale",
  "line-height",
  "neutral-base",
  "spacing-scale",
]);

/** Shadow levels serialize to a reference into the per-theme stacks in `@buttercream/styles`. */
const shadowVariables: Record<string, string> = {
  "shadow-field": "field",
  "shadow-overlay": "overlay",
  "shadow-surface": "surface",
};

const shadowLevelPattern = /^var\(--bc-shadow-(?:field|overlay|surface)-(subtle|medium|strong)\)$/u;

/**
 * Document value → CSS custom-property value. Booleans and shadow levels are stored typed in the
 * document but must project to something CSS can consume directly.
 */
function serializeValue(variable: string, value: ThemeValue): string {
  if (variable === "neutral-vibrant") {
    return value ? "1" : "0";
  }
  if (variable === "cursor-interactive") {
    return value ? "pointer" : "default";
  }
  const shadowKind = shadowVariables[variable];
  if (shadowKind) {
    return value === "none" ? "none" : `var(--bc-shadow-${shadowKind}-${String(value)})`;
  }
  return String(value);
}

/** CSS custom-property value → document value. Returns undefined for unparseable values. */
function parseValue(variable: string, value: string): ThemeValue | undefined {
  if (numericVariables.has(variable)) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  if (variable === "neutral-vibrant") {
    return value === "1" || value === "true";
  }
  if (variable === "cursor-interactive") {
    return value === "pointer";
  }
  if (variable in shadowVariables) {
    if (value === "none") {
      return "none";
    }
    return shadowLevelPattern.exec(value)?.[1];
  }
  if (variable === "skeleton-animation") {
    const parsed = skeletonStyleSchema.safeParse(value);
    return parsed.success ? parsed.data : undefined;
  }
  return value;
}

/**
 * The same variable registry the CSS export uses, as a plain map. The studio preview applies
 * these to its themed wrapper instead of generating a stylesheet, so dragging a control
 * repaints without re-parsing CSS.
 */
export function themeCssVariables(theme: ThemeTokens): Record<string, string> {
  const variables: Record<string, string> = {};

  for (const [variable, path] of Object.entries(variablePaths)) {
    variables[`--${variable}`] = serializeValue(variable, getThemeValue(theme, path));
  }

  return variables;
}

export function exportGlobalCss(designSystem: DesignSystem): string {
  const customCss = designSystem.rules.customCss.trim();

  return [
    '@import "tailwindcss";',
    '@import "@buttercream/styles";',
    "",
    "@layer theme {",
    /*
     * `:root` matches the shipped defaults' own selector list, so dropping this file into a
     * project is enough for the theme to take effect. Without it the export applies only where a
     * `data-theme` attribute happens to sit, and a consumer who never sets one silently renders
     * the default preset instead of their own.
     */
    "  :root,",
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
    .map(
      ([variable, path]) =>
        `${prefix}--${variable}: ${serializeValue(variable, getThemeValue(theme, path))};`,
    )
    .join("\n");
}

function getThemeValue(theme: ThemeTokens, [section, key]: ThemePath): ThemeValue {
  const record = theme[section] as Record<string, ThemeValue>;
  return record[key] ?? "";
}

function applyVariables(base: ThemeTokens, variables: Map<string, string>): ThemeTokens {
  const theme = structuredClone(base);

  for (const [variable, path] of Object.entries(variablePaths)) {
    const raw = variables.get(variable);
    if (raw === undefined) {
      continue;
    }

    const value = parseValue(variable, raw);
    if (value === undefined) {
      continue;
    }

    const [section, key] = path;
    const record = theme[section] as Record<string, ThemeValue>;
    record[key] = value;
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
