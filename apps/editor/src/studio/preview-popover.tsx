import { Button, Popover, type PopoverContentProps } from "@buttercream/react";
import type { ReactElement, ReactNode } from "react";
import { usePreviewSurface } from "./preview-surface.tsx";

const SIDES = ["top", "bottom", "left", "right"] as const;

export function PopoverPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <PopoverSpecimen label="Open" side="bottom">
          <Popover.Title>Shortcuts</Popover.Title>
          <Popover.Description>Use the command palette to jump anywhere.</Popover.Description>
        </PopoverSpecimen>
        <PopoverSpecimen label="Arrow" showArrow side="bottom">
          <Popover.Title>With arrow</Popover.Title>
          <Popover.Description>Anchored to its trigger.</Popover.Description>
        </PopoverSpecimen>
        <div className="specimen__label">Basic (click / focus)</div>
      </section>
      <section className="specimen">
        <PopoverSpecimen label="Dismissable" side="bottom">
          <Popover.Title>Session</Popover.Title>
          <Popover.Description>You are signed in as jane@example.com.</Popover.Description>
          <Popover.Close />
        </PopoverSpecimen>
        <div className="specimen__label">Close button</div>
      </section>
      <section className="specimen">
        <div className="placement-cross">
          {SIDES.map((side) => (
            <div className={`placement-cross__${side}`} key={side}>
              <PopoverSpecimen label={capitalize(side)} showArrow side={side}>
                <Popover.Title>{capitalize(side)} popover</Popover.Title>
                <Popover.Description>{capitalize(side)} placement</Popover.Description>
              </PopoverSpecimen>
            </div>
          ))}
          <span className="placement-cross__center">Click</span>
        </div>
        <div className="specimen__label">Placements</div>
      </section>
      <section className="specimen">
        <PopoverSpecimen label="Backdrop" withBackdrop>
          <Popover.Title>Focused</Popover.Title>
          <Popover.Description>A backdrop dims everything behind the popup.</Popover.Description>
        </PopoverSpecimen>
        <div className="specimen__label">Backdrop</div>
      </section>
      <section className="specimen">
        <PopoverSpecimen label="Open trigger">
          <Popover.Title>Trigger state</Popover.Title>
          <Popover.Description>The trigger reflects the open state.</Popover.Description>
        </PopoverSpecimen>
        <PopoverSpecimen label="Disabled trigger" triggerDisabled>
          <Popover.Title>Unreachable</Popover.Title>
        </PopoverSpecimen>
        <div className="specimen__label">Trigger states</div>
      </section>
    </div>
  );
}

interface PopoverSpecimenProps {
  children: ReactNode;
  label: string;
  showArrow?: boolean;
  side?: PopoverContentProps["side"];
  triggerDisabled?: boolean;
  withBackdrop?: boolean;
}

/*
 * Composed from Popover parts instead of Popover.Content so the portal can target the
 * themed preview surface; Content always portals to document.body, outside the theme.
 */
function PopoverSpecimen({
  children,
  label,
  showArrow = false,
  side = "bottom",
  triggerDisabled = false,
  withBackdrop = false,
}: PopoverSpecimenProps): ReactElement {
  const surface = usePreviewSurface();

  return (
    <Popover>
      <Popover.Trigger disabled={triggerDisabled} render={<Button />}>
        {label}
      </Popover.Trigger>
      <Popover.Portal container={surface}>
        {withBackdrop ? <Popover.Backdrop /> : null}
        <Popover.Positioner side={side} sideOffset={8}>
          <Popover.Popup>
            {showArrow ? <Popover.Arrow /> : null}
            {children}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
