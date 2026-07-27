"use client";

import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";
import { classes } from "./classes.ts";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupProps extends ComponentPropsWithoutRef<"div"> {
  fullWidth?: boolean;
  orientation?: ButtonGroupOrientation;
}

/**
 * Joins buttons into one control.
 *
 * A hairline is injected into every button after the first, rather than drawn between them by
 * the group. The buttons sit flush, so a separator laid between them would have no space to
 * occupy — as a child it can be positioned over the seam instead.
 *
 * Carries no ARIA role of its own: the buttons inside are already labelled and actionable, and
 * a `group` with no accessible name announces nothing. Pass `role="group"` with an `aria-label`
 * when the set genuinely needs naming — and reach for `ToggleButton.Group` when the buttons
 * express a selection, since that carries roving focus this does not.
 */
export function ButtonGroup({
  children,
  className,
  fullWidth = false,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps): ReactElement {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div
      className={classes(
        "button-group",
        `button-group--${orientation}`,
        fullWidth && "button-group--full-width",
        className,
      )}
      data-orientation={orientation}
      data-slot="button-group"
      {...props}
    >
      {items.map((child, index) =>
        index === 0
          ? child
          : cloneElement(child as ReactElement<{ children?: ReactNode }>, undefined, [
              <span
                aria-hidden="true"
                className="button-group__separator"
                data-slot="button-group-separator"
                key="separator"
              />,
              (child as ReactElement<{ children?: ReactNode }>).props.children,
            ]),
      )}
    </div>
  );
}
