import type { DesignSystem, ThemeTokens } from "./design-system.ts";

const sharedTypography: ThemeTokens["typography"] = {
  fontHeading: "ui-rounded, system-ui, sans-serif",
  fontSans: "Inter, ui-sans-serif, system-ui, sans-serif",
  letterSpacing: "0em",
  lineHeight: 1.4,
};

const sharedDensity: ThemeTokens["density"] = {
  fontSize: 1,
  spacing: 1,
};

const sharedCorners: ThemeTokens["corners"] = {
  formRadius: "0.75rem",
  radius: "0.625rem",
};

export const defaultLightTheme: ThemeTokens = {
  colors: {
    accent: "#1b1b1b",
    accentForeground: "#ffffff",
    accentSoft: "color-mix(in oklab, #1b1b1b 10%, transparent)",
    background: "#f8f8f8",
    border: "color-mix(in oklab, #1b1b1b 14%, transparent)",
    card: "#ffffff",
    cardForeground: "#1b1b1b",
    danger: "#ef476f",
    dangerForeground: "#ffffff",
    dangerSoft: "color-mix(in oklab, #ef476f 15%, transparent)",
    default: "#eaebea",
    defaultForeground: "#1b1b1b",
    foreground: "#292524",
    ring: "#1b1b1b",
    success: "#46a758",
    successForeground: "#ffffff",
    successSoft: "color-mix(in oklab, #46a758 15%, transparent)",
    warning: "#f59e0b",
    warningForeground: "#1b1b1b",
    warningSoft: "color-mix(in oklab, #f59e0b 18%, transparent)",
  },
  corners: sharedCorners,
  density: sharedDensity,
  effects: {
    disabledOpacity: 0.5,
    fieldBorder: "1px",
    fieldShadow:
      "0 2px 4px rgb(0 0 0 / 0.04), 0 1px 2px rgb(0 0 0 / 0.06), 0 0 1px rgb(0 0 0 / 0.06)",
    hardShadowColor: "color-mix(in oklab, #1b1b1b 30%, transparent)",
    hardShadowDepth: "4px",
    overlayShadow: "0 12px 32px rgb(0 0 0 / 0.12), 0 2px 8px rgb(0 0 0 / 0.08)",
  },
  typography: sharedTypography,
};

export const defaultDarkTheme: ThemeTokens = {
  colors: {
    accent: "#f5f5f4",
    accentForeground: "#1c1917",
    accentSoft: "color-mix(in oklab, #f5f5f4 12%, transparent)",
    background: "#161514",
    border: "color-mix(in oklab, #ffffff 14%, transparent)",
    card: "#201f1e",
    cardForeground: "#f5f5f4",
    danger: "#ff5d7d",
    dangerForeground: "#1c1917",
    dangerSoft: "color-mix(in oklab, #ff5d7d 18%, transparent)",
    default: "#302f2d",
    defaultForeground: "#f5f5f4",
    foreground: "#f5f5f4",
    ring: "#f5f5f4",
    success: "#5bc86b",
    successForeground: "#102414",
    successSoft: "color-mix(in oklab, #5bc86b 18%, transparent)",
    warning: "#ffb340",
    warningForeground: "#2a1b00",
    warningSoft: "color-mix(in oklab, #ffb340 20%, transparent)",
  },
  corners: sharedCorners,
  density: sharedDensity,
  effects: {
    disabledOpacity: 0.5,
    fieldBorder: "1px",
    fieldShadow: "0 2px 4px rgb(0 0 0 / 0.24), 0 1px 2px rgb(0 0 0 / 0.3)",
    hardShadowColor: "rgba(0, 0, 0, 0.55)",
    hardShadowDepth: "4px",
    overlayShadow: "none",
  },
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
      input: {
        defaultFullWidth: false,
        defaultVariant: "primary",
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
