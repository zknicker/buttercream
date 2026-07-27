import { HugeiconsIcon } from "@hugeicons/react";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import type { ReactNode } from "react";
import { classes, Slider } from "../ui/index.ts";

/** Shared shape for every row in the controls rail: label left, value right. */
const ROW =
  "relative grid min-h-9 grid-cols-[1fr_auto] items-center gap-2 rounded-(--radius-shell) bg-raised px-3 text-[13px]";

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
      <h2 className="mb-1 text-[11px] font-medium text-muted">{title}</h2>
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
        className="w-36 rounded-[calc(var(--radius-shell)-0.125rem)] bg-transparent py-1 pl-2 text-right text-fg outline-0 focus-visible:-outline-offset-1 focus-visible:outline-[1.5px] focus-visible:outline-fg"
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
      <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-muted">
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
          {/*
           * A washed butter fill under a solid butter thumb. A neutral fill cannot work
           * here: the rail sits on a rgb(234) panel, so any grey light enough to stay
           * quiet composites to almost exactly that, and a half-filled slider reads as a
           * gap in the row rather than a value. Hue separates where lightness cannot.
           * Kept well under the thumb's full strength so the thumb still marks the value.
           */}
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
        {value.toFixed(step < 1 ? 2 : 0)}
      </output>
    </Slider>
  );
}

export function ToggleControl({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
}) {
  return (
    <label className={ROW}>
      <span className={ROW_LABEL}>{label}</span>
      <input
        aria-checked={value}
        aria-label={label}
        checked={value}
        className={classes(
          "relative h-4.5 w-8 shrink-0 cursor-pointer appearance-none rounded-full bg-fg/15 outline-0 transition-colors",
          "before:absolute before:top-0.5 before:left-0.5 before:size-3.5 before:rounded-full before:bg-raised before:shadow-sm before:ring-1 before:ring-fg/10 before:transition-transform before:content-['']",
          "checked:bg-butter checked:before:translate-x-3.5",
          "focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-fg",
        )}
        name={controlName(label)}
        onChange={(event) => onChange(event.currentTarget.checked)}
        role="switch"
        type="checkbox"
      />
    </label>
  );
}

export interface SelectControlOption<Value extends string> {
  label: string;
  value: Value;
}

/**
 * Curated stacks for the font pickers. Geist and Young Serif ship with the shell (see the
 * `@font-face` rules in shell.css) and the preview renders in the same document, so every
 * option resolves without a network fetch; the rest are system stacks.
 */
export const fontOptions: readonly SelectControlOption<string>[] = [
  { label: "Geist", value: "Geist, ui-sans-serif, system-ui, sans-serif" },
  { label: "Georgia", value: "Georgia, 'Times New Roman', serif" },
  { label: "Inter", value: "Inter, ui-sans-serif, system-ui, sans-serif" },
  { label: "System Rounded", value: "ui-rounded, system-ui, sans-serif" },
  { label: "System Sans", value: "ui-sans-serif, system-ui, sans-serif" },
  { label: "Young Serif", value: "'Young Serif', Georgia, serif" },
];

export function FontControl({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  /* Imported themes can carry any stack; surface it as "Custom" instead of misreporting. */
  const options = fontOptions.some((option) => option.value === value)
    ? fontOptions
    : [{ label: "Custom", value }, ...fontOptions];

  return <SelectControl label={label} onChange={onChange} options={options} value={value} />;
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
        "has-[:focus-visible]:outline-[1.5px] has-[:focus-visible]:-outline-offset-1 has-[:focus-visible]:outline-fg",
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
