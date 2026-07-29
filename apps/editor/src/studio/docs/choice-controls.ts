import type { ComponentDoc } from "../component-docs.tsx";

export const checkboxDoc: ComponentDoc = {
  usage:
    "Use Checkbox for a single boolean toggle, or for a list of independently selectable items backed by native form submission. Wire it with checked/defaultChecked, onCheckedChange, and disabled. Pass description for inline helper text and indeterminate for partial-selection states like a bulk select-all control. The secondary variant flattens the control for lower-emphasis contexts, and rounded swaps the square corners for a pill. Give checkboxes in the same group a shared name and distinct value so they submit like native checkboxes.",
  example:
    '<Checkbox\n  description="We only send a digest once a week."\n  name="digest"\n  onCheckedChange={setSubscribed}\n>\n  Weekly digest\n</Checkbox>',
  api: [
    {
      component: "Checkbox",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description: "Label content rendered beside the control.",
        },
        {
          name: "description",
          type: "ReactNode",
          description: "Helper text under the label; wired to aria-describedby automatically.",
        },
        {
          name: "variant",
          type: '"primary" | "secondary"',
          defaultValue: '"primary"',
          description: "Fill style of the control when checked; secondary drops the raised shadow.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Control box size.",
        },
        {
          name: "rounded",
          type: "boolean",
          defaultValue: "false",
          description: "Pill-shaped control instead of the default rounded square.",
        },
        {
          name: "checked",
          type: "boolean | undefined",
          description: "Controlled ticked state; pair with onCheckedChange.",
        },
        {
          name: "defaultChecked",
          type: "boolean",
          defaultValue: "false",
          description: "Initial ticked state for an uncontrolled checkbox.",
        },
        {
          name: "indeterminate",
          type: "boolean",
          defaultValue: "false",
          description: "Mixed state for partial selection, e.g. a select-all checkbox.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean) => void",
          description: "Called when the checkbox is ticked or unticked.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Blocks interaction and dims the control.",
        },
        {
          name: "...props",
          type: "Base UI Checkbox.Root props",
          description: "name, value, required, readOnly, id, and the render prop pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".checkbox", description: "Root label wrapping the control and copy." },
    {
      name: ".checkbox--primary / .checkbox--secondary",
      description: "Variant modifier; always present.",
    },
    { name: ".checkbox--sm / .checkbox--lg", description: "Non-default sizes." },
    { name: ".checkbox--rounded", description: "Checkboxes with rounded set." },
    { name: ".checkbox__content", description: "Flex row pairing the control with the copy." },
    { name: ".checkbox__control", description: "The checkbox box itself." },
    {
      name: ".checkbox__indicator",
      description: "Checkmark/dash glyph, shown when checked or indeterminate.",
    },
    { name: ".checkbox__copy", description: "Grid wrapper around the label and description." },
    { name: ".checkbox__label", description: "The label text." },
    { name: ".checkbox__description", description: "Helper text under the label." },
  ],
};

export const switchDoc: ComponentDoc = {
  usage:
    "Use Switch for a boolean setting that takes effect immediately, unlike Checkbox which implies a pending form submission. Render children for the label and pass description for helper text underneath; both are wired to the control via aria-describedby automatically. Control state with checked/onCheckedChange or defaultChecked, and use size to scale the track and thumb together. name and value submit like a native input when the switch sits inside a form.",
  example:
    '<Switch\n  checked={darkMode}\n  description="Automatically match the system appearance."\n  onCheckedChange={setDarkMode}\n>\n  Dark mode\n</Switch>',
  api: [
    {
      component: "Switch",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description: "Label content rendered beside the control.",
        },
        {
          name: "description",
          type: "ReactNode",
          description: "Helper text under the label; wired to aria-describedby automatically.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Track and thumb size.",
        },
        {
          name: "checked",
          type: "boolean | undefined",
          description: "Controlled active state; pair with onCheckedChange.",
        },
        {
          name: "defaultChecked",
          type: "boolean",
          defaultValue: "false",
          description: "Initial active state for an uncontrolled switch.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean) => void",
          description: "Called when the switch is activated or deactivated.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Blocks interaction and dims the control.",
        },
        {
          name: "...props",
          type: "Base UI Switch.Root props",
          description: "name, value, required, readOnly, id, and the render prop pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".switch", description: "Root label wrapping the control and copy." },
    { name: ".switch--sm / .switch--lg", description: "Non-default sizes." },
    { name: ".switch__control", description: "Track/rail." },
    { name: ".switch__thumb", description: "Moving indicator." },
    { name: ".switch__copy", description: "Grid wrapper around the label and description." },
    { name: ".switch__label", description: "The label text." },
    { name: ".switch__description", description: "Helper text under the label." },
  ],
};
