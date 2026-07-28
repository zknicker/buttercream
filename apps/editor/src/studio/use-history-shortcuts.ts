import { useEffect } from "react";

/* Every input the browser undoes on its own. A range or a checkbox is not one of them. */
const TEXT_ENTRY_TYPES = new Set(["email", "number", "password", "search", "tel", "text", "url"]);

/**
 * Cmd/Ctrl+Z, Shift+Cmd/Ctrl+Z, and Ctrl+Y — except while a text field has focus, where the
 * browser's own text undo owns the shortcut and reverting the document instead of the word would
 * be the wrong answer.
 */
export function useHistoryShortcuts({ redo, undo }: { redo: () => void; undo: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.altKey || isTextEntryTarget(event.target)) {
        return;
      }

      const key = event.key.toLowerCase();
      /* Cmd+Y is the browser's own on macOS, so redo's second binding stays on Ctrl. */
      const redoing = (key === "y" && !event.metaKey) || (key === "z" && event.shiftKey);
      if (key !== "z" && !redoing) {
        return;
      }

      event.preventDefault();
      if (redoing) {
        redo();
        return;
      }
      undo();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [redo, undo]);
}

function isTextEntryTarget(target: EventTarget | null): boolean {
  if (target instanceof HTMLTextAreaElement) {
    return true;
  }
  if (target instanceof HTMLInputElement) {
    return TEXT_ENTRY_TYPES.has(target.type);
  }
  return target instanceof HTMLElement && target.isContentEditable;
}
