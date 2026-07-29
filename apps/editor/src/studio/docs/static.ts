import type { ComponentDoc } from "../component-docs.tsx";

export const buttonGroupDoc: ComponentDoc = {
  usage:
    'Wrap adjacent Button elements in ButtonGroup to join them into a single visual control: corners round only on the outer edges, and a hairline separator is injected automatically between buttons. variant, size, and disabled set on the group cascade to every child Button as its default — an explicit prop on a Button still wins, so one button can stand out from the row. Use orientation="vertical" for a stacked action column and fullWidth to stretch the group across its container. Press transforms are suppressed on grouped buttons so the row doesn\'t ripple. ButtonGroup carries no ARIA role of its own — pass role="group" with an aria-label yourself if the set needs an accessible name, or reach for ToggleButton.Group when the buttons express a selection rather than independent actions.',
  example:
    '<ButtonGroup variant="outline">\n  <Button>Cut</Button>\n  <Button>Copy</Button>\n  <Button>Paste</Button>\n</ButtonGroup>',
  api: [
    {
      component: "ButtonGroup",
      props: [
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "outline" | "ghost" | "danger" | "danger-soft"',
          description:
            "Cascades to every child Button as its default; a Button's own variant still wins.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          description:
            "Cascades to every child Button as its default; a Button's own size still wins.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description:
            "Cascades to every child Button as its default; a Button's own disabled still wins.",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"horizontal"',
          description: "Lays the buttons in a row or a stacked column.",
        },
        {
          name: "fullWidth",
          type: "boolean",
          defaultValue: "false",
          description: "Stretches the group across its container.",
        },
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"div">',
          description: "Native div attributes pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".button-group", description: "Every group." },
    {
      name: ".button-group--horizontal / .button-group--vertical",
      description: "Orientation modifiers.",
    },
    { name: ".button-group--full-width", description: "Groups with fullWidth set." },
    {
      name: ".button-group__separator",
      description: "The hairline auto-injected between buttons.",
    },
  ],
};

export const colorSwatchDoc: ComponentDoc = {
  usage:
    'ColorSwatch renders a presentational preview of any CSS color value, painting it over a checkerboard so translucent and transparent colors read correctly. It\'s a plain span with role="img", so use it inline anywhere a color needs a visual sample — swatch pickers, palette docs, theme previews. Pass color plus label, an accessible name announced instead of the raw value (which reads poorly aloud); label falls back to color when omitted. shape defaults to "square" and size ranges from xs to xl.',
  example: '<ColorSwatch color="#0485f7" label="Accent" shape="circle" size="lg" />',
  api: [
    {
      component: "ColorSwatch",
      props: [
        {
          name: "color",
          type: "string",
          description: "Any CSS color. Translucent values show the checkerboard behind them.",
        },
        {
          name: "label",
          type: "string",
          description: "Announced in place of the raw value. Falls back to color when omitted.",
        },
        {
          name: "shape",
          type: '"square" | "circle"',
          defaultValue: '"square"',
          description: "Corner treatment of the swatch.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          defaultValue: '"md"',
          description: "Size step.",
        },
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"span">',
          description:
            "Native span attributes pass through (color is a named prop, not the CSS one).",
        },
      ],
    },
  ],
  classes: [
    { name: ".color-swatch", description: "Every swatch, including the checkerboard backing." },
    { name: ".color-swatch--square / .color-swatch--circle", description: "Shape modifiers." },
    {
      name: ".color-swatch--xs / --sm / --lg / --xl",
      description: "Non-default size steps (md has none).",
    },
  ],
};

export const kbdDoc: ComponentDoc = {
  usage:
    'Use Kbd to display a keyboard key or chord, either standalone or inline within body text (e.g. "Press <Kbd>⌘ K</Kbd> to search"). It renders a native <kbd>, which already carries the right semantics. Pass keys with one or more named KbdKey values ("command", "shift", "enter", the arrow keys, and more) to render their symbol with an accessible title before children — combine with plain-text children for a full chord, or omit children to show just the symbol. variant="light" swaps the filled background for a transparent one; word-spacing is tightened so a multi-glyph chord reads as one unit.',
  example: '<Kbd keys={["command", "shift"]}>P</Kbd>',
  api: [
    {
      component: "Kbd",
      props: [
        {
          name: "keys",
          type: "KbdKey | KbdKey[]",
          description:
            "Named modifier/special keys, rendered as symbols with accessible titles before children.",
        },
        {
          name: "variant",
          type: '"default" | "light"',
          defaultValue: '"default"',
          description: "Background treatment.",
        },
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"kbd">',
          description: "Native kbd attributes, including children, pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".kbd", description: "Every key or chord." },
    { name: ".kbd--light", description: 'Kbds with variant="light" set.' },
    {
      name: ".kbd__abbr",
      description: "A keys symbol, rendered as an abbr with its accessible title.",
    },
  ],
};

export const linkDoc: ComponentDoc = {
  usage:
    'Use Link for inline or standalone text navigation styled as a native anchor — Base UI has no link primitive because an anchor needs none, so it\'s a plain <a> that accepts href, target, rel, download, and other native attributes directly. Pass icon={true} for the built-in external-arrow glyph, or any ReactNode for a custom icon rendered after children; handle activation with the native onClick, and set aria-disabled="true" to render it inert. Passing target="_blank" automatically adds rel="noreferrer" (unless you set rel yourself) so the new tab can\'t reach back through window.opener.',
  example: '<Link href="https://example.com" icon target="_blank">\n  Read the docs\n</Link>',
  api: [
    {
      component: "Link",
      props: [
        {
          name: "icon",
          type: "ReactNode | true",
          description: "Trailing glyph. Pass true for the built-in external-link arrow.",
        },
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"a">',
          description:
            "Native anchor attributes (href, target, rel, download, onClick, aria-disabled, ...) pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".link", description: "Every link." },
    { name: ".link__icon", description: "The icon wrapper slot." },
    {
      name: ".link__icon--default",
      description: "The built-in arrow glyph's spacing (icon={true}).",
    },
    {
      name: ".link.button",
      description: "A Link styled with Button's classes, drops the underline.",
    },
  ],
};
