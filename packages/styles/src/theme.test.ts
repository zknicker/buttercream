import { describe, expect, test } from "bun:test";

const themeCss = await Bun.file(new URL("./theme.css", import.meta.url)).text();

/*
 * The shadow system is authored per theme, not shared (REFERENCE.md §3/§3b): light drops the
 * hard 1px ring entirely and runs its drop layers at roughly a tenth of the dark alpha. These
 * tests pin that contract so a future edit cannot collapse the two themes onto one stack.
 */

const SHADOW_KINDS = ["field", "overlay", "surface"] as const;
const SHADOW_LEVELS = ["subtle", "medium", "strong"] as const;

function extractBlock(css: string, selectorPattern: RegExp): string {
  const match = selectorPattern.exec(css);
  if (!match) {
    return "";
  }

  const openingBrace = css.indexOf("{", match.index);
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

function declarations(block: string): Map<string, string> {
  const variables = new Map<string, string>();
  for (const match of block.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gu)) {
    const name = match[1];
    const value = match[2];
    if (name !== undefined && value !== undefined) {
      variables.set(name, value.replaceAll(/\s+/gu, " ").trim());
    }
  }
  return variables;
}

const source = String(themeCss);
const light = declarations(
  extractBlock(source, /:root\s*,\s*\[data-theme="light"\]\s*,\s*\[data-theme="default"\]/u),
);
/* Anchored to a lone selector line so the @custom-variant reference at the top cannot match. */
const dark = declarations(extractBlock(source, /^\s*\[data-theme="dark"\]\s*\{/mu));

describe("per-theme shadow stacks", () => {
  test("every level is authored separately for light and dark", () => {
    for (const kind of SHADOW_KINDS) {
      for (const level of SHADOW_LEVELS) {
        const name = `bc-shadow-${kind}-${level}`;
        const lightStack = light.get(name);
        const darkStack = dark.get(name);
        expect(lightStack).toBeDefined();
        expect(darkStack).toBeDefined();
        expect(lightStack).not.toBe(darkStack);
      }
    }
  });

  test("the raised stack keeps the hard 1px ring in dark only", () => {
    const lightRaised = light.get("bc-shadow-raised") ?? "";
    const darkRaised = dark.get("bc-shadow-raised") ?? "";
    expect(darkRaised).toContain("0 0 0 1px rgba(0, 0, 0, 0.4)");
    expect(lightRaised).not.toContain("0 0 0 1px");
  });

  test("light drop layers run at roughly a tenth of the dark alpha", () => {
    const lightRaised = light.get("bc-shadow-raised") ?? "";
    const darkRaised = dark.get("bc-shadow-raised") ?? "";
    expect(lightRaised).toContain("rgba(0, 0, 0, 0.03)");
    expect(lightRaised).not.toContain("rgba(0, 0, 0, 0.3)");
    expect(darkRaised).toContain("rgba(0, 0, 0, 0.3)");
  });
});
