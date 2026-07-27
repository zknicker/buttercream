import { Button, Modal, type ModalBackdropVariant, type ModalPlacement } from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import { usePreviewSurface } from "./preview-surface.tsx";

const placements: ModalPlacement[] = ["auto", "top", "center", "bottom"];
const backdrops: ModalBackdropVariant[] = ["opaque", "blur", "transparent"];

export function ModalPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <ModalSpecimen label="Open modal" />
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen">
        {placements.map((placement) => (
          <ModalSpecimen key={placement} label={placement} placement={placement} />
        ))}
        <div className="specimen__label">Placements</div>
      </section>
      <section className="specimen">
        {backdrops.map((backdrop) => (
          <ModalSpecimen backdrop={backdrop} key={backdrop} label={backdrop} />
        ))}
        <div className="specimen__label">Backdrops</div>
      </section>
      <section className="specimen">
        <ModalSpecimen label="Long body" longBody />
        <div className="specimen__label">Scrolling body</div>
      </section>
      <section className="specimen">
        <ModalSpecimen hideCloseButton label="No close button" />
        <div className="specimen__label">States</div>
      </section>
    </div>
  );
}

interface ModalSpecimenProps {
  backdrop?: ModalBackdropVariant;
  hideCloseButton?: boolean;
  label: string;
  longBody?: boolean;
  placement?: ModalPlacement;
}

function ModalSpecimen({
  backdrop = "opaque",
  hideCloseButton = false,
  label,
  longBody = false,
  placement = "auto",
}: ModalSpecimenProps): ReactElement {
  const surface = usePreviewSurface();
  /* Controlled so the footer actions can close the dialog like HeroUI's demos. */
  const [open, setOpen] = useState(false);

  return (
    <Modal onOpenChange={setOpen} open={open}>
      <Modal.Trigger render={<Button />}>{label}</Modal.Trigger>
      <Modal.Portal container={surface}>
        <Modal.Backdrop variant={backdrop} />
        <Modal.Container placement={placement}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Buttercream</Modal.Heading>
              {hideCloseButton ? null : <Modal.CloseTrigger />}
            </Modal.Header>
            <Modal.Body>
              <Modal.Description>
                Build accessible interfaces with composable Buttercream components.
              </Modal.Description>
              {Array.from({ length: longBody ? 12 : 0 }, (_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static filler copy that never reorders.
                <p key={index}>
                  Build accessible interfaces with composable Buttercream components.
                </p>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpen(false)} variant="tertiary">
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Continue</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Portal>
    </Modal>
  );
}
