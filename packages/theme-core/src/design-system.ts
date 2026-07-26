import { z } from "zod";

const cssValue = z.string().trim().min(1);
const positiveScale = z.number().positive();
const componentSizeSchema = z.enum(["sm", "md", "lg"]);
const componentSideSchema = z.enum(["top", "right", "bottom", "left"]);
const backdropVariantSchema = z.enum(["opaque", "blur", "transparent"]);
const defaultOverlayShadow = "0 12px 32px rgb(0 0 0 / 0.12), 0 2px 8px rgb(0 0 0 / 0.08)";

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

function createThemeTokensSchema(overlayShadow: string, backdrop: string) {
  return z.object({
    colors: z.object({
      accent: cssValue,
      accentForeground: cssValue,
      accentSoft: cssValue,
      background: cssValue,
      backdrop: cssValue.default(backdrop),
      border: cssValue,
      card: cssValue,
      cardForeground: cssValue,
      danger: cssValue,
      dangerForeground: cssValue,
      dangerSoft: cssValue,
      default: cssValue,
      defaultForeground: cssValue,
      foreground: cssValue,
      ring: cssValue,
      success: cssValue,
      successForeground: cssValue,
      successSoft: cssValue,
      warning: cssValue,
      warningForeground: cssValue,
      warningSoft: cssValue,
    }),
    corners: z.object({
      formRadius: cssValue,
      radius: cssValue,
    }),
    density: z.object({
      fontSize: positiveScale,
      spacing: positiveScale,
    }),
    effects: z.object({
      disabledOpacity: z.number().min(0).max(1),
      fieldBorder: cssValue,
      fieldShadow: cssValue.default("0 2px 4px rgb(0 0 0 / 0.08), 0 1px 2px rgb(0 0 0 / 0.1)"),
      hardShadowColor: cssValue,
      hardShadowDepth: cssValue,
      overlayShadow: cssValue.default(overlayShadow),
    }),
    typography: z.object({
      fontHeading: cssValue,
      fontSans: cssValue,
      letterSpacing: cssValue,
      lineHeight: z.number().positive(),
    }),
  });
}

export const themeTokensSchema = createThemeTokensSchema(defaultOverlayShadow, "rgb(0 0 0 / 0.38)");

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
export type ThemeTokens = z.infer<typeof themeTokensSchema>;
