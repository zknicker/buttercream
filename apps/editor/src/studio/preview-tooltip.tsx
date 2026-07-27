import { Button, Tooltip, type TooltipContentProps } from "@buttercream/react";
import type { ReactElement, ReactNode } from "react";
import { usePreviewSurface } from "./preview-surface.tsx";

const SIDES = ["top", "bottom", "left", "right"] as const;

export function TooltipPreview(): ReactElement {
  return (
    /* A short delay so hovering specimens feels immediate in the preview. */
    <Tooltip.Provider delay={300}>
      <div className="specimens">
        <section className="specimen">
          <TooltipSpecimen label="Hover">Helpful context</TooltipSpecimen>
          <TooltipSpecimen label="Arrow" showArrow>
            With an arrow
          </TooltipSpecimen>
          <div className="specimen__label">Default (hover / focus)</div>
        </section>
        <section className="specimen">
          {SIDES.map((side) => (
            <TooltipSpecimen key={side} label={side} showArrow side={side}>
              {side}
            </TooltipSpecimen>
          ))}
          <div className="specimen__label">Arrow sides</div>
        </section>
        <section className="specimen">
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
          <div className="specimen__label">Placements</div>
        </section>
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

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
