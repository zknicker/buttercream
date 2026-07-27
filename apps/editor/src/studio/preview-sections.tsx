import type { DesignSystem } from "@buttercream/theme-core";
import type { CSSProperties, ReactElement } from "react";
import { AvatarPreview } from "./preview-avatar.tsx";
import { ButtonPreview } from "./preview-button.tsx";
import { CardPreview } from "./preview-card.tsx";
import { CheckboxPreview, SwitchPreview } from "./preview-choice-controls.tsx";
import {
  SegmentPreview,
  SeparatorPreview,
  SpinnerPreview,
  ToggleButtonPreview,
} from "./preview-display.tsx";
import { DrawerPreview } from "./preview-drawer.tsx";
import {
  CloseButtonPreview,
  FieldsetPreview,
  NumberFieldPreview,
  SearchFieldPreview,
  TextareaPreview,
  TextFieldPreview,
} from "./preview-fields.tsx";
import { InputPreview } from "./preview-form-controls.tsx";
import { createPreviewIconElements } from "./preview-icons.ts";
import { ModalPreview } from "./preview-modal.tsx";
import { PopoverPreview } from "./preview-popover.tsx";
import { RadioGroupPreview } from "./preview-radio-group.tsx";
import { SelectPreview } from "./preview-select.tsx";
import { SliderPreview } from "./preview-slider.tsx";
import { TabsPreview } from "./preview-tabs.tsx";
import { TooltipPreview } from "./preview-tooltip.tsx";

/* Alphabetical after Guides, matching the order the nav lists them in. */
export type PreviewSection =
  | "Guides"
  | "Avatar"
  | "Button"
  | "Card"
  | "Checkbox"
  | "Close Button"
  | "Drawer"
  | "Fieldset"
  | "Input"
  | "Modal"
  | "Number Field"
  | "Popover"
  | "Radio Group"
  | "Search Field"
  | "Segment"
  | "Select"
  | "Separator"
  | "Slider"
  | "Spinner"
  | "Switch"
  | "Tabs"
  | "Text Field"
  | "Textarea"
  | "Toggle Button"
  | "Tooltip";

export function renderPreviewSection(
  section: PreviewSection,
  iconSettings: DesignSystem["icons"],
): ReactElement {
  if (section === "Guides") {
    return <GuidesPreview />;
  }
  if (section === "Card") {
    return <CardPreview icons={createPreviewIconElements(iconSettings)} />;
  }
  if (section === "Input") {
    return <InputPreview />;
  }
  if (section === "Modal") {
    return <ModalPreview />;
  }
  if (section === "Drawer") {
    return <DrawerPreview />;
  }
  if (section === "Popover") {
    return <PopoverPreview />;
  }
  if (section === "Checkbox") {
    return <CheckboxPreview />;
  }
  if (section === "Radio Group") {
    return <RadioGroupPreview />;
  }
  if (section === "Close Button") {
    return <CloseButtonPreview />;
  }
  if (section === "Fieldset") {
    return <FieldsetPreview />;
  }
  if (section === "Search Field") {
    return <SearchFieldPreview />;
  }
  if (section === "Number Field") {
    return <NumberFieldPreview />;
  }
  if (section === "Text Field") {
    return <TextFieldPreview />;
  }
  if (section === "Textarea") {
    return <TextareaPreview />;
  }
  if (section === "Segment") {
    return <SegmentPreview />;
  }
  if (section === "Select") {
    return <SelectPreview />;
  }
  if (section === "Separator") {
    return <SeparatorPreview />;
  }
  if (section === "Slider") {
    return <SliderPreview />;
  }
  if (section === "Spinner") {
    return <SpinnerPreview />;
  }
  if (section === "Switch") {
    return <SwitchPreview />;
  }
  if (section === "Tabs") {
    return <TabsPreview />;
  }
  if (section === "Toggle Button") {
    return <ToggleButtonPreview />;
  }
  if (section === "Tooltip") {
    return <TooltipPreview />;
  }
  if (section === "Avatar") {
    return <AvatarPreview />;
  }
  return <ButtonPreview icons={createPreviewIconElements(iconSettings)} />;
}

const semanticRoles = ["accent", "default", "success", "warning", "danger"] as const;

function GuidesPreview(): ReactElement {
  return (
    <div className="guide-grid">
      {semanticRoles.map((name) => (
        <div className="swatch" key={name} style={swatchStyle(`--${name}`)}>
          {label(name)}
          <br />
          <small>--{name}</small>
        </div>
      ))}
      <div className="swatch" style={swatchStyle("--surface")}>
        Surface
        <br />
        <small>--surface</small>
      </div>
    </div>
  );
}

/* Inline styles stay a custom-property map; .swatch in preview.css reads the pair. */
function swatchStyle(token: string): CSSProperties {
  return {
    "--bc-swatch-bg": `var(${token})`,
    "--bc-swatch-fg": `var(${token}-foreground)`,
  } as CSSProperties;
}

function label(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
