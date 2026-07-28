import themeCss from "@buttercream/styles/theme?raw";
import type { ThemeTokens } from "@buttercream/theme-core";

/*
 * Token inventory for the Variables tab.
 *
 * Authored colour tokens are enumerated straight off the canonical document
 * (`theme.colors` / `theme.fields`), so the editable rows can never drift from the schema.
 * Derived tokens are parsed out of the real formulas in @buttercream/styles' theme.css
 * (imported as text), so the read-only rows always show the projection the package
 * actually ships rather than a hand-maintained duplicate.
 */

export const colorTokenCategories = [
  "Accent",
  "Default",
  "Success",
  "Warning",
  "Danger",
  "Surface",
  "Field",
  "Background",
  "Chart",
  "Lines",
  "Misc",
] as const;
export type ColorTokenCategory = (typeof colorTokenCategories)[number];

export interface AuthoredTokenPath {
  key: string;
  section: "colors" | "fields";
}

export interface ColorToken {
  /** Where the token lives in the document, or null when it is a derived projection. */
  authored: AuthoredTokenPath | null;
  category: ColorTokenCategory;
  name: string;
  value: string;
}

export function categorizeColorToken(name: string): ColorTokenCategory {
  if (name.startsWith("accent")) {
    return "Accent";
  }
  if (name.startsWith("default")) {
    return "Default";
  }
  if (name.startsWith("success")) {
    return "Success";
  }
  if (name.startsWith("warning")) {
    return "Warning";
  }
  if (name.startsWith("danger")) {
    return "Danger";
  }
  if (name.startsWith("surface") || name.startsWith("overlay")) {
    return "Surface";
  }
  if (name.startsWith("field")) {
    return "Field";
  }
  if (name.startsWith("background") || name.startsWith("foreground")) {
    return "Background";
  }
  /*
   * Charts are a subsystem, not an oddment. Left in Misc they were 28 of its 38 rows, which made
   * the bucket meaningless and hid the whole data-viz ladder behind a label nobody would think to
   * open looking for it.
   */
  if (name.startsWith("chart")) {
    return "Chart";
  }
  /*
   * Follows the family rather than the prefix. `surface-secondary` landed in Surface while
   * `border-secondary` landed in Misc, so sibling tokens of the same shape were filed in different
   * places depending only on which word they started with.
   */
  if (name.startsWith("border") || name.startsWith("separator")) {
    return "Lines";
  }
  return "Misc";
}

/**
 * Every colour token for one theme: the authored set from the document followed by the
 * derived set from theme.css, ordered by category then name so families read together.
 */
export function collectColorTokens(theme: ThemeTokens): ColorToken[] {
  const tokens: ColorToken[] = [];

  for (const [key, value] of Object.entries(theme.colors)) {
    const name = kebabCase(key);
    tokens.push({
      authored: { key, section: "colors" },
      category: categorizeColorToken(name),
      name,
      value,
    });
  }
  for (const [key, value] of Object.entries(theme.fields)) {
    const name = `field-${kebabCase(key)}`;
    tokens.push({
      authored: { key, section: "fields" },
      category: categorizeColorToken(name),
      name,
      value,
    });
  }
  for (const { formula, name } of derivedColorTokens) {
    tokens.push({ authored: null, category: categorizeColorToken(name), name, value: formula });
  }

  tokens.sort((a, b) => {
    const rank =
      colorTokenCategories.indexOf(a.category) - colorTokenCategories.indexOf(b.category);
    return rank !== 0 ? rank : a.name.localeCompare(b.name);
  });

  return tokens;
}

export type TokenValueDisplay =
  | { kind: "alias"; target: string }
  | { kind: "expression"; text: string }
  | { kind: "literal"; value: string }
  | { kind: "mix"; parts: string[] };

/**
 * Classifies a token value into the three row shapes the tab renders: a literal, an alias
 * of another token, or a derivation summarized as its formula.
 */
export function describeTokenValue(raw: string): TokenValueDisplay {
  /* Multi-line formulas collapse with padding spaces inside the parens; strip those too. */
  const value = raw.replaceAll(/\s+/gu, " ").replaceAll("( ", "(").replaceAll(" )", ")").trim();

  const alias = /^var\(--([a-z0-9-]+)\)$/u.exec(value)?.[1];
  if (alias !== undefined) {
    return { kind: "alias", target: alias };
  }

  const mix = /^color-mix\(in [a-z0-9-]+, (.+)\)$/u.exec(value)?.[1];
  if (mix !== undefined) {
    const parts = splitTopLevel(mix)
      .map(describeMixPart)
      .filter((part) => part !== "transparent");
    return { kind: "mix", parts };
  }

  const neutral =
    /^oklch\(from var\(--accent\) calc\(var\(--neutral-base\) ([+-]) ([0-9.]+)\) var\(--bc-neutral-chroma\) h\)$/u.exec(
      value,
    );
  if (neutral?.[1] !== undefined && neutral[2] !== undefined) {
    return { kind: "expression", text: `neutral base ${neutral[1]} ${neutral[2]}` };
  }

  if (value.includes("var(") || value.includes("calc(")) {
    return { kind: "expression", text: value };
  }

  return { kind: "literal", value };
}

export function formatTokenDisplay(display: TokenValueDisplay): string {
  switch (display.kind) {
    case "alias":
      return `= ${display.target}`;
    case "expression":
      return display.text;
    case "literal":
      return display.value.startsWith("#") ? display.value.toUpperCase() : display.value;
    case "mix":
      return display.parts.join(" + ");
  }
}

function describeMixPart(part: string): string {
  const mixed = /^var\(--([a-z0-9-]+)\)(?: ([0-9.]+%))?$/u.exec(part);
  if (mixed?.[1] !== undefined) {
    return mixed[2] === undefined ? mixed[1] : `${mixed[1]} / ${mixed[2]}`;
  }
  return part;
}

function kebabCase(key: string): string {
  return key.replaceAll(/[A-Z]/gu, (character) => `-${character.toLowerCase()}`);
}

function splitTopLevel(value: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (character === "(") {
      depth += 1;
    } else if (character === ")") {
      depth -= 1;
    } else if (character === "," && depth === 0) {
      parts.push(value.slice(start, index).trim());
      start = index + 1;
    }
  }
  parts.push(value.slice(start).trim());

  return parts;
}

function stripComments(css: string): string {
  return css.replaceAll(/\/\*[\s\S]*?\*\//gu, "");
}

/**
 * The `:root, [data-theme]` block in theme.css is the derived-token registry — every fixed
 * projection of the authored tokens lives there. The bare `[data-theme]` (no value) only
 * appears on that block, which is what makes it addressable.
 */
function extractDerivedBlock(css: string): string {
  const selector = /:root\s*,\s*\[data-theme\]\s*\{/u.exec(css);
  if (!selector) {
    return "";
  }

  const openingBrace = css.indexOf("{", selector.index);
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

/** Structure and scale projections share the derived block; only colours belong in this tab. */
function isDerivedColorToken(name: string): boolean {
  return !name.startsWith("bc-") && !/^(?:spacing|radius|text-|font-)/u.test(name);
}

const derivedColorTokens: readonly { formula: string; name: string }[] = (() => {
  const block = extractDerivedBlock(stripComments(themeCss));
  const tokens: { formula: string; name: string }[] = [];

  for (const match of block.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gu)) {
    const name = match[1];
    const formula = match[2];
    if (name !== undefined && formula !== undefined && isDerivedColorToken(name)) {
      tokens.push({ formula: formula.replaceAll(/\s+/gu, " ").trim(), name });
    }
  }

  return tokens;
})();
