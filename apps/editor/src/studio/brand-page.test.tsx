import { describe, expect, test } from "bun:test";
import { createDefaultDesignSystem, type DesignSystem } from "@buttercream/theme-core";
import { renderToStaticMarkup } from "react-dom/server";
import { BrandPage } from "./brand-page.tsx";
import { sectionOwnsSurface } from "./preview-sections.tsx";

/*
 * The Brand page is the one section that authors the document, and the one section that is
 * editor chrome rather than a preview. Both properties are invisible in the markup until they
 * break: a shared visitor would get fields that write to a document they cannot save, and an
 * edited theme would reach the chrome editing it.
 */

function authored(): DesignSystem {
  const designSystem = createDefaultDesignSystem("Sundae");
  designSystem.identity.description = "A themeable component system.";
  designSystem.identity.targetAudience = "Small product teams.";
  designSystem.rules.agent = "Prefer Card over a bare panel.";
  designSystem.rules.customCss = ".button--secondary { background: var(--accent-soft); }";
  return designSystem;
}

function render(designSystem: DesignSystem, editable: boolean): string {
  return renderToStaticMarkup(
    <BrandPage
      designSystem={designSystem}
      surfaceStyle={{}}
      theme="light"
      {...(editable ? { onUpdate: () => undefined } : {})}
    />,
  );
}

describe("BrandPage", () => {
  test("offers every authoring surface to an owner", () => {
    const markup = render(createDefaultDesignSystem("Sundae"), true);

    for (const field of [
      "Description and mission",
      "Target audience",
      "Voice and tone",
      "Anti-patterns",
      "Design rules for AI",
      "Custom CSS",
    ]) {
      expect(markup).toContain(field);
    }
    expect(markup).toContain('aria-haspopup="dialog"');
  });

  test("gives a shared visitor the document without the affordances that write to it", () => {
    const markup = render(authored(), false);

    expect(markup).not.toContain('aria-haspopup="dialog"');
    /* Authored prose still reads; an unauthored field has nothing to say and is dropped. */
    expect(markup).toContain("A themeable component system.");
    expect(markup).toContain("Small product teams.");
    expect(markup).not.toContain("Voice and tone");
  });

  test("drops the sections a visitor's document has nothing to say in", () => {
    const markup = render(createDefaultDesignSystem("Sundae"), false);

    /* An empty prompt to author is worse than no section: there is no way to act on it. */
    expect(markup).not.toContain("Identity");
    expect(markup).not.toContain("Design rules for AI");
    /* The theme is never empty, so its summary always stands. */
    expect(markup).toContain("Typography");
  });

  test("confines the theme to its own surface rather than the page", () => {
    const markup = render(authored(), true);

    /* The island carries the tokens and the user's CSS; the fields around it are chrome. */
    expect(markup).toMatch(/@scope \(\[data-surface-scope="[a-zA-Z0-9]+"\]\)/u);
    expect(markup).toContain(".button--secondary");
    expect(sectionOwnsSurface("Brand")).toBe(true);
    expect(sectionOwnsSurface("Guides")).toBe(false);
  });

  test("renders the strip with the project's own component defaults", () => {
    const designSystem = createDefaultDesignSystem("Sundae");
    designSystem.components.button.defaultVariant = "outline";
    designSystem.components.avatar.defaultShape = "circle";

    const markup = render(designSystem, true);

    expect(markup).toContain("button--outline");
    expect(markup).toContain("avatar--circle");
  });
});
