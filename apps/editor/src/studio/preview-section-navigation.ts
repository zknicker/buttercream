export const previewSectionGroups = [
  {
    /* Brand leads: it is the document's own description, and everything below it is a view of
       what that description produced. */
    label: "Preview",
    items: ["Brand", "Guides", "Overview", "Dashboard", "Mail", "Chat", "Finances"],
  },
  {
    label: "Components",
    items: [
      "Accordion",
      "Alert",
      "Autocomplete",
      "Avatar",
      "Badge",
      "Breadcrumbs",
      "Button",
      "Button Group",
      "Card",
      "Charts",
      "Checkbox",
      "Checkbox Group",
      "Chip",
      "Close Button",
      "Color Swatch",
      "Combobox",
      "Drawer",
      "Dropdown",
      "Error Message",
      "Fieldset",
      "Input",
      "Input OTP",
      "Kbd",
      "Link",
      "Meter",
      "Modal",
      "Number Field",
      "Pagination",
      "Popover",
      "Progress Bar",
      "Progress Circle",
      "Radio Group",
      "Scroll Shadow",
      "Search Field",
      "Segment",
      "Select",
      "Separator",
      "Sidebar",
      "Skeleton",
      "Slider",
      "Spinner",
      "Switch",
      "Table",
      "Tabs",
      "Text Field",
      "Textarea",
      "Toggle Button",
      "Toolbar",
      "Tooltip",
      "Typography",
    ],
  },
] as const;

export type PreviewSection = (typeof previewSectionGroups)[number]["items"][number];

export const previewSections: readonly PreviewSection[] = previewSectionGroups.flatMap(
  (group) => group.items,
);

export function previewSectionSlug(section: PreviewSection): string {
  return section.toLowerCase().replaceAll(" ", "-");
}

const previewSectionsBySlug = new Map(
  previewSections.map((section) => [previewSectionSlug(section), section]),
);

export function previewSectionFromSlug(slug: string): PreviewSection | undefined {
  return previewSectionsBySlug.get(slug);
}
