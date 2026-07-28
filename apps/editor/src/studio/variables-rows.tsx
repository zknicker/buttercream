import { HugeiconsIcon } from "@hugeicons/react";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import type { ReactElement, ReactNode } from "react";
import { useRef, useState } from "react";
import { classes, Slider } from "../ui/index.ts";
import { describeTokenValue, formatTokenDisplay } from "./variables-tokens.ts";

/*
 * Row primitives for the Variables tab. Same rail idiom as theme-controls.tsx — label
 * left, value right, one raised row per control — kept self-contained so the two panels
 * can evolve independently.
 */

const ROW =
  "relative grid min-h-9 grid-cols-[1fr_auto] items-center gap-2 rounded-(--radius-shell) bg-raised px-3 text-[13px]";

const ROW_LABEL = "truncate font-medium text-fg";

const FOCUS_OUTLINE =
  "focus-visible:outline-[1.5px] focus-visible:-outline-offset-1 focus-visible:outline-fg";

export function VariablesSection({
  children,
  count,
  title,
}: {
  children: ReactNode;
  count?: number;
  title: string;
}): ReactElement {
  return (
    <section className="mt-7 flex flex-col gap-1">
      <h2 className="mb-1 flex items-baseline justify-between text-[11px] font-medium text-muted">
        {title}
        {count === undefined ? null : <span className="font-mono tabular-nums">{count}</span>}
      </h2>
      {children}
    </section>
  );
}

export function FilterChips<Value extends string>({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: Value) => void;
  options: readonly Value[];
  value: Value;
}): ReactElement {
  return (
    <fieldset aria-label={label} className="mb-1 flex min-w-0 flex-wrap gap-1">
      {options.map((option) => (
        <button
          aria-pressed={option === value}
          className={classes(
            "h-5.5 rounded-full px-2 text-[11px] whitespace-nowrap",
            FOCUS_OUTLINE,
            option === value ? "bg-raised text-fg ring-1 ring-fg/10" : "text-muted hover:text-fg",
          )}
          key={option}
          onClick={() => onChange(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </fieldset>
  );
}

/**
 * One colour token. Authored tokens (given `onCommit`) edit inline — a literal hex gets a
 * colour picker swatch, and clicking the value swaps in a text input so any token can be
 * pinned to a literal over its default expression. Derived tokens render their formula
 * read-only. The swatch resolves `var(--name)` against the enclosing themed scope.
 */
export function ColorTokenRow({
  name,
  onCommit,
  value,
}: {
  name: string;
  onCommit?: (value: string) => void;
  value: string;
}): ReactElement {
  const [draft, setDraft] = useState<string | null>(null);
  const cancelled = useRef(false);
  const display = formatTokenDisplay(describeTokenValue(value));
  const hex = /^#[\da-f]{6}$/iu.exec(value.trim())?.[0];

  const commit = (next: string) => {
    const trimmed = next.trim();
    if (trimmed && trimmed !== value) {
      onCommit?.(trimmed);
    }
  };

  return (
    <div className="group/token relative flex items-center gap-2.5 px-3 py-1.5 hover:bg-fg/4">
      {hex !== undefined && onCommit ? (
        <input
          aria-label={`${name} colour`}
          /* The ring keeps the swatch legible when the chosen colour matches the row. */
          className="size-4 shrink-0 cursor-pointer appearance-none overflow-hidden rounded-full bg-transparent p-0 ring-1 ring-fg/25 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0"
          name={name}
          onChange={(event) => onCommit(event.currentTarget.value)}
          type="color"
          value={hex}
        />
      ) : (
        <span
          aria-hidden
          className="size-4 shrink-0 rounded-full ring-1 ring-fg/25"
          style={{ background: `var(--${name})` }}
        />
      )}
      <span className="grid min-w-0 flex-1">
        <span className="truncate font-mono text-[11px] leading-4 text-fg" title={name}>
          {name}
        </span>
        {draft !== null ? null : onCommit ? (
          <button
            className={classes(
              "truncate rounded-(--radius-shell-sm) text-left font-mono text-[10px] leading-4 text-muted group-hover/token:text-fg",
              FOCUS_OUTLINE,
            )}
            onClick={() => setDraft(value)}
            title={`${value} — click to edit`}
            type="button"
          >
            {display}
          </button>
        ) : (
          <span className="truncate font-mono text-[10px] leading-4 text-muted" title={value}>
            {display}
          </span>
        )}
      </span>
      {draft === null ? null : (
        <input
          aria-label={`${name} value`}
          // biome-ignore lint/a11y/noAutofocus: the input replaces the value button the user just clicked; focus must follow it.
          autoFocus
          className={classes(
            "mt-1 mb-0.5 w-full min-w-0 rounded-[calc(var(--radius-shell)-0.125rem)] bg-sunken px-2 py-1 font-mono text-[11px] text-fg outline-0",
            FOCUS_OUTLINE,
          )}
          name={`${name}-value`}
          onBlur={(event) => {
            if (!cancelled.current) {
              commit(event.currentTarget.value);
            }
            cancelled.current = false;
            setDraft(null);
          }}
          onChange={(event) => setDraft(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.currentTarget.blur();
            } else if (event.key === "Escape") {
              cancelled.current = true;
              setDraft(null);
            }
          }}
          value={draft}
        />
      )}
    </div>
  );
}

/** One choice among a few named levels, rendered as a small in-row segmented control. */
export function LevelRow<Value extends string>({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: Value) => void;
  options: readonly { label: string; value: Value }[];
  value: Value;
}): ReactElement {
  return (
    /* The four level names do not fit beside a label at this rail width — "Medium" clips —
       so the control takes its own full-width line. The rows still share one container, which
       is what keeps this denser than a card per shadow. */
    <div className="px-3 py-2 text-[13px]">
      <span className="mb-1.5 block text-xs font-medium text-fg">{label}</span>
      <fieldset
        aria-label={label}
        className="grid min-w-0 auto-cols-fr grid-flow-col gap-0.5 rounded-[calc(var(--radius-shell)-0.125rem)] bg-sunken p-0.5"
      >
        {options.map((option) => (
          <button
            aria-pressed={option.value === value}
            className={classes(
              "h-6 rounded-[calc(var(--radius-shell)-0.25rem)] px-1 text-[11px] whitespace-nowrap",
              FOCUS_OUTLINE,
              option.value === value
                ? "bg-raised text-fg shadow-sm ring-1 ring-fg/8 dark:shadow-none"
                : "text-muted hover:text-fg",
            )}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </fieldset>
    </div>
  );
}

export function ToggleRow({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
}): ReactElement {
  return (
    <button
      aria-checked={value}
      className={classes(ROW, "cursor-pointer text-left", FOCUS_OUTLINE)}
      onClick={() => onChange(!value)}
      role="switch"
      type="button"
    >
      <span className={ROW_LABEL}>{label}</span>
      <span
        aria-hidden
        className={classes(
          "flex h-4.5 w-8 shrink-0 items-center rounded-full p-0.5 transition-colors",
          value ? "bg-butter" : "bg-fg/20",
        )}
      >
        <span
          className={classes(
            "size-3.5 rounded-full bg-raised ring-1 ring-fg/10 transition-transform",
            value ? "translate-x-3.5" : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}

export function SelectRow<Value extends string>({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: Value) => void;
  options: readonly { label: string; value: Value }[];
  value: Value;
}): ReactElement {
  return (
    <label
      className={classes(
        ROW,
        "has-[:focus-visible]:outline-[1.5px] has-[:focus-visible]:-outline-offset-1 has-[:focus-visible]:outline-fg",
      )}
    >
      <span className={ROW_LABEL}>{label}</span>
      <span className="grid w-28 min-w-0 grid-cols-[minmax(0,1fr)_1rem] items-center">
        <select
          aria-label={label}
          className="col-span-full row-start-1 h-9 min-w-0 cursor-pointer appearance-none bg-transparent pr-5 pl-2 text-right font-mono text-xs text-ellipsis text-muted outline-0"
          name={controlName(label)}
          onChange={(event) => onChange(event.currentTarget.value as Value)}
          value={value}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <HugeiconsIcon
          aria-hidden="true"
          className="pointer-events-none z-1 col-start-2 row-start-1 size-4 text-muted"
          icon={ArrowDown01Icon}
          size={16}
          strokeWidth={2}
        />
      </span>
    </label>
  );
}

export function RangeRow({
  format,
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  format?: (value: number) => string;
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}): ReactElement {
  return (
    /*
     * Same stretched-slider row as the Style tab: the control sits behind the whole row
     * so the row itself reads as one continuous slider.
     */
    <Slider
      className={classes(
        ROW,
        "cursor-ew-resize overflow-hidden",
        "has-focus-visible:outline-[1.5px] has-focus-visible:-outline-offset-1 has-focus-visible:outline-fg",
      )}
      max={max}
      min={min}
      name={controlName(label)}
      onValueChange={onChange}
      step={step}
      value={value}
    >
      <Slider.Control className="absolute inset-0">
        <Slider.Track className="h-full w-full">
          <Slider.Indicator className="h-full bg-butter/25 dark:bg-butter/22" />
        </Slider.Track>
        <Slider.Thumb
          className="h-full w-0.5 bg-butter outline-none"
          getAriaLabel={() => label}
          index={0}
        />
      </Slider.Control>
      <Slider.Label className={classes(ROW_LABEL, "pointer-events-none z-1")}>{label}</Slider.Label>
      <output className="pointer-events-none z-1 shrink-0 font-mono text-[11px] tabular-nums text-muted">
        {format ? format(value) : value.toFixed(step < 1 ? 2 : 0)}
      </output>
    </Slider>
  );
}

function controlName(label: string): string {
  return label.toLowerCase().replaceAll(" ", "-");
}
