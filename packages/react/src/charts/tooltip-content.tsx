"use client";

import type { ReactNode } from "react";
import { intFmt } from "./chart-formatters";

export interface TooltipRow {
  color: string;
  label: string;
  value: string | number;
}

export interface TooltipContentProps {
  title?: string;
  rows: TooltipRow[];
  /** Optional additional content (e.g., markers) */
  children?: ReactNode;
}

export function TooltipContent({ title, rows, children }: TooltipContentProps) {
  return (
    <div className="chart-tooltip__clip">
      <div className="chart-tooltip__body">
        {title && <div className="chart-tooltip__title">{title}</div>}
        <div className="chart-tooltip__rows">
          {rows.map((row) => (
            <div className="chart-tooltip__row" key={`${row.label}-${row.color}`}>
              <div className="chart-tooltip__key">
                <span className="chart-tooltip__dot" style={{ backgroundColor: row.color }} />
                <span className="chart-tooltip__name">{row.label}</span>
              </div>
              <span className="chart-tooltip__value">
                {typeof row.value === "number" ? intFmt(row.value) : row.value}
              </span>
            </div>
          ))}
        </div>

        {children && <div className="chart-tooltip__footer">{children}</div>}
      </div>
    </div>
  );
}

TooltipContent.displayName = "TooltipContent";

export default TooltipContent;
