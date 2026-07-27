import { z } from "zod";

const cssValue = z.string().trim().min(1);
const positiveScale = z.number().positive();
const componentSizeSchema = z.enum(["sm", "md", "lg"]);
const componentSideSchema = z.enum(["top", "right", "bottom", "left"]);
const backdropVariantSchema = z.enum(["opaque", "blur", "transparent"]);

/**
 * Shadows are authored as a level, never as raw CSS. `@buttercream/styles` maps each level to a
 * per-theme stack (`--bc-shadow-<kind>-<level>`); light and dark stacks are authored separately.
 */
export const shadowLevelSchema = z.enum(["none", "subtle", "medium", "strong"]);
export const skeletonStyleSchema = z.enum(["shimmer", "pulse", "none"]);

export const hugeiconsTreatmentSchema = z.enum([
  "stroke-rounded",
  "stroke-sharp",
  "stroke-standard",
  "solid-rounded",
  "solid-sharp",
  "solid-standard",
  "bulk-rounded",
  "duotone-rounded",
  "duotone-standard",
  "twotone-rounded",
]);

export const defaultIconSettings = {
  family: "hugeicons",
  size: 16,
  strokeWidth: 2,
  treatment: "stroke-rounded",
} as const;

export const iconSettingsSchema = z.discriminatedUnion("family", [
  z.object({
    family: z.literal("lucide"),
    size: z.number().positive(),
    strokeWidth: z.number().positive(),
    treatment: z.literal("stroke"),
  }),
  z.object({
    family: z.literal("hugeicons"),
    size: z.number().positive(),
    strokeWidth: z.number().positive(),
    treatment: hugeiconsTreatmentSchema,
  }),
]);

export const componentSettingsSchema = z.object({
  avatar: z.object({
    defaultShape: z.enum(["square", "rounded", "circle"]),
    defaultSize: componentSizeSchema,
  }),
  button: z.object({
    defaultSize: componentSizeSchema,
    defaultVariant: z.enum([
      "primary",
      "secondary",
      "tertiary",
      "outline",
      "ghost",
      "danger",
      "danger-soft",
    ]),
  }),
  card: z.object({
    defaultVariant: z.enum(["default", "secondary", "tertiary", "transparent"]),
  }),
  checkbox: z
    .object({
      defaultRounded: z.boolean(),
      defaultSize: componentSizeSchema,
      defaultVariant: z.enum(["primary", "secondary"]),
    })
    .default({
      defaultRounded: false,
      defaultSize: "md",
      defaultVariant: "primary",
    }),
  drawer: z
    .object({
      defaultBackdrop: backdropVariantSchema,
      defaultPlacement: componentSideSchema,
    })
    .default({
      defaultBackdrop: "opaque",
      defaultPlacement: "bottom",
    }),
  input: z
    .object({
      defaultFullWidth: z.boolean(),
      defaultVariant: z.enum(["primary", "secondary"]),
    })
    .default({
      defaultFullWidth: false,
      defaultVariant: "primary",
    }),
  modal: z
    .object({
      defaultBackdrop: backdropVariantSchema,
      defaultPlacement: z.enum(["auto", "top", "center", "bottom"]),
    })
    .default({
      defaultBackdrop: "opaque",
      defaultPlacement: "auto",
    }),
  popover: z
    .object({
      defaultSide: componentSideSchema,
    })
    .default({
      defaultSide: "bottom",
    }),
  radioGroup: z
    .object({
      defaultOrientation: z.enum(["horizontal", "vertical"]),
      defaultSize: componentSizeSchema,
      defaultVariant: z.enum(["primary", "secondary"]),
    })
    .default({
      defaultOrientation: "vertical",
      defaultSize: "md",
      defaultVariant: "primary",
    }),
  select: z
    .object({
      defaultMultiple: z.boolean(),
    })
    .default({
      defaultMultiple: false,
    }),
  slider: z
    .object({
      defaultSize: componentSizeSchema,
    })
    .default({
      defaultSize: "md",
    }),
  switch: z
    .object({
      defaultSize: componentSizeSchema,
    })
    .default({
      defaultSize: "md",
    }),
  tabs: z
    .object({
      defaultOrientation: z.enum(["horizontal", "vertical"]),
      defaultVariant: z.enum(["primary", "secondary"]),
    })
    .default({
      defaultOrientation: "horizontal",
      defaultVariant: "primary",
    }),
  tooltip: z
    .object({
      defaultDelay: z.number().int().nonnegative(),
      defaultSide: componentSideSchema,
    })
    .default({
      defaultDelay: 600,
      defaultSide: "top",
    }),
});

/**
 * Authored tokens only. Derived tokens (`*-hover`, `*-soft*`, `background-secondary/-tertiary/
 * -inverse`, `surface-hover`, `border-secondary/-tertiary`, `separator-secondary/-tertiary`,
 * `field-background-hover`, `field-border-hover/-focus`, the `radius-*` steps, and the `text-*`
 * scale) are fixed projections computed in `@buttercream/styles` and never stored here.
 */
function createThemeTokensSchema(
  shadowOverlay: z.infer<typeof shadowLevelSchema>,
  backdrop: string,
) {
  return z.object({
    colors: z.object({
      accent: cssValue,
      accentForeground: cssValue,
      backdrop: cssValue.default(backdrop),
      background: cssValue,
      border: cssValue,
      danger: cssValue,
      dangerForeground: cssValue,
      default: cssValue,
      defaultForeground: cssValue,
      focus: cssValue,
      foreground: cssValue,
      link: cssValue,
      muted: cssValue,
      overlay: cssValue,
      overlayForeground: cssValue,
      separator: cssValue,
      success: cssValue,
      successForeground: cssValue,
      surface: cssValue,
      surfaceForeground: cssValue,
      surfaceSecondary: cssValue,
      surfaceTertiary: cssValue,
      warning: cssValue,
      warningForeground: cssValue,
    }),
    corners: z.object({
      fieldRadius: cssValue,
      radius: cssValue,
    }),
    density: z.object({
      fontSize: positiveScale,
      spacing: positiveScale,
    }),
    effects: z.object({
      borderWidth: cssValue,
      cursorPointer: z.boolean().default(true),
      disabledOpacity: z.number().min(0).max(1),
      fieldBorderWidth: cssValue,
      ringOffsetWidth: cssValue,
      shadowField: shadowLevelSchema.default("medium"),
      shadowOverlay: shadowLevelSchema.default(shadowOverlay),
      shadowSurface: shadowLevelSchema.default("medium"),
      skeleton: skeletonStyleSchema.default("shimmer"),
    }),
    fields: z.object({
      background: cssValue,
      border: cssValue,
      focus: cssValue,
      foreground: cssValue,
      placeholder: cssValue,
    }),
    /**
     * Generator inputs for the neutral family (`background`, `foreground`, `default`, `surface`,
     * `overlay`, `field-background`). Hue comes from the accent, chroma is a small constant when
     * `vibrant` is on (0 when off), and each role's lightness sits at a fixed per-theme offset
     * from `base`. The neutral colour tokens stay authored (and individually pinnable) — their
     * default values are CSS expressions over `--neutral-base` and `--neutral-vibrant`.
     */
    neutrals: z
      .object({
        base: z.number().min(0).max(1),
        vibrant: z.boolean(),
      })
      .default({ base: 0.48, vibrant: false }),
    typography: z.object({
      fontHeading: cssValue,
      fontMono: cssValue,
      fontSans: cssValue,
      letterSpacing: cssValue,
      lineHeight: z.number().positive(),
    }),
  });
}

export const themeTokensSchema = createThemeTokensSchema("medium", "rgb(0 0 0 / 0.38)");

export const designSystemSchema = z.object({
  components: componentSettingsSchema,
  identity: z.object({
    antiPatterns: z.string().optional(),
    description: z.string().optional(),
    name: z.string().trim().min(1),
    targetAudience: z.string().optional(),
    voiceAndTone: z.string().optional(),
    website: z.string().optional(),
  }),
  icons: iconSettingsSchema.default(defaultIconSettings),
  rules: z.object({
    agent: z.string(),
    customCss: z.string(),
  }),
  schemaVersion: z.literal(2),
  theme: z.object({
    dark: createThemeTokensSchema("none", "rgb(0 0 0 / 0.56)"),
    light: themeTokensSchema,
  }),
});

export const designSystemJsonSchema = z.toJSONSchema(designSystemSchema);

export type ComponentSettings = z.infer<typeof componentSettingsSchema>;
export type DesignSystem = z.infer<typeof designSystemSchema>;
export type HugeiconsTreatment = z.infer<typeof hugeiconsTreatmentSchema>;
export type IconSettings = z.infer<typeof iconSettingsSchema>;
export type ShadowLevel = z.infer<typeof shadowLevelSchema>;
export type SkeletonStyle = z.infer<typeof skeletonStyleSchema>;
export type ThemeTokens = z.infer<typeof themeTokensSchema>;
