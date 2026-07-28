import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AlertDialog } from "./alert-dialog.tsx";
import { Button } from "./button.tsx";
import { Combobox } from "./combobox.tsx";
import { Dropdown } from "./dropdown.tsx";

describe("AlertDialog", () => {
  test("renders its trigger, and the popup only once open", () => {
    const closed = renderToStaticMarkup(
      <AlertDialog>
        <AlertDialog.Trigger render={<Button variant="danger">Delete</Button>} />
        <AlertDialog.Content title="Delete this project?" />
      </AlertDialog>,
    );

    expect(closed).toContain("alert-dialog__trigger");
    /* Portalled content stays unmounted until open, so nothing leaks into the page. */
    expect(closed).not.toContain("alert-dialog__popup");
  });

  /*
   * Open-state content lives in a portal, which needs a real DOM — renderToStaticMarkup
   * produces nothing for it. What the open state looks like is covered in the browser
   * instead; these tests cover what SSR can actually see.
   */
  test("wires the trigger to whatever it renders", () => {
    const markup = renderToStaticMarkup(
      <AlertDialog>
        <AlertDialog.Trigger render={<Button variant="danger">Delete</Button>} />
        <AlertDialog.Content title="Delete this project?" />
      </AlertDialog>,
    );

    expect(markup).toContain("Delete");
    expect(markup).toContain("button--danger");
    expect(markup).toContain('aria-haspopup="dialog"');
  });
});

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
