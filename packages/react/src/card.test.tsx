import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Card } from "./card.tsx";

describe("Card", () => {
  test("renders its composable slots", () => {
    const markup = renderToStaticMarkup(
      <Card>
        <Card.Header>
          <Card.Title>Creator hub</Card.Title>
          <Card.Description>Share your work.</Card.Description>
        </Card.Header>
        <Card.Content>Content</Card.Content>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );

    expect(markup).toContain('data-slot="card"');
    expect(markup).toContain('data-slot="card-header"');
    expect(markup).toContain('data-slot="card-title"');
    expect(markup).toContain('data-slot="card-description"');
    expect(markup).toContain('data-slot="card-content"');
    expect(markup).toContain('data-slot="card-footer"');
  });

  test("renders surface variants", () => {
    const markup = renderToStaticMarkup(<Card variant="tertiary">Tertiary</Card>);

    expect(markup).toContain("card--tertiary");
  });
});
