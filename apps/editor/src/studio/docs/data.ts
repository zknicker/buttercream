import type { ComponentDoc } from "../component-docs.tsx";

export const tableDoc: ComponentDoc = {
  usage:
    'Table displays structured, static data across Table.Header, Table.Body, Table.Row, Table.Column, and Table.Cell, composed over a native <table> element. Pick variant="primary" (default) for rows on a raised, tinted-frame surface, or "secondary" for a flat layout separated only by hairlines; pass label for an accessible name since there is no caption element. Cells take arbitrary children, so avatars, chips, and buttons drop straight in. There is no collection layer underneath — sorting, selection, column resizing, and virtualization are deliberately out of scope, so wire interactivity yourself with local state and native event handlers, or reach for a dedicated data-grid library when you need it out of the box.',
  example:
    '<Table label="Team" variant="primary">\n  <Table.Header>\n    <Table.Row>\n      <Table.Column>Name</Table.Column>\n      <Table.Column>Role</Table.Column>\n    </Table.Row>\n  </Table.Header>\n  <Table.Body>\n    <Table.Row>\n      <Table.Cell>Kate Moore</Table.Cell>\n      <Table.Cell>CEO</Table.Cell>\n    </Table.Row>\n  </Table.Body>\n</Table>',
  api: [
    {
      component: "Table",
      props: [
        {
          name: "label",
          type: "string",
          description: "Sets aria-label on the inner <table>, which a caption otherwise would.",
        },
        {
          name: "variant",
          type: '"primary" | "secondary"',
          defaultValue: '"primary"',
          description: "Raised card on a tinted frame, or a flat hairline-separated layout.",
        },
        {
          name: "...props",
          type: "Native <table> attributes",
          description: "Passed to the inner <table>, alongside label/variant/children.",
        },
      ],
    },
    {
      component: "Table.Header",
      props: [
        {
          name: "...props",
          type: "Native <thead> attributes",
          description: "All standard attributes pass through.",
        },
      ],
    },
    {
      component: "Table.Body",
      props: [
        {
          name: "...props",
          type: "Native <tbody> attributes",
          description: "All standard attributes pass through.",
        },
      ],
    },
    {
      component: "Table.Row",
      props: [
        {
          name: "...props",
          type: "Native <tr> attributes",
          description: "All standard attributes pass through.",
        },
      ],
    },
    {
      component: "Table.Column",
      props: [
        {
          name: "...props",
          type: "Native <th> attributes",
          description: "All standard attributes pass through; scope is always set to col.",
        },
      ],
    },
    {
      component: "Table.Cell",
      props: [
        {
          name: "...props",
          type: "Native <td> attributes",
          description: "All standard attributes pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".table", description: "Root container, holding the scroll wrapper and frame." },
    { name: ".table--primary / .table--secondary", description: "Selects the visual variant." },
    {
      name: ".table__scroll-container",
      description: "Horizontal scroll wrapper around the table.",
    },
    { name: ".table__content", description: "The inner <table> element." },
    { name: ".table__header", description: "The <thead>." },
    { name: ".table__column", description: "Each <th> in the header row." },
    { name: ".table__body", description: "The <tbody>." },
    { name: ".table__row", description: "Each <tr>." },
    { name: ".table__cell", description: "Each <td>." },
  ],
};

export const typographyDoc: ComponentDoc = {
  usage:
    "Typography applies Buttercream's type scale to any text. Pick a variant — h1 through h6, body, body-sm, body-xs, or code — and it renders the matching semantic element by default. Override the element with as when the visual style and the document outline diverge, such as a card title that must stay an h3 while looking like an h1. It accepts every native <p> prop plus className, so color, alignment, and weight are ordinary CSS rather than dedicated props.",
  example:
    '<Typography variant="h2">Section title</Typography>\n<Typography as="h3" variant="h1">\n  Styled like an h1, kept at heading level 3\n</Typography>',
  api: [
    {
      component: "Typography",
      props: [
        {
          name: "variant",
          type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "body-sm" | "body-xs" | "code"',
          defaultValue: '"body"',
          description: "Selects the type-scale step and, by default, the rendered element.",
        },
        {
          name: "as",
          type: "ElementType",
          description: "Overrides the rendered element without changing the style.",
        },
        {
          name: "...props",
          type: "Native <p> attributes",
          description: "All standard attributes pass through to the rendered element.",
        },
      ],
    },
  ],
  classes: [
    { name: ".typography", description: "Every instance; sets color to the foreground token." },
    {
      name: ".typography--h1 … .typography--h6, .typography--body, .typography--body-sm, .typography--body-xs, .typography--code",
      description: "One modifier per variant, e.g. .typography--h3.",
    },
  ],
};
