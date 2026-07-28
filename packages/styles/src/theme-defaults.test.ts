import { describe, expect, test } from "bun:test";
import { renderThemeDefaults } from "../scripts/generate-theme-defaults.ts";

/*
 * `theme-defaults.css` is committed rather than built on demand, so it can be read in node_modules
 * and reviewed in a diff. That only holds if the committed bytes are what the generator prints --
 * otherwise it is a hand-edited file wearing a "generated" header, which is worse than an honestly
 * hand-written one.
 */

const committed = await Bun.file(new URL("./theme-defaults.css", import.meta.url)).text();

describe("theme-defaults.css", () => {
  test("is exactly what the generator prints", () => {
    expect(committed).toBe(renderThemeDefaults());
  });

  test("declares both themes in full", () => {
    const blocks = committed.match(/\{([^{}]*)\}/gu) ?? [];
    const counts = blocks.map((block) => (block.match(/^\s*--/gmu) ?? []).length);
    /* Equality above passes vacuously if the generator ever starts printing nothing. */
    expect(counts).toEqual([49, 49]);
  });
});
