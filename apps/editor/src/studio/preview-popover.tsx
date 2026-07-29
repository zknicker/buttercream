import { Avatar, Button, Popover, type PopoverContentProps } from "@buttercream/react";
import { type ReactElement, type ReactNode, useState } from "react";
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
      <section className="specimen">
        <PopoverSpecimen label="View profile" side="right">
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Avatar>
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            <div>
              <Popover.Title>Jamie Diaz</Popover.Title>
              <Popover.Description>Product design, joined 2023.</Popover.Description>
            </div>
          </div>
          <FollowButton />
        </PopoverSpecimen>
        <div className="specimen__label">Interactive content (composed, not just text)</div>
      </section>
      <section className="specimen">
        <CustomRenderSpecimen />
        <div className="specimen__label">Custom render (Base UI render prop)</div>
      </section>
    </div>
  );
}

/* Composing content inside Popup is plain React — no popover-specific plumbing needed. */
function FollowButton(): ReactElement {
  const [following, setFollowing] = useState(false);
  return (
    <Button
      onClick={() => setFollowing((value) => !value)}
      variant={following ? "outline" : "primary"}
    >
      {following ? "Following" : "Follow"}
    </Button>
  );
}

/*
 * The render prop on Trigger/Popup/Arrow accepts a function of (props, state), not just a
 * static element — this swaps the popup's root tag and tags it with its own placement.
 */
function CustomRenderSpecimen(): ReactElement {
  const surface = usePreviewSurface();

  return (
    <Popover>
      <Popover.Trigger
        render={({ className, ...props }, state) => (
          <Button
            {...props}
            {...(className === undefined ? {} : { className })}
            data-open={state.open}
            variant="ghost"
          >
            Custom render
          </Button>
        )}
      />
      <Popover.Portal container={surface}>
        <Popover.Positioner side="bottom" sideOffset={8}>
          <Popover.Popup render={(props, state) => <section {...props} data-tone={state.side} />}>
            <Popover.Arrow />
            <Popover.Title>Render prop</Popover.Title>
            <Popover.Description>
              Trigger and Popup both take a function-form render prop; this popup's root element is
              a plain &lt;section&gt; tagged with its own placement as a data attribute.
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover>
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
