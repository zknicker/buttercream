import type { ReactNode } from "react";
import { useState } from "react";
import {
  Badge,
  ColorPickerPopover,
  ColorTile,
  classes,
  SectionHeading,
  Select,
  Slider,
} from "../ui/index.ts";
import { controlName, FOCUS_OUTLINE, ROW, ROW_FLEX, ROW_LABEL, ROW_VALUE } from "./control-row.ts";

export function ControlSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="mt-6 flex flex-col gap-1.5">
      <SectionHeading className="mb-2" title={title} />
      {children}
    </section>
  );
}

export function ControlRow({ children }: { children: ReactNode }) {
  return <div className={ROW}>{children}</div>;
}

export function TextControl({
  id,
  label,
  maxLength,
  onChange,
  value,
}: {
  /** Set when something outside the panel needs to move focus here — see the editor File menu. */
  id?: string;
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
        id={id}
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

  const commit = (next: string) => {
    const trimmed = next.trim();
    if (trimmed && trimmed !== value) {
      onChange?.(trimmed);
    }
    setDraft(null);
  };

  /*
   * The row's contents, described once and handed to whichever element ends up wrapping them.
   *
   * They used to be written twice — once as the picker's trigger, once as a plain div — and the two
   * drifted every time either was touched: a different swatch, a different height, a different
   * corner radius, each found only by measuring. One description cannot disagree with itself.
   */
  const contents = (
    <RowContents
      description={description}
      draft={draft}
      label={label}
      onCommit={commit}
      onDraftChange={setDraft}
      readOnly={onChange === undefined}
      swatchColor={swatchColor ?? value}
      value={value}
      {...(onChange ? { onEdit: () => setDraft(value) } : {})}
    />
  );

  /*
   * Three kinds of value wear three different controls, because they are three different things.
   *
   * A literal opens the picker. An expression — `oklch(from var(--accent) …)`, `var(--foreground)`
   * — gets a text field instead: the picker cannot represent one, and offering it would mean
   * silently replacing a generated value with a literal and detaching that role from the neutral
   * ladder. A value with no setter is neither, and renders as text.
   *
   * Seventeen of the twenty-five authored colour tokens are expressions, so the text path is the
   * common case rather than the exception. What differs between them is the element around the row
   * and what it does when clicked — never the row itself.
   */
  if (onChange && isPickableColor(value)) {
    return (
      <ColorPickerPopover
        defaultFormat="hex"
        onValueChange={onChange}
        renderTrigger={contents}
        triggerClassName={classes(ROW_FLEX, "hover:bg-fg/5")}
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
    <div className={classes(ROW_FLEX, "relative overflow-hidden", onChange ? "" : "ring-fg/6")}>
      {onChange === undefined && description !== undefined ? <DerivedTag /> : null}
      {contents}
    </div>
  );
}

/*
 * Everything inside a colour row: the swatch, the name, and either the value or the field editing
 * it. The order flips with the shape — a two-line row leads with the swatch so an editable token
 * and a derived one line up, while a one-line row keeps its label left and its value right, where
 * every other row in the rail puts them.
 */
function RowContents({
  description,
  draft,
  label,
  onCommit,
  onDraftChange,
  onEdit,
  readOnly,
  swatchColor,
  value,
}: {
  description: string | undefined;
  draft: string | null;
  label: string;
  onCommit: (value: string) => void;
  onDraftChange: (draft: string | null) => void;
  onEdit?: () => void;
  readOnly: boolean;
  swatchColor: string;
  value: string;
}) {
  /*
   * The picker's own tile, not a lookalike. The non-picker paths used to draw their own circle
   * while the picker drew a rounded square, so a row's swatch changed shape according to whether
   * its value happened to be editable — and the two tabs disagreed for the same reason.
   */
  const swatch = <ColorTile color={swatchColor} size={20} />;

  if (draft !== null) {
    return (
      <>
        {swatch}
        <input
          aria-label={`${label} value`}
          // biome-ignore lint/a11y/noAutofocus: the input replaces the text the user just clicked; focus has to follow it.
          autoFocus
          className={classes(
            "min-w-0 flex-1 rounded-(--radius-shell-sm) bg-sunken px-2 py-1 font-mono text-[11px] text-fg outline-0",
            FOCUS_OUTLINE,
          )}
          onBlur={(event) => onCommit(event.currentTarget.value)}
          onChange={(event) => onDraftChange(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onCommit(event.currentTarget.value);
            }
            if (event.key === "Escape") {
              onDraftChange(null);
            }
          }}
          value={draft}
        />
      </>
    );
  }

  const text = (
    <RowText
      description={description}
      dim={readOnly}
      label={label}
      {...(onEdit ? { onEdit } : {})}
    />
  );

  if (description !== undefined) {
    return (
      <>
        {swatch}
        {text}
      </>
    );
  }

  return (
    <>
      {text}
      {swatch}
      <span className={ROW_VALUE}>{normalizeHex(value).toUpperCase()}</span>
    </>
  );
}

/*
 * The tag on a derived row's corner.
 *
 * A square-cornered window holds a skewed badge: the window clips the lean's overhang, so the tag's
 * right edge is a vertical cut rather than a slant, and the row clips in turn so the tag cannot
 * sail past the card's rounded corner and hang over the edge.
 *
 * Thirty degrees, hinged on the top-left. Steeper than a true diagonal so the notch stays a nick in
 * the edge rather than a wedge out of the row. Hinged at the corner because about its centre the
 * skew throws the top corner outward past the window, which clips it flat — a vertical drop from
 * the card's edge before the diagonal even starts. The lean is positive so the tag narrows toward
 * its base; a cut widening as it fell would undercut the row rather than nick its top edge.
 */
function DerivedTag() {
  return (
    <span className="pointer-events-none absolute top-0 right-0 flex overflow-hidden">
      <Badge
        className="origin-top-left skew-x-[30deg] pr-2.5 pb-px pl-2 tracking-[0.09em]"
        size="sm"
        /*
         * Inline, because the kit's badge rounds all four corners in its base class and a class
         * here would only win or lose on stylesheet order. Only the corner where the slant meets
         * the underside is round; the rest are cuts.
         *
         * Two pixels, not five. A skew stretches a corner horizontally by the tangent of its angle,
         * so a radius spends more than its width along the edge — five left ten pixels of curve on
         * a twelve-pixel tag, which was the whole diagonal.
         */
        style={{ borderRadius: "0 0 0 0.125rem" }}
        variant="line"
      >
        {/* Back upright: the notch leans, the word in it does not. */}
        <span className="inline-block skew-x-[-30deg]">Derived</span>
      </Badge>
    </span>
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
