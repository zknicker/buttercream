import { HugeiconsIcon } from "@hugeicons/react";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import type { ReactNode } from "react";
import { useState } from "react";
import { Badge, ColorPickerPopover, classes, DitherBand, Select, Slider } from "../ui/index.ts";
import { controlName, FOCUS_OUTLINE, ROW, ROW_FLEX, ROW_LABEL, ROW_VALUE } from "./control-row.ts";

export function ControlSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="mt-6 flex flex-col gap-1.5">
      {/*
       * Header and divider on one line: the band starts where the title ends and runs to the edge,
       * so it reads as a rule the heading sits in rather than a stripe stacked above it.
       *
       * Neutral, not butter. At full strength the band competed with the values it exists to
       * separate; the muted tone lets the pattern carry the brand instead of the hue.
       */}
      <div className="mb-2 flex items-center gap-3">
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

/** Is this a literal a colour picker can round-trip, or an expression it would destroy? */
export function isPickableColor(value: string): boolean {
  return /^#[0-9a-f]{3,8}$/iu.test(value.trim());
}

export function ColorControl({
  description,
  label,
  onChange,
  swatchColor,
  value,
}: {
  /**
   * A second line under the label. The Variables tab puts the token's value or formula here — the
   * thing that says where a colour came from — which is why the row has to be able to grow.
   */
  description?: string;
  label: string;
  /** Omit to render the row read-only: a value with nowhere to be written is not an input. */
  onChange?: (value: string) => void;
  /** What the swatch paints, when that is not the value itself — a derived token's resolved colour. */
  swatchColor?: string;
  value: string;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const twoLine = description !== undefined;
  const rowClass = classes(ROW_FLEX, twoLine && "py-1.5");

  const commit = (next: string) => {
    const trimmed = next.trim();
    if (trimmed && trimmed !== value) {
      onChange?.(trimmed);
    }
    setDraft(null);
  };

  /*
   * Three kinds of value wear three different controls, because they are three different things.
   *
   * A literal opens the picker. An expression — `oklch(from var(--accent) …)`, `var(--foreground)`
   * — gets a text field instead: the picker cannot represent one, and offering it would mean
   * silently replacing a generated value with a literal and detaching that role from the neutral
   * ladder. A value with no setter is neither, and renders as text.
   *
   * Seventeen of the twenty-five authored colour tokens are expressions, so the text path is the
   * common case rather than the exception.
   */
  if (onChange && isPickableColor(value)) {
    return (
      <ColorPickerPopover
        defaultFormat="hex"
        onValueChange={onChange}
        triggerClassName={classes(rowClass, "hover:bg-fg/5")}
        triggerLabel={<RowText description={description} label={label} />}
        /*
         * Two-line rows put the swatch first, so an editable token and a derived one line up: the
         * derived row has no trigger to hang a swatch inside, so it draws its own on the left, and
         * a picker that put its tile on the right made the two look like different kinds of row.
         */
        triggerLabelPosition={twoLine ? "right" : "left"}
        triggerShowValue={!twoLine}
        value={normalizeHex(value)}
      />
    );
  }

  return (
    /*
     * A read-only row keeps the shape of an editable one and loses its contrast. Derived tokens are
     * still worth reading — the formula is how you find out where a colour came from — so they stay
     * legible rather than being hidden or shrunk; they simply stop looking like something you can
     * act on. The swatch keeps full strength, because the colour is the point.
     */
    <div className={classes(rowClass, "relative overflow-hidden", onChange ? "" : "ring-fg/6")}>
      {/*
       * Fills the row's top-right corner: flush with both edges, sharing the row's own radius
       * there and rounding only where it cuts into the row. The row's outline runs around it
       * rather than past it, which is what makes the tag read as part of this row.
       *
       * It sat in the gap above the row before, four pixels clear of everything, which put it
       * closer to the row above than to the one it labels.
       *
       * Out of the flow either way, so it takes no width from either line — the formula
       * underneath is how you find out where a colour came from, and it had been truncating to
       * make room. The right side of a derived row is empty, so the corner is free.
       */}
      {onChange === undefined && description !== undefined ? (
        <Badge
          className={classes(
            /*
             * Skewed rather than clipped. A clip path cannot round a corner, and the join where the
             * slant meets the tag's underside wants to be round — square, the two edges read as two
             * shapes meeting; rounded, as one line changing direction.
             *
             * It runs past the row's right edge and the row clips it, so the skew never shows on
             * that side and the tag stays flush into the corner. The row clips its own radius for
             * us too, which is why the tag only declares the one corner it owns: two radii kept in
             * step by hand is a thing that goes wrong later.
             */
            "absolute top-0 -right-3 h-3 skew-x-[-18deg] pr-5 pl-4 text-[8px] tracking-[0.09em]",
            "[border-radius:0_0_0_0.3125rem]",
          )}
          variant="line"
        >
          {/* Back upright: the notch is skewed, the word in it is not. */}
          <span className="inline-block skew-x-[18deg]">Derived</span>
        </Badge>
      ) : null}
      <ColorSwatch color={swatchColor ?? value} />
      {draft === null ? (
        <RowText
          description={description}
          dim={onChange === undefined}
          label={label}
          {...(onChange ? { onEdit: () => setDraft(value) } : {})}
        />
      ) : (
        <input
          aria-label={`${label} value`}
          // biome-ignore lint/a11y/noAutofocus: the input replaces the text the user just clicked; focus has to follow it.
          autoFocus
          className={classes(
            "min-w-0 flex-1 rounded-(--radius-shell-sm) bg-sunken px-2 py-1 font-mono text-[11px] text-fg outline-0",
            FOCUS_OUTLINE,
          )}
          onBlur={(event) => commit(event.currentTarget.value)}
          onChange={(event) => setDraft(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              commit(event.currentTarget.value);
            }
            if (event.key === "Escape") {
              setDraft(null);
            }
          }}
          value={draft}
        />
      )}
    </div>
  );
}

function ColorSwatch({ color }: { color: string }) {
  /* The ring keeps the swatch legible when the colour it holds matches the row behind it. */
  return (
    <span
      aria-hidden
      className="size-4 shrink-0 rounded-full ring-1 ring-fg/25"
      style={{ background: color }}
    />
  );
}

/*
 * A row's label and the optional second line explaining it.
 *
 * When the value can be edited the second line is a button rather than a permanently open field:
 * ninety rows of live inputs is a wall of boxes, and the value is something you read far more often
 * than you change.
 */
function RowText({
  description,
  dim = false,
  label,
  onEdit,
}: {
  description: string | undefined;
  dim?: boolean;
  label: string;
  onEdit?: () => void;
}) {
  const labelClass = classes(
    ROW_LABEL,
    description !== undefined && "font-mono text-[11px] leading-4",
    dim && "text-muted",
  );

  return (
    <span className="group/row grid min-w-0 flex-1 text-left">
      <span className={labelClass} title={label}>
        {label}
      </span>
      {description === undefined ? null : onEdit ? (
        <button
          className={classes(
            "truncate rounded-(--radius-shell-sm) text-left font-mono text-[10px] leading-4 text-muted",
            "group-hover/row:text-fg",
            FOCUS_OUTLINE,
          )}
          onClick={onEdit}
          title={`${description} — click to edit`}
          type="button"
        >
          {description}
        </button>
      ) : (
        <span className="truncate font-mono text-[10px] leading-4 text-muted" title={description}>
          {description}
        </span>
      )}
    </span>
  );
}

export function RangeControl({
  format,
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  /** Renders the value when the bare number does not carry its unit — "2px", "60%". */
  format?: (value: number) => string;
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  return (
    /*
     * The row is the slider: a drag anywhere across it moves the value, and the fill runs the row's
     * full height behind the label. A hairline version of this read as tidier in isolation and
     * worse in place — at three pixels the row stopped showing how full it was, which is the one
     * thing a density value needs to communicate at a glance.
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
       * Padded by half the handle's width so it stays wholly inside the row at both extremes, with
       * the track widened back over that padding so the fill still runs edge to edge.
       */}
      <Slider.Control className="absolute inset-0 items-center px-[3px]">
        <Slider.Track className="-mx-[3px] h-full w-[calc(100%+6px)]">
          <Slider.Indicator className="h-full bg-fg/8 transition-[width] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none" />
          <Slider.Ticks max={max} min={min} step={step} />
        </Slider.Track>
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
      <Slider.Label className={classes(ROW_LABEL, "pointer-events-none z-1 min-w-0 flex-1")}>
        {label}
      </Slider.Label>
      <output className={classes(ROW_VALUE, "pointer-events-none z-1")}>
        {format ? format(value) : value.toFixed(step < 1 ? 2 : 0)}
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

function normalizeHex(value: string): string {
  return /^#[\da-f]{6}$/iu.test(value) ? value : "#1b1b1b";
}
