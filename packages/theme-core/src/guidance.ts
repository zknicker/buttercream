import type { DesignSystem } from "./design-system.ts";

export function exportDesignGuidance(designSystem: DesignSystem): string {
  const { components, identity, rules } = designSystem;
  const sections = [
    `# ${identity.name} design guidance`,
    identity.description,
    identity.website ? `Website: ${identity.website}` : undefined,
    renderSection("Target audience", identity.targetAudience),
    renderSection("Voice and tone", identity.voiceAndTone),
    renderSection("Anti-patterns", identity.antiPatterns),
    renderSection("Agent rules", rules.agent),
    renderIconGuidance(designSystem),
    [
      "## Component defaults",
      "",
      `- Button: \`${components.button.defaultVariant}\`, \`${components.button.defaultSize}\``,
      `- Card: \`${components.card.defaultVariant}\``,
      `- Checkbox: \`${components.checkbox.defaultVariant}\`, \`${components.checkbox.defaultSize}\`${components.checkbox.defaultRounded ? ", rounded" : ""}`,
      `- Drawer: \`${components.drawer.defaultPlacement}\`, \`${components.drawer.defaultBackdrop}\` backdrop`,
      `- Input: \`${components.input.defaultVariant}\`${components.input.defaultFullWidth ? ", full width" : ""}`,
      `- Modal: \`${components.modal.defaultPlacement}\`, \`${components.modal.defaultBackdrop}\` backdrop`,
      `- Popover: \`${components.popover.defaultSide}\``,
      `- Radio group: \`${components.radioGroup.defaultVariant}\`, \`${components.radioGroup.defaultSize}\`, \`${components.radioGroup.defaultOrientation}\``,
      `- Select: ${components.select.defaultMultiple ? "multiple" : "single"}`,
      `- Slider: \`${components.slider.defaultSize}\``,
      `- Switch: \`${components.switch.defaultSize}\``,
      `- Tabs: \`${components.tabs.defaultVariant}\`, \`${components.tabs.defaultOrientation}\``,
      `- Tooltip: \`${components.tooltip.defaultSide}\`, ${components.tooltip.defaultDelay}ms delay`,
      `- Avatar: \`${components.avatar.defaultShape}\`, \`${components.avatar.defaultSize}\``,
    ].join("\n"),
    [
      "## Interface contract",
      "",
      "- Use `@buttercream/react` components before authoring new primitives.",
      "- Use semantic variables from the project theme; do not hardcode component-local colors.",
      "- Preserve Buttercream compound component structure and Base UI behavior.",
      "- Customize globally through public BEM classes or reusable semantic tokens.",
      "- Keep light and dark themes complete.",
      "",
    ].join("\n"),
  ].filter(Boolean);

  return `${sections.join("\n\n").trim()}\n`;
}

function renderIconGuidance(designSystem: DesignSystem): string {
  const { icons } = designSystem;
  const usesStrokeWidth = icons.family === "lucide" || icons.treatment.startsWith("stroke-");
  const sharedRules = [
    `- Family: \`${icons.family}\`; treatment: \`${icons.treatment}\`.`,
    usesStrokeWidth
      ? `- Default size: ${icons.size}px; stroke width: ${icons.strokeWidth}.`
      : `- Default size: ${icons.size}px.`,
    "- Use this family and treatment consistently. Do not mix icon libraries or treatments.",
    "- Import icons from the library package; do not copy SVG paths into product code.",
  ];

  if (icons.family === "lucide") {
    return [
      "## Icons",
      "",
      ...sharedRules,
      "- Add `lucide-react` to the consumer app.",
      "- Import named icons from `lucide-react`.",
      `- Render icons with \`size={${icons.size}}\` and \`strokeWidth={${icons.strokeWidth}}\`.`,
    ].join("\n");
  }

  const corePackage = `@hugeicons-pro/core-${icons.treatment}`;
  return [
    "## Icons",
    "",
    ...sharedRules,
    `- Add \`@hugeicons/react\` and \`${corePackage}\` to the consumer app.`,
    `- Import \`HugeiconsIcon\` from \`@hugeicons/react\` and icon data from \`${corePackage}\`.`,
    usesStrokeWidth
      ? `- Render icons with \`size={${icons.size}}\` and \`strokeWidth={${icons.strokeWidth}}\`.`
      : `- Render icons with \`size={${icons.size}}\`.`,
  ].join("\n");
}

function renderSection(title: string, value: string | undefined): string | undefined {
  const content = value?.trim();
  if (!content) {
    return undefined;
  }

  return `## ${title}\n\n${content}`;
}
