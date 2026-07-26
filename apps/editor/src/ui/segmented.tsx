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
        "flex gap-0.5 overflow-x-auto rounded-(--radius-shell) bg-crumb p-0.5 scrollbar-none",
        className,
      )}
      role="tablist"
    >
      {options.map((option) => (
        <button
          aria-selected={option === value}
          className={classes(
            "h-7 flex-1 rounded-[calc(var(--radius-shell)-0.125rem)] px-2.5 text-sm whitespace-nowrap",
            "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ink",
            option === value
              ? "bg-parchment text-ink shadow-sm ring-1 ring-ink/8"
              : "text-graphite hover:text-ink",
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
