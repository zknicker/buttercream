import { z } from "zod";

const cssValue = z.string().trim().min(1);
const positiveScale = z.number().positive();

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
  schemaVersion: z.literal(1),
  theme: z.object({
    dark: themeTokensSchema,
    light: themeTokensSchema,
  }),
});

export type DesignSystem = z.infer<typeof designSystemSchema>;
export type ThemeTokens = z.infer<typeof themeTokensSchema>;
