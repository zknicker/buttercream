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
 * So every component that portals has to give the caller a way to say where. Two shapes count:
 * forwarding a `container` prop into the portal it owns, or re-exporting the portal part so the
 * caller assembles it. This asserts the escape hatch exists — that a new overlay cannot be added
 * without one. Whether callers actually pass it is a separate question, checked in the browser.
 */
const sourceDirectory = new URL(".", import.meta.url).pathname;

function componentSources(): { name: string; source: string }[] {
  return readdirSync(sourceDirectory)
    .filter((file) => file.endsWith(".tsx") && !file.endsWith(".test.tsx"))
    .map((file) => ({ name: file, source: readFileSync(join(sourceDirectory, file), "utf8") }));
}

describe("portalled overlays", () => {
  const portalling = componentSources().filter(({ source }) => /\.Portal\b/u.test(source));

  test("there are portalled components to check", () => {
    expect(portalling.length).toBeGreaterThan(0);
  });

  for (const { name, source } of portalling) {
    test(`${name} lets the caller choose the portal container`, () => {
      const forwardsContainer = /\.Portal\s+container=\{/u.test(source);
      const reExportsPortal = /Portal:\s*Base/u.test(source);

      expect(forwardsContainer || reExportsPortal).toBe(true);
    });
  }
});
