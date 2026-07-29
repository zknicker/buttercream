"use client";

import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type AlertColor = "default" | "accent" | "success" | "warning" | "danger";

export interface AlertProps extends Omit<ComponentPropsWithoutRef<"div">, "color" | "title"> {
  /** Trailing content, typically a dismiss control. */
  action?: ReactNode;
  color?: AlertColor;
  /**
   * Leading icon. Decorative — the alert is named by its title. Defaults to a status glyph
   * matching `color`; pass `null` to render no icon at all.
   */
  icon?: ReactNode;
  title?: ReactNode;
}

/* One glyph per colour, drawn inline so Alert has no icon-library dependency. `currentColor`
 * picks up the role colour set on `.alert__indicator` in CSS. */
function statusIcon(color: AlertColor): ReactElement {
  switch (color) {
    case "success":
      return (
        <svg
          aria-hidden="true"
          fill="none"
          role="presentation"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M5.5 8.25 7.25 10 10.5 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </svg>
      );
    case "warning":
      return (
        <svg
          aria-hidden="true"
          fill="none"
          role="presentation"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2.25 14 12.75H2Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
          <path d="M8 6.5v3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
          <path d="M8 11.75v.01" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
        </svg>
      );
    case "danger":
      return (
        <svg
          aria-hidden="true"
          fill="none"
          role="presentation"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.24 1.33h5.52L14.67 5.24v5.52L10.76 14.67H5.24L1.33 10.76V5.24Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
          <path d="M8 5.33V8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
          <path d="M8 10.67v.01" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
        </svg>
      );
    default:
      /* "default" and "accent" share the neutral info glyph. */
      return (
        <svg
          aria-hidden="true"
          fill="none"
          role="presentation"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.75" />
          <path d="M8 7.25V11" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
          <path d="M8 5.25v.01" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
        </svg>
      );
  }
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
  const indicator = icon === null ? null : (icon ?? statusIcon(color));

  return (
    <div
      className={classes("alert", `alert--${color}`, className)}
      data-slot="alert"
      role={urgent ? "alert" : "status"}
      {...props}
    >
      {indicator === null ? null : (
        <span aria-hidden="true" className="alert__indicator" data-slot="alert-indicator">
          {indicator}
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
