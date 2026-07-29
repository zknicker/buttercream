import type { ComponentDoc } from "../component-docs.tsx";
import type { PreviewSection } from "../preview-sections.tsx";
import { avatarDoc } from "./avatar.ts";
import { buttonDoc } from "./button.ts";
import { cardDoc } from "./card.ts";
import { checkboxDoc, switchDoc } from "./choice-controls.ts";
import { tableDoc, typographyDoc } from "./data.ts";
import { segmentDoc, separatorDoc, spinnerDoc, toggleButtonDoc } from "./display.ts";
import { drawerDoc } from "./drawer.ts";
import { autocompleteDoc, checkboxGroupDoc, inputOtpDoc } from "./entry.ts";
import { alertDoc, badgeDoc, chipDoc, progressCircleDoc, skeletonDoc } from "./feedback.ts";
import {
  closeButtonDoc,
  fieldsetDoc,
  meterDoc,
  numberFieldDoc,
  progressBarDoc,
  searchFieldDoc,
  textareaDoc,
  textFieldDoc,
} from "./fields.ts";
import { inputDoc } from "./form-controls.ts";
import { modalDoc } from "./modal.ts";
import {
  accordionDoc,
  breadcrumbsDoc,
  comboboxDoc,
  dropdownDoc,
  errorMessageDoc,
  paginationDoc,
  toolbarDoc,
} from "./navigation.ts";
import { popoverDoc } from "./popover.ts";
import { radioGroupDoc } from "./radio-group.ts";
import { selectDoc } from "./select.ts";
import { sliderDoc } from "./slider.ts";
import { buttonGroupDoc, colorSwatchDoc, kbdDoc, linkDoc } from "./static.ts";
import { tabsDoc } from "./tabs.ts";
import { tooltipDoc } from "./tooltip.ts";

/*
 * Reference docs keyed by preview section. A section with an entry gets a docs panel appended
 * beneath its specimens; app demos, Brand, Guides, and Charts never appear here.
 */
export const COMPONENT_DOCS: Partial<Record<PreviewSection, ComponentDoc>> = {
  Accordion: accordionDoc,
  Alert: alertDoc,
  Autocomplete: autocompleteDoc,
  Avatar: avatarDoc,
  Badge: badgeDoc,
  Breadcrumbs: breadcrumbsDoc,
  Button: buttonDoc,
  "Button Group": buttonGroupDoc,
  Card: cardDoc,
  Checkbox: checkboxDoc,
  "Checkbox Group": checkboxGroupDoc,
  Chip: chipDoc,
  "Close Button": closeButtonDoc,
  "Color Swatch": colorSwatchDoc,
  Combobox: comboboxDoc,
  Drawer: drawerDoc,
  Dropdown: dropdownDoc,
  "Error Message": errorMessageDoc,
  Fieldset: fieldsetDoc,
  Input: inputDoc,
  "Input OTP": inputOtpDoc,
  Kbd: kbdDoc,
  Link: linkDoc,
  Meter: meterDoc,
  Modal: modalDoc,
  "Number Field": numberFieldDoc,
  Pagination: paginationDoc,
  Popover: popoverDoc,
  "Progress Bar": progressBarDoc,
  "Progress Circle": progressCircleDoc,
  "Radio Group": radioGroupDoc,
  "Search Field": searchFieldDoc,
  Segment: segmentDoc,
  Select: selectDoc,
  Separator: separatorDoc,
  Skeleton: skeletonDoc,
  Slider: sliderDoc,
  Spinner: spinnerDoc,
  Switch: switchDoc,
  Table: tableDoc,
  Tabs: tabsDoc,
  "Text Field": textFieldDoc,
  Textarea: textareaDoc,
  "Toggle Button": toggleButtonDoc,
  Toolbar: toolbarDoc,
  Tooltip: tooltipDoc,
  Typography: typographyDoc,
};
