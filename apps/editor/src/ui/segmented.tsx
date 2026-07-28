import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export interface SegmentedProps<Value extends string> {
  className?: string;
  label: string;
  onChange: (value: Value) => void;
  options: readonly Value[];
  value: Value;
}

export function Segmented<Value extends string>({
  className,
  label,
  onChange,
  options,
  value,
}: SegmentedProps<Value>): ReactElement {
  return (
    <div
      aria-label={label}
      className={classes(
        "flex gap-0.5 overflow-x-auto rounded-(--radius-shell) bg-sunken p-0.5 scrollbar-none",
        className,
      )}
      role="tablist"
    >
      {options.map((option) => (
        <button
          aria-selected={option === value}
          className={classes(
            "h-7 flex-1 rounded-[calc(var(--radius-shell)-0.125rem)] px-2.5 text-sm whitespace-nowrap",
            "focus-visible:outline-[1.5px] focus-visible:-outline-offset-1 focus-visible:outline-fg",
            /*
             * The selected pill is a surface, not a fill. Butter marks it at the edge rather than
             * across it: at full strength it would read as the primary action in a rail whose
             * primary action is already butter, and a tab is a place you are, not a thing you do.
             */
            option === value
              ? "bg-raised text-fg shadow-sm ring-1 ring-butter/45 dark:shadow-none"
              : "text-muted hover:text-fg",
          )}
          key={option}
          onClick={() => onChange(option)}
          role="tab"
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
