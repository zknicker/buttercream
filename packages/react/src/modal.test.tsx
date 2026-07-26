import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Modal } from "./modal.tsx";

describe("Modal", () => {
  test("renders a styled Base UI trigger", () => {
    const markup = renderToStaticMarkup(
      <Modal>
        <Modal.Trigger className="custom-trigger">Open modal</Modal.Trigger>
        <Modal.Portal>
          <Modal.Backdrop variant="blur" />
          <Modal.Container placement="center">
            <Modal.Dialog>
              <Modal.Heading>Welcome</Modal.Heading>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Portal>
      </Modal>,
    );

    expect(markup).toContain('data-slot="modal-trigger"');
    expect(markup).toContain('class="modal__trigger custom-trigger"');
    expect(markup).toContain('aria-haspopup="dialog"');
    expect(markup).toContain(">Open modal</button>");
  });

  test("renders an accessible, geometrically styled default close icon", () => {
    const markup = renderToStaticMarkup(
      <Modal>
        <Modal.CloseTrigger />
      </Modal>,
    );

    expect(markup).toContain('aria-label="Close"');
    expect(markup).toContain('<span aria-hidden="true" class="modal__close-icon"></span>');
  });
});
