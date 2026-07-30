import type { DesignSystem } from "@buttercream/theme-core";
import type { CSSProperties, ReactElement } from "react";
import type { ShellTheme } from "../shell-theme.ts";
import { BrandPage } from "./brand-page.tsx";
import { ComponentDocsPanel } from "./component-docs.tsx";
import { COMPONENT_DOCS } from "./docs/index.ts";
import { ChatAppPreview } from "./preview-app-chat.tsx";
import { DashboardAppPreview } from "./preview-app-dashboard.tsx";
import { FinancesAppPreview } from "./preview-app-finances.tsx";
import { MailAppPreview } from "./preview-app-mail.tsx";
import { OverviewAppPreview } from "./preview-app-overview.tsx";
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
  BreadcrumbsPreview,
  ComboboxPreview,
  DropdownPreview,
  ErrorMessagePreview,
  PaginationPreview,
  ToolbarPreview,
} from "./preview-navigation.tsx";
import { PopoverPreview } from "./preview-popover.tsx";
import { RadioGroupPreview } from "./preview-radio-group.tsx";
import { ScrollShadowPreview } from "./preview-scroll-shadow.tsx";
import type { PreviewSection } from "./preview-section-navigation.ts";
import { SelectPreview } from "./preview-select.tsx";
import { SidebarPreview } from "./preview-sidebar.tsx";
import { SliderPreview } from "./preview-slider.tsx";
import { previewSpecimenSources } from "./preview-source.ts";
import { SpecimenSources } from "./preview-specimen.tsx";
import {
  ButtonGroupPreview,
  ColorSwatchPreview,
  KbdPreview,
  LinkPreview,
} from "./preview-static.tsx";
import { TabsPreview } from "./preview-tabs.tsx";
import { TooltipPreview } from "./preview-tooltip.tsx";

export interface PreviewSectionContext {
  designSystem: DesignSystem;
  /**
   * Absent for a shared visitor on `/ds/:id`: sections that author the document display it
   * instead. The same signal the route uses to decide whether the document is editable at all.
   */
  onUpdate?: (mutate: (designSystem: DesignSystem) => void) => void;
  /** Theme tokens, for sections that mount preview surfaces of their own. */
  surfaceStyle: CSSProperties;
  theme: ShellTheme;
}

/**
 * Whether a section paints its own surfaces. Brand is editor chrome holding themed islands, so
 * wrapping it in one would put the user's tokens and custom CSS behind the fields editing them;
 * every other section is themed content the shell frames in a single surface.
 */
export function sectionOwnsSurface(section: PreviewSection): boolean {
  return section === "Brand";
}

/*
 * The application pages read as apps, not documents: the shell takes the frame's full height
 * and its content scrolls inside, the way the product they depict would. Specimen grids and
 * guides stay documents — they grow, and the editor column scrolls them.
 */
export function sectionFillsSurface(section: PreviewSection): boolean {
  return (
    section === "Overview" ||
    section === "Dashboard" ||
    section === "Mail" ||
    section === "Chat" ||
    section === "Finances"
  );
}

export function renderPreviewSection(
  section: PreviewSection,
  context: PreviewSectionContext,
): ReactElement {
  const content = renderSectionContent(section, context);
  const preview = (
    <SpecimenSources sources={previewSpecimenSources(section)}>{content}</SpecimenSources>
  );
  const doc = COMPONENT_DOCS[section];
  if (!doc) {
    return preview;
  }
  return (
    <>
      {preview}
      <ComponentDocsPanel doc={doc} />
    </>
  );
}

function renderSectionContent(
  section: PreviewSection,
  { designSystem, onUpdate, surfaceStyle, theme }: PreviewSectionContext,
): ReactElement {
  const iconSettings = designSystem.icons;

  if (section === "Brand") {
    return (
      <BrandPage
        designSystem={designSystem}
        surfaceStyle={surfaceStyle}
        theme={theme}
        {...(onUpdate ? { onUpdate } : {})}
      />
    );
  }
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
    return <ModalPreview icons={createPreviewIconElements(iconSettings)} />;
  }
  if (section === "Drawer") {
    return <DrawerPreview icons={createPreviewIconElements(iconSettings)} />;
  }
  if (section === "Popover") {
    return <PopoverPreview />;
  }
  if (section === "Chat") {
    return <ChatAppPreview icons={iconSettings} />;
  }
  if (section === "Overview") {
    return <OverviewAppPreview icons={iconSettings} />;
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
    return <BadgePreview icons={createPreviewIconElements(iconSettings)} />;
  }
  if (section === "Chip") {
    return <ChipPreview icons={createPreviewIconElements(iconSettings)} />;
  }
  if (section === "Scroll Shadow") {
    return <ScrollShadowPreview icons={createPreviewIconElements(iconSettings)} />;
  }
  if (section === "Sidebar") {
    return <SidebarPreview icons={createPreviewIconElements(iconSettings)} />;
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
    return <SegmentPreview icons={createPreviewIconElements(iconSettings)} />;
  }
  if (section === "Select") {
    return <SelectPreview />;
  }
  if (section === "Separator") {
    return <SeparatorPreview icons={createPreviewIconElements(iconSettings)} />;
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
    return <ToggleButtonPreview icons={createPreviewIconElements(iconSettings)} />;
  }
  if (section === "Tooltip") {
    return <TooltipPreview icons={createPreviewIconElements(iconSettings)} />;
  }
  if (section === "Avatar") {
    return <AvatarPreview icons={createPreviewIconElements(iconSettings)} />;
  }
  return <ButtonPreview icons={createPreviewIconElements(iconSettings)} />;
}
