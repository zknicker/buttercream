import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "./button.tsx";
import { Combobox } from "./combobox.tsx";
import { Dropdown } from "./dropdown.tsx";

describe("Dropdown", () => {
  test("keeps the menu unmounted until opened", () => {
    const markup = renderToStaticMarkup(
      <Dropdown>
        <Dropdown.Trigger render={<Button>Actions</Button>} />
        <Dropdown.Content>
          <Dropdown.Item>Rename</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>,
    );

    expect(markup).toContain("dropdown__trigger");
    expect(markup).not.toContain("dropdown__popup");
  });

  test("marks the trigger as opening a menu", () => {
    const markup = renderToStaticMarkup(
      <Dropdown>
        <Dropdown.Trigger render={<Button>Actions</Button>} />
        <Dropdown.Content>
          <Dropdown.Item danger>Delete</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>,
    );

    /* Menu items are portalled, so their classes are verified in the browser, not here. */
    expect(markup).toContain('aria-haspopup="menu"');
    expect(markup).toContain("dropdown__trigger");
    expect(markup).toContain("Actions");
  });

  /* An item renders on its own inside a Root, which is the only way to see one without a DOM. */
  test("leaves an undescribed item flat", () => {
    const markup = renderToStaticMarkup(
      <Dropdown open>
        <Dropdown.Item>Rename</Dropdown.Item>
      </Dropdown>,
    );

    expect(markup).toContain("dropdown__item");
    expect(markup).not.toContain("dropdown__item-text");
    expect(markup).not.toContain("dropdown__item-shortcut");
  });

  test("splits a described item into a label and a second line", () => {
    const markup = renderToStaticMarkup(
      <Dropdown open>
        <Dropdown.Item description="Give the project a new name">Rename</Dropdown.Item>
      </Dropdown>,
    );

    expect(markup).toContain('data-slot="dropdown-item-description"');
    expect(markup).toContain("dropdown__item-label");
    expect(markup).toContain("Give the project a new name");
  });

  test("renders a shortcut as a kbd", () => {
    const markup = renderToStaticMarkup(
      <Dropdown open>
        <Dropdown.Item shortcut="⌘ ⇧ N">New file</Dropdown.Item>
      </Dropdown>,
    );

    /* The chord carries the same semantics wherever it appears, so it is the shared Kbd. */
    expect(markup).toContain("<kbd");
    expect(markup).toContain("kbd dropdown__item-shortcut");
  });

  test("keeps a submenu unmounted until its parent menu opens", () => {
    const markup = renderToStaticMarkup(
      <Dropdown>
        <Dropdown.Trigger render={<Button>Actions</Button>} />
        <Dropdown.Content>
          <Dropdown.Submenu>
            <Dropdown.SubmenuTrigger>Share</Dropdown.SubmenuTrigger>
            <Dropdown.Content>
              <Dropdown.Item>Copy link</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Submenu>
        </Dropdown.Content>
      </Dropdown>,
    );

    /* A submenu lives inside the parent popup, so like the popup it is a browser-only concern. */
    expect(markup).toContain("dropdown__trigger");
    expect(markup).not.toContain("dropdown__submenu-trigger");
  });
});

describe("Combobox", () => {
  test("renders an input with a trigger beside it", () => {
    const markup = renderToStaticMarkup(
      <Combobox items={["Apple", "Banana"]} placeholder="Search fruit">
        {(fruit: string) => <Combobox.Item value={fruit}>{fruit}</Combobox.Item>}
      </Combobox>,
    );

    expect(markup).toContain("combobox__input");
    expect(markup).toContain("combobox__trigger");
    expect(markup).toContain('placeholder="Search fruit"');
    /* The chevron is decorative; the trigger carries the accessible name. */
    expect(markup).toContain('aria-label="Show suggestions"');
  });

  test("keeps the popup portalled until opened", () => {
    const markup = renderToStaticMarkup(
      <Combobox items={["Apple"]}>
        <Combobox.Item value="Apple">Apple</Combobox.Item>
      </Combobox>,
    );

    expect(markup).not.toContain("combobox__popup");
  });
});
