"use client";

import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type PaginationSize = "sm" | "md" | "lg";

export interface PaginationProps extends ComponentPropsWithoutRef<"nav"> {
  size?: PaginationSize;
  /** Sits opposite the page links — a count, a range, whatever the caller wants. */
  summary?: ReactNode;
}

export interface PaginationLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  current?: boolean;
  disabled?: boolean;
  href?: string;
  /** Widens the control for a worded label like Previous or Next. */
  nav?: boolean;
}

function PaginationRoot({
  children,
  className,
  size = "md",
  summary,
  ...props
}: PaginationProps): ReactElement {
  return (
    <nav
      aria-label="Pagination"
      className={classes("pagination", size !== "md" && `pagination--${size}`, className)}
      data-slot="pagination"
      {...props}
    >
      {summary === undefined ? null : (
        <div className="pagination__summary" data-slot="pagination-summary">
          {summary}
        </div>
      )}
      <ul className="pagination__content" data-slot="pagination-content">
        {children}
      </ul>
    </nav>
  );
}

/**
 * One page control. Renders an anchor when it goes somewhere and a span when it does not —
 * the current page and a disabled arrow are both destinations you are already at or cannot
 * reach, and an anchor without an href is not focusable or actionable anyway.
 */
function PaginationLink({
  children,
  className,
  current = false,
  disabled = false,
  href,
  nav = false,
  ...props
}: PaginationLinkProps): ReactElement {
  const inert = disabled || current || href === undefined;
  const classNames = classes("pagination__link", nav && "pagination__link--nav", className);

  return (
    <li className="pagination__item" data-slot="pagination-item">
      {inert ? (
        <span
          aria-current={current ? "page" : undefined}
          aria-disabled={disabled || undefined}
          className={classNames}
          data-slot="pagination-link"
        >
          {children}
        </span>
      ) : (
        <a className={classNames} data-slot="pagination-link" href={href} {...props}>
          {children}
        </a>
      )}
    </li>
  );
}

/** The gap in a truncated range. Hidden from assistive tech, which reads the page numbers. */
function PaginationEllipsis({ className, ...props }: ComponentPropsWithoutRef<"li">): ReactElement {
  return (
    <li className="pagination__item" data-slot="pagination-item" {...props}>
      <span
        aria-hidden="true"
        className={classes("pagination__ellipsis", className)}
        data-slot="pagination-ellipsis"
      >
        …
      </span>
    </li>
  );
}

export const Pagination = Object.assign(PaginationRoot, {
  Ellipsis: PaginationEllipsis,
  Link: PaginationLink,
});
