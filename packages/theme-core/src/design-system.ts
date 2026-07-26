import { z } from "zod";

const cssValue = z.string().trim().min(1);
const positiveScale = z.number().positive();
const componentSizeSchema = z.enum(["sm", "md", "lg"]);
const defaultOverlayShadow = "0 12px 32px rgb(0 0 0 / 0.12), 0 2px 8px rgb(0 0 0 / 0.08)";

export const componentSettingsSchema = z.object({
  avatar: z.object({
    defaultShape: z.enum(["square", "rounded"]),
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
    defaultVariant: z.enum(["default", "secondary"]),
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
  input: z
    .object({
      defaultFullWidth: z.boolean(),
      defaultVariant: z.enum(["primary", "secondary"]),
    })
    .default({
      defaultFullWidth: false,
      defaultVariant: "primary",
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
});

function createThemeTokensSchema(overlayShadow: string) {
  return z.object({
    colors: z.object({
      accent: cssValue,
      accentForeground: cssValue,
      accentSoft: cssValue,
      background: cssValue,
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

export const themeTokensSchema = createThemeTokensSchema(defaultOverlayShadow);

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
  rules: z.object({
    agent: z.string(),
    customCss: z.string(),
  }),
  schemaVersion: z.literal(2),
  theme: z.object({
    dark: createThemeTokensSchema("none"),
    light: themeTokensSchema,
  }),
});

export const designSystemJsonSchema = z.toJSONSchema(designSystemSchema);

export type ComponentSettings = z.infer<typeof componentSettingsSchema>;
export type DesignSystem = z.infer<typeof designSystemSchema>;
export type ThemeTokens = z.infer<typeof themeTokensSchema>;
