import type { DesignSystem } from "@buttercream/theme-core";
import { useCallback, useEffect, useRef, useState } from "react";
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

const AUTOSAVE_DELAY_MS = 700;

export type SaveDesignSystem = (
  designSystem: DesignSystem,
  version: number,
) => Promise<
  | { status: "conflict"; version: number }
  | { status: "not-found" }
  | { status: "saved"; version: number }
>;

export type SaveState = "clean" | "conflict" | "dirty" | "error" | "saving";

/**
 * One mutation of the draft document. Controls that emit a stream of changes — a slider drag, a
 * colour picker, a text field being typed into — name their gesture with `coalesceKey` so the
 * stream lands as one history entry. Discrete changes leave it off and land as one entry each.
 */
export type UpdateDesignSystem = (
  mutate: (designSystem: DesignSystem) => void,
  coalesceKey?: string,
) => void;

export function useDesignSystemDraft({
  initialDesignSystem,
  initialVersion,
  onSave,
}: {
  initialDesignSystem: DesignSystem;
  initialVersion?: number;
  onSave?: SaveDesignSystem;
}) {
  const [draft, setDraft] = useState(() => createDraft(initialDesignSystem));
  const [version, setVersion] = useState(initialVersion);
  const [revision, setRevision] = useState(0);
  const [savedRevision, setSavedRevision] = useState(0);
  const [saveState, setSaveState] = useState<SaveState>("clean");
  const [conflictVersion, setConflictVersion] = useState<number>();
  /* Edits read the draft they mutate, so several in one tick have to see each other. */
  const draftRef = useRef(draft);
  const revisionRef = useRef(revision);
  const savingRef = useRef(false);
  const designSystem = draft.designSystem;

  const markChanged = useCallback(() => {
    revisionRef.current += 1;
    setRevision(revisionRef.current);
    if (onSave) {
      setSaveState("dirty");
    }
  }, [onSave]);

  /* Undo and redo are edits like any other: an undone document is unsaved until it is saved. */
  const applyDraft = useCallback(
    (next: DesignSystemDraft) => {
      if (next === draftRef.current) {
        return;
      }
      draftRef.current = next;
      setDraft(next);
      markChanged();
    },
    [markChanged],
  );

  const updateDesignSystem = useCallback<UpdateDesignSystem>(
    (mutate, coalesceKey) => {
      applyDraft(editDraft(draftRef.current, mutate, coalesceKey));
    },
    [applyDraft],
  );

  const replaceDesignSystem = useCallback(
    (next: DesignSystem) => {
      applyDraft(replaceDraft(draftRef.current, next));
    },
    [applyDraft],
  );

  const undo = useCallback(() => {
    applyDraft(undoDraft(draftRef.current));
  }, [applyDraft]);

  const redo = useCallback(() => {
    applyDraft(redoDraft(draftRef.current));
  }, [applyDraft]);

  const persist = useCallback(
    async (snapshot: DesignSystem, expectedVersion: number, snapshotRevision: number) => {
      if (!(onSave && !savingRef.current)) {
        return;
      }

      savingRef.current = true;
      setSaveState("saving");
      try {
        const result = await onSave(snapshot, expectedVersion);
        if (result.status === "saved") {
          setVersion(result.version);
          setSavedRevision(snapshotRevision);
          setConflictVersion(undefined);
          setSaveState(revisionRef.current === snapshotRevision ? "clean" : "dirty");
          return;
        }
        if (result.status === "conflict") {
          setConflictVersion(result.version);
          setSaveState("conflict");
          return;
        }
        setSaveState("error");
      } catch {
        setSaveState("error");
      } finally {
        savingRef.current = false;
      }
    },
    [onSave],
  );

  useEffect(() => {
    if (!(version && saveState === "dirty" && revision !== savedRevision && !savingRef.current)) {
      return;
    }

    const timeout = window.setTimeout(() => {
      void persist(designSystem, version, revision);
    }, AUTOSAVE_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [designSystem, persist, revision, saveState, savedRevision, version]);

  const overwriteConflict = useCallback(async () => {
    if (conflictVersion === undefined) {
      return;
    }
    await persist(draftRef.current.designSystem, conflictVersion, revisionRef.current);
  }, [conflictVersion, persist]);

  return {
    canRedo: canRedo(draft),
    canUndo: canUndo(draft),
    conflictVersion,
    designSystem,
    overwriteConflict,
    redo,
    replaceDesignSystem,
    saveState,
    undo,
    updateDesignSystem,
  };
}
