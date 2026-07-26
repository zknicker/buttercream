import { Dialog } from "@base-ui/react/dialog";
import { type DesignSystem, importDesignSystemSource } from "@buttercream/theme-core";
import { HugeiconsIcon } from "@hugeicons/react";
import Cancel01Icon from "@hugeicons-pro/core-stroke-rounded/Cancel01Icon";
import { useState } from "react";

export function ImportDialog({
  current,
  onImport,
}: {
  current: DesignSystem;
  onImport: (designSystem: DesignSystem) => void;
}) {
  const [error, setError] = useState<string>();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("");

  const importSource = () => {
    try {
      onImport(importDesignSystemSource(source, current));
      setError(undefined);
      setSource("");
      setOpen(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not import this design system.");
    }
  };

  return (
    <Dialog.Root
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
          setError(undefined);
        }
      }}
      open={open}
    >
      <Dialog.Trigger className="studio-button studio-button--quiet">Import</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="studio-dialog__backdrop" />
        <Dialog.Viewport className="studio-dialog__viewport">
          <Dialog.Popup className="studio-dialog">
            <header className="studio-dialog__header">
              <div>
                <Dialog.Title>Import design system</Dialog.Title>
                <Dialog.Description>
                  Paste Buttercream JSON or global CSS to replace the current editor state.
                </Dialog.Description>
              </div>
              <Dialog.Close aria-label="Close import" className="studio-dialog__close">
                <HugeiconsIcon aria-hidden="true" icon={Cancel01Icon} size={16} strokeWidth={2} />
              </Dialog.Close>
            </header>
            <label className="studio-dialog__field">
              <span>Design-system JSON or global CSS</span>
              <textarea
                aria-label="Design-system JSON or global CSS"
                onChange={(event) => setSource(event.currentTarget.value)}
                placeholder={'{\n  "schemaVersion": 2,\n  …\n}'}
                spellCheck="false"
                value={source}
              />
            </label>
            <p className="studio-dialog__hint">
              JSON replaces the complete document. CSS replaces recognized theme variables and
              resets omitted variables to defaults.
            </p>
            {error ? (
              <p className="studio-dialog__error" role="alert">
                {error}
              </p>
            ) : null}
            <footer className="studio-dialog__actions">
              <Dialog.Close className="studio-button studio-button--quiet">Cancel</Dialog.Close>
              <button
                className="studio-button"
                disabled={!source.trim()}
                onClick={importSource}
                type="button"
              >
                Import
              </button>
            </footer>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
