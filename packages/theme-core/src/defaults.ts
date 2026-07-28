import { type DesignSystem, defaultIconSettings, type ThemeTokens } from "./design-system.ts";

export { defaultIconSettings };

const sharedTypography: ThemeTokens["typography"] = {
  fontHeading: "ui-rounded, system-ui, sans-serif",
  fontMono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSans: "Inter, ui-sans-serif, system-ui, sans-serif",
  letterSpacing: "0em",
  lineHeight: 1.4,
};

const sharedDensity: ThemeTokens["density"] = {
  fontSize: 1,
  spacing: 1,
};

const sharedCorners: ThemeTokens["corners"] = {
  fieldRadius: "0.75rem",
  radius: "0.5rem",
};

const sharedNeutrals: ThemeTokens["neutrals"] = {
  base: 0.48,
  vibrant: false,
};

/*
 * Neutral defaults are generator expressions, not literals: hue comes from the accent, chroma
 * from `--bc-neutral-chroma` (0.0093 when `--neutral-vibrant` is 1, otherwise 0), and lightness
 * from `--neutral-base` plus a fixed per-role, per-theme offset. At the default base of 0.48 the
 * offsets land on the lightness of the previous literal palette. Pinning a token in the
 * Variables tab simply replaces the expression with a literal.
 */
function neutral(offset: number): string {
  const sign = offset < 0 ? "-" : "+";
  return `oklch(from var(--accent) calc(var(--neutral-base) ${sign} ${Math.abs(offset)}) var(--bc-neutral-chroma) h)`;
}

export const defaultLightTheme: ThemeTokens = {
  colors: {
    accent: "#0485f7",
    accentForeground: "#ffffff",
    backdrop: "rgb(0 0 0 / 0.38)",
    background: neutral(0.4902),
    border: neutral(0.42),
    danger: "#ff383c",
    dangerForeground: "#ffffff",
    default: neutral(0.46),
    defaultForeground: "var(--foreground)",
    focus: "var(--accent)",
    foreground: neutral(-0.2697),
    link: "var(--foreground)",
    muted: neutral(0.0717),
    overlay: neutral(0.52),
    overlayForeground: "var(--foreground)",
    separator: neutral(0.44),
    success: "#17c964",
    successForeground: "#ffffff",
    surface: neutral(0.52),
    surfaceForeground: "var(--foreground)",
    surfaceSecondary: "color-mix(in oklab, var(--surface) 96%, var(--foreground) 4%)",
    surfaceTertiary: "color-mix(in oklab, var(--surface) 92%, var(--foreground) 8%)",
    warning: "#f5a524",
    warningForeground: "#1b1b1b",
  },
  corners: sharedCorners,
  density: sharedDensity,
  effects: {
    borderWidth: "1px",
    cursorPointer: true,
    disabledOpacity: 0.5,
    fieldBorderWidth: "0px",
    ringOffsetWidth: "2px",
    shadowField: "medium",
    shadowOverlay: "medium",
    shadowSurface: "medium",
    skeleton: "shimmer",
  },
  fields: {
    background: neutral(0.52),
    border: "color-mix(in oklab, var(--foreground) 14%, transparent)",
    focus: "color-mix(in oklab, var(--field-background) 96%, var(--foreground) 4%)",
    foreground: "var(--foreground)",
    placeholder: "color-mix(in oklab, var(--foreground) 48%, transparent)",
  },
  neutrals: { ...sharedNeutrals },
  typography: sharedTypography,
};

export const defaultDarkTheme: ThemeTokens = {
  colors: {
    accent: "#0485f7",
    accentForeground: "#ffffff",
    backdrop: "rgb(0 0 0 / 0.56)",
    background: neutral(-0.28),
    border: "color-mix(in oklab, var(--foreground) 14%, transparent)",
    danger: "#ff5d7d",
    dangerForeground: "#1c1917",
    default: neutral(-0.18),
    defaultForeground: "var(--foreground)",
    focus: "var(--accent)",
    foreground: neutral(0.49),
    link: "var(--foreground)",
    muted: "color-mix(in oklab, var(--foreground) 60%, transparent)",
    overlay: neutral(-0.24),
    overlayForeground: "var(--foreground)",
    separator: "color-mix(in oklab, var(--foreground) 14%, transparent)",
    success: "#5bc86b",
    successForeground: "#102414",
    surface: neutral(-0.24),
    surfaceForeground: "var(--foreground)",
    surfaceSecondary: "color-mix(in oklab, var(--surface) 96%, var(--foreground) 4%)",
    surfaceTertiary: "color-mix(in oklab, var(--surface) 92%, var(--foreground) 8%)",
    warning: "#ffb340",
    warningForeground: "#2a1b00",
  },
  corners: sharedCorners,
  density: sharedDensity,
  effects: {
    borderWidth: "1px",
    cursorPointer: true,
    disabledOpacity: 0.5,
    fieldBorderWidth: "0px",
    ringOffsetWidth: "2px",
    shadowField: "medium",
    shadowOverlay: "none",
    shadowSurface: "medium",
    skeleton: "shimmer",
  },
  fields: {
    background: neutral(-0.24),
    border: "color-mix(in oklab, var(--foreground) 14%, transparent)",
    focus: "color-mix(in oklab, var(--field-background) 96%, var(--foreground) 4%)",
    foreground: "var(--foreground)",
    placeholder: "color-mix(in oklab, var(--foreground) 48%, transparent)",
  },
  neutrals: { ...sharedNeutrals },
  typography: sharedTypography,
};

export function createDefaultDesignSystem(name = "Untitled design system"): DesignSystem {
  return {
    components: {
      avatar: {
        defaultShape: "rounded",
        defaultSize: "md",
      },
      button: {
        defaultSize: "md",
        defaultVariant: "primary",
      },
      card: {
        defaultVariant: "default",
      },
      checkbox: {
        defaultRounded: false,
        defaultSize: "md",
        defaultVariant: "primary",
      },
      drawer: {
        defaultBackdrop: "opaque",
        defaultPlacement: "bottom",
      },
      input: {
        defaultFullWidth: false,
        defaultVariant: "primary",
      },
      modal: {
        defaultBackdrop: "opaque",
        defaultPlacement: "auto",
      },
      popover: {
        defaultSide: "bottom",
      },
      radioGroup: {
        defaultOrientation: "vertical",
        defaultSize: "md",
        defaultVariant: "primary",
      },
      select: {
        defaultMultiple: false,
      },
      slider: {
        defaultSize: "md",
      },
      switch: {
        defaultSize: "md",
      },
      tabs: {
        defaultOrientation: "horizontal",
        defaultVariant: "primary",
      },
      tooltip: {
        defaultDelay: 600,
        defaultSide: "top",
      },
    },
    identity: {
      name,
    },
    icons: { ...defaultIconSettings },
    rules: {
      agent: "",
      customCss: "",
    },
    schemaVersion: 2,
    theme: {
      dark: structuredClone(defaultDarkTheme),
      light: structuredClone(defaultLightTheme),
    },
  };
}
