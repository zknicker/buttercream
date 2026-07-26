import type { DesignSystem } from "@buttercream/theme-core";
import { renderAvatarPreview } from "./preview-avatar.ts";
import { renderButtonPreview } from "./preview-button.ts";
import { renderCardPreview } from "./preview-card.ts";
import { renderCheckboxPreview, renderSwitchPreview } from "./preview-choice-controls.ts";
import { renderDrawerPreview } from "./preview-drawer.ts";
import { renderInputPreview } from "./preview-form-controls.ts";
import { createPreviewIcons } from "./preview-icons.ts";
import { renderModalPreview } from "./preview-modal.ts";
import { renderPopoverPreview } from "./preview-popover.ts";
import { renderRadioGroupPreview } from "./preview-radio-group.ts";
import { renderSelectPreview } from "./preview-select.ts";
import { renderSliderPreview } from "./preview-slider.ts";
import { renderTabsPreview } from "./preview-tabs.ts";
import { renderTooltipPreview } from "./preview-tooltip.ts";

export type PreviewSection =
  | "Guides"
  | "Button"
  | "Input"
  | "Modal"
  | "Drawer"
  | "Popover"
  | "Checkbox"
  | "Radio Group"
  | "Select"
  | "Slider"
  | "Switch"
  | "Tabs"
  | "Tooltip"
  | "Card"
  | "Avatar";

export function renderPreviewSection(
  section: PreviewSection,
  iconSettings: DesignSystem["icons"],
): string {
  if (section === "Guides") {
    return renderGuides();
  }
  if (section === "Card") {
    return renderCardPreview(createPreviewIcons(iconSettings));
  }
  if (section === "Input") {
    return renderInputPreview();
  }
  if (section === "Modal") {
    return renderModalPreview();
  }
  if (section === "Drawer") {
    return renderDrawerPreview();
  }
  if (section === "Popover") {
    return renderPopoverPreview();
  }
  if (section === "Checkbox") {
    return renderCheckboxPreview();
  }
  if (section === "Radio Group") {
    return renderRadioGroupPreview();
  }
  if (section === "Select") {
    return renderSelectPreview();
  }
  if (section === "Slider") {
    return renderSliderPreview();
  }
  if (section === "Switch") {
    return renderSwitchPreview();
  }
  if (section === "Tabs") {
    return renderTabsPreview();
  }
  if (section === "Tooltip") {
    return renderTooltipPreview();
  }
  if (section === "Avatar") {
    return renderAvatarPreview();
  }
  return renderButtonPreview(createPreviewIcons(iconSettings));
}

function renderGuides(): string {
  return `<div class="guide-grid">
    <div class="swatch" style="background:var(--accent);color:var(--accent-foreground)">Accent<br><small>--accent</small></div>
    <div class="swatch" style="background:var(--accent-soft)">Accent soft<br><small>--accent-soft</small></div>
    <div class="swatch" style="background:var(--card)">Card<br><small>--card</small></div>
    <div class="swatch" style="background:var(--success);color:var(--success-foreground)">Success</div>
    <div class="swatch" style="background:var(--warning);color:var(--warning-foreground)">Warning</div>
    <div class="swatch" style="background:var(--danger);color:var(--danger-foreground)">Danger</div>
  </div>`;
}
