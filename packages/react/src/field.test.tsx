import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Field } from "./field.tsx";
import { Input } from "./input.tsx";

describe("Field", () => {
  test("wires a label and description to their control", () => {
    const markup = renderToStaticMarkup(
      <Field name="email">
        <Field.Label>Email</Field.Label>
        <Input placeholder="Enter your email" />
        <Field.Description>We only use this to sign you in.</Field.Description>
      </Field>,
    );

    expect(markup).toContain('data-slot="field"');
    expect(markup).toContain('data-slot="label"');
    expect(markup).toContain('data-slot="description"');

    /*
     * Base UI pairs the label to the control through the field root. Losing that would be
     * silent, so assert the ids actually match rather than that a `for` merely exists.
     * aria-describedby is attached on the client, so it is not asserted on static markup.
     */
    const labelFor = /<label[^>]+for="([^"]+)"/u.exec(markup)?.[1];
    const inputId = /<input[^>]+id="([^"]+)"/u.exec(markup)?.[1];

    expect(labelFor).toBeDefined();
    expect(labelFor).toBe(inputId as string);
  });

  test("marks a required label without touching the control", () => {
    const markup = renderToStaticMarkup(
      <Field name="name">
        <Field.Label required>Full name</Field.Label>
      </Field>,
    );

    expect(markup).toContain("label--required");
  });

  test("takes the full-width modifier only when asked", () => {
    expect(renderToStaticMarkup(<Field name="a" />)).not.toContain("field--full-width");
    expect(renderToStaticMarkup(<Field fullWidth name="a" />)).toContain("field--full-width");
  });
});
