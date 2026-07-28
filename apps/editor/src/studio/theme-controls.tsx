import { HugeiconsIcon } from "@hugeicons/react";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import type { ReactNode } from "react";
import { ColorPickerPopover, classes, DitherBand, Select, Slider } from "../ui/index.ts";

/** Shared shape for every row in the controls rail: label left, value right. */
const ROW =
  "relative grid min-h-9 grid-cols-[1fr_auto] items-center gap-2 rounded-(--radius-shell) bg-raised px-3 text-[13px]";

/*
 * The same row, laid out with flex instead of grid, for controls whose trigger IS the row. ROW's
 * two columns cannot hold a label, a value and a chevron without wrapping the third onto its own
 * line.
 */
const ROW_FLEX =
  "flex min-h-9 w-full items-center gap-2 rounded-(--radius-shell) bg-raised px-3 text-[13px]";

/** Row labels carry the medium weight; at 400 they read unfinished against the values. */
const ROW_LABEL = "truncate font-medium text-fg";

/*
 * Every row's right-hand side reads the same: mono, small, muted, and never wrapping. The rows
 * differ in what they do, and they should not also differ in how their value looks.
 */
const ROW_VALUE = "shrink-0 font-mono text-[11px] tabular-nums text-muted";

export function ControlSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="mt-5 flex flex-col gap-1">
      {/*
       * Header and divider on one line: the band starts where the title ends and runs to the edge,
       * so it reads as a rule the heading sits in rather than a stripe stacked above it.
       *
       * Neutral, not butter. At full strength the band competed with the values it exists to
       * separate; the muted tone lets the pattern carry the brand instead of the hue.
       */}
      <div className="mb-1 flex items-center gap-3">
        {/*
         * The pixel mono the wordmark uses, at a size it can actually be read at. An earlier note
         * here argued for small sans on the grounds that a section header should recede — but
         * receding and being characterless are not the same thing, and at eleven pixels it was
         * doing the second. Departure Mono carries the brand at the one point in the rail where a
         * label is the only thing on the line.
         */}
        <h2 className="shrink-0 font-mono text-[13px] tracking-tight text-muted">{title}</h2>
        {/*
         * Read off the reference rather than guessed at. Three things make it work, and the
         * earlier attempts had none of them:
         *
         * Even, not fading. A dissolving band carries its weight at the solid end, so it can
         * never look vertically centred beside a word. A flat field can.
         *
         * Two rows, not four. Three-pixel cells over six pixels lands on exactly the alternating
         * checker the reference uses, and it stays a rule; at four rows the field starts reading
         * as a band of texture with its own presence.
         *
         * Masked at both ends. This is the detail that reads as craft: the field fades in after
         * the heading and out before the edge, so it never butts hard against either.
         */}
        <DitherBand
          aria-hidden
          className="min-w-0 flex-1 text-fg/25 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          density={0.5}
          height={6}
          pixel={3}
        />
      </div>
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
    <label className={classes(ROW_FLEX, "focus-within:bg-fg/5")}>
      <span className={classes(ROW_LABEL, "shrink-0")}>{label}</span>
      <input
        aria-label={label}
        className="min-w-0 flex-1 rounded-[calc(var(--radius-shell)-0.125rem)] bg-transparent py-1 pl-2 text-right text-fg outline-0 focus-visible:-outline-offset-1 focus-visible:outline-[1.5px] focus-visible:outline-fg"
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
    /*
     * The row is the trigger. Previously only the swatch opened the picker, which made a 16px
     * target out of a 276px row and left the rest of the line inert for no reason the user could
     * see.
     *
     * The picker writes hex back because that is what the design system document stores; it still
     * shows the other formats, so a value can be read in OkLCH — the space the neutral ladder is
     * built in — without the document gaining a second representation of the same colour.
     */
    <ColorPickerPopover
      defaultFormat="hex"
      onValueChange={(next) => onChange(next)}
      triggerClassName={classes(ROW_FLEX, "hover:bg-fg/5")}
      triggerLabel={label}
      triggerLabelPosition="left"
      triggerShowValue
      value={normalizeHex(value)}
    />
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
     * The row is the slider — a drag anywhere across it moves the value — but the track is a
     * hairline on the bottom edge rather than a fill behind the label. A half-filled row read as a
     * different kind of component next to the clean colour and select rows; a rule under the row
     * says the same thing without changing what the row looks like.
     */
    <Slider
      className={classes(
        ROW_FLEX,
        "relative cursor-ew-resize overflow-hidden hover:bg-fg/5",
        "has-focus-visible:outline-[1.5px] has-focus-visible:-outline-offset-1 has-focus-visible:outline-fg",
      )}
      max={max}
      min={min}
      name={controlName(label)}
      onValueChange={onChange}
      step={step}
      value={value}
    >
      {/*
       * The control still covers the whole row, so the hit area is the row even though the track it
       * draws is four pixels tall. items-end drops the track and its handle onto the bottom edge;
       * the horizontal padding keeps the handle inside the row at both extremes.
       */}
      <Slider.Control className="absolute inset-0 flex items-end px-[3px]">
        <Slider.Track className="-mx-[3px] h-[3px] w-[calc(100%+6px)] bg-fg/8">
          <Slider.Indicator className="h-full bg-fg/35 transition-[width] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none" />
          <Slider.Ticks max={max} min={min} step={step} />
        </Slider.Track>
        {/* Straddles the rule so the handle is findable against a three-pixel track. */}
        <Slider.Thumb
          className={classes(
            "-mb-[2px] h-[7px] w-[3px] rounded-[1px] bg-fg/70 outline-none",
            "transition-[height,left] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "data-dragging:-mb-[3px] data-dragging:h-[9px] data-[dragging]:duration-100",
            "motion-reduce:transition-none",
          )}
          getAriaLabel={() => label}
          index={0}
        />
      </Slider.Control>
      <Slider.Label className={classes(ROW_LABEL, "pointer-events-none z-1 min-w-0 flex-1")}>
        {label}
      </Slider.Label>
      <output className={classes(ROW_VALUE, "pointer-events-none z-1")}>
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
    /*
     * A label is right here — the switch is a real checkbox, so wrapping it makes the whole row
     * toggle the value, which is the same "the row is the control" rule the other rows follow.
     */
    <label className={classes(ROW_FLEX, "cursor-pointer hover:bg-fg/5")}>
      <span className={classes(ROW_LABEL, "min-w-0 flex-1")}>{label}</span>
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

/**
 * Curated stacks for the mono font picker. Departure Mono ships with the shell (see the
 * `@font-face` rules in shell.css) and the preview renders in the same document, so it
 * resolves without a network fetch; the rest are system stacks.
 */
export const monoFontOptions: readonly SelectControlOption<string>[] = [
  { label: "Consolas", value: "Consolas, ui-monospace, SFMono-Regular, Menlo, monospace" },
  { label: "Courier", value: "'Courier New', Courier, monospace" },
  {
    label: "Departure Mono",
    value: "'Departure Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  { label: "System Mono", value: "ui-monospace, SFMono-Regular, Menlo, monospace" },
];

export function FontControl({
  label,
  onChange,
  options = fontOptions,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options?: readonly SelectControlOption<string>[];
  value: string;
}) {
  /* Imported themes can carry any stack; surface it as "Custom" instead of misreporting. */
  const resolvedOptions = options.some((option) => option.value === value)
    ? options
    : [{ label: "Custom", value }, ...options];

  return (
    <SelectControl label={label} onChange={onChange} options={resolvedOptions} value={value} />
  );
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
    /*
     * The row is the select, not a label beside one. Anywhere in the row opens it, which is both a
     * bigger target and an honest signal: this line does one thing.
     */
    <Select
      aria-label={label}
      className={classes(ROW_FLEX, "text-left hover:bg-fg/5")}
      disabled={disabled}
      items={options as { label: string; value: Value }[]}
      label={label}
      name={controlName(label)}
      onValueChange={(next) => onChange(next as Value)}
      value={value}
    >
      {options.map((option) => (
        <Select.Item key={option.value} value={option.value}>
          {option.label}
        </Select.Item>
      ))}
    </Select>
  );
}

function controlName(label: string): string {
  return label.toLowerCase().replaceAll(" ", "-");
}

function normalizeHex(value: string): string {
  return /^#[\da-f]{6}$/iu.test(value) ? value : "#1b1b1b";
}
