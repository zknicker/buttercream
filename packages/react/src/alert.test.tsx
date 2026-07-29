import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Alert } from "./alert.tsx";
import { Chip } from "./chip.tsx";
import { Skeleton } from "./skeleton.tsx";

describe("Alert", () => {
  test("renders a title, description, and decorative icon", () => {
    const markup = renderToStaticMarkup(
      <Alert icon={<svg aria-hidden="true" role="presentation" />} title="Saved">
        Your changes are live.
      </Alert>,
    );

    expect(markup).toContain('data-slot="alert-title"');
    expect(markup).toContain('data-slot="alert-description"');
    /* The icon repeats the title, so announcing it would be redundant. */
    expect(markup).toMatch(/alert__indicator[^>]*/u);
    expect(markup).toContain("Saved");
  });

  test("defaults to a status icon matching each colour", () => {
    for (const color of ["default", "accent", "success", "warning", "danger"] as const) {
      const markup = renderToStaticMarkup(<Alert color={color} title="Note" />);

      expect(markup).toContain('data-slot="alert-indicator"');
      expect(markup).toContain("<svg");
    }
  });

  test("icon={null} suppresses the default icon", () => {
    const markup = renderToStaticMarkup(<Alert icon={null} title="Note" />);

    expect(markup).not.toContain('data-slot="alert-indicator"');
  });

  test("an explicit icon wins over the default", () => {
    const markup = renderToStaticMarkup(
      <Alert color="danger" icon={<svg data-testid="custom-icon" />} title="Failed" />,
    );

    expect(markup).toContain('data-testid="custom-icon"');
  });

  test("announces only the urgent colours", () => {
    const danger = renderToStaticMarkup(<Alert color="danger" title="Failed" />);
    const warning = renderToStaticMarkup(<Alert color="warning" title="Careful" />);
    const info = renderToStaticMarkup(<Alert title="Note" />);

    /* A status role firing on every neutral message is noise, not help. */
    expect(danger).toContain('role="alert"');
    expect(warning).toContain('role="alert"');
    expect(info).toContain('role="status"');
  });
});

describe("Chip", () => {
  test("defaults to the soft variant", () => {
    const markup = renderToStaticMarkup(<Chip>Beta</Chip>);

    expect(markup).toContain("chip--soft");
    expect(markup).toContain("chip--default");
    expect(markup).not.toContain("chip--md");
  });

  test("applies colour, variant, and size", () => {
    const markup = renderToStaticMarkup(
      <Chip color="success" size="lg" variant="primary">
        Live
      </Chip>,
    );

    expect(markup).toContain("chip--success");
    expect(markup).toContain("chip--primary");
    expect(markup).toContain("chip--lg");
  });
});

describe("Skeleton", () => {
  test("is hidden from assistive technology", () => {
    const markup = renderToStaticMarkup(<Skeleton />);

    /* The owning region announces loading; every grey box doing so would be a wall of noise. */
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain("skeleton--shimmer");
  });

  test("supports pulse and no animation", () => {
    expect(renderToStaticMarkup(<Skeleton animation="pulse" />)).toContain("skeleton--pulse");
    const still = renderToStaticMarkup(<Skeleton animation="none" />);

    expect(still).not.toContain("skeleton--shimmer");
    expect(still).not.toContain("skeleton--pulse");
  });
});
