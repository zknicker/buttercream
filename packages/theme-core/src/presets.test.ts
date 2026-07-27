import { describe, expect, test } from "bun:test";
import { createDefaultDesignSystem, defaultDarkTheme, defaultLightTheme } from "./defaults.ts";
import { designSystemSchema } from "./design-system.ts";
import { applyThemePreset, getThemePreset, themePresets } from "./presets.ts";

describe("theme presets", () => {
  test("ships the Buttercream-owned preset set", () => {
    expect(themePresets.map((preset) => preset.id)).toEqual([
      "default",
      "sky",
      "lavender",
      "mint",
      "brutalism",
      "glass",
    ]);
    expect(getThemePreset("sky")?.name).toBe("Sky");
    expect(getThemePreset("netflix")).toBeUndefined();
  });

  test("every preset produces a valid canonical document", () => {
    const base = createDefaultDesignSystem("Presets");

    for (const preset of themePresets) {
      const applied = applyThemePreset(base, preset);
      expect(designSystemSchema.safeParse(applied).success).toBe(true);
    }
  });

  test("the default preset restores the default themes", () => {
    const edited = createDefaultDesignSystem("Edited");
    edited.theme.light.colors.accent = "hotpink";
    edited.theme.dark.corners.radius = "2rem";

    const preset = getThemePreset("default");
    if (!preset) {
      throw new Error("missing default preset");
    }
    const applied = applyThemePreset(edited, preset);

    expect(applied.theme.light).toEqual(defaultLightTheme);
    expect(applied.theme.dark).toEqual(defaultDarkTheme);
  });

  test("presets layer shared and per-theme overrides over the defaults", () => {
    const preset = getThemePreset("sky");
    if (!preset) {
      throw new Error("missing sky preset");
    }
    const applied = applyThemePreset(createDefaultDesignSystem("Sky"), preset);

    expect(applied.theme.light.colors.accent).toBe("#0284c7");
    expect(applied.theme.dark.colors.accent).toBe("#38bdf8");
    expect(applied.theme.light.neutrals.vibrant).toBe(true);
    expect(applied.theme.dark.neutrals.vibrant).toBe(true);
    // Untouched sections keep the defaults.
    expect(applied.theme.light.colors.danger).toBe(defaultLightTheme.colors.danger);
    expect(applied.theme.light.corners).toEqual(defaultLightTheme.corners);
  });

  test("presets preserve identity, components, icons, and rules", () => {
    const base = createDefaultDesignSystem("Keep me");
    base.identity.description = "A description";
    base.components.button.defaultVariant = "outline";
    base.rules.agent = "Prefer visible labels.";

    const preset = getThemePreset("brutalism");
    if (!preset) {
      throw new Error("missing brutalism preset");
    }
    const applied = applyThemePreset(base, preset);

    expect(applied.identity).toEqual(base.identity);
    expect(applied.components).toEqual(base.components);
    expect(applied.icons).toEqual(base.icons);
    expect(applied.rules).toEqual(base.rules);
    expect(applied.theme.light.corners.radius).toBe("0rem");
    expect(applied.theme.light.effects.shadowSurface).toBe("none");
  });
});
