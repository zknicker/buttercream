import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/*
 * Theme tokens are custom properties, so they reach a component by DOM inheritance. A portal
 * moves its content to the document body, outside whatever subtree the tokens were set on, and
 * the content silently falls back to the package defaults — the trigger restyles and the popup
 * does not. Nothing about that failure is visible in a static render or a snapshot; it only
 * shows up when someone themes a subtree, which is exactly what the studio does.
 *
 * So every portal has to give the caller a way to say where it lands. Two shapes count:
 * forwarding a `container` prop into a portal the component owns, or re-exporting the portal
 * part so the caller assembles it themselves.
 *
 * This checks every portal in a file rather than the file as a whole. Checking the file lets a
 * component that already forwards one container grow a second, unforwarded portal and still
 * pass — which is exactly how this regression would come back.
 *
 * What it cannot tell you is whether callers actually pass a container. Select had the escape
 * hatch and still rendered outside the themed subtree because two call sites never used it.
 * That is a rendered-output question; it is checked in the browser, not here.
 */
const sourceDirectory = new URL(".", import.meta.url).pathname;

/** Comments would otherwise let a commented-out example satisfy the check. */
function withoutComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//gu, "").replace(/\/\/[^\n]*/gu, "");
}

function componentSources(): { name: string; source: string }[] {
  return readdirSync(sourceDirectory)
    .filter((file) => file.endsWith(".tsx") && !file.endsWith(".test.tsx"))
    .map((file) => ({
      name: file,
      source: withoutComments(readFileSync(join(sourceDirectory, file), "utf8")),
    }));
}

/**
 * Every portal opening tag in the file, whole. Matches a namespaced `<Menu.Portal` as well as a
 * bare `<Portal`, since a component importing the part directly portals just as thoroughly.
 */
function portalTags(source: string): string[] {
  return [...source.matchAll(/<(?:[A-Z][A-Za-z0-9_]*\.)?Portal(?=[\s/>])[^>]*>/gu)].map(
    (match) => match[0],
  );
}

describe("portalled overlays", () => {
  const sources = componentSources();
  const portalling = sources.filter(({ source }) => portalTags(source).length > 0);

  test("there are portalled components to check", () => {
    expect(portalling.length).toBeGreaterThan(0);
  });

  for (const { name, source } of portalling) {
    test(`${name} lets the caller choose every portal container`, () => {
      /*
       * Re-exporting the part is no longer an excuse. A component that also renders its own
       * portal has a default path callers hit without composing anything, and that path has to
       * be redirectable too — which is how popover and tooltip slipped through.
       */
      const unforwarded = portalTags(source).filter((tag) => !/\bcontainer=/u.test(tag));

      expect(unforwarded).toEqual([]);
    });
  }
});
