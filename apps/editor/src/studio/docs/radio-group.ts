import type { ComponentDoc } from "../component-docs.tsx";

export const radioGroupDoc: ComponentDoc = {
  usage:
    'RadioGroup lets someone pick a single option from a small list. Wrap RadioGroup.Item children under it and set value or defaultValue for the selected item, pairing a controlled value with onValueChange. Pass label and description on the group for accessible framing — aria-labelledby and aria-describedby wire themselves — and give any item its own description to explain that choice inline. Reach for orientation="horizontal" to lay items in a row, variant="secondary" for a flatter control fill, and size="sm" | "lg" to scale the control and its indicator; disabled, required, and readOnly forward straight through to Base UI, and nesting the group inside Field.Root surfaces its invalid state.',
  example:
    '<RadioGroup defaultValue="pro" label="Plan" name="plan">\n  <RadioGroup.Item value="starter">Starter</RadioGroup.Item>\n  <RadioGroup.Item value="pro">Pro</RadioGroup.Item>\n</RadioGroup>',
  api: [
    {
      component: "RadioGroup",
      props: [
        {
          name: "label",
          type: "ReactNode",
          description: "Heading rendered above the items; auto-wires aria-labelledby.",
        },
        {
          name: "description",
          type: "ReactNode",
          description: "Supporting copy under the label; auto-wires aria-describedby.",
        },
        {
          name: "orientation",
          type: '"vertical" | "horizontal"',
          defaultValue: '"vertical"',
          description: "Stacks items in a column or wraps them in a row.",
        },
        {
          name: "variant",
          type: '"primary" | "secondary"',
          defaultValue: '"primary"',
          description: "Visual weight of each item's control fill.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Control diameter and indicator size.",
        },
        {
          name: "value",
          type: "Value",
          description: "The controlled selected value; pair with onValueChange.",
        },
        {
          name: "defaultValue",
          type: "Value",
          description: "The uncontrolled initial selected value.",
        },
        {
          name: "onValueChange",
          type: "(value: Value, eventDetails) => void",
          description: "Fires when the selected value changes.",
        },
        {
          name: "name",
          type: "string",
          description: "Name submitted with the selected value.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Disables every item in the group.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Requires a selection before the group can submit.",
        },
        {
          name: "readOnly",
          type: "boolean",
          defaultValue: "false",
          description: "Keeps the current selection visible and focusable but not changeable.",
        },
        {
          name: "...props",
          type: "Base UI RadioGroup props",
          description: "form, inputRef, and the render prop pass through.",
        },
      ],
    },
    {
      component: "RadioGroup.Item",
      props: [
        {
          name: "value",
          type: "Value",
          description: "The value this item represents.",
        },
        {
          name: "description",
          type: "ReactNode",
          description: "Supporting copy rendered under this item's label.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Disables just this item.",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "The item's label.",
        },
        {
          name: "...props",
          type: "Base UI Radio.Root props",
          description: "readOnly, required, and the render prop pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".radio-group", description: "The group container." },
    { name: ".radio-group__header", description: "Wraps the group label and description." },
    { name: ".radio-group__label", description: "The group's label text." },
    { name: ".radio-group__description", description: "The group's description text." },
    { name: ".radio-group__items", description: "Wraps the RadioGroup.Item children." },
    { name: ".radio-group--horizontal", description: "Group with orientation set to horizontal." },
    { name: ".radio-group--secondary", description: "Group with variant set to secondary." },
    { name: ".radio-group--sm / .radio-group--lg", description: "Group with a non-default size." },
    { name: ".radio", description: "One item's label, wrapping its control and copy." },
    { name: ".radio__content", description: "Wraps an item's control and copy." },
    { name: ".radio__control", description: "The circular button element." },
    { name: ".radio__indicator", description: "The inner dot shown when an item is selected." },
    { name: ".radio__copy", description: "Wraps an item's label and description." },
    { name: ".radio__label", description: "An item's label text." },
    { name: ".radio__description", description: "An item's description text." },
  ],
};
