import {
  Button,
  Chip,
  Field,
  Input,
  Modal,
  type ModalBackdropVariant,
  type ModalPlacement,
} from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import type { PreviewIconElements } from "./preview-icons.ts";
import { usePreviewSurface } from "./preview-surface.tsx";

const placements: ModalPlacement[] = ["auto", "top", "center", "bottom"];
const backdrops: ModalBackdropVariant[] = ["opaque", "blur", "transparent"];

export function ModalPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <ModalSpecimen icon={icons.help} label="Open modal" />
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen">
        {placements.map((placement) => (
          <ModalSpecimen
            icon={icons.help}
            key={placement}
            label={placement}
            placement={placement}
          />
        ))}
        <div className="specimen__label">Placements</div>
      </section>
      <section className="specimen">
        {backdrops.map((backdrop) => (
          <ModalSpecimen backdrop={backdrop} icon={icons.help} key={backdrop} label={backdrop} />
        ))}
        <div className="specimen__label">Backdrops</div>
      </section>
      <section className="specimen">
        <ModalSpecimen icon={icons.help} label="Long body" longBody />
        <div className="specimen__label">Scrolling body</div>
      </section>
      <section className="specimen">
        <ModalSpecimen hideCloseButton icon={icons.help} label="No close button" />
        <div className="specimen__label">States</div>
      </section>
      <section className="specimen">
        <CustomBackdropSpecimen />
        <div className="specimen__label">Custom backdrop</div>
      </section>
      <section className="specimen">
        <DismissBehaviorSpecimen dismissible label="Dismissible" />
        <DismissBehaviorSpecimen dismissible={false} label="Not dismissible" />
        <div className="specimen__label">Dismiss behavior</div>
      </section>
      <section className="specimen">
        <CloseMethodsSpecimen />
        <div className="specimen__label">Close methods</div>
      </section>
      <section className="specimen">
        <CustomTriggerSpecimen />
        <div className="specimen__label">Custom trigger</div>
      </section>
      <section className="specimen">
        <WithFormSpecimen />
        <div className="specimen__label">With form</div>
      </section>
    </div>
  );
}

/* className override on Modal.Backdrop, no new CSS needed for a one-off treatment. */
function CustomBackdropSpecimen(): ReactElement {
  const surface = usePreviewSurface();
  const [open, setOpen] = useState(false);

  return (
    <Modal onOpenChange={setOpen} open={open}>
      <Modal.Trigger render={<Button />}>Custom backdrop</Modal.Trigger>
      <Modal.Portal container={surface}>
        <Modal.Backdrop
          style={{ background: "color-mix(in oklab, var(--accent) 35%, var(--backdrop))" }}
          variant="transparent"
        />
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Custom backdrop</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <Modal.Description>
                Modal.Backdrop takes a plain className or style override, no new prop needed.
              </Modal.Description>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpen(false)}>Done</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Portal>
    </Modal>
  );
}

interface DismissBehaviorSpecimenProps {
  dismissible: boolean;
  label: string;
}

/* disablePointerDismissal blocks outside-press close; escape and the explicit trigger still work. */
function DismissBehaviorSpecimen({
  dismissible,
  label,
}: DismissBehaviorSpecimenProps): ReactElement {
  const surface = usePreviewSurface();
  const [open, setOpen] = useState(false);

  return (
    <Modal disablePointerDismissal={!dismissible} onOpenChange={setOpen} open={open}>
      <Modal.Trigger render={<Button variant="secondary" />}>{label}</Modal.Trigger>
      <Modal.Portal container={surface}>
        <Modal.Backdrop />
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>{label}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Modal.Description>
                {dismissible
                  ? "Clicking the backdrop or pressing escape closes this dialog."
                  : "disablePointerDismissal is set — the backdrop ignores clicks. Only the button below closes it."}
              </Modal.Description>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Portal>
    </Modal>
  );
}

/* Modal.CloseTrigger accepts custom children or a render prop, so the default icon is one option
 * among several rather than the only way to close a dialog. */
function CloseMethodsSpecimen(): ReactElement {
  const surface = usePreviewSurface();
  const [open, setOpen] = useState(false);

  return (
    <Modal onOpenChange={setOpen} open={open}>
      <Modal.Trigger render={<Button variant="secondary" />}>Close methods</Modal.Trigger>
      <Modal.Portal container={surface}>
        <Modal.Backdrop />
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Delete project</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Modal.Description>
                This dialog has no icon close trigger; both footer actions close it instead.
              </Modal.Description>
            </Modal.Body>
            <Modal.Footer>
              <Modal.CloseTrigger render={<Button variant="tertiary" />}>Cancel</Modal.CloseTrigger>
              <Modal.CloseTrigger render={<Button variant="danger" />}>Delete</Modal.CloseTrigger>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Portal>
    </Modal>
  );
}

/* Modal.Trigger's render prop accepts any element, not just Button. */
function CustomTriggerSpecimen(): ReactElement {
  const surface = usePreviewSurface();
  const [open, setOpen] = useState(false);

  return (
    <Modal onOpenChange={setOpen} open={open}>
      <Modal.Trigger render={<Chip color="accent" variant="primary" />}>View profile</Modal.Trigger>
      <Modal.Portal container={surface}>
        <Modal.Backdrop />
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Profile</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <Modal.Description>
                The trigger above renders as a Chip instead of a Button.
              </Modal.Description>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Portal>
    </Modal>
  );
}

/* Modal.Body and Modal.Footer are plain composition surfaces; a form is just Field/Input children. */
function WithFormSpecimen(): ReactElement {
  const surface = usePreviewSurface();
  const [open, setOpen] = useState(false);

  return (
    <Modal onOpenChange={setOpen} open={open}>
      <Modal.Trigger render={<Button />}>Edit profile</Modal.Trigger>
      <Modal.Portal container={surface}>
        <Modal.Backdrop />
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Edit profile</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <Field name="name">
                <Field.Label>Full name</Field.Label>
                <Input defaultValue="Jane Doe" />
              </Field>
              <Field name="email">
                <Field.Label>Email</Field.Label>
                <Input defaultValue="jane@example.com" type="email" />
              </Field>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpen(false)} variant="tertiary">
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Portal>
    </Modal>
  );
}

interface ModalSpecimenProps {
  backdrop?: ModalBackdropVariant;
  hideCloseButton?: boolean;
  icon: ReactElement;
  label: string;
  longBody?: boolean;
  placement?: ModalPlacement;
}

function ModalSpecimen({
  backdrop = "opaque",
  hideCloseButton = false,
  icon,
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
              <Modal.Icon>{icon}</Modal.Icon>
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
