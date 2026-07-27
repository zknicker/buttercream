import { defaultDarkTheme, defaultLightTheme } from "./defaults.ts";
import type { DesignSystem, ThemeTokens } from "./design-system.ts";

/**
 * Buttercream's own preset library. A preset is a reusable starting value for a new design
 * system: applying one replaces both theme blocks with the defaults plus the preset's
 * overrides, and leaves identity, components, icons, and rules untouched. All presets are
 * Buttercream-owned — never mirror another company's brand identity here.
 */

/** Two-level partial: every theme section is optional, and each section's keys are optional. */
export type ThemeTokenOverrides = {
  [Section in keyof ThemeTokens]?: Partial<ThemeTokens[Section]>;
};

export type ThemePresetId = "default" | "sky" | "lavender" | "mint" | "brutalism" | "glass";

export interface ThemePreset {
  description: string;
  id: ThemePresetId;
  name: string;
  overrides: {
    /** Applied to both themes, before the per-theme overrides. */
    shared?: ThemeTokenOverrides;
    dark?: ThemeTokenOverrides;
    light?: ThemeTokenOverrides;
  };
}

export const themePresets: readonly ThemePreset[] = [
  {
    description: "Buttercream's warm near-black starting point.",
    id: "default",
    name: "Default",
    overrides: {},
  },
  {
    description: "A clear blue accent with softly blue-tinted neutrals.",
    id: "sky",
    name: "Sky",
    overrides: {
      dark: {
        colors: { accent: "#38bdf8", accentForeground: "#082f49" },
      },
      light: {
        colors: { accent: "#0284c7", accentForeground: "#ffffff" },
      },
      shared: {
        neutrals: { vibrant: true },
      },
    },
  },
  {
    description: "A violet accent over gently lavender neutrals.",
    id: "lavender",
    name: "Lavender",
    overrides: {
      dark: {
        colors: { accent: "#a78bfa", accentForeground: "#2e1065" },
      },
      light: {
        colors: { accent: "#8b5cf6", accentForeground: "#ffffff" },
      },
      shared: {
        neutrals: { vibrant: true },
      },
    },
  },
  {
    description: "A fresh green accent with cool mint-tinted neutrals.",
    id: "mint",
    name: "Mint",
    overrides: {
      dark: {
        colors: { accent: "#34d399", accentForeground: "#022c22" },
      },
      light: {
        colors: { accent: "#10b981", accentForeground: "#04281c" },
      },
      shared: {
        neutrals: { vibrant: true },
      },
    },
  },
  {
    description: "Square corners, heavy borders, and no shadows anywhere.",
    id: "brutalism",
    name: "Brutalism",
    overrides: {
      dark: {
        colors: { accent: "#fafafa", accentForeground: "#111111" },
      },
      light: {
        colors: { accent: "#111111", accentForeground: "#ffffff" },
      },
      shared: {
        colors: {
          border: "var(--foreground)",
          separator: "color-mix(in oklab, var(--foreground) 40%, transparent)",
        },
        corners: { fieldRadius: "0rem", radius: "0rem" },
        effects: {
          borderWidth: "2px",
          fieldBorderWidth: "2px",
          shadowField: "none",
          shadowOverlay: "none",
          shadowSurface: "none",
        },
        fields: { border: "var(--foreground)" },
      },
    },
  },
  {
    description: "Translucent surfaces, generous corners, and deep floating shadows.",
    id: "glass",
    name: "Glass",
    overrides: {
      dark: {
        colors: {
          overlay: "rgb(38 37 36 / 0.78)",
          surface: "rgb(255 255 255 / 0.06)",
        },
        fields: { background: "rgb(255 255 255 / 0.05)" },
      },
      light: {
        colors: {
          overlay: "rgb(255 255 255 / 0.68)",
          surface: "rgb(255 255 255 / 0.55)",
        },
        fields: { background: "rgb(255 255 255 / 0.5)" },
      },
      shared: {
        corners: { fieldRadius: "1rem", radius: "1rem" },
        effects: {
          shadowField: "subtle",
          shadowOverlay: "strong",
          shadowSurface: "subtle",
        },
        neutrals: { vibrant: true },
      },
    },
  },
];

export function getThemePreset(id: string): ThemePreset | undefined {
  return themePresets.find((preset) => preset.id === id);
}

/**
 * Returns a new document whose light and dark themes are the defaults plus the preset's
 * overrides. Identity, components, icons, and rules carry over from the given document.
 */
export function applyThemePreset(designSystem: DesignSystem, preset: ThemePreset): DesignSystem {
  const next = structuredClone(designSystem);
  next.theme.light = mergeTheme(defaultLightTheme, preset.overrides.shared, preset.overrides.light);
  next.theme.dark = mergeTheme(defaultDarkTheme, preset.overrides.shared, preset.overrides.dark);
  return next;
}

function mergeTheme(
  base: ThemeTokens,
  ...overrides: readonly (ThemeTokenOverrides | undefined)[]
): ThemeTokens {
  const theme = structuredClone(base);

  for (const override of overrides) {
    if (!override) {
      continue;
    }
    for (const [section, values] of Object.entries(override)) {
      Object.assign(theme[section as keyof ThemeTokens] as object, values);
    }
  }

  return theme;
}
