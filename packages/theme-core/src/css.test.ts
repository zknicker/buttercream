import { describe, expect, test } from "bun:test";
import { exportGlobalCss, importThemeCss } from "./css.ts";
import { createDefaultDesignSystem } from "./defaults.ts";

describe("theme CSS", () => {
  test("exports a complete Tailwind v4 stylesheet", () => {
    const designSystem = createDefaultDesignSystem("Test");
    designSystem.rules.customCss = ".button { text-transform: uppercase; }";

    const css = exportGlobalCss(designSystem);

    expect(css).toContain('@import "tailwindcss";');
    expect(css).toContain('@import "@buttercream/styles";');
    expect(css).toContain("--accent: #1b1b1b;");
    expect(css).toContain("--backdrop: rgb(0 0 0 / 0.38);");
    expect(css).toContain(
      "--surface: oklch(from var(--accent) calc(var(--neutral-base) + 0.52) var(--bc-neutral-chroma) h);",
    );
    expect(css).toContain(
      "--surface-secondary: color-mix(in oklab, var(--surface) 96%, var(--foreground) 4%);",
    );
    expect(css).toContain("--neutral-base: 0.48;");
    expect(css).toContain("--neutral-vibrant: 0;");
    expect(css).toContain(
      "--field-background: oklch(from var(--accent) calc(var(--neutral-base) + 0.52) var(--bc-neutral-chroma) h);",
    );
    expect(css).toContain("--field-radius: 0.75rem;");
    expect(css).toContain("--shadow-field: var(--bc-shadow-field-medium);");
    expect(css).toContain("--shadow-surface: var(--bc-shadow-surface-medium);");
    expect(css).toContain("--shadow-overlay: var(--bc-shadow-overlay-medium);");
    expect(css).toContain("--shadow-overlay: none;");
    expect(css).toContain("--cursor-interactive: pointer;");
    expect(css).toContain("--skeleton-animation: shimmer;");
    expect(css).toContain("--border-width: 1px;");
    expect(css).toContain("--ring-offset-width: 2px;");
    expect(css).toContain(".button { text-transform: uppercase; }");
    expect(css).not.toContain("--accent-soft");
    expect(css).not.toContain("--card:");
    expect(css).not.toContain("--form-radius:");
  });

  test("serializes typed tokens and parses them back", () => {
    const designSystem = createDefaultDesignSystem("Typed");
    designSystem.theme.light.neutrals = { base: 0.62, vibrant: true };
    designSystem.theme.light.effects.cursorPointer = false;
    designSystem.theme.light.effects.skeleton = "pulse";
    designSystem.theme.light.effects.shadowSurface = "strong";
    designSystem.theme.light.effects.shadowField = "none";

    const css = exportGlobalCss(designSystem);

    expect(css).toContain("--neutral-base: 0.62;");
    expect(css).toContain("--neutral-vibrant: 1;");
    expect(css).toContain("--cursor-interactive: default;");
    expect(css).toContain("--skeleton-animation: pulse;");
    expect(css).toContain("--shadow-surface: var(--bc-shadow-surface-strong);");
    expect(css).toContain("--shadow-field: none;");

    const imported = importThemeCss(css, createDefaultDesignSystem("Typed"));

    expect(imported.theme.light.neutrals).toEqual({ base: 0.62, vibrant: true });
    expect(imported.theme.light.effects.cursorPointer).toBe(false);
    expect(imported.theme.light.effects.skeleton).toBe("pulse");
    expect(imported.theme.light.effects.shadowSurface).toBe("strong");
    expect(imported.theme.light.effects.shadowField).toBe("none");
    expect(imported.theme.dark.effects.shadowOverlay).toBe("none");
  });

  test("imports recognized values and resets omitted values", () => {
    const current = createDefaultDesignSystem("Test");
    current.theme.light.colors.warning = "hotpink";
    current.identity.description = "Keep me";
    current.components.button.defaultVariant = "outline";

    const imported = importThemeCss(
      `
        [data-theme="light"] {
          --accent: rebeccapurple;
        }
        [data-theme="dark"] {
          --accent: papayawhip;
        }
      `,
      current,
    );

    expect(imported.theme.light.colors.accent).toBe("rebeccapurple");
    expect(imported.theme.dark.colors.accent).toBe("papayawhip");
    expect(imported.theme.light.colors.warning).not.toBe("hotpink");
    expect(imported.identity.description).toBe("Keep me");
    expect(imported.components.button.defaultVariant).toBe("outline");
  });
});
