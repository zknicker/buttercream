import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Badge } from "./badge.tsx";

describe("Badge", () => {
  test("renders a labelled badge with its default variant", () => {
    const markup = renderToStaticMarkup(<Badge>5</Badge>);

    expect(markup).toContain('data-slot="badge"');
    expect(markup).toContain('data-slot="badge-label"');
    expect(markup).toContain("badge--default");
    expect(markup).toContain("badge--primary");
    expect(markup).not.toContain("badge--md");
  });

  test("combines colour and variant, which the stylesheet pairs", () => {
    const markup = renderToStaticMarkup(
      <Badge color="danger" variant="soft">
        9
      </Badge>,
    );

    /* Neither class styles the badge alone — the fill comes from the two together. */
    expect(markup).toContain("badge--danger");
    expect(markup).toContain("badge--soft");
  });

  test("takes a placement only when anchored", () => {
    const inline = renderToStaticMarkup(<Badge>1</Badge>);
    const placed = renderToStaticMarkup(<Badge placement="top-right">1</Badge>);

    expect(inline).not.toContain("badge--top-right");
    expect(placed).toContain("badge--top-right");
  });

  test("anchors a badge against its content", () => {
    const markup = renderToStaticMarkup(
      <Badge.Anchor badge={<Badge placement="top-right">3</Badge>}>
        <span>inbox</span>
      </Badge.Anchor>,
    );

    expect(markup).toContain('data-slot="badge-anchor"');
    expect(markup).toContain("inbox");
    expect(markup).toContain("badge--top-right");
  });
});
