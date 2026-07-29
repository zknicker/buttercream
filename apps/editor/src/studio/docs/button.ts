import type { ComponentDoc } from "../component-docs.tsx";

export const buttonDoc: ComponentDoc = {
  usage:
    "Buttons trigger an action in response to a click. Pick the variant by weight — primary for the one action that matters on a screen, secondary and tertiary for supporting actions, outline and ghost for quiet ones, danger and danger-soft for destructive ones. Content is plain children; put an icon element before or after the label, and set iconOnly (with an aria-label) when there is no label at all.",
  example: '<Button variant="secondary" onClick={save}>\n  Save changes\n</Button>',
  api: [
    {
      component: "Button",
      props: [
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "outline" | "ghost" | "danger" | "danger-soft"',
          defaultValue: '"primary"',
          description: "Visual weight and intent of the action.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Control height and padding step.",
        },
        {
          name: "fullWidth",
          type: "boolean",
          defaultValue: "false",
          description: "Stretches the button across its container.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          defaultValue: "false",
          description: "Squares the button for a lone icon; pair with aria-label.",
        },
        {
          name: "loading",
          type: "boolean",
          defaultValue: "false",
          description: "Shows the system spinner and disables interaction while keeping focus.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Blocks interaction and dims the button.",
        },
        {
          name: "...props",
          type: "Base UI Button props",
          description: "Native button attributes and the render prop pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".button", description: "Every button." },
    {
      name: ".button--primary … .button--danger-soft",
      description: "One modifier per variant, e.g. .button--ghost.",
    },
    { name: ".button--sm / .button--lg", description: "Non-default sizes." },
    { name: ".button--full-width", description: "Buttons with fullWidth set." },
    { name: ".button--icon-only", description: "Buttons with iconOnly set." },
    { name: ".button__spinner", description: "The spinner shown while loading." },
  ],
};
