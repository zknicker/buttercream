import type { DesignSystem } from "@buttercream/theme-core";
import { useCallback, useEffect, useRef, useState } from "react";

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

export function useDesignSystemDraft({
  initialDesignSystem,
  initialVersion,
  onSave,
}: {
  initialDesignSystem: DesignSystem;
  initialVersion?: number;
  onSave?: SaveDesignSystem;
}) {
  const [designSystem, setDesignSystem] = useState(initialDesignSystem);
  const [version, setVersion] = useState(initialVersion);
  const [revision, setRevision] = useState(0);
  const [savedRevision, setSavedRevision] = useState(0);
  const [saveState, setSaveState] = useState<SaveState>("clean");
  const [conflictVersion, setConflictVersion] = useState<number>();
  const revisionRef = useRef(revision);
  const savingRef = useRef(false);

  const markChanged = useCallback(() => {
    revisionRef.current += 1;
    setRevision(revisionRef.current);
    if (onSave) {
      setSaveState("dirty");
    }
  }, [onSave]);

  const updateDesignSystem = useCallback(
    (mutate: (next: DesignSystem) => void) => {
      setDesignSystem((current) => {
        const next = structuredClone(current);
        mutate(next);
        return next;
      });
      markChanged();
    },
    [markChanged],
  );

  const replaceDesignSystem = useCallback(
    (next: DesignSystem) => {
      setDesignSystem(next);
      markChanged();
    },
    [markChanged],
  );

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
    await persist(designSystem, conflictVersion, revisionRef.current);
  }, [conflictVersion, designSystem, persist]);

  return {
    conflictVersion,
    designSystem,
    overwriteConflict,
    replaceDesignSystem,
    saveState,
    updateDesignSystem,
  };
}
