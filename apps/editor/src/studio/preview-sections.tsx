import type { DesignSystem } from "@buttercream/theme-core";
import type { ReactElement } from "react";
import { ChatAppPreview } from "./preview-app-chat.tsx";
import { DashboardAppPreview } from "./preview-app-dashboard.tsx";
import { FinancesAppPreview } from "./preview-app-finances.tsx";
import { MailAppPreview } from "./preview-app-mail.tsx";
import { AvatarPreview } from "./preview-avatar.tsx";
import { ButtonPreview } from "./preview-button.tsx";
import { CardPreview } from "./preview-card.tsx";
import { ChartsPreview } from "./preview-charts.tsx";
import { CheckboxPreview, SwitchPreview } from "./preview-choice-controls.tsx";
import { TablePreview, TypographyPreview } from "./preview-data.tsx";
import {
  SegmentPreview,
  SeparatorPreview,
  SpinnerPreview,
  ToggleButtonPreview,
} from "./preview-display.tsx";
import { DrawerPreview } from "./preview-drawer.tsx";
import { AutocompletePreview, CheckboxGroupPreview, InputOTPPreview } from "./preview-entry.tsx";
import {
  AlertPreview,
  BadgePreview,
  ChipPreview,
  ProgressCirclePreview,
  SkeletonPreview,
} from "./preview-feedback.tsx";
import {
  CloseButtonPreview,
  FieldsetPreview,
  MeterPreview,
  NumberFieldPreview,
  ProgressBarPreview,
  SearchFieldPreview,
  TextareaPreview,
  TextFieldPreview,
} from "./preview-fields.tsx";
import { InputPreview } from "./preview-form-controls.tsx";
import { GuidesPreview } from "./preview-guides.tsx";
import { createPreviewIconElements } from "./preview-icons.ts";
import { ModalPreview } from "./preview-modal.tsx";
import {
  AccordionPreview,
  AlertDialogPreview,
  BreadcrumbsPreview,
  ComboboxPreview,
  DropdownPreview,
  ErrorMessagePreview,
  PaginationPreview,
  ToolbarPreview,
} from "./preview-navigation.tsx";
import { PopoverPreview } from "./preview-popover.tsx";
import { RadioGroupPreview } from "./preview-radio-group.tsx";
import { SelectPreview } from "./preview-select.tsx";
import { SliderPreview } from "./preview-slider.tsx";
import {
  ButtonGroupPreview,
  ColorSwatchPreview,
  KbdPreview,
  LinkPreview,
} from "./preview-static.tsx";
import { TabsPreview } from "./preview-tabs.tsx";
import { TooltipPreview } from "./preview-tooltip.tsx";

/* Alphabetical after Guides, matching the order the nav lists them in. */
export type PreviewSection =
  | "Guides"
  | "Accordion"
  | "Alert"
  | "Alert Dialog"
  | "Autocomplete"
  | "Avatar"
  | "Badge"
  | "Breadcrumbs"
  | "Button"
  | "Button Group"
  | "Card"
  | "Chat"
  | "Dashboard"
  | "Finances"
  | "Mail"
  | "Charts"
  | "Checkbox"
  | "Checkbox Group"
  | "Chip"
  | "Close Button"
  | "Color Swatch"
  | "Combobox"
  | "Drawer"
  | "Dropdown"
  | "Error Message"
  | "Fieldset"
  | "Input"
  | "Input OTP"
  | "Kbd"
  | "Link"
  | "Meter"
  | "Modal"
  | "Number Field"
  | "Pagination"
  | "Popover"
  | "Progress Bar"
  | "Progress Circle"
  | "Radio Group"
  | "Search Field"
  | "Segment"
  | "Select"
  | "Separator"
  | "Skeleton"
  | "Slider"
  | "Spinner"
  | "Switch"
  | "Table"
  | "Tabs"
  | "Text Field"
  | "Textarea"
  | "Toggle Button"
  | "Toolbar"
  | "Tooltip"
  | "Typography";

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
  if (section === "Chat") {
    return <ChatAppPreview icons={iconSettings} />;
  }
  if (section === "Dashboard") {
    return <DashboardAppPreview icons={iconSettings} />;
  }
  if (section === "Finances") {
    return <FinancesAppPreview icons={iconSettings} />;
  }
  if (section === "Mail") {
    return <MailAppPreview icons={iconSettings} />;
  }
  if (section === "Charts") {
    return <ChartsPreview />;
  }
  if (section === "Checkbox") {
    return <CheckboxPreview />;
  }
  if (section === "Checkbox Group") {
    return <CheckboxGroupPreview />;
  }
  if (section === "Autocomplete") {
    return <AutocompletePreview />;
  }
  if (section === "Input OTP") {
    return <InputOTPPreview />;
  }
  if (section === "Radio Group") {
    return <RadioGroupPreview />;
  }
  if (section === "Accordion") {
    return <AccordionPreview icons={iconSettings} />;
  }
  if (section === "Alert Dialog") {
    return <AlertDialogPreview />;
  }
  if (section === "Breadcrumbs") {
    return <BreadcrumbsPreview />;
  }
  if (section === "Combobox") {
    return <ComboboxPreview icons={iconSettings} />;
  }
  if (section === "Dropdown") {
    return <DropdownPreview icons={iconSettings} />;
  }
  if (section === "Error Message") {
    return <ErrorMessagePreview />;
  }
  if (section === "Pagination") {
    return <PaginationPreview icons={iconSettings} />;
  }
  if (section === "Toolbar") {
    return <ToolbarPreview icons={iconSettings} />;
  }
  if (section === "Alert") {
    return <AlertPreview />;
  }
  if (section === "Badge") {
    return <BadgePreview />;
  }
  if (section === "Chip") {
    return <ChipPreview />;
  }
  if (section === "Skeleton") {
    return <SkeletonPreview />;
  }
  if (section === "Button Group") {
    return <ButtonGroupPreview icons={iconSettings} />;
  }
  if (section === "Color Swatch") {
    return <ColorSwatchPreview />;
  }
  if (section === "Kbd") {
    return <KbdPreview />;
  }
  if (section === "Link") {
    return <LinkPreview />;
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
  if (section === "Meter") {
    return <MeterPreview />;
  }
  if (section === "Number Field") {
    return <NumberFieldPreview />;
  }
  if (section === "Progress Bar") {
    return <ProgressBarPreview />;
  }
  if (section === "Progress Circle") {
    return <ProgressCirclePreview />;
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
  if (section === "Table") {
    return <TablePreview />;
  }
  if (section === "Tabs") {
    return <TabsPreview icons={iconSettings} />;
  }
  if (section === "Typography") {
    return <TypographyPreview />;
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
