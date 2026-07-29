import type { ComponentDoc } from "../component-docs.tsx";

export const selectDoc: ComponentDoc = {
  usage:
    "Use Select for choosing one value — or several, via multiple — from a collapsible list of options composed from Base UI's Select primitives. Pair Select.Group with Select.GroupLabel once a list is long enough to need headings, and pass description for helper text or indicator (on Select or per Select.Item) to replace the chevron and checkmark. Control it uncontrolled with defaultValue, or fully controlled with value/onValueChange — value becomes an array when multiple is set. Disable the whole field with disabled or a single Select.Item with its own disabled, and set required to block form submission until a value is chosen.",
  example:
    '<Select label="State" placeholder="Select one">\n  <Select.Group>\n    <Select.GroupLabel>South</Select.GroupLabel>\n    <Select.Item value="Florida">Florida</Select.Item>\n    <Select.Item value="Georgia">Georgia</Select.Item>\n  </Select.Group>\n</Select>',
  api: [
    {
      component: "Select",
      props: [
        {
          name: "label",
          type: "ReactNode",
          description: "Field label, associated with the trigger.",
        },
        {
          name: "placeholder",
          type: "ReactNode",
          description: "Shown in the trigger when no value is selected.",
        },
        {
          name: "description",
          type: "ReactNode",
          description: "Helper text under the trigger, wired to aria-describedby.",
        },
        {
          name: "indicator",
          type: "ReactNode",
          description: "Overrides the trigger's default chevron icon.",
        },
        {
          name: "container",
          type: "Element | RefObject<Element> | null",
          defaultValue: "document.body",
          description: "DOM node the popup portals into; scope it to a themed subtree.",
        },
        {
          name: "value / defaultValue",
          type: "Value | Value[] | null",
          description: "Controlled or uncontrolled selection; an array when multiple is set.",
        },
        {
          name: "onValueChange",
          type: "(value, eventDetails) => void",
          description: "Fires when the selected value changes.",
        },
        {
          name: "multiple",
          type: "boolean",
          defaultValue: "false",
          description: "Selects more than one item; each Select.Item shows its own indicator.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Blocks form submission until a value is chosen.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Disables the trigger and every item.",
        },
        {
          name: "open / defaultOpen / onOpenChange",
          type: "boolean / boolean / (open, eventDetails) => void",
          defaultValue: "false",
          description: "Controlled or uncontrolled popup open state.",
        },
        {
          name: "...props",
          type: "Base UI Select.Root props",
          description: "name, autoComplete, readOnly, modal, items, and other pass-through props.",
        },
      ],
    },
    {
      component: "Select.Item",
      props: [
        {
          name: "value",
          type: "Value",
          description: "The value this item represents.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Disables just this item.",
        },
        {
          name: "indicator",
          type: "ReactNode",
          description: "Overrides the built-in checkmark shown when this item is selected.",
        },
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description:
            "Swaps the rendered element, or augments its props from { disabled, selected, highlighted }.",
        },
        {
          name: "...props",
          type: "Base UI Select.Item props",
          description:
            "label (keyboard text-navigation match) and other pass-through div attributes.",
        },
      ],
    },
    {
      component: "Select.Group",
      props: [
        {
          name: "...props",
          type: "Base UI Select.Group props",
          description: "Wraps a labeled run of items; pair with Select.GroupLabel.",
        },
      ],
    },
    {
      component: "Select.GroupLabel",
      props: [
        {
          name: "...props",
          type: "Base UI Select.GroupLabel props",
          description: "Heading text for the enclosing Select.Group.",
        },
      ],
    },
  ],
  classes: [
    {
      name: ".select",
      description: "The container: label, trigger, description, and portalled popup.",
    },
    { name: ".select__label", description: "The field's label, associated with the trigger." },
    { name: ".select__trigger", description: "The button that opens the popup." },
    {
      name: ".select__value",
      description: "The displayed value or placeholder inside the trigger.",
    },
    { name: ".select__icon", description: "Positions the trigger's indicator." },
    {
      name: ".select__chevron",
      description: "The default chevron icon; rotates when the popup opens.",
    },
    {
      name: ".select__scroll-chevron",
      description: "The chevron glyph reused inside the scroll arrows.",
    },
    { name: ".select__description", description: "Helper text under the trigger." },
    {
      name: ".select__positioner",
      description: "Base UI's floating positioner wrapping the popup.",
    },
    {
      name: ".select__popup",
      description: "The popup surface: background, radius, shadow, transitions.",
    },
    { name: ".select__list", description: "The scrollable list of items inside the popup." },
    { name: ".select__item", description: "A single option row." },
    {
      name: ".select__item-text",
      description: "An item's label text; ellipsized when it overflows.",
    },
    {
      name: ".select__item-indicator",
      description: "Wrapper for an item's selected-state indicator.",
    },
    {
      name: ".select__check",
      description: "The default checkmark glyph shown when an item is selected.",
    },
    {
      name: ".select__group",
      description: "A labeled run of items; a divider precedes any group after the first.",
    },
    { name: ".select__group-label", description: "The heading text for a Select.Group." },
    {
      name: ".select__scroll-arrow",
      description: "Base styling shared by both scroll affordances.",
    },
    {
      name: ".select__scroll-arrow--up / .select__scroll-arrow--down",
      description: "The top/bottom scroll buttons shown when the list overflows the popup.",
    },
    {
      name: "select__trigger[data-popup-open]",
      description: "Present while the popup is open; rotates the chevron.",
    },
    {
      name: "select__value[data-placeholder]",
      description: "Present when showing the placeholder instead of a selected value.",
    },
    {
      name: "select__item[data-highlighted]",
      description: "The keyboard- or pointer-highlighted item.",
    },
    {
      name: "select__popup[data-starting-style] / [data-ending-style]",
      description: "Present during the popup's enter/exit transition.",
    },
  ],
};
