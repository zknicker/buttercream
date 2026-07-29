import {
  Button,
  Drawer,
  type DrawerBackdropVariant,
  type DrawerPlacement,
  Field,
  Input,
} from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import type { PreviewIconElements } from "./preview-icons.ts";
import { Specimen } from "./preview-specimen.tsx";
import { usePreviewSurface } from "./preview-surface.tsx";

const placements: DrawerPlacement[] = ["top", "right", "bottom", "left"];
const backdrops: DrawerBackdropVariant[] = ["opaque", "blur", "transparent"];

interface NavItem {
  icon: keyof PreviewIconElements;
  label: string;
}

/* Mirrors HeroUI's own nav-drawer demo items, each with a leading icon from the vocabulary. */
const navItems: NavItem[] = [
  { icon: "home", label: "Overview" },
  { icon: "search", label: "Search" },
  { icon: "notification", label: "Notifications" },
  { icon: "mail", label: "Mail" },
  { icon: "users", label: "Team" },
  { icon: "settings", label: "Settings" },
];

export function DrawerPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Default (right)">
        <DrawerSpecimen label="Open drawer" />
      </Specimen>
      <Specimen label="Placements">
        {placements.map((placement) => (
          <DrawerSpecimen key={placement} label={placement} placement={placement} />
        ))}
      </Specimen>
      <Specimen label="Backdrops">
        {backdrops.map((backdrop) => (
          <DrawerSpecimen backdrop={backdrop} key={backdrop} label={backdrop} />
        ))}
      </Specimen>
      <Specimen label="Handle (bottom placement)">
        <DrawerSpecimen label="With handle" placement="bottom" withHandle />
      </Specimen>
      <Specimen label="Scrolling body">
        <DrawerSpecimen label="Long body" longBody />
      </Specimen>
      <Specimen label="States">
        <DrawerSpecimen hideCloseButton label="No close button" />
        <DrawerSpecimen label="Non-dismissable" nonDismissable />
      </Specimen>
      <Specimen label="With form">
        <FormDrawerSpecimen />
      </Specimen>
      <Specimen label="Navigation drawer">
        <NavigationDrawerSpecimen icons={icons} />
      </Specimen>
    </div>
  );
}

interface DrawerSpecimenProps {
  backdrop?: DrawerBackdropVariant;
  hideCloseButton?: boolean;
  label: string;
  longBody?: boolean;
  nonDismissable?: boolean;
  placement?: DrawerPlacement;
  withHandle?: boolean;
}

function DrawerSpecimen({
  backdrop = "opaque",
  hideCloseButton = false,
  label,
  longBody = false,
  nonDismissable = false,
  placement = "right",
  withHandle = false,
}: DrawerSpecimenProps): ReactElement {
  const surface = usePreviewSurface();
  /* Controlled so the footer actions can close the panel like HeroUI's demos. */
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      disablePointerDismissal={nonDismissable}
      onOpenChange={(next, eventDetails) => {
        /* Non-dismissable: swallow escape-key closes too, leaving the footer buttons as the only exit. */
        if (nonDismissable && !next && eventDetails.reason === "escape-key") {
          eventDetails.cancel();
          return;
        }
        setOpen(next);
      }}
      open={open}
    >
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
              <Drawer.Description>
                {nonDismissable
                  ? "Outside clicks and Escape are blocked; only the buttons below close this."
                  : "Review recent activity and mentions."}
              </Drawer.Description>
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

/* Trivial to slot form controls into the body — no new Drawer props needed. */
function FormDrawerSpecimen(): ReactElement {
  const surface = usePreviewSurface();
  const [open, setOpen] = useState(false);

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <Drawer.Trigger render={<Button variant="secondary" />}>Edit profile</Drawer.Trigger>
      <Drawer.Portal container={surface}>
        <Drawer.Backdrop />
        <Drawer.Content>
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>Edit profile</Drawer.Heading>
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Field name="name">
                <Field.Label>Name</Field.Label>
                <Input defaultValue="Jane Doe" />
              </Field>
              <Field name="email">
                <Field.Label>Email</Field.Label>
                <Input defaultValue="jane@example.com" />
              </Field>
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={() => setOpen(false)} variant="tertiary">
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  );
}

/* Left placement plus an icon-led item list reads as a navigation drawer with no new API surface. */
function NavigationDrawerSpecimen({ icons }: { icons: PreviewIconElements }): ReactElement {
  const surface = usePreviewSurface();
  const [open, setOpen] = useState(false);

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <Drawer.Trigger render={<Button variant="secondary" />}>Menu</Drawer.Trigger>
      <Drawer.Portal container={surface}>
        <Drawer.Backdrop />
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>Menu</Drawer.Heading>
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => setOpen(false)}
                  style={{ justifyContent: "flex-start" }}
                  variant="ghost"
                >
                  {icons[item.icon]}
                  {item.label}
                </Button>
              ))}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  );
}
