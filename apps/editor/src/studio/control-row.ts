/*
 * The rail's row vocabulary, in one place.
 *
 * Both tabs used to declare these separately and they drifted: the Style tab went neutral while
 * Variables kept a butter fill, and each grew its own idea of what a row's value looks like. A row
 * is a row on either tab, so the classes that say so live once.
 */

/** Two columns: a label that takes the slack, and whatever states or edits it. */
export const ROW =
  "relative grid min-h-9 grid-cols-[1fr_auto] items-center gap-2 rounded-(--radius-shell) bg-canvas px-3 text-[13px] ring-1 ring-fg/10";

/**
 * The flex twin, for controls whose trigger IS the row rather than something sitting inside it.
 * ROW cannot hold a label, a value and a chevron without wrapping the third onto its own line.
 */
export const ROW_FLEX =
  "flex min-h-9 w-full items-center gap-2 rounded-(--radius-shell) bg-canvas px-3 text-[13px] ring-1 ring-fg/10";

/** Row labels carry the medium weight; at 400 they read unfinished against the values. */
export const ROW_LABEL = "truncate font-medium text-fg";

/*
 * Every row's right-hand side reads the same: mono, small, muted, and never wrapping. The rows
 * differ in what they do, and they should not also differ in how their value looks.
 */
export const ROW_VALUE = "shrink-0 font-mono text-[11px] tabular-nums text-shell-muted";

export const FOCUS_OUTLINE =
  "focus-visible:outline-[1.5px] focus-visible:-outline-offset-1 focus-visible:outline-fg";

/** Turns a row's label into the name its form control is submitted under. */
export function controlName(label: string): string {
  return label.toLowerCase().replaceAll(" ", "-");
}
