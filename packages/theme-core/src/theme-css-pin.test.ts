import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { themeCssVariables } from "./css.ts";
import { defaultDarkTheme, defaultLightTheme } from "./defaults.ts";

/**
 * `packages/styles/src/theme-defaults.css` is generated from this package's default document, so
 * the two cannot drift the way `theme.css` once did. What this pins is the generator itself: it
 * reads the shipped file and compares it against the token registry, a different path from the one
 * that printed it. A file-equality check in `@buttercream/styles` proves the file matches its
 * generator; only this proves the generator matches the document.
 */

const themeCssPath = fileURLToPath(new URL("../../styles/src/theme-defaults.css", import.meta.url));
const themeCss = readFileSync(themeCssPath, "utf8");

/** Collapse prettier's line-wrapping so a multi-line declaration compares equal to a one-line one. */
function normalize(value: string): string {
  return value.replace(/\s+/gu, " ").replace(/\(\s+/gu, "(").replace(/\s+\)/gu, ")").trim();
}

function extractBlock(css: string, selector: RegExp): string {
  const match = selector.exec(css);
  if (!match) {
    throw new Error(`theme.css: selector not found: ${selector}`);
  }

  const openBrace = css.indexOf("{", match.index);
  let depth = 0;
  for (let index = openBrace; index < css.length; index += 1) {
    if (css[index] === "{") {
      depth += 1;
    } else if (css[index] === "}") {
      depth -= 1;
      if (depth === 0) {
        return css.slice(openBrace + 1, index);
      }
    }
  }

  throw new Error(`theme.css: unterminated block for selector: ${selector}`);
}

/** `--name: value;` pairs within a block, values normalised. Declarations never contain `;`. */
function extractDeclarations(block: string): Map<string, string> {
  const declarations = new Map<string, string>();
  const pattern = /--([a-z0-9-]+):\s*([\s\S]*?);/gu;

  for (const match of block.matchAll(pattern)) {
    const name = match[1];
    const value = match[2];
    if (name && value !== undefined) {
      declarations.set(`--${name}`, normalize(value));
    }
  }

  return declarations;
}

const lightBlock = extractBlock(
  themeCss,
  /:root,\s*\[data-theme="light"\],\s*\[data-theme="default"\]\s*\{/u,
);
const darkBlock = extractBlock(themeCss, /\[data-theme="dark"\]\s*\{/u);

const lightDeclarations = extractDeclarations(lightBlock);
const darkDeclarations = extractDeclarations(darkBlock);

/** The same registry `exportGlobalCss` walks, serialized the same way -- so this is a direct
 * comparison against what a fresh export would produce for the default preset. */
const lightExpected = themeCssVariables(defaultLightTheme);
const darkExpected = themeCssVariables(defaultDarkTheme);

describe("theme.css authored defaults stay pinned to defaults.ts", () => {
  /* Every assertion below is generated from these three collections, so an empty one would make
   * the whole suite pass by asserting nothing. That is the one failure this file cannot afford. */
  test("the comparison is not vacuous", () => {
    expect(Object.keys(lightExpected).length).toBe(49);
    expect(Object.keys(darkExpected).length).toBe(49);
    expect(lightDeclarations.size).toBeGreaterThanOrEqual(49);
    expect(darkDeclarations.size).toBeGreaterThan(0);
  });

  describe("light theme", () => {
    for (const [variable, expected] of Object.entries(lightExpected)) {
      test(variable, () => {
        const found = lightDeclarations.get(variable);
        expect(found, `light ${variable}: expected "${expected}", found "${String(found)}"`).toBe(
          expected,
        );
      });
    }
  });

  describe("dark theme", () => {
    for (const [variable, expected] of Object.entries(darkExpected)) {
      test(variable, () => {
        // A variable the dark block doesn't redeclare inherits the :root/light value (custom
        // properties inherit), which is only correct when defaults.ts says the two themes
        // actually share that token's value -- so fall back to light's declaration rather than
        // treating an absent dark override as a free pass.
        const found = darkDeclarations.get(variable) ?? lightDeclarations.get(variable);
        expect(found, `dark ${variable}: expected "${expected}", found "${String(found)}"`).toBe(
          expected,
        );
      });
    }
  });
});
