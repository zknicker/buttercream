import { Dialog } from "@base-ui/react/dialog";
import {
  createDesignSystemExports,
  type DesignSystem,
  type ProjectExport,
} from "@buttercream/theme-core";
import { HugeiconsIcon } from "@hugeicons/react";
import Cancel01Icon from "@hugeicons-pro/core-stroke-rounded/Cancel01Icon";
import SourceCodeIcon from "@hugeicons-pro/core-stroke-rounded/SourceCodeIcon";
import { useMemo, useState } from "react";

export function CodeDialog({
  designSystem,
  designSystemId,
}: {
  designSystem: DesignSystem;
  designSystemId: string;
}) {
  const [activeFilename, setActiveFilename] = useState<ProjectExport["filename"]>("global.css");
  const [copyState, setCopyState] = useState<"copied" | "error" | "idle">("idle");
  const exports = useMemo(
    () =>
      createDesignSystemExports(
        designSystem,
        `https://buttercream.studio/ds/${encodeURIComponent(designSystemId)}`,
      ),
    [designSystem, designSystemId],
  );
  const activeExport = exports.find((item) => item.filename === activeFilename) ?? exports[0];

  if (!activeExport) {
    return null;
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(activeExport.content);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  return (
    <Dialog.Root onOpenChange={() => setCopyState("idle")}>
      <Dialog.Trigger className="studio-button studio-button--with-icon">
        <HugeiconsIcon aria-hidden="true" icon={SourceCodeIcon} size={16} strokeWidth={2} />
        Code
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="studio-dialog__backdrop" />
        <Dialog.Viewport className="studio-dialog__viewport">
          <Dialog.Popup className="studio-dialog studio-dialog--code">
            <header className="studio-dialog__header">
              <div>
                <Dialog.Title>Project code</Dialog.Title>
                <Dialog.Description>
                  Copy generated files or the complete design-system document.
                </Dialog.Description>
              </div>
              <Dialog.Close aria-label="Close code" className="studio-dialog__close">
                <HugeiconsIcon aria-hidden="true" icon={Cancel01Icon} size={16} strokeWidth={2} />
              </Dialog.Close>
            </header>
            <div aria-label="Exported files" className="studio-code-tabs" role="tablist">
              {exports.map((item) => (
                <button
                  aria-selected={item.filename === activeExport.filename}
                  key={item.filename}
                  onClick={() => {
                    setActiveFilename(item.filename);
                    setCopyState("idle");
                  }}
                  role="tab"
                  type="button"
                >
                  {item.filename}
                </button>
              ))}
            </div>
            <pre className="studio-code">
              <code>{activeExport.content}</code>
            </pre>
            <footer className="studio-dialog__actions">
              <span aria-live="polite" className="studio-dialog__copy-state">
                {copyState === "copied" ? "Copied" : null}
                {copyState === "error" ? "Copy failed" : null}
              </span>
              <Dialog.Close className="studio-button studio-button--quiet">Close</Dialog.Close>
              <button className="studio-button" onClick={() => void copy()} type="button">
                Copy {activeExport.filename}
              </button>
            </footer>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
