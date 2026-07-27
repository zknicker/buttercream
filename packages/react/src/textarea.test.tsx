import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Field } from "./field.tsx";
import { Textarea } from "./textarea.tsx";

describe("Textarea", () => {
  test("renders a native textarea, not an input", () => {
    const markup = renderToStaticMarkup(<Textarea placeholder="Tell us about yourself" />);

    expect(markup).toContain("<textarea");
    expect(markup).not.toContain("<input");
    expect(markup).toContain('data-slot="textarea"');
    expect(markup).toContain('rows="3"');
  });

  test("applies variant and full-width modifiers", () => {
    const markup = renderToStaticMarkup(<Textarea fullWidth variant="secondary" />);

    expect(markup).toContain("textarea--secondary");
    expect(markup).toContain("textarea--full-width");
  });

  test("keeps the field wiring it inherits from Base UI's input", () => {
    const markup = renderToStaticMarkup(
      <Field name="bio">
        <Field.Label>Bio</Field.Label>
        <Textarea />
      </Field>,
    );

    /* Rendering as a textarea must not cost the label/control pairing the field provides. */
    const labelFor = /<label[^>]+for="([^"]+)"/u.exec(markup)?.[1];
    const textareaId = /<textarea[^>]+id="([^"]+)"/u.exec(markup)?.[1];

    expect(labelFor).toBeDefined();
    expect(labelFor).toBe(textareaId as string);
  });
});
