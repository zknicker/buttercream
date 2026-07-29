import type { ComponentDoc } from "../component-docs.tsx";

export const cardDoc: ComponentDoc = {
  usage:
    'Use Card to group related content and actions behind a semantic prominence level rather than one-off styling. Compose Card.Header (optionally with Card.Title, Card.Description, and a Card.Action for a trailing control), Card.Content for the body, and Card.Footer for closing actions or metadata. Pick variant="secondary" or "tertiary" to sit the card on a different surface layer, or "transparent" for a border-only container. Card.Header lays its title and description in one grid column and reserves a second column, spanning both rows, for Card.Action.',
  example:
    '<Card variant="secondary">\n  <Card.Header>\n    <Card.Title>Weekly digest</Card.Title>\n    <Card.Description>A summary of activity across your workspace.</Card.Description>\n    <Card.Action>\n      <Button size="sm" variant="outline">Manage</Button>\n    </Card.Action>\n  </Card.Header>\n  <Card.Content>...</Card.Content>\n  <Card.Footer>Submissions end Oct 10.</Card.Footer>\n</Card>',
  api: [
    {
      component: "Card",
      props: [
        {
          name: "variant",
          type: '"default" | "secondary" | "tertiary" | "transparent"',
          defaultValue: '"default"',
          description: "Surface layer the card sits on, or a border-only container.",
        },
        {
          name: "...props",
          type: "Base UI div render props",
          description: "Native div attributes and the render prop pass through.",
        },
      ],
    },
    {
      component: "Card.Header",
      props: [
        {
          name: "...props",
          type: "Base UI div render props",
          description:
            "Grid region for Card.Title/Card.Description in column one and Card.Action spanning both rows in column two.",
        },
      ],
    },
    {
      component: "Card.Title",
      props: [
        {
          name: "...props",
          type: "Base UI div render props",
          description: "Heading text inside Card.Header.",
        },
      ],
    },
    {
      component: "Card.Description",
      props: [
        {
          name: "...props",
          type: "Base UI div render props",
          description: "Supporting text under Card.Title inside Card.Header.",
        },
      ],
    },
    {
      component: "Card.Action",
      props: [
        {
          name: "...props",
          type: "Base UI div render props",
          description: "Header-aligned slot for a button or control, e.g. Manage or Dismiss.",
        },
      ],
    },
    {
      component: "Card.Content",
      props: [
        {
          name: "...props",
          type: "Base UI div render props",
          description: "Main body region between the header and footer.",
        },
      ],
    },
    {
      component: "Card.Footer",
      props: [
        {
          name: "...props",
          type: "Base UI div render props",
          description: "Closing region for actions or metadata.",
        },
      ],
    },
  ],
  classes: [
    { name: ".card", description: "The card container: padding, border, radius, and shadow." },
    { name: ".card--secondary / .card--tertiary", description: "Sits on that surface layer." },
    { name: ".card--transparent", description: "Removes the background and shadow, border only." },
    { name: ".card__header", description: "Grid region holding title, description, and action." },
    { name: ".card__title", description: "Card.Title text." },
    { name: ".card__description", description: "Card.Description text." },
    { name: ".card__action", description: "Card.Action's slot, spanning both header rows." },
    { name: ".card__content", description: "Card.Content's body region." },
    { name: ".card__footer", description: "Card.Footer's closing region." },
  ],
};
