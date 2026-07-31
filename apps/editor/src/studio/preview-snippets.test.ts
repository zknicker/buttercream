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

  test("projects consumer code: frame, refs, and portal wiring stripped", () => {
    const source = `
export function DemoPreview() {
  return (
    <Specimen label="Framed">
      <div className="sidebar-demo sidebar-demo--app" ref={setDemoFrame}>
        <Sidebar.Provider className="sidebar-demo__provider">
          <Sidebar collapsible="icon" portalContainer={demoFrame}>
            <Dropdown.Content container={demoFrame}>
              <Dropdown.Item>Open</Dropdown.Item>
            </Dropdown.Content>
          </Sidebar>
        </Sidebar.Provider>
      </div>
    </Specimen>
  );
}
`;

    const snippet = extractSpecimenSnippets(source, "DemoPreview").Framed;

    expect(snippet).toBe(
      [
        "<Sidebar.Provider>",
        '  <Sidebar collapsible="icon">',
        "    <Dropdown.Content>",
        "      <Dropdown.Item>Open</Dropdown.Item>",
        "    </Dropdown.Content>",
        "  </Sidebar>",
        "</Sidebar.Provider>",
      ].join("\n"),
    );
  });

  test("keeps authored provider classes when stripping the scaffolding one", () => {
    const source = `
export function DemoPreview() {
  return (
    <Specimen label="Compact">
      <div className="sidebar-demo sidebar-demo--app" ref={setDemoFrame}>
        <Sidebar.Provider className="sidebar-demo__provider [--spacing-scale:0.8]">
          <Sidebar collapsible="icon" portalContainer={demoFrame} />
        </Sidebar.Provider>
      </div>
    </Specimen>
  );
}
`;

    const snippet = extractSpecimenSnippets(source, "DemoPreview").Compact;

    expect(snippet).toBe(
      [
        '<Sidebar.Provider className="[--spacing-scale:0.8]">',
        '  <Sidebar collapsible="icon" />',
        "</Sidebar.Provider>",
      ].join("\n"),
    );
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
