"use client";

import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export interface LinkProps extends ComponentPropsWithoutRef<"a"> {
  /** Trailing glyph. Pass `true` for the built-in external-link arrow. */
  icon?: ReactNode | true;
}

/**
 * A text link. Base UI has no link primitive because an anchor needs none; this is a native
 * `<a>` with the design system's treatment.
 *
 * An `external` link opens in a new tab, which needs `rel="noreferrer"` — without it the new
 * page can reach back through `window.opener`.
 */
export function Link({ children, className, icon, target, ...props }: LinkProps): ReactElement {
  const opensNewTab = target === "_blank";

  return (
    <a
      className={classes("link", className)}
      data-slot="link"
      {...(opensNewTab ? { rel: props.rel ?? "noreferrer", target } : target ? { target } : {})}
      {...props}
    >
      {children}
      {icon === undefined ? null : (
        <span
          aria-hidden="true"
          className={classes("link__icon", icon === true && "link__icon--default")}
          data-slot="link-icon"
        >
          {icon === true ? (
            <svg
              aria-hidden="true"
              fill="none"
              role="presentation"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 3h7v7M13 3 3.5 12.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
              />
            </svg>
          ) : (
            icon
          )}
        </span>
      )}
    </a>
  );
}
