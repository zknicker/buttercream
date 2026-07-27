import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "./button.tsx";
import { ButtonGroup } from "./button-group.tsx";
import { ColorSwatch } from "./color-swatch.tsx";
import { Kbd } from "./kbd.tsx";
import { Link } from "./link.tsx";

describe("Kbd", () => {
  test("renders a native kbd element", () => {
    const markup = renderToStaticMarkup(<Kbd>⌘ K</Kbd>);

    /* The element carries the semantics; a styled span would not. */
    expect(markup).toContain("<kbd");
    expect(markup).toContain('data-slot="kbd"');
  });
});

describe("Link", () => {
  test("renders a plain anchor with no icon by default", () => {
    const markup = renderToStaticMarkup(<Link href="/docs">Docs</Link>);

    expect(markup).toContain('href="/docs"');
    expect(markup).not.toContain("link__icon");
  });

  test("adds rel=noreferrer when it opens a new tab", () => {
    const markup = renderToStaticMarkup(
      <Link href="https://example.com" target="_blank">
        External
      </Link>,
    );

    /* Without it the opened page can reach back through window.opener. */
    expect(markup).toContain('rel="noreferrer"');
  });

  test("keeps an explicit rel over the default", () => {
    const markup = renderToStaticMarkup(
      <Link href="https://example.com" rel="noopener nofollow" target="_blank">
        External
      </Link>,
    );

    expect(markup).toContain('rel="noopener nofollow"');
  });

  test("renders the built-in icon for icon={true} and a custom one otherwise", () => {
    expect(renderToStaticMarkup(<Link href="/a" icon />)).toContain("link__icon--default");
    const custom = renderToStaticMarkup(<Link href="/a" icon={<span>→</span>} />);

    expect(custom).toContain("<span>→</span>");
    expect(custom).not.toContain("link__icon--default");
  });
});

describe("ColorSwatch", () => {
  test("exposes the colour as a custom property and a name", () => {
    const markup = renderToStaticMarkup(<ColorSwatch color="#0485f7" />);

    expect(markup).toContain("--bc-color-swatch:#0485f7");
    /* The raw hex reads poorly aloud, so a label should win when given. */
    expect(markup).toContain('aria-label="#0485f7"');
    expect(renderToStaticMarkup(<ColorSwatch color="#0485f7" label="Brand blue" />)).toContain(
      'aria-label="Brand blue"',
    );
  });

  test("applies shape and size", () => {
    const markup = renderToStaticMarkup(<ColorSwatch color="red" shape="circle" size="xl" />);

    expect(markup).toContain("color-swatch--circle");
    expect(markup).toContain("color-swatch--xl");
  });
});

describe("ButtonGroup", () => {
  test("joins buttons without inventing a role", () => {
    const markup = renderToStaticMarkup(
      <ButtonGroup>
        <Button>Cut</Button>
        <Button>Copy</Button>
      </ButtonGroup>,
    );

    /*
     * An unnamed group announces nothing, and a toolbar would promise arrow-key movement these
     * buttons do not implement. The buttons inside are already labelled and actionable.
     */
    expect(markup).not.toContain("role=");
    expect(markup).toContain("button-group--horizontal");
  });

  test("lets a caller name the set when it needs one", () => {
    const markup = renderToStaticMarkup(
      <ButtonGroup aria-label="Text alignment" role="group">
        <Button>Left</Button>
      </ButtonGroup>,
    );

    expect(markup).toContain('role="group"');
    expect(markup).toContain('aria-label="Text alignment"');
  });

  test("takes orientation and full width", () => {
    const markup = renderToStaticMarkup(<ButtonGroup fullWidth orientation="vertical" />);

    expect(markup).toContain("button-group--vertical");
    expect(markup).toContain("button-group--full-width");
    expect(markup).toContain('data-orientation="vertical"');
  });
});
