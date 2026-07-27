import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Accordion } from "./accordion.tsx";
import { Breadcrumbs } from "./breadcrumbs.tsx";
import { ErrorMessage } from "./error-message.tsx";
import { Pagination } from "./pagination.tsx";
import { Toolbar } from "./toolbar.tsx";

describe("Accordion", () => {
  test("wraps each trigger in a heading", () => {
    const markup = renderToStaticMarkup(
      <Accordion>
        <Accordion.Item value="one">
          <Accordion.Trigger>Shipping</Accordion.Trigger>
          <Accordion.Panel>Ships in two days.</Accordion.Panel>
        </Accordion.Item>
      </Accordion>,
    );

    /* The heading is what puts the section in a screen reader's outline. */
    expect(markup).toContain('data-slot="accordion-header"');
    expect(markup).toContain('data-slot="accordion-trigger"');
    expect(markup).toContain('data-slot="accordion-indicator"');
  });

  test("takes the surface variant", () => {
    expect(renderToStaticMarkup(<Accordion variant="surface" />)).toContain("accordion--surface");
    expect(renderToStaticMarkup(<Accordion />)).not.toContain("accordion--plain");
  });
});

describe("Breadcrumbs", () => {
  test("puts separators between crumbs but never after the last", () => {
    const markup = renderToStaticMarkup(
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/team">Team</Breadcrumbs.Item>
        <Breadcrumbs.Item current href="/team/kate">
          Kate
        </Breadcrumbs.Item>
      </Breadcrumbs>,
    );

    /* Three crumbs, two gaps — a trailing separator is the classic version of this bug. */
    expect([...markup.matchAll(/breadcrumbs__separator/gu)]).toHaveLength(2);
    expect(markup).toContain('aria-label="Breadcrumb"');
    expect(markup).toContain('aria-current="page"');
  });

  test("orders the trail as a list", () => {
    const markup = renderToStaticMarkup(
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      </Breadcrumbs>,
    );

    expect(markup).toContain("<ol");
  });
});

describe("Pagination", () => {
  test("renders links for reachable pages and spans for the rest", () => {
    const markup = renderToStaticMarkup(
      <Pagination summary="Page 2 of 10">
        <Pagination.Link disabled nav>
          Previous
        </Pagination.Link>
        <Pagination.Link href="/?page=1">1</Pagination.Link>
        <Pagination.Link current href="/?page=2">
          2
        </Pagination.Link>
        <Pagination.Ellipsis />
        <Pagination.Link href="/?page=10">10</Pagination.Link>
      </Pagination>,
    );

    /*
     * The current page and a disabled arrow are not destinations. An anchor without an href
     * is neither focusable nor actionable, so they render as spans instead.
     */
    expect(markup).toContain('aria-current="page"');
    expect(markup).toContain('aria-disabled="true"');
    expect([...markup.matchAll(/<a /gu)]).toHaveLength(2);
    expect(markup).toContain("Page 2 of 10");
  });

  test("hides the ellipsis from assistive technology", () => {
    const markup = renderToStaticMarkup(
      <Pagination>
        <Pagination.Ellipsis />
      </Pagination>,
    );

    expect(markup).toContain('aria-hidden="true"');
  });
});

describe("Toolbar", () => {
  test("is a real toolbar, unlike ButtonGroup", () => {
    const markup = renderToStaticMarkup(
      <Toolbar>
        <Toolbar.Separator />
      </Toolbar>,
    );

    /* Base UI gives it roving focus, so the role's promise of arrow-key movement holds. */
    expect(markup).toContain('role="toolbar"');
    expect(markup).toContain("toolbar--horizontal");
  });

  test("styles its separator like every other separator", () => {
    const markup = renderToStaticMarkup(
      <Toolbar>
        <Toolbar.Separator />
      </Toolbar>,
    );

    expect(markup).toContain("separator--vertical");
    expect(markup).toContain("separator--default");
  });
});

describe("ErrorMessage", () => {
  test("announces politely rather than interrupting", () => {
    const markup = renderToStaticMarkup(<ErrorMessage>Could not save.</ErrorMessage>);

    expect(markup).toContain('role="alert"');
    expect(markup).toContain("error-message");
  });
});
