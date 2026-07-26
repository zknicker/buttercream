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
    expect(css).toContain("--field-shadow:");
    expect(css).toContain(".button { text-transform: uppercase; }");
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
