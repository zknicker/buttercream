import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/*
 * Component stylesheets speak in theme roles. A literal colour in a component is invisible to
 * every theme control — it survives preset changes, dark mode, and custom CSS untouched, which
 * is exactly the drift the DesignSystem document exists to prevent. Derivations live in
 * theme.css; components consume roles.
 *
 * The allowlist pins the two deliberate exceptions that predate this test. Additions to it
 * need the same justification those carry: a colour that must NOT follow the theme.
 */

const componentsDirectory = new URL("./components/", import.meta.url).pathname;

/** Literal colour syntax: hex, and the colour-function notations. `color-mix(in oklab, …)`
 * does not match — the space name has no opening parenthesis. */
const literalPattern = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)\(/gu;

const allowed: Record<string, readonly string[]> = {
  /* The alpha checkerboard behind translucent swatches: a viewing convention, not a theme
     colour — it must read the same under every theme, like a photo editor's. */
  "color-swatch.css": ["#efefef", "#f7f7f7", "rgb("],
  /* The shimmer highlight sweeping a skeleton: a light glint over any surface colour. */
  "skeleton.css": ["rgb("],
};

function withoutComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//gu, "");
}

describe("component colours", () => {
  const files = readdirSync(componentsDirectory).filter((file) => file.endsWith(".css"));

  test("there are component stylesheets to check", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    test(`${file} draws every colour from a theme role`, () => {
      const source = withoutComments(readFileSync(join(componentsDirectory, file), "utf8"));
      const literals = source.match(literalPattern) ?? [];
      const unexpected = literals.filter(
        (literal) => !(allowed[file] ?? []).includes(literal.toLowerCase()),
      );

      expect(unexpected).toEqual([]);
    });
  }
});
