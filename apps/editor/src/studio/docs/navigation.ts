import type { ComponentDoc } from "../component-docs.tsx";

export const accordionDoc: ComponentDoc = {
  usage:
    'Use Accordion to collapse related content into expandable sections, such as FAQs or grouped settings. Compose it from Accordion, Accordion.Item, Accordion.Trigger, and Accordion.Panel; pass value/defaultValue and onValueChange for controlled state, multiple to allow several panels open at once, and disabled on the root or an individual Item to lock it. Swap the chevron via the indicator prop on Trigger, and set variant="surface" to render the whole group on a card.',
  example:
    '<Accordion defaultValue={["intro"]}>\n  <Accordion.Item value="intro">\n    <Accordion.Trigger>Getting started</Accordion.Trigger>\n    <Accordion.Panel>Install the package and import your first component.</Accordion.Panel>\n  </Accordion.Item>\n</Accordion>',
  api: [
    {
      component: "Accordion",
      props: [
        {
          name: "variant",
          type: '"plain" | "surface"',
          defaultValue: '"plain"',
          description: "Plain rows, or surface to render the whole group on a card.",
        },
        {
          name: "value",
          type: "Value[]",
          description: "Controlled item(s) expanded. Pair with onValueChange.",
        },
        {
          name: "defaultValue",
          type: "Value[]",
          description: "Initially expanded item(s) for an uncontrolled accordion.",
        },
        {
          name: "onValueChange",
          type: "(value: Value[]) => void",
          description: "Called when an item is expanded or collapsed.",
        },
        {
          name: "multiple",
          type: "boolean",
          defaultValue: "false",
          description: "Allows more than one panel to stay open at a time.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Locks every item in the group.",
        },
        {
          name: "...props",
          type: "Base UI Accordion.Root props",
          description: "hiddenUntilFound, keepMounted, and the render prop pass through.",
        },
      ],
    },
    {
      component: "Accordion.Item",
      props: [
        {
          name: "value",
          type: "Value",
          description: "Identifies this item; required to control or default-open it.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Locks this item only.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          description: "Called when this item's own panel opens or closes.",
        },
      ],
    },
    {
      component: "Accordion.Trigger",
      props: [
        {
          name: "indicator",
          type: "ReactNode",
          description:
            "Replaces the chevron. Rotation on open still applies to whatever is passed.",
        },
      ],
    },
    {
      component: "Accordion.Panel",
      props: [
        {
          name: "hiddenUntilFound",
          type: "boolean",
          defaultValue: "false",
          description: "Lets the browser's in-page search find and expand closed content.",
        },
        {
          name: "keepMounted",
          type: "boolean",
          defaultValue: "false",
          description: "Keeps a closed panel in the DOM instead of unmounting it.",
        },
      ],
    },
  ],
  classes: [
    { name: ".accordion", description: "Root container." },
    { name: ".accordion--surface", description: "Root when variant is surface." },
    { name: ".accordion__item", description: "One item; carries the divider rule beneath it." },
    { name: ".accordion__header", description: "Heading wrapper around a trigger." },
    {
      name: ".accordion__trigger",
      description: "The clickable row that opens and closes a panel.",
    },
    { name: ".accordion__indicator", description: "The chevron, or a custom indicator override." },
    { name: ".accordion__panel", description: "The animated, collapsible panel." },
    { name: ".accordion__body", description: "Padded content wrapper inside a panel." },
  ],
};

export const breadcrumbsDoc: ComponentDoc = {
  usage:
    "Use Breadcrumbs to show a user's location within a page hierarchy as a trail of links. Wrap Breadcrumbs.Item children (each taking an href like a normal anchor); mark the current page with current, which renders it as inert text instead of a dead-end link, and disable individual crumbs with disabled. Pass a custom separator node to replace the default chevron, which is otherwise inserted automatically between items and hidden from screen readers.",
  example:
    '<Breadcrumbs>\n  <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>\n  <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>\n  <Breadcrumbs.Item current href="/products/laptop">\n    Laptop\n  </Breadcrumbs.Item>\n</Breadcrumbs>',
  api: [
    {
      component: "Breadcrumbs",
      props: [
        {
          name: "separator",
          type: "ReactNode",
          description: "Replaces the chevron drawn automatically between crumbs.",
        },
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"nav">',
          description: "Native nav attributes pass through; aria-label defaults to Breadcrumb.",
        },
      ],
    },
    {
      component: "Breadcrumbs.Item",
      props: [
        {
          name: "current",
          type: "boolean",
          defaultValue: "false",
          description: "The page you're on; renders as inert text, not a link to nowhere.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Renders the crumb as inert text rather than an anchor.",
        },
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"a">',
          description: "Native anchor attributes, including href, pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".breadcrumbs", description: "Root nav container." },
    { name: ".breadcrumbs__list", description: "The ordered list of crumbs." },
    { name: ".breadcrumbs__item", description: "One crumb's list item wrapper." },
    { name: ".breadcrumbs__link", description: "The link or inert span for a crumb." },
    { name: ".breadcrumbs__separator", description: "The chevron drawn between crumbs." },
  ],
};

export const comboboxDoc: ComponentDoc = {
  usage:
    "Use Combobox for a text input that filters a list of options as the user types, wrapped in a Field for its label. Pass items plus a function child (so the rendered list stays in sync with the filtered collection) and Combobox.Item per option; group related options with Combobox.Group and Combobox.Collection for sectioned lists. Filtering itself is fixed to Base UI's case- and accent-insensitive contains match — there's no hook to swap in custom filter logic, and there's no built-in multi-select (see Autocomplete for that).",
  example:
    '<Combobox items={animals} placeholder="Search animals…">\n  {(animal) => <Combobox.Item key={animal} value={animal}>{animal}</Combobox.Item>}\n</Combobox>',
  api: [
    {
      component: "Combobox",
      props: [
        {
          name: "items",
          type: "readonly Item[]",
          description:
            "Drives filtering. Without it the field cannot filter, whatever the child renders.",
        },
        {
          name: "children",
          type: "ReactNode | ((item: Item, index: number) => ReactNode)",
          description: "A function child renders each surviving item; a plain node never filters.",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Input placeholder text.",
        },
        {
          name: "icon",
          type: "ReactNode",
          description:
            "Replaces the trigger chevron. The default one rotates when open; a custom one does not.",
        },
        {
          name: "emptyMessage",
          type: "ReactNode",
          defaultValue: '"No results"',
          description: "Shown in the popup when the query matches nothing.",
        },
        {
          name: "container",
          type: "Element | null",
          description: "Portal target for the popup; pass the element theme tokens are scoped to.",
        },
        {
          name: "value / defaultValue",
          type: "Value | null",
          description: "Controlled or initial selected value.",
        },
        {
          name: "onValueChange",
          type: "(value: Value | null, eventDetails) => void",
          description: "Called when the selected value changes.",
        },
        {
          name: "inputValue",
          type: "string",
          description: "Controlled text in the input, independent of the selected value.",
        },
        {
          name: "onInputValueChange",
          type: "(inputValue: string, eventDetails) => void",
          description: "Called when the input text changes.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean, eventDetails) => void",
          description: "Called when the popup opens or closes.",
        },
        {
          name: "disabled / readOnly / required",
          type: "boolean",
          defaultValue: "false",
          description: "Standard field states, same shape as a native input.",
        },
        {
          name: "...props",
          type: "Base UI Combobox.Root props",
          description: "Remaining Base UI Combobox props pass through.",
        },
      ],
    },
    {
      component: "Combobox.Item",
      props: [
        {
          name: "value",
          type: "any",
          description: "The value this option represents.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Excludes this option from selection.",
        },
      ],
    },
    {
      component: "Combobox.Group",
      props: [
        {
          name: "label",
          type: "ReactNode",
          description: "Heading rendered above the group.",
        },
        {
          name: "items",
          type: "readonly any[]",
          description: "This group's items; a nested Combobox.Collection filters from them.",
        },
      ],
    },
  ],
  classes: [
    { name: ".combobox", description: "Root container." },
    { name: ".combobox__control", description: "Wraps the input and trigger." },
    { name: ".combobox__input", description: "The text input." },
    { name: ".combobox__trigger", description: "The chevron button." },
    { name: ".combobox__popup", description: "The filtered list's popup." },
    { name: ".combobox__list", description: "Padded wrapper around the item rows." },
    { name: ".combobox__item", description: "One option row." },
    { name: ".combobox__item-indicator", description: "The selected-item checkmark slot." },
    { name: ".combobox__group", description: "One labelled group of items." },
    { name: ".combobox__group-label", description: "A group's heading." },
    { name: ".combobox__empty", description: "Shown when the query matches nothing." },
  ],
};

export const dropdownDoc: ComponentDoc = {
  usage:
    "Use Dropdown to hang a list of actions or options off a trigger — wrap any element in Dropdown.Trigger (render prop composition works, e.g. render={<Button/>}), then lay out Dropdown.Item, Dropdown.Group/GroupLabel, and Dropdown.Separator inside Dropdown.Content. Mark destructive actions with the danger prop on an Item, give an item a description or a trailing shortcut for richer rows, and nest a Dropdown.Submenu (SubmenuTrigger plus its own Content) for multi-level menus. Pass container on Content when the menu needs to inherit scoped theme tokens rather than falling back to document-body defaults.",
  example:
    '<Dropdown>\n  <Dropdown.Trigger render={<Button variant="secondary">Actions</Button>} />\n  <Dropdown.Content>\n    <Dropdown.Item shortcut="⌘N">New file</Dropdown.Item>\n    <Dropdown.Separator />\n    <Dropdown.Item danger>Delete</Dropdown.Item>\n  </Dropdown.Content>\n</Dropdown>',
  api: [
    {
      component: "Dropdown",
      props: [
        {
          name: "open / defaultOpen",
          type: "boolean",
          description: "Controlled or initial open state.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean, eventDetails) => void",
          description: "Called when the menu opens or closes.",
        },
        {
          name: "modal",
          type: "boolean",
          defaultValue: "true",
          description: "Locks page scroll and outside pointer interaction while open.",
        },
        {
          name: "...props",
          type: "Base UI Menu.Root props",
          description: "orientation, disabled, loopFocus, and the rest pass through.",
        },
      ],
    },
    {
      component: "Dropdown.Trigger",
      props: [
        {
          name: "render",
          type: "ReactElement",
          description: "Composes the trigger with another element instead of the default button.",
        },
      ],
    },
    {
      component: "Dropdown.Content",
      props: [
        {
          name: "align",
          type: '"start" | "center" | "end"',
          defaultValue: '"start"',
          description: "Alignment against the trigger (or the submenu trigger, for a submenu).",
        },
        {
          name: "side",
          type: '"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"',
          description: 'Placement side. Defaults to "bottom", or "inline-end" inside a submenu.',
        },
        {
          name: "sideOffset / alignOffset",
          type: "number",
          description: "Fine-tunes the gap and shift from the anchor.",
        },
        {
          name: "container",
          type: "Element | null",
          description: "Portal target for the menu; pass the element theme tokens are scoped to.",
        },
      ],
    },
    {
      component: "Dropdown.Item",
      props: [
        {
          name: "danger",
          type: "boolean",
          defaultValue: "false",
          description: "Marks a destructive action — delete, revoke, leave.",
        },
        {
          name: "description",
          type: "ReactNode",
          description: "A second, quieter line under the label.",
        },
        {
          name: "shortcut",
          type: "ReactNode",
          description: "The chord that runs this item, rendered in a Kbd at the end of the row.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Excludes this item from interaction and keyboard navigation.",
        },
        {
          name: "closeOnClick",
          type: "boolean",
          defaultValue: "true",
          description: "Whether selecting this item closes the menu.",
        },
      ],
    },
    {
      component: "Dropdown.Submenu",
      props: [
        {
          name: "...props",
          type: "Base UI Menu.SubmenuRoot props",
          description:
            "Groups a SubmenuTrigger with the Content it opens; open/onOpenChange pass through.",
        },
      ],
    },
    {
      component: "Dropdown.SubmenuTrigger",
      props: [
        {
          name: "description",
          type: "ReactNode",
          description: "A second, quieter line under the label.",
        },
        {
          name: "indicator",
          type: "ReactNode",
          description: "Replaces the chevron that points toward the nested menu.",
        },
      ],
    },
    {
      component: "Dropdown.Group / Dropdown.GroupLabel / Dropdown.Separator",
      props: [
        {
          name: "...props",
          type: "Base UI Menu.Group / Menu.GroupLabel / Menu.Separator props",
          description: "Plain structural parts; no props of their own beyond passthrough.",
        },
      ],
    },
  ],
  classes: [
    { name: ".dropdown__trigger", description: "The trigger element." },
    { name: ".dropdown__popup", description: "The menu's popup, including a submenu's." },
    { name: ".dropdown__item", description: "One action row." },
    { name: ".dropdown__item--danger", description: "A destructive item." },
    { name: ".dropdown__item-text", description: "Label/description column on a described row." },
    { name: ".dropdown__item-description", description: "The secondary line under a label." },
    { name: ".dropdown__item-shortcut", description: "The Kbd holding an item's shortcut." },
    { name: ".dropdown__submenu-trigger", description: "A row that opens a nested menu." },
    { name: ".dropdown__submenu-indicator", description: "The chevron on a submenu trigger." },
    {
      name: ".dropdown__group",
      description:
        "A titled run of items (currently unstyled; spacing comes from GroupLabel and Item).",
    },
    { name: ".dropdown__group-label", description: "A group's heading." },
    { name: ".dropdown__separator", description: "A divider between rows or groups." },
  ],
};

export const errorMessageDoc: ComponentDoc = {
  usage:
    "Use ErrorMessage for a form-level error — a failed submission or server rejection — that isn't tied to one input; for a single input's error, use Field.Error, which Base UI wires to that input's aria-describedby. It renders as a span with role=\"alert\" so standalone errors get noticed, and it accepts a className like any other component for custom styling.",
  example: "<ErrorMessage>Could not save changes. Try again.</ErrorMessage>",
  api: [
    {
      component: "ErrorMessage",
      props: [
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"span">',
          description: "Native span attributes pass through; role is always alert.",
        },
      ],
    },
  ],
  classes: [{ name: ".error-message", description: "The message span." }],
};

export const paginationDoc: ComponentDoc = {
  usage:
    "Use Pagination to navigate multi-page content: wrap Pagination.Link controls in a Pagination root, pass current to mark the active page, disabled to inert a control, and nav to widen a Previous/Next-style label. Pass summary to show a count or range opposite the links, and drop in Pagination.Ellipsis to collapse long page ranges. Links render as a real <a> when given href (linkable pagination), otherwise as a button for client-side paging, and the current page renders as a non-interactive span.",
  example:
    '<Pagination summary="1–10 of 42">\n  <Pagination.Link nav disabled>Previous</Pagination.Link>\n  <Pagination.Link current>1</Pagination.Link>\n  <Pagination.Link>2</Pagination.Link>\n  <Pagination.Link nav>Next</Pagination.Link>\n</Pagination>',
  api: [
    {
      component: "Pagination",
      props: [
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Control size for every link inside.",
        },
        {
          name: "summary",
          type: "ReactNode",
          description:
            "Sits opposite the page links — a count, a range, whatever the caller wants.",
        },
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"nav">',
          description: "Native nav attributes pass through; aria-label defaults to Pagination.",
        },
      ],
    },
    {
      component: "Pagination.Link",
      props: [
        {
          name: "current",
          type: "boolean",
          defaultValue: "false",
          description: "The active page; renders as an inert span, not a disabled control.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Renders as an inert span.",
        },
        {
          name: "href",
          type: "string",
          description: "Renders as a real <a> for linkable, crawlable pagination.",
        },
        {
          name: "nav",
          type: "boolean",
          defaultValue: "false",
          description: 'Widens the control for a worded label like "Previous" or "Next".',
        },
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"button">',
          description: "Native button (or anchor, when href is set) attributes pass through.",
        },
      ],
    },
    {
      component: "Pagination.Ellipsis",
      props: [
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"li">',
          description: "The gap marker in a truncated range; hidden from assistive tech.",
        },
      ],
    },
  ],
  classes: [
    { name: ".pagination", description: "Root nav container." },
    { name: ".pagination__summary", description: "The count/range text opposite the links." },
    { name: ".pagination__content", description: "The list of page links." },
    { name: ".pagination__link", description: "One page control." },
    {
      name: ".pagination__link--nav",
      description: "A Previous/Next-style link, widened for its label.",
    },
    { name: ".pagination__ellipsis", description: "The gap indicator in a truncated range." },
    { name: ".pagination--sm / .pagination--lg", description: "Non-default sizes." },
  ],
};

export const toolbarDoc: ComponentDoc = {
  usage:
    'Use Toolbar to group related interactive controls (toggle buttons, buttons, button groups) with roving-focus keyboard navigation, unlike ButtonGroup which is purely visual. Set orientation="vertical" for a column layout, and variant="attached" to give the bar its own surface and fully rounded corners for floating over content. Use Toolbar.Separator to divide groups and Toolbar.Group to cluster related controls within the bar.',
  example:
    '<Toolbar aria-label="Text formatting">\n  <ToggleButton.Group aria-label="Style">\n    <ToggleButton value="bold">Bold</ToggleButton>\n  </ToggleButton.Group>\n  <Toolbar.Separator />\n  <Button variant="ghost">Settings</Button>\n</Toolbar>',
  api: [
    {
      component: "Toolbar",
      props: [
        {
          name: "variant",
          type: '"plain" | "attached"',
          defaultValue: '"plain"',
          description:
            "Attached gives the bar its own surface and full rounding, for floating over content.",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"horizontal"',
          description: "Layout axis and the arrow keys roving focus responds to.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Ignores interaction on every control in the bar.",
        },
        {
          name: "...props",
          type: "Base UI Toolbar.Root props",
          description: "loopFocus and the rest pass through.",
        },
      ],
    },
    {
      component: "Toolbar.Group",
      props: [
        {
          name: "...props",
          type: "Base UI Toolbar.Group props",
          description:
            "Clusters related controls; currently unstyled beyond the toolbar's own gap.",
        },
      ],
    },
    {
      component: "Toolbar.Separator",
      props: [
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"vertical"',
          description: "Set to horizontal inside a vertical toolbar.",
        },
      ],
    },
  ],
  classes: [
    { name: ".toolbar", description: "Root container." },
    { name: ".toolbar--vertical", description: "Column layout instead of a row." },
    { name: ".toolbar--attached", description: "Bar rendered on its own surface, fully rounded." },
    { name: ".toolbar__group", description: "A cluster of related controls (currently unstyled)." },
  ],
};
