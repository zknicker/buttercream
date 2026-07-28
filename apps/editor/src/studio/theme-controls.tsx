import { HugeiconsIcon } from "@hugeicons/react";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import type { ReactNode } from "react";
import { ColorPickerPopover, classes, DitherBand, Slider } from "../ui/index.ts";

/** Shared shape for every row in the controls rail: label left, value right. */
const ROW =
  "relative grid min-h-9 grid-cols-[1fr_auto] items-center gap-2 rounded-(--radius-shell) bg-raised px-3 text-[13px]";

/** Row labels carry the medium weight; at 400 they read unfinished against the values. */
const ROW_LABEL = "truncate font-medium text-fg";

export function ControlSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="mt-5 flex flex-col gap-1">
      {/*
       * Header and divider on one line: the band starts where the title ends and runs to the edge,
       * so it reads as a rule the heading sits in rather than a stripe stacked above it.
       *
       * It needs real height to read as dither at all — below about ten pixels the stipple is too
       * few rows to resolve and just looks like a soft line. Larger cells for the same reason: the
       * texture has to be legible as pixels, which is the whole point of the motif.
       */}
      <div className="mb-1 flex items-center gap-2.5">
        {/*
         * Sentence-case sans, not the brand's uppercase mono. Section headers in a dense
         * control rail should recede behind the values they label; the mono eyebrow is an
         * expressive device that belongs on marketing, where it has room to be loud.
         */}
        <h2 className="shrink-0 text-[11px] font-medium text-muted">{title}</h2>
        <DitherBand aria-hidden className="min-w-0 flex-1 text-butter" height={16} pixel={4} />
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
    <div className={ROW}>
      <span className={ROW_LABEL}>{label}</span>
      {/*
       * The picker writes hex back because that is what the design system document stores; it
       * still shows the other formats, so a value can be read in OkLCH without the document
       * gaining a second representation of the same colour.
       */}
      <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-muted">
        {value.toUpperCase()}
        {/*
         * The swatch alone is the trigger. Reading the value is the row's job and it already does
         * it in mono, so letting the trigger print its own copy gave the row two hex strings in
         * two typefaces.
         */}
        <ColorPickerPopover
          defaultFormat="hex"
          onValueChange={(next) => onChange(next)}
          triggerClassName="h-auto rounded-full p-0.5 ring-0 hover:bg-fg/10"
          triggerShowValue={false}
          value={normalizeHex(value)}
        />
      </span>
    </div>
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
      {/*
       * Padded by half the thumb's width so the handle stays wholly inside the row at both
       * ends. Base UI lays thumbs out within the control's content box, so the inset is
       * enough — no transform trick, and the fill still runs edge to edge because the track
       * sits outside the padding.
       */}
      <Slider.Control className="absolute inset-0 px-[3px]">
        <Slider.Track className="-mx-[3px] h-full w-[calc(100%+6px)]">
          {/*
           * Neutral, not butter. The note this replaces argued a grey fill would vanish because
           * the rail sat on a rgb(234) panel — but the row is --shell-raised, pure white, so a
           * tenth of the foreground reads clearly against it. Butter here competed with the
           * genuine accents (the section rail, the primary action) and lost the row to a colour
           * that carried no meaning: a density value is not a brand moment.
           */}
          <Slider.Indicator className="h-full bg-fg/8 transition-[width] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none dark:bg-fg/12" />
          <Slider.Ticks max={max} min={min} step={step} />
        </Slider.Track>
        {/*
         * Grows out from the row's midline while dragging rather than growing taller, which
         * a full-height thumb has no room to do. The same easing as the fill, so handle and
         * fill arrive together instead of the thumb snapping ahead of the colour.
         */}
        <Slider.Thumb
          className={classes(
            "h-[62%] w-[3px] rounded-[1px] bg-fg/55 outline-none",
            "transition-[height,left] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "data-dragging:h-full data-[dragging]:duration-100",
            "motion-reduce:transition-none",
          )}
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
