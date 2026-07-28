import { HugeiconsIcon } from "@hugeicons/react";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import type { ReactElement, ReactNode } from "react";
import { useRef, useState } from "react";
import { ColorPickerPopover, classes, DitherBand, Select, Slider } from "../ui/index.ts";
import { controlName, FOCUS_OUTLINE, ROW, ROW_FLEX, ROW_LABEL, ROW_VALUE } from "./control-row.ts";
import { ColorControl, RangeControl, SelectControl, ToggleControl } from "./theme-controls.tsx";
import { describeTokenValue, formatTokenDisplay } from "./variables-tokens.ts";

/*
 * Rows particular to the Variables tab. The controls themselves come from theme-controls.tsx —
 * the same picker, select and slider the Style tab uses — and what lives here is only the shapes
 * this tab needs on top of them: a token row that carries its formula on a second line, and a
 * level picker for the shadow scales.
 *
 * These were parallel implementations until they weren\'t. Keeping them separate is what let one
 * tab keep a butter fill and a native colour input after the other had moved on.
 */

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
    /* The Style tab's section head, so the two tabs stop disagreeing about what a section is. */
    <section className="mt-6 flex flex-col gap-1.5">
      <div className="mb-2 flex items-center gap-3">
        <h2 className="shrink-0 font-mono text-[13px] tracking-tight text-muted">{title}</h2>
        <DitherBand
          aria-hidden
          className="min-w-0 flex-1 text-fg/25 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          density={0.5}
          height={6}
          pixel={3}
        />
        {count === undefined ? null : (
          <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted">{count}</span>
        )}
      </div>
      {children}
    </section>
  );
}

export function ColorTokenRow({
  name,
  onCommit,
  value,
}: {
  name: string;
  onCommit?: (value: string) => void;
  value: string;
}): ReactElement {
  /*
   * The Style tab's colour row, in its two-line form. This used to be a parallel implementation
   * with its own swatch, its own edit affordance and its own idea of a row, which is how the two
   * tabs ended up offering different tools for the same token.
   *
   * The swatch paints `var(--token)` rather than the raw value: a derived token's value is a
   * formula, and a formula is not a colour. The panel scopes those variables to the edited theme,
   * so the resolved colour is the one the user is actually looking at.
   */
  return (
    <ColorControl
      description={formatTokenDisplay(describeTokenValue(value))}
      label={name}
      swatchColor={`var(--${name})`}
      value={value}
      {...(onCommit ? { onChange: onCommit } : {})}
    />
  );
}

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

export function ToggleRow(props: Parameters<typeof ToggleControl>[0]): ReactElement {
  return <ToggleControl {...props} />;
}

export function SelectRow<Value extends string>(
  props: Parameters<typeof SelectControl<Value>>[0],
): ReactElement {
  return <SelectControl {...props} />;
}

export function RangeRow(props: Parameters<typeof RangeControl>[0]): ReactElement {
  return <RangeControl {...props} />;
}
