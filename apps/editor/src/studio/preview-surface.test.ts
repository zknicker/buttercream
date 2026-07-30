import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/*
 * The preview renders inline rather than in an iframe, so the chrome and the previewed design
 * system share one document. Two things keep them from bleeding into each other, and both are
 * easy to break silently — hence these tests rather than a comment nobody reads.
 */

const shellCss = readFileSync(join(import.meta.dir, "../styles/shell.css"), "utf8");
const previewCss = readFileSync(join(import.meta.dir, "../styles/preview.css"), "utf8");

/** Strip comments so prose about a rule is never mistaken for the rule. */
function withoutComments(css: string): string {
  return css.replaceAll(/\/\*[\s\S]*?\*\//gu, "");
}

describe("preview isolation", () => {
  test("the shell never sets a root font size", () => {
    /*
     * `rem` is root-relative by definition, so a root font size in the chrome would rescale
     * every rem-based design-system token — the whole preview — without touching the design
     * system. No local reset on .preview-surface can defend against this; only not doing it can.
     */
    const rootFontSize = /(?:^|\})\s*(?::root|html)[^{]*\{[^}]*\bfont-size\s*:/mu.test(
      withoutComments(shellCss),
    );

    expect(rootFontSize).toBe(false);
  });

  test("the preview surface restates every inherited typographic property", () => {
    /*
     * Anything inherited flows from the chrome into the preview unless the surface pins it.
     * Colour and font-family were always pinned; these are the ones that silently leaked.
     */
    const surface =
      withoutComments(previewCss).match(/\.preview-surface\s*\{([^}]*)\}/u)?.[1] ?? "";

    for (const property of [
      "font-family",
      "font-size",
      "font-weight",
      "font-style",
      "line-height",
      "letter-spacing",
      "text-align",
      "color",
    ]) {
      expect(surface).toContain(`${property}:`);
    }
  });

  test("annotates application specimens without drawing a second ring around the app", () => {
    const css = withoutComments(previewCss);
    const specimen = css.match(/\.specimen\s*\{([^}]*)\}/u)?.[1] ?? "";
    const app = css.match(/\.app\s*\{([^}]*)\}/u)?.[1] ?? "";

    expect(specimen).toContain("border: 1px dashed var(--border)");
    expect(app).not.toContain("box-shadow:");
  });
});
