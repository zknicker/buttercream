"use client";

import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { classes } from "./classes.ts";

export type TableVariant = "primary" | "secondary";

export interface TableProps extends ComponentPropsWithoutRef<"table"> {
  /** Names the table for assistive technology, which a caption otherwise would. */
  label?: string;
  variant?: TableVariant;
}

/**
 * A data table built on native table elements.
 *
 * Base UI has no table primitive, and none is needed: `<table>` carries its own semantics.
 * That also means no sorting or row selection — those are behaviours, and the reference gets
 * them from react-aria. Compose them yourself, or reach for a data-grid library.
 *
 * The scroll container is part of the component rather than the caller's problem: a table with
 * more columns than room has to scroll somewhere, and doing it here keeps the frame's rounded
 * corners intact around the overflow.
 */
function TableRoot({
  children,
  className,
  label,
  variant = "primary",
  ...props
}: TableProps): ReactElement {
  return (
    <div className={classes("table", `table--${variant}`, className)} data-slot="table">
      <div className="table__scroll-container" data-slot="table-scroll-container">
        <table aria-label={label} className="table__content" data-slot="table-content" {...props}>
          {children}
        </table>
      </div>
    </div>
  );
}

function TableHeader({ className, ...props }: ComponentPropsWithoutRef<"thead">): ReactElement {
  return (
    <thead className={classes("table__header", className)} data-slot="table-header" {...props} />
  );
}

function TableBody({ className, ...props }: ComponentPropsWithoutRef<"tbody">): ReactElement {
  return <tbody className={classes("table__body", className)} data-slot="table-body" {...props} />;
}

function TableRow({ className, ...props }: ComponentPropsWithoutRef<"tr">): ReactElement {
  return <tr className={classes("table__row", className)} data-slot="table-row" {...props} />;
}

function TableColumn({ className, ...props }: ComponentPropsWithoutRef<"th">): ReactElement {
  return (
    <th
      className={classes("table__column", className)}
      data-slot="table-column"
      scope="col"
      {...props}
    />
  );
}

function TableCell({ className, ...props }: ComponentPropsWithoutRef<"td">): ReactElement {
  return <td className={classes("table__cell", className)} data-slot="table-cell" {...props} />;
}

export const Table = Object.assign(TableRoot, {
  Body: TableBody,
  Cell: TableCell,
  Column: TableColumn,
  Header: TableHeader,
  Row: TableRow,
});
