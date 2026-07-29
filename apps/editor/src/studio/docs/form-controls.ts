import type { ComponentDoc } from "../component-docs.tsx";

export const inputDoc: ComponentDoc = {
  usage:
    'Input renders a single-line text field inside a bordered, focusable frame. Pass native attributes — type, placeholder, disabled, required, maxLength — straight through, and use onChange or the convenience onValueChange for controlled values. Add prefix for a leading adornment like a currency symbol or protocol, fullWidth to stretch it to its container, and variant="secondary" for the flat filled style that sits well on a Surface.',
  example: '<Input\n  onValueChange={setValue}\n  placeholder="Search"\n  value={value}\n/>',
  api: [
    {
      component: "Input",
      props: [
        {
          name: "variant",
          type: '"primary" | "secondary"',
          defaultValue: '"primary"',
          description: "Visual weight of the field.",
        },
        {
          name: "fullWidth",
          type: "boolean",
          defaultValue: "false",
          description: "Stretches the input across its container.",
        },
        {
          name: "prefix",
          type: "ReactNode",
          description: "Leading adornment rendered inside the field, e.g. an icon or fixed text.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Convenience controlled-value callback alongside native onChange.",
        },
        {
          name: "...props",
          type: "Base UI Input props",
          description:
            "Native input attributes (type, placeholder, disabled, required, maxLength, …) plus value/defaultValue/onChange pass through.",
        },
      ],
    },
  ],
  classes: [
    {
      name: ".input",
      description:
        "The wrapping frame; border, background, and focus/invalid/disabled styling live here.",
    },
    { name: ".input__prefix", description: "The leading adornment slot." },
    { name: ".input__input", description: "The native input element." },
    {
      name: ".input--secondary",
      description: "Flat filled style instead of the bordered default.",
    },
    { name: ".input--full-width", description: "Stretches the input to its container." },
  ],
};
