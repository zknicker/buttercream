import { describe, expect, test } from "bun:test";
import { createDefaultDesignSystem } from "./defaults.ts";
import { designSystemJsonSchema, designSystemSchema, iconSettingsSchema } from "./design-system.ts";
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
    expect(designSystemJsonSchema.properties).toHaveProperty("icons");
    expect(designSystemJsonSchema.properties).toHaveProperty("theme");
  });

  test("constrains icon families to supported treatments", () => {
    expect(
      iconSettingsSchema.parse({
        family: "lucide",
        size: 20,
        strokeWidth: 1.5,
        treatment: "stroke",
      }),
    ).toEqual({
      family: "lucide",
      size: 20,
      strokeWidth: 1.5,
      treatment: "stroke",
    });
    expect(
      iconSettingsSchema.parse({
        family: "hugeicons",
        size: 16,
        strokeWidth: 2,
        treatment: "duotone-standard",
      }),
    ).toEqual({
      family: "hugeicons",
      size: 16,
      strokeWidth: 2,
      treatment: "duotone-standard",
    });
    expect(
      iconSettingsSchema.safeParse({
        family: "lucide",
        size: 16,
        strokeWidth: 2,
        treatment: "solid",
      }).success,
    ).toBe(false);
    expect(
      iconSettingsSchema.safeParse({
        family: "hugeicons",
        size: 16,
        strokeWidth: 2,
        treatment: "bulk-sharp",
      }).success,
    ).toBe(false);
  });

  test("fills additive component defaults in version 2 documents", () => {
    const current = createDefaultDesignSystem("Legacy");
    const {
      checkbox: _checkbox,
      drawer: _drawer,
      input: _input,
      modal: _modal,
      popover: _popover,
      radioGroup: _radioGroup,
      select: _select,
      slider: _slider,
      switch: _switch,
      tabs: _tabs,
      tooltip: _tooltip,
      ...components
    } = current.components;
    const { icons: _icons, ...documentWithoutIcons } = current;
    const { backdrop: _lightBackdrop, ...lightColors } = current.theme.light.colors;
    const { backdrop: _darkBackdrop, ...darkColors } = current.theme.dark.colors;
    const {
      cursorPointer: _lightCursorPointer,
      shadowOverlay: _lightShadowOverlay,
      skeleton: _lightSkeleton,
      ...lightEffects
    } = current.theme.light.effects;
    const { shadowOverlay: _darkShadowOverlay, ...darkEffects } = current.theme.dark.effects;
    const { neutrals: _lightNeutrals, ...lightTheme } = current.theme.light;
    const source = JSON.stringify({
      ...documentWithoutIcons,
      components,
      theme: {
        dark: { ...current.theme.dark, colors: darkColors, effects: darkEffects },
        light: { ...lightTheme, colors: lightColors, effects: lightEffects },
      },
    });

    const imported = importDesignSystemJson(source);

    expect(imported.components.checkbox).toEqual({
      defaultRounded: false,
      defaultSize: "md",
      defaultVariant: "primary",
    });
    expect(imported.components.drawer).toEqual({
      defaultBackdrop: "opaque",
      defaultPlacement: "bottom",
    });
    expect(imported.components.input).toEqual({
      defaultFullWidth: false,
      defaultVariant: "primary",
    });
    expect(imported.components.modal).toEqual({
      defaultBackdrop: "opaque",
      defaultPlacement: "auto",
    });
    expect(imported.components.popover).toEqual({
      defaultSide: "bottom",
    });
    expect(imported.components.radioGroup).toEqual({
      defaultOrientation: "vertical",
      defaultSize: "md",
      defaultVariant: "primary",
    });
    expect(imported.components.select).toEqual({
      defaultMultiple: false,
    });
    expect(imported.components.slider).toEqual({
      defaultSize: "md",
    });
    expect(imported.components.switch).toEqual({
      defaultSize: "md",
    });
    expect(imported.components.tabs).toEqual({
      defaultOrientation: "horizontal",
      defaultVariant: "primary",
    });
    expect(imported.components.tooltip).toEqual({
      defaultDelay: 600,
      defaultSide: "top",
    });
    expect(imported.icons).toEqual({
      family: "hugeicons",
      size: 16,
      strokeWidth: 2,
      treatment: "stroke-rounded",
    });
    expect(imported.theme.light.effects.shadowOverlay).toBe("medium");
    expect(imported.theme.dark.effects.shadowOverlay).toBe("none");
    expect(imported.theme.light.effects.cursorPointer).toBe(true);
    expect(imported.theme.light.effects.skeleton).toBe("shimmer");
    expect(imported.theme.light.neutrals).toEqual({ base: 0.48, vibrant: false });
    expect(imported.theme.light.colors.backdrop).toBe("rgb(0 0 0 / 0.38)");
    expect(imported.theme.dark.colors.backdrop).toBe("rgb(0 0 0 / 0.56)");
  });

  test("keeps the schema version while defaulting additive icon settings", () => {
    const current = createDefaultDesignSystem("Legacy");
    const { icons: _icons, ...legacyDocument } = current;

    const imported = designSystemSchema.parse(legacyDocument);

    expect(imported.schemaVersion).toBe(2);
    expect(imported.icons).toEqual({
      family: "hugeicons",
      size: 16,
      strokeWidth: 2,
      treatment: "stroke-rounded",
    });
  });

  test("exports dependency and import guidance for the chosen icon family", () => {
    const lucide = createDefaultDesignSystem("Lucide");
    lucide.icons = {
      family: "lucide",
      size: 20,
      strokeWidth: 1.5,
      treatment: "stroke",
    };
    const lucideGuidance = createDesignSystemExports(lucide, "https://example.com").find(
      (item) => item.filename === "DESIGN.md",
    )?.content;

    expect(lucideGuidance).toContain("Add `lucide-react`");
    expect(lucideGuidance).toContain("Import named icons from `lucide-react`");
    expect(lucideGuidance).toContain("`size={20}` and `strokeWidth={1.5}`");

    const hugeicons = createDefaultDesignSystem("Hugeicons");
    hugeicons.icons = {
      family: "hugeicons",
      size: 16,
      strokeWidth: 2,
      treatment: "solid-sharp",
    };
    const hugeiconsGuidance = createDesignSystemExports(hugeicons, "https://example.com").find(
      (item) => item.filename === "DESIGN.md",
    )?.content;

    expect(hugeiconsGuidance).toContain("`@hugeicons/react`");
    expect(hugeiconsGuidance).toContain("`@hugeicons-pro/core-solid-sharp`");
    expect(hugeiconsGuidance).toContain("`size={16}`");
    expect(hugeiconsGuidance).not.toContain("`strokeWidth={2}`");
  });
});
