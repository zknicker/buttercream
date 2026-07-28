import type { DesignSystem } from "@buttercream/theme-core";

/*
 * The draft document and its undo history, as one value with no React in it. History is browser
 * memory only (CONTEXT.md invariant 7) — nothing here is persisted, and a reload starts empty.
 *
 * Every entry is a whole document rather than a patch. The document is a few kilobytes and every
 * mutation already clones it, so a past state is a reference to a value nobody will mutate again.
 */

/** Oldest entries fall off the end. Deep enough to cover a session's worth of edits. */
const HISTORY_LIMIT = 100;

/**
 * How long a gesture stays open. Sliders, colour pickers and text fields emit a stream of changes
 * with no commit event, so a gesture ends at a pause rather than at a mouse-up.
 */
const COALESCE_WINDOW_MS = 600;

export interface DesignSystemDraft {
  designSystem: DesignSystem;
  /** States to return to, oldest first. */
  past: readonly DesignSystem[];
  /** States undone away, nearest first. */
  future: readonly DesignSystem[];
  /** The open gesture. Further edits naming the same key inside the window extend its entry. */
  gesture?: { at: number; key: string };
}

export function createDraft(designSystem: DesignSystem): DesignSystemDraft {
  return { designSystem, future: [], past: [] };
}

export function canUndo(draft: DesignSystemDraft): boolean {
  return draft.past.length > 0;
}

export function canRedo(draft: DesignSystemDraft): boolean {
  return draft.future.length > 0;
}

/**
 * Applies one mutation. A `coalesceKey` marks the change as part of a continuous gesture — a drag,
 * a burst of typing — and names which one, so two controls dragged in turn stay two entries.
 */
export function editDraft(
  draft: DesignSystemDraft,
  mutate: (designSystem: DesignSystem) => void,
  coalesceKey?: string,
): DesignSystemDraft {
  const next = structuredClone(draft.designSystem);
  mutate(next);
  return recordEdit(draft, next, coalesceKey);
}

/** Replaces the whole document — import, and anything else that arrives already built. */
export function replaceDraft(
  draft: DesignSystemDraft,
  designSystem: DesignSystem,
): DesignSystemDraft {
  return recordEdit(draft, designSystem);
}

/** Returns the draft unchanged when there is nothing to undo, so callers can compare by identity. */
export function undoDraft(draft: DesignSystemDraft): DesignSystemDraft {
  const previous = draft.past.at(-1);
  if (previous === undefined) {
    return draft;
  }

  return {
    designSystem: previous,
    future: [draft.designSystem, ...draft.future],
    past: draft.past.slice(0, -1),
  };
}

/** Returns the draft unchanged when there is nothing to redo, so callers can compare by identity. */
export function redoDraft(draft: DesignSystemDraft): DesignSystemDraft {
  const [next, ...rest] = draft.future;
  if (next === undefined) {
    return draft;
  }

  return {
    designSystem: next,
    future: rest,
    past: [...draft.past, draft.designSystem],
  };
}

function recordEdit(
  draft: DesignSystemDraft,
  designSystem: DesignSystem,
  coalesceKey?: string,
): DesignSystemDraft {
  const at = Date.now();

  if (
    coalesceKey !== undefined &&
    draft.gesture?.key === coalesceKey &&
    at - draft.gesture.at <= COALESCE_WINDOW_MS
  ) {
    /* Inside the gesture: the entry pushed when it opened still holds the state to return to. */
    return { ...draft, designSystem, gesture: { at, key: coalesceKey } };
  }

  return {
    designSystem,
    /* A new edit is a new branch; whatever was undone is no longer reachable. */
    future: [],
    past: [...draft.past, draft.designSystem].slice(-HISTORY_LIMIT),
    ...(coalesceKey === undefined ? {} : { gesture: { at, key: coalesceKey } }),
  };
}
