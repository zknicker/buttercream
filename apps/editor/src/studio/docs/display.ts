import type { ComponentDoc } from "../component-docs.tsx";

export const segmentDoc: ComponentDoc = {
  usage:
    'Use Segment for a segmented control where exactly one option is always selected, such as switching a view (grid/list/board) or a time range (day/week/month). Control it with value/onValueChange or defaultValue on the root, and give each Segment.Item a value; disable individual items with disabled. Pick size (sm/md/lg) for density and variant="ghost" for a borderless, tinted-pill look instead of the default sunken track. Every item renders its own sliding-pill indicator and hairline separator internally, so there is nothing extra to opt into.',
  example:
    '<Segment onValueChange={setView} value={view}>\n  <Segment.Item value="grid">Grid</Segment.Item>\n  <Segment.Item value="list">List</Segment.Item>\n  <Segment.Item value="board">Board</Segment.Item>\n</Segment>',
  api: [
    {
      component: "Segment",
      props: [
        {
          name: "variant",
          type: '"default" | "ghost"',
          defaultValue: '"default"',
          description: "Sunken track with a raised pill, or a borderless tinted pill.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Item height and padding step, applied to every item.",
        },
        {
          name: "value",
          type: "string",
          description: "Controlled active segment. Use with onValueChange.",
        },
        {
          name: "defaultValue",
          type: "string",
          description: "Uncontrolled initial active segment.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description:
            "Fired when a different segment is pressed. A segmented control always has exactly one segment on, so pressing the active segment again does not fire.",
        },
        {
          name: "...props",
          type: "Base UI ToggleGroup props",
          description: "Native div attributes and the render prop pass through.",
        },
      ],
    },
    {
      component: "Segment.Item",
      props: [
        {
          name: "value",
          type: "string",
          description: "Identifies this segment; passed to onValueChange when pressed.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Blocks interaction and dims this segment only.",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "The segment's label, e.g. text or an icon plus text.",
        },
        {
          name: "...props",
          type: "Base UI Toggle props",
          description: "Native button attributes and the render prop pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".segment", description: "The root track." },
    { name: ".segment--sm / .segment--lg", description: "Non-default track sizes." },
    { name: ".segment--ghost", description: "Borderless, tinted-pill variant on the root." },
    { name: ".segment__item", description: "Each segment button." },
    {
      name: ".segment__item--sm / --md / --lg",
      description: "Size modifier mirrored onto every item.",
    },
    { name: ".segment__item--ghost", description: "Ghost styling on an item." },
    { name: ".segment__indicator", description: "The sliding pill behind the pressed item." },
    { name: ".segment__indicator--ghost", description: "Ghost treatment on the pill." },
    { name: ".segment__separator", description: "The hairline between adjacent items." },
  ],
};

export const separatorDoc: ComponentDoc = {
  usage:
    "Use Separator to visually divide content sections, horizontally or vertically, via the orientation prop. Pick default, secondary, or tertiary variant for contrast against the surrounding surface. Pass children — text, an icon, or both — to get a labelled rule that splits automatically into two halves around the centered content, with the content excluded from the divider's accessible role.",
  example: '<Separator />\n<Separator orientation="vertical" />\n<Separator>or</Separator>',
  api: [
    {
      component: "Separator",
      props: [
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"horizontal"',
          description: "Axis of the rule.",
        },
        {
          name: "variant",
          type: '"default" | "secondary" | "tertiary"',
          defaultValue: '"default"',
          description: "Contrast against the surrounding surface.",
        },
        {
          name: "children",
          type: "ReactNode",
          description:
            "Content set into the rule, which splits it into two halves either side of the content.",
        },
        {
          name: "...props",
          type: "ComponentPropsWithoutRef<'div'>",
          description:
            "Native div attributes pass through — plain div props rather than Base UI's, since a labelled separator puts them on a wrapper div.",
        },
      ],
    },
  ],
  classes: [
    {
      name: ".separator",
      description: "A rule — the bare separator, or each half of a labelled one.",
    },
    { name: ".separator--horizontal / .separator--vertical", description: "Orientation modifier." },
    {
      name: ".separator--default / .separator--secondary / .separator--tertiary",
      description: "Contrast variant modifier.",
    },
    {
      name: ".separator__container",
      description:
        "Wrapper around a labelled separator; presentational, not announced as a divider.",
    },
    {
      name: ".separator__container--horizontal / .separator__container--vertical",
      description: "Orientation modifier mirrored onto the wrapper.",
    },
    { name: ".separator__line", description: "Each rule half in a labelled separator." },
    {
      name: ".separator__content",
      description: "Wrapper around the label between the two halves.",
    },
  ],
};

export const spinnerDoc: ComponentDoc = {
  usage:
    "Use Spinner to show a pending or loading state inline, in a button, or over a region. Pick size (sm/md/lg/xl) to match the surrounding content and color to match context — current inherits the parent's text color by default, accent/success/warning/danger tie it to a semantic state. Pass label to customize the text announced via role=\"status\", or label={null} when the spinner sits inside a control that already has its own accessible label (Button's loading spinner does this).",
  example: '<Spinner />\n<Spinner color="accent" size="lg" />',
  api: [
    {
      component: "Spinner",
      props: [
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          defaultValue: '"md"',
          description: "Overall dimension.",
        },
        {
          name: "color",
          type: '"current" | "accent" | "success" | "warning" | "danger"',
          defaultValue: '"current"',
          description: "Bar color; current inherits the surrounding text color.",
        },
        {
          name: "label",
          type: "string | null",
          defaultValue: '"Loading"',
          description:
            'Announced to assistive tech via role="status". Set null to suppress when already labelled by a parent control.',
        },
        {
          name: "className",
          type: "string",
          description: "Extra classes on the root.",
        },
      ],
    },
  ],
  classes: [
    { name: ".spinner", description: "The root element." },
    { name: ".spinner--sm / .spinner--lg / .spinner--xl", description: "Non-default sizes." },
    {
      name: ".spinner--current … .spinner--danger",
      description: "One modifier per color, e.g. .spinner--accent.",
    },
    { name: ".spinner__bars", description: "Wrapper positioning the eight animated bars." },
    { name: ".spinner__bar", description: "A single bar." },
    { name: ".spinner__label", description: "Visually-hidden text announced to assistive tech." },
  ],
};

export const toggleButtonDoc: ComponentDoc = {
  usage:
    'Use ToggleButton for a control that stays visually "on" once pressed, such as formatting toggles (bold/italic/underline) or a single on/off setting. Pass defaultPressed for uncontrolled use or pressed/onPressedChange for controlled state, variant="ghost" for a low-emphasis look, size for sm/md/lg, and iconOnly (with an aria-label) for icon-only buttons. Group related toggles with ToggleButton.Group (set multiple for multi-select, orientation for a vertical stack) to get a connected segmented control with shared corner rounding.',
  example: '<ToggleButton defaultPressed variant="ghost">\n  Bold\n</ToggleButton>',
  api: [
    {
      component: "ToggleButton",
      props: [
        {
          name: "variant",
          type: '"default" | "ghost"',
          defaultValue: '"default"',
          description: "Visual weight of the control.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Control height and padding step.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          defaultValue: "false",
          description: "Squares the button for a lone icon; pair with aria-label.",
        },
        {
          name: "pressed",
          type: "boolean",
          description: "Controlled on state. Use with onPressedChange.",
        },
        {
          name: "defaultPressed",
          type: "boolean",
          defaultValue: "false",
          description: "Uncontrolled initial on state.",
        },
        {
          name: "onPressedChange",
          type: "(pressed: boolean) => void",
          description: "Fired when the pressed state changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Blocks interaction and dims the button.",
        },
        {
          name: "value",
          type: "string",
          description: "Identifies this toggle when used inside ToggleButton.Group.",
        },
        {
          name: "...props",
          type: "Base UI Toggle props",
          description: "Native button attributes and the render prop pass through.",
        },
      ],
    },
    {
      component: "ToggleButton.Group",
      props: [
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"horizontal"',
          description: "Stack direction; corner rounding follows the first/last item.",
        },
        {
          name: "multiple",
          type: "boolean",
          defaultValue: "false",
          description: "Allows more than one item pressed at once instead of exactly one.",
        },
        {
          name: "value",
          type: "string[]",
          description: "Controlled set of pressed item values. Use with onValueChange.",
        },
        {
          name: "defaultValue",
          type: "string[]",
          description: "Uncontrolled initial set of pressed item values.",
        },
        {
          name: "onValueChange",
          type: "(value: string[]) => void",
          description: "Fired when the set of pressed items changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Blocks interaction on every item in the group.",
        },
        {
          name: "...props",
          type: "Base UI ToggleGroup props",
          description: "Native div attributes and the render prop pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".toggle-button", description: "The root element." },
    {
      name: ".toggle-button--sm / .toggle-button--lg",
      description: "Non-default sizes (md is unclassed).",
    },
    { name: ".toggle-button--default / .toggle-button--ghost", description: "Variant modifiers." },
    { name: ".toggle-button--icon-only", description: "Icon-only sizing modifier." },
    { name: ".toggle-button-group", description: "The root element from ToggleButton.Group." },
    {
      name: ".toggle-button-group--horizontal / .toggle-button-group--vertical",
      description: "Group orientation modifiers.",
    },
  ],
};
