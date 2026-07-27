"use client";

import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type AlertColor = "default" | "accent" | "success" | "warning" | "danger";

export interface AlertProps extends Omit<ComponentPropsWithoutRef<"div">, "color" | "title"> {
  /** Trailing content, typically a dismiss control. */
  action?: ReactNode;
  color?: AlertColor;
  /** Leading icon. Decorative — the alert is named by its title. */
  icon?: ReactNode;
  title?: ReactNode;
}

/**
 * A block-level message. `danger` and `warning` announce themselves; the quieter colours do
 * not, since a status role that fires on every render is noise rather than help.
 */
export function Alert({
  action,
  children,
  className,
  color = "default",
  icon,
  title,
  ...props
}: AlertProps): ReactElement {
  const urgent = color === "danger" || color === "warning";

  return (
    <div
      className={classes("alert", `alert--${color}`, className)}
      data-slot="alert"
      role={urgent ? "alert" : "status"}
      {...props}
    >
      {icon === undefined ? null : (
        <span aria-hidden="true" className="alert__indicator" data-slot="alert-indicator">
          {icon}
        </span>
      )}
      <div className="alert__content" data-slot="alert-content">
        {title === undefined ? null : (
          <span className="alert__title" data-slot="alert-title">
            {title}
          </span>
        )}
        {children === undefined ? null : (
          <span className="alert__description" data-slot="alert-description">
            {children}
          </span>
        )}
      </div>
      {action}
    </div>
  );
}
