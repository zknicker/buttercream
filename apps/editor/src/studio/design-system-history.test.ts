import { afterEach, describe, expect, setSystemTime, test } from "bun:test";
import { createDefaultDesignSystem } from "@buttercream/theme-core";
import {
  canRedo,
  canUndo,
  createDraft,
  type DesignSystemDraft,
  editDraft,
  redoDraft,
  replaceDraft,
  undoDraft,
} from "./design-system-history.ts";

/* The coalescing window is measured against the clock, so the clock is what the tests drive. */
const START = new Date("2026-01-01T00:00:00Z").getTime();

function at(offsetMs: number) {
  setSystemTime(new Date(START + offsetMs));
}

function draftWithAccent(accent: string): DesignSystemDraft {
  const designSystem = createDefaultDesignSystem();
  designSystem.theme.light.colors.accent = accent;
  return createDraft(designSystem);
}

function setAccent(draft: DesignSystemDraft, accent: string, coalesceKey?: string) {
  return editDraft(
    draft,
    (next) => {
      next.theme.light.colors.accent = accent;
    },
    coalesceKey,
  );
}

afterEach(() => {
  setSystemTime();
});

describe("design system history", () => {
  test("records an entry per discrete edit and walks back through them", () => {
    at(0);
    let draft = draftWithAccent("#000000");
    draft = setAccent(draft, "#111111");
    at(5_000);
    draft = setAccent(draft, "#222222");

    expect(canUndo(draft)).toBe(true);
    expect(canRedo(draft)).toBe(false);
    expect(draft.past).toHaveLength(2);

    draft = undoDraft(draft);
    expect(draft.designSystem.theme.light.colors.accent).toBe("#111111");
    draft = undoDraft(draft);
    expect(draft.designSystem.theme.light.colors.accent).toBe("#000000");
    expect(canUndo(draft)).toBe(false);
  });

  test("leaves the draft untouched at either end of the stack", () => {
    at(0);
    const draft = draftWithAccent("#000000");

    /* Identity, not equality: the hook takes an unchanged draft as "nothing happened". */
    expect(undoDraft(draft)).toBe(draft);
    expect(redoDraft(draft)).toBe(draft);
  });

  test("redo replays an undone edit", () => {
    at(0);
    let draft = setAccent(draftWithAccent("#000000"), "#111111");

    draft = undoDraft(draft);
    expect(canRedo(draft)).toBe(true);

    draft = redoDraft(draft);
    expect(draft.designSystem.theme.light.colors.accent).toBe("#111111");
    expect(canRedo(draft)).toBe(false);
  });

  test("a new edit drops the redo branch", () => {
    at(0);
    let draft = setAccent(draftWithAccent("#000000"), "#111111");

    draft = undoDraft(draft);
    at(5_000);
    draft = setAccent(draft, "#333333");

    expect(canRedo(draft)).toBe(false);
    draft = undoDraft(draft);
    expect(draft.designSystem.theme.light.colors.accent).toBe("#000000");
  });

  test("a gesture's stream of changes is one entry", () => {
    at(0);
    let draft = draftWithAccent("#000000");

    /* A drag: many changes, no commit event, each inside the window of the last. */
    for (const [index, accent] of ["#111111", "#222222", "#333333"].entries()) {
      at(index * 50);
      draft = setAccent(draft, accent, "colors.accent");
    }

    expect(draft.past).toHaveLength(1);
    draft = undoDraft(draft);
    expect(draft.designSystem.theme.light.colors.accent).toBe("#000000");
  });

  test("a pause ends the gesture", () => {
    at(0);
    let draft = setAccent(draftWithAccent("#000000"), "#111111", "colors.accent");
    at(5_000);
    draft = setAccent(draft, "#222222", "colors.accent");

    expect(draft.past).toHaveLength(2);
    draft = undoDraft(draft);
    expect(draft.designSystem.theme.light.colors.accent).toBe("#111111");
  });

  test("a different control ends the gesture, even mid-window", () => {
    at(0);
    let draft = setAccent(draftWithAccent("#000000"), "#111111", "colors.accent");
    at(50);
    draft = editDraft(
      draft,
      (next) => {
        next.theme.light.density.spacing = 1.2;
      },
      "density.spacing",
    );

    expect(draft.past).toHaveLength(2);
    draft = undoDraft(draft);
    expect(draft.designSystem.theme.light.density.spacing).not.toBe(1.2);
    expect(draft.designSystem.theme.light.colors.accent).toBe("#111111");
  });

  test("undo closes the open gesture", () => {
    at(0);
    let draft = setAccent(draftWithAccent("#000000"), "#111111", "colors.accent");

    draft = undoDraft(draft);
    at(50);
    draft = setAccent(draft, "#222222", "colors.accent");

    /* The edit after the undo is its own entry rather than an extension of the undone one. */
    expect(draft.past).toHaveLength(1);
    draft = undoDraft(draft);
    expect(draft.designSystem.theme.light.colors.accent).toBe("#000000");
  });

  test("an import is one entry, however much of the document it replaces", () => {
    at(0);
    let draft = draftWithAccent("#000000");
    const imported = createDefaultDesignSystem("Imported");
    imported.theme.light.colors.accent = "#ff0000";
    imported.theme.dark.colors.accent = "#ff0000";
    imported.rules.customCss = ".card { color: red; }";

    at(50);
    draft = replaceDraft(draft, imported);
    expect(draft.past).toHaveLength(1);

    draft = undoDraft(draft);
    expect(draft.designSystem.identity.name).toBe(createDefaultDesignSystem().identity.name);
    expect(draft.designSystem.theme.light.colors.accent).toBe("#000000");
    expect(draft.designSystem.rules.customCss).toBe("");
  });

  test("an edit never mutates the state it replaced", () => {
    at(0);
    const original = draftWithAccent("#000000");
    const edited = setAccent(original, "#111111");

    expect(original.designSystem.theme.light.colors.accent).toBe("#000000");
    expect(edited.designSystem).not.toBe(original.designSystem);
  });

  test("the stack is bounded and drops from the oldest end", () => {
    at(0);
    let draft = draftWithAccent("#000000");
    for (let index = 1; index <= 130; index += 1) {
      at(index * 5_000);
      draft = setAccent(draft, `#0000${index.toString().padStart(2, "0")}`);
    }

    expect(draft.past).toHaveLength(100);
    for (let index = 0; index < 100; index += 1) {
      draft = undoDraft(draft);
    }
    /* Bottomed out at the oldest surviving state, not at the document the session opened with. */
    expect(canUndo(draft)).toBe(false);
    expect(draft.designSystem.theme.light.colors.accent).toBe("#000030");
  });
});
