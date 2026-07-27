import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ProgressBar } from "./progress-bar.tsx";

describe("ProgressBar", () => {
  test("renders track and fill, omitting label and value unless asked", () => {
    const markup = renderToStaticMarkup(<ProgressBar value={40} />);

    expect(markup).toContain('data-slot="progress-bar-track"');
    expect(markup).toContain('data-slot="progress-bar-fill"');
    expect(markup).not.toContain('data-slot="progress-bar-label"');
    expect(markup).not.toContain('data-slot="progress-bar-output"');
  });

  test("reports its value to assistive technology", () => {
    const markup = renderToStaticMarkup(<ProgressBar label="Uploading" showValue value={40} />);

    expect(markup).toContain('aria-valuenow="40"');
    expect(markup).toContain("Uploading");
  });

  test("drops aria-valuenow when indeterminate", () => {
    const markup = renderToStaticMarkup(<ProgressBar value={null} />);

    /* The stylesheet keys the shuttle off this absence, so it is behaviour and not cosmetic. */
    expect(markup).not.toContain("aria-valuenow");
  });

  test("omits the default modifiers", () => {
    const plain = renderToStaticMarkup(<ProgressBar value={10} />);

    expect(plain).not.toContain("progress-bar--default");
    expect(plain).not.toContain("progress-bar--md");
    expect(renderToStaticMarkup(<ProgressBar color="danger" size="lg" value={10} />)).toContain(
      "progress-bar--danger",
    );
  });
});
