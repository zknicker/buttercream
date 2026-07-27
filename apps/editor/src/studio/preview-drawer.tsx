import {
  Button,
  Drawer,
  type DrawerBackdropVariant,
  type DrawerPlacement,
} from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import { usePreviewSurface } from "./preview-surface.tsx";

const placements: DrawerPlacement[] = ["top", "right", "bottom", "left"];
const backdrops: DrawerBackdropVariant[] = ["opaque", "blur", "transparent"];

export function DrawerPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <DrawerSpecimen label="Open drawer" />
        <div className="specimen__label">Default (right)</div>
      </section>
      <section className="specimen">
        {placements.map((placement) => (
          <DrawerSpecimen key={placement} label={placement} placement={placement} />
        ))}
        <div className="specimen__label">Placements</div>
      </section>
      <section className="specimen">
        {backdrops.map((backdrop) => (
          <DrawerSpecimen backdrop={backdrop} key={backdrop} label={backdrop} />
        ))}
        <div className="specimen__label">Backdrops</div>
      </section>
      <section className="specimen">
        <DrawerSpecimen label="With handle" placement="bottom" withHandle />
        <div className="specimen__label">Handle (bottom placement)</div>
      </section>
      <section className="specimen">
        <DrawerSpecimen label="Long body" longBody />
        <div className="specimen__label">Scrolling body</div>
      </section>
      <section className="specimen">
        <DrawerSpecimen hideCloseButton label="No close button" />
        <div className="specimen__label">States</div>
      </section>
    </div>
  );
}

interface DrawerSpecimenProps {
  backdrop?: DrawerBackdropVariant;
  hideCloseButton?: boolean;
  label: string;
  longBody?: boolean;
  placement?: DrawerPlacement;
  withHandle?: boolean;
}

function DrawerSpecimen({
  backdrop = "opaque",
  hideCloseButton = false,
  label,
  longBody = false,
  placement = "right",
  withHandle = false,
}: DrawerSpecimenProps): ReactElement {
  const surface = usePreviewSurface();
  /* Controlled so the footer actions can close the panel like HeroUI's demos. */
  const [open, setOpen] = useState(false);

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <Drawer.Trigger render={<Button />}>{label}</Drawer.Trigger>
      <Drawer.Portal container={surface}>
        <Drawer.Backdrop variant={backdrop} />
        <Drawer.Content placement={placement}>
          <Drawer.Dialog>
            {withHandle ? <Drawer.Handle /> : null}
            <Drawer.Header>
              <Drawer.Heading>Notifications</Drawer.Heading>
              {hideCloseButton ? null : <Drawer.CloseTrigger />}
            </Drawer.Header>
            <Drawer.Body>
              <Drawer.Description>Review recent activity and mentions.</Drawer.Description>
              {Array.from({ length: longBody ? 20 : 0 }, (_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static filler copy that never reorders.
                <p key={index}>Review recent activity and mentions.</p>
              ))}
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={() => setOpen(false)} variant="tertiary">
                Close
              </Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  );
}
