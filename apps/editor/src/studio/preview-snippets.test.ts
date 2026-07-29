import { describe, expect, test } from "bun:test";
import { extractSpecimenSnippets } from "./preview-snippets.ts";

const source = `
export function FirstPreview(): ReactElement {
  return (
    <Specimen label="Default">
      <Button>First</Button>
    </Specimen>
  );
}

export function SecondPreview(): ReactElement {
  return (
    <div>
      <Specimen className="specimen--stack" label="Default">
        <Input
          disabled
          placeholder="Email"
        />
      </Specimen>
      <Specimen label="With action">
        <Button onClick={() => alert("Saved")}>Save</Button>
      </Specimen>
    </div>
  );
}
`;

describe("extractSpecimenSnippets", () => {
  test("returns dedented JSX from the requested preview function", () => {
    expect(extractSpecimenSnippets(source, "SecondPreview")).toEqual({
      Default: `<Input
  disabled
  placeholder="Email"
/>`,
      "With action": '<Button onClick={() => alert("Saved")}>Save</Button>',
    });
  });

  test("does not borrow specimens from an adjacent preview function", () => {
    expect(extractSpecimenSnippets(source, "FirstPreview")).toEqual({
      Default: "<Button>First</Button>",
    });
  });

  test("returns no snippets when the preview function is absent", () => {
    expect(extractSpecimenSnippets(source, "MissingPreview")).toEqual({});
  });
});
