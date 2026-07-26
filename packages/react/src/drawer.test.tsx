import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Drawer } from "./drawer.tsx";

describe("Drawer", () => {
  test("renders a styled Base UI trigger", () => {
    const markup = renderToStaticMarkup(
      <Drawer>
        <Drawer.Trigger className="custom-trigger">Open drawer</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop variant="opaque" />
          <Drawer.Content placement="right">
            <Drawer.Dialog>
              <Drawer.Heading>Settings</Drawer.Heading>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>,
    );

    expect(markup).toContain('data-slot="drawer-trigger"');
    expect(markup).toContain('class="drawer__trigger custom-trigger"');
    expect(markup).toContain('aria-haspopup="dialog"');
    expect(markup).toContain(">Open drawer</button>");
  });

  test("renders an accessible, geometrically styled default close icon", () => {
    const markup = renderToStaticMarkup(
      <Drawer>
        <Drawer.CloseTrigger />
      </Drawer>,
    );

    expect(markup).toContain('aria-label="Close"');
    expect(markup).toContain('<span aria-hidden="true" class="drawer__close-icon"></span>');
  });
});
