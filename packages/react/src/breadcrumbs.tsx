"use client";

import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Children, isValidElement } from "react";
import { classes } from "./classes.ts";

export interface BreadcrumbsProps extends ComponentPropsWithoutRef<"nav"> {
  /** Replaces the chevron drawn between crumbs. */
  separator?: ReactNode;
}

export interface BreadcrumbProps extends ComponentPropsWithoutRef<"a"> {
  /** Renders as inert text rather than a link, the same shape the current crumb takes. */
  disabled?: boolean;
  /** The page you are on. Renders as text, since a link to here goes nowhere. */
  current?: boolean;
}

function Chevron(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="breadcrumbs__separator"
      data-slot="breadcrumbs-separator"
      fill="none"
      role="presentation"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6 4 4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

/**
 * A trail of links to ancestor pages.
 *
 * Separators are drawn between the crumbs rather than asked for, so a caller cannot end up
 * with one dangling after the last item. They are `aria-hidden`: the list already conveys the
 * ordering, and a screen reader announcing "greater than" between every crumb is noise.
 */
function BreadcrumbsRoot({
  children,
  className,
  separator,
  ...props
}: BreadcrumbsProps): ReactElement {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <nav
      aria-label="Breadcrumb"
      className={classes("breadcrumbs", className)}
      data-slot="breadcrumbs"
      {...props}
    >
      <ol className="breadcrumbs__list" data-slot="breadcrumbs-list">
        {items.map((child, index) => (
          <li className="breadcrumbs__item" data-slot="breadcrumbs-item" key={child.key ?? index}>
            {index === 0 ? null : (separator ?? <Chevron />)}
            {child}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/*
 * A crumb that cannot be followed is a span, not an anchor. A disabled anchor is the shape to
 * avoid: without an href it is neither focusable nor clickable, so styling one as a link would
 * promise navigation the element cannot deliver. The crumb you are on is the common case of
 * this — it is a label, not a destination.
 */
function Breadcrumb({
  className,
  current = false,
  disabled = false,
  ...props
}: BreadcrumbProps): ReactElement {
  const shared = {
    className: classes("breadcrumbs__link", className),
    "data-slot": "breadcrumbs-link",
  };

  if (current || disabled) {
    return (
      <span
        aria-current={current ? "page" : undefined}
        aria-disabled={disabled || undefined}
        data-current={current || undefined}
        data-disabled={disabled || undefined}
        {...shared}
      >
        {props.children}
      </span>
    );
  }

  return <a {...shared} {...props} />;
}

export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Item: Breadcrumb,
});
