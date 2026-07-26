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
    [
      "## Component defaults",
      "",
      `- Button: \`${components.button.defaultVariant}\`, \`${components.button.defaultSize}\``,
      `- Card: \`${components.card.defaultVariant}\``,
      `- Input: \`${components.input.defaultVariant}\`${components.input.defaultFullWidth ? ", full width" : ""}`,
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

function renderSection(title: string, value: string | undefined): string | undefined {
  const content = value?.trim();
  if (!content) {
    return undefined;
  }

  return `## ${title}\n\n${content}`;
}
