import { Button, Tooltip, type TooltipContentProps } from "@buttercream/react";
import type { ReactElement, ReactNode } from "react";
import type { PreviewIconElements } from "./preview-icons.ts";
import { Specimen } from "./preview-specimen.tsx";
import { usePreviewSurface } from "./preview-surface.tsx";

const SIDES = ["top", "bottom", "left", "right"] as const;

export function TooltipPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  return (
    /* A short delay so hovering specimens feels immediate in the preview. */
    <Tooltip.Provider delay={300}>
      <div className="specimens">
        <Specimen label="Default (hover / focus)">
          <TooltipSpecimen label="Hover">Helpful context</TooltipSpecimen>
          <TooltipSpecimen label="Arrow" showArrow>
            With an arrow
          </TooltipSpecimen>
        </Specimen>
        <Specimen label="Arrow sides">
          {SIDES.map((side) => (
            <TooltipSpecimen key={side} label={side} showArrow side={side}>
              {side}
            </TooltipSpecimen>
          ))}
        </Specimen>
        <Specimen label="Placements">
          <div className="placement-cross">
            {SIDES.map((side) => (
              <div className={`placement-cross__${side}`} key={side}>
                <TooltipSpecimen label={capitalize(side)} showArrow side={side}>
                  {capitalize(side)} tooltip
                </TooltipSpecimen>
              </div>
            ))}
            <span className="placement-cross__center">Hover</span>
          </div>
        </Specimen>
        <Specimen label="Custom trigger (icon button)">
          <IconTriggerTooltipSpecimen aria-label="Settings" tooltip="Settings">
            {icons.settings}
          </IconTriggerTooltipSpecimen>
          <IconTriggerTooltipSpecimen aria-label="Team members" tooltip="Team members">
            {icons.users}
          </IconTriggerTooltipSpecimen>
        </Specimen>
      </div>
    </Tooltip.Provider>
  );
}

interface TooltipSpecimenProps {
  children: ReactNode;
  label: string;
  showArrow?: boolean;
  side?: TooltipContentProps["side"];
}

/*
 * Composed from Tooltip parts instead of Tooltip.Content so the portal can target the
 * themed preview surface; Content always portals to document.body, outside the theme.
 */
function TooltipSpecimen({
  children,
  label,
  showArrow = false,
  side = "top",
}: TooltipSpecimenProps): ReactElement {
  const surface = usePreviewSurface();

  return (
    <Tooltip>
      <Tooltip.Trigger render={<Button />}>{label}</Tooltip.Trigger>
      <Tooltip.Portal container={surface}>
        <Tooltip.Positioner side={side} sideOffset={showArrow ? 7 : 3}>
          <Tooltip.Popup>
            {showArrow ? <Tooltip.Arrow /> : null}
            {children}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip>
  );
}

interface IconTriggerTooltipSpecimenProps {
  "aria-label": string;
  children: ReactNode;
  tooltip: string;
}

/* Tooltip.Trigger's render prop swaps the rendered <button> for our own, so an icon-only
 * Button — no visible label — can still carry an accessible name via the tooltip trigger. */
function IconTriggerTooltipSpecimen({
  "aria-label": ariaLabel,
  children,
  tooltip,
}: IconTriggerTooltipSpecimenProps): ReactElement {
  const surface = usePreviewSurface();

  return (
    <Tooltip>
      <Tooltip.Trigger aria-label={ariaLabel} render={<Button iconOnly variant="ghost" />}>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal container={surface}>
        <Tooltip.Positioner side="top" sideOffset={3}>
          <Tooltip.Popup>{tooltip}</Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
