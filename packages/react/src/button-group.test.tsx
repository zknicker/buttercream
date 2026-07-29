import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "./button.tsx";
import { ButtonGroup } from "./button-group.tsx";

describe("ButtonGroup", () => {
  test("cascades variant, size, and disabled to every child Button", () => {
    const markup = renderToStaticMarkup(
      <ButtonGroup disabled size="lg" variant="secondary">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );

    const oneCount = markup.split("button--secondary").length - 1;
    expect(oneCount).toBe(2);
    expect(markup.split("button--lg").length - 1).toBe(2);
    expect(markup.split(' disabled=""').length - 1).toBe(2);
  });

  test("lets a child Button override the cascaded defaults", () => {
    const markup = renderToStaticMarkup(
      <ButtonGroup size="lg" variant="secondary">
        <Button>Default</Button>
        <Button size="sm" variant="danger">
          Override
        </Button>
      </ButtonGroup>,
    );

    expect(markup).toContain("button--secondary");
    expect(markup).toContain("button--lg");
    expect(markup).toContain("button--danger");
    expect(markup).toContain("button--sm");
  });

  test("without props, children fall back to Button's own defaults", () => {
    const markup = renderToStaticMarkup(
      <ButtonGroup>
        <Button>One</Button>
      </ButtonGroup>,
    );

    expect(markup).toContain("button--primary");
    expect(markup).not.toContain(' disabled=""');
  });
});
