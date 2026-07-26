import { z } from "zod";

const cssValue = z.string().trim().min(1);
const positiveScale = z.number().positive();
const componentSizeSchema = z.enum(["sm", "md", "lg"]);

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
  input: z
    .object({
      defaultFullWidth: z.boolean(),
      defaultVariant: z.enum(["primary", "secondary"]),
    })
    .default({
      defaultFullWidth: false,
      defaultVariant: "primary",
    }),
});

export const themeTokensSchema = z.object({
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
  }),
  typography: z.object({
    fontHeading: cssValue,
    fontSans: cssValue,
    letterSpacing: cssValue,
    lineHeight: z.number().positive(),
  }),
});

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
    dark: themeTokensSchema,
    light: themeTokensSchema,
  }),
});

export const designSystemJsonSchema = z.toJSONSchema(designSystemSchema);

export type ComponentSettings = z.infer<typeof componentSettingsSchema>;
export type DesignSystem = z.infer<typeof designSystemSchema>;
export type ThemeTokens = z.infer<typeof themeTokensSchema>;
