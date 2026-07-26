import type { ReactNode } from "react";
import { classes, Slider } from "../ui/index.ts";

/** Shared shape for every row in the controls rail: label left, value right. */
const ROW =
  "relative grid min-h-9 grid-cols-[1fr_auto] items-center gap-2 rounded-(--radius-shell) bg-raised px-3 text-sm";

export function ControlSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="mt-7 flex flex-col gap-1">
      <h2 className="mb-1 font-mono text-xs tracking-wide text-muted uppercase">{title}</h2>
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
      <span className="truncate text-fg">{label}</span>
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
      <span className="truncate text-fg">{label}</span>
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
          <Slider.Indicator className="h-full bg-butter/25" />
        </Slider.Track>
        <Slider.Thumb
          className="h-full w-0.5 bg-butter outline-none"
          getAriaLabel={() => label}
          index={0}
        />
      </Slider.Control>
      <Slider.Label className="pointer-events-none z-1 truncate text-fg">{label}</Slider.Label>
      <output className="pointer-events-none z-1 shrink-0 font-mono text-xs tabular-nums text-muted">
        {value.toFixed(step < 1 ? 2 : 0)}
      </output>
    </Slider>
  );
}

function controlName(label: string): string {
  return label.toLowerCase().replaceAll(" ", "-");
}

function normalizeHex(value: string): string {
  return /^#[\da-f]{6}$/iu.test(value) ? value : "#1b1b1b";
}
