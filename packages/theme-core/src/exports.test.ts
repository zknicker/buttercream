import { describe, expect, test } from "bun:test";
import { createDefaultDesignSystem } from "./defaults.ts";
import { designSystemJsonSchema } from "./design-system.ts";
import {
  createDesignSystemExports,
  exportDesignSystemJson,
  importDesignSystemJson,
  importDesignSystemSource,
} from "./exports.ts";

describe("design-system exports", () => {
  test("round-trips the complete canonical document", () => {
    const designSystem = createDefaultDesignSystem("Round trip");
    designSystem.components.button.defaultVariant = "outline";
    designSystem.identity.voiceAndTone = "Direct and warm.";
    designSystem.rules.agent = "Prefer visible labels.";
    designSystem.rules.customCss = ".button { text-transform: uppercase; }";

    const imported = importDesignSystemJson(exportDesignSystemJson(designSystem));

    expect(imported).toEqual(designSystem);
  });

  test("creates the complete project export set", () => {
    const exports = createDesignSystemExports(
      createDefaultDesignSystem("Project"),
      "https://buttercream.studio/ds/ds_example",
    );

    expect(exports.map((item) => item.filename)).toEqual([
      "global.css",
      "DESIGN.md",
      "buttercream.json",
      "design-system.json",
    ]);
    expect(exports[2]?.content).toContain("https://buttercream.studio/ds/ds_example");
  });

  test("auto-detects JSON and CSS imports", () => {
    const current = createDefaultDesignSystem("Current");
    const replacement = createDefaultDesignSystem("Replacement");

    expect(importDesignSystemSource(exportDesignSystemJson(replacement), current)).toEqual(
      replacement,
    );
    expect(
      importDesignSystemSource('[data-theme="light"] { --accent: rebeccapurple; }', current).theme
        .light.colors.accent,
    ).toBe("rebeccapurple");
  });

  test("publishes the canonical JSON schema", () => {
    expect(designSystemJsonSchema.type).toBe("object");
    expect(designSystemJsonSchema.properties).toHaveProperty("components");
    expect(designSystemJsonSchema.properties).toHaveProperty("theme");
  });
});
