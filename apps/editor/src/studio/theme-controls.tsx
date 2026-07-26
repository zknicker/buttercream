import { HugeiconsIcon } from "@hugeicons/react";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import type { ReactNode } from "react";
import { classes, Slider } from "../ui/index.ts";

/** Shared shape for every row in the controls rail: label left, value right. */
const ROW =
  "relative grid min-h-9 grid-cols-[1fr_auto] items-center gap-2 rounded-(--radius-shell) bg-raised px-3 text-sm";

/** Row labels carry the medium weight; at 400 they read unfinished against the values. */
const ROW_LABEL = "truncate font-medium text-fg";

export function ControlSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="mt-7 flex flex-col gap-1">
      {/*
       * Sentence-case sans, not the brand's uppercase mono. Section headers in a dense
       * control rail should recede behind the values they label; the mono eyebrow is an
       * expressive device that belongs on marketing, where it has room to be loud.
       */}
      <h2 className="mb-1 text-xs font-medium text-muted">{title}</h2>
      {children}
    </section>
  );
}

export function ControlRow({ children }: { children: ReactNode }) {
  return <div className={ROW}>{children}</div>;
}

export function TextControl({
  label,
  maxLength,
  onChange,
  value,
}: {
  label: string;
  maxLength?: number;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className={ROW}>
      <span className={ROW_LABEL}>{label}</span>
      <input
        aria-label={label}
        className="w-36 rounded-[calc(var(--radius-shell)-0.125rem)] bg-transparent py-1 pl-2 text-right text-fg outline-0 focus-visible:-outline-offset-1 focus-visible:outline-2 focus-visible:outline-fg"
        maxLength={maxLength}
        name={label}
        onChange={(event) => onChange(event.currentTarget.value)}
        value={value}
      />
    </label>
  );
}

export function ColorControl({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className={ROW}>
      <span className={ROW_LABEL}>{label}</span>
      <span className="flex shrink-0 items-center gap-2 font-mono text-xs text-muted">
        {value.toUpperCase()}
        <input
          aria-label={label}
          /* The ring keeps the swatch legible when the chosen colour matches the row. */
          className="size-4 shrink-0 cursor-pointer appearance-none overflow-hidden rounded-full bg-transparent p-0 ring-1 ring-fg/25 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0"
          name={label}
          onChange={(event) => onChange(event.currentTarget.value)}
          type="color"
          value={normalizeHex(value)}
        />
      </span>
    </label>
  );
}

export function RangeControl({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  return (
    /*
     * Behaviour comes from the published Slider; the styling is the shell's own. The
     * control is stretched behind the row so the whole row reads as one continuous
     * slider, with the fill sitting under the label rather than beside it.
     */
    <Slider
      className={classes(
        ROW,
        "cursor-ew-resize overflow-hidden",
        "has-focus-visible:outline-2 has-focus-visible:-outline-offset-1 has-focus-visible:outline-fg",
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
          {/*
           * Neutral, not butter. Four accent-filled sliders stop reading as "active"
           * and become decoration; the accent stays on the thumb, where it marks the
           * value. This is also why the fill no longer muddies on the dark canvas.
           */}
          <Slider.Indicator className="h-full bg-fg/8 dark:bg-fg/12" />
        </Slider.Track>
        <Slider.Thumb
          className="h-full w-0.5 bg-butter outline-none"
          getAriaLabel={() => label}
          index={0}
        />
      </Slider.Control>
      <Slider.Label className={classes(ROW_LABEL, "pointer-events-none z-1")}>{label}</Slider.Label>
      <output className="pointer-events-none z-1 shrink-0 font-mono text-xs tabular-nums text-muted">
        {value.toFixed(step < 1 ? 2 : 0)}
      </output>
    </Slider>
  );
}

export interface SelectControlOption<Value extends string> {
  label: string;
  value: Value;
}

export function SelectControl<Value extends string>({
  disabled = false,
  label,
  onChange,
  options,
  value,
}: {
  disabled?: boolean;
  label: string;
  onChange: (value: Value) => void;
  options: readonly SelectControlOption<Value>[];
  value: Value;
}) {
  return (
    <label
      className={classes(
        ROW,
        "focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-fg",
      )}
    >
      <span className={ROW_LABEL}>{label}</span>
      <span className="grid w-36 min-w-0 grid-cols-[minmax(0,1fr)_1rem] items-center">
        <select
          aria-label={label}
          className="col-span-full row-start-1 h-9 min-w-0 cursor-pointer appearance-none bg-transparent pr-5 pl-2 text-right font-mono text-xs text-ellipsis text-muted outline-0 disabled:cursor-default disabled:opacity-60"
          disabled={disabled}
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

function controlName(label: string): string {
  return label.toLowerCase().replaceAll(" ", "-");
}

function normalizeHex(value: string): string {
  return /^#[\da-f]{6}$/iu.test(value) ? value : "#1b1b1b";
}
