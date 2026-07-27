import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Table } from "./table.tsx";
import { Typography } from "./typography.tsx";

function sampleTable(variant?: "primary" | "secondary") {
  return renderToStaticMarkup(
    <Table label="Team" {...(variant ? { variant } : {})}>
      <Table.Header>
        <Table.Row>
          <Table.Column>Name</Table.Column>
          <Table.Column>Role</Table.Column>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Kate Moore</Table.Cell>
          <Table.Cell>CEO</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>,
  );
}

describe("Table", () => {
  test("renders native table elements", () => {
    const markup = sampleTable();

    /* The native elements carry the semantics; divs with roles would have to re-add them. */
    expect(markup).toContain("<table");
    expect(markup).toContain("<thead");
    expect(markup).toContain("<tbody");
    expect(markup).toContain("<th");
    expect(markup).toContain("<td");
  });

  test("names the table and scopes its columns", () => {
    const markup = sampleTable();

    expect(markup).toContain('aria-label="Team"');
    /* Without scope, a screen reader cannot tell which cells a header governs. */
    expect(markup).toContain('scope="col"');
  });

  test("wraps the table in its own scroll container", () => {
    const markup = sampleTable();

    /* Overflowing inside the frame is what keeps the rounded corners intact. */
    expect(markup).toContain('data-slot="table-scroll-container"');
  });

  test("defaults to primary and takes secondary", () => {
    expect(sampleTable()).toContain("table--primary");
    expect(sampleTable("secondary")).toContain("table--secondary");
  });
});

describe("Typography", () => {
  test("pairs each variant with its element", () => {
    expect(renderToStaticMarkup(<Typography variant="h1">Title</Typography>)).toContain("<h1");
    expect(renderToStaticMarkup(<Typography variant="h4">Title</Typography>)).toContain("<h4");
    expect(renderToStaticMarkup(<Typography variant="code">npm i</Typography>)).toContain("<code");
    expect(renderToStaticMarkup(<Typography>Body</Typography>)).toContain("<p");
  });

  test("lets the element be overridden without changing the style", () => {
    const markup = renderToStaticMarkup(
      <Typography as="h3" variant="h1">
        Looks like h1, ranks as h3
      </Typography>,
    );

    /* Heading level is a document concern; visual weight should not dictate the outline. */
    expect(markup).toContain("<h3");
    expect(markup).toContain("typography--h1");
  });

  test("carries the base class alongside the variant", () => {
    const markup = renderToStaticMarkup(<Typography variant="body-sm">Small</Typography>);

    expect(markup).toContain("typography ");
    expect(markup).toContain("typography--body-sm");
  });
});
