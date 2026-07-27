"use client";

import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type PaginationSize = "sm" | "md" | "lg";

export interface PaginationProps extends ComponentPropsWithoutRef<"nav"> {
  size?: PaginationSize;
  /** Sits opposite the page links — a count, a range, whatever the caller wants. */
  summary?: ReactNode;
}

/*
 * Typed on button props rather than anchor props: the control is a button by default and only
 * becomes a link when given an href, so button is the shape callers hand attributes to.
 */
export interface PaginationLinkProps extends ComponentPropsWithoutRef<"button"> {
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
 * One page control, in three shapes for three jobs:
 *
 * - an anchor when `href` is given, so the page is linkable and crawlable
 * - a button when it is not, for client-side paging — this is what the reference renders
 * - a span for the current page and for disabled arrows, which are not actionable at all
 *
 * A disabled anchor is the shape to avoid: without an href it is neither focusable nor
 * clickable, so styling one as a control would misrepresent what it does.
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
  const inert = disabled || current;
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
      ) : href === undefined ? (
        <button {...props} className={classNames} data-slot="pagination-link" type="button">
          {children}
        </button>
      ) : (
        <a
          {...(props as ComponentPropsWithoutRef<"a">)}
          className={classNames}
          data-slot="pagination-link"
          href={href}
        >
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
