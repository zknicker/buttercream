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
import {
  Button,
  classes,
  DialogFooter,
  DialogHeader,
  dialogBackdropClass,
  dialogDescriptionClass,
  dialogPanelClass,
  dialogTitleClass,
  dialogViewportClass,
} from "../ui/index.ts";

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
      <Dialog.Trigger render={<Button size="sm" />}>
        <HugeiconsIcon aria-hidden="true" icon={SourceCodeIcon} size={16} strokeWidth={2} />
        Code
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={dialogBackdropClass} />
        <Dialog.Viewport className={dialogViewportClass}>
          <Dialog.Popup className={classes(dialogPanelClass, "w-[min(58rem,calc(100vw-3rem))]")}>
            <DialogHeader
              close={
                <Dialog.Close
                  aria-label="Close code"
                  render={<Button iconOnly size="sm" variant="ghost" />}
                >
                  <HugeiconsIcon aria-hidden="true" icon={Cancel01Icon} size={16} strokeWidth={2} />
                </Dialog.Close>
              }
            >
              <Dialog.Title className={dialogTitleClass}>Project code</Dialog.Title>
              <Dialog.Description className={dialogDescriptionClass}>
                Copy generated files or the complete design-system document.
              </Dialog.Description>
            </DialogHeader>

            <div
              aria-label="Exported files"
              className="flex gap-0.5 overflow-x-auto rounded-(--radius-shell) bg-sunken p-0.5 scrollbar-none"
              role="tablist"
            >
              {exports.map((item) => (
                <button
                  aria-selected={item.filename === activeExport.filename}
                  className={classes(
                    "h-8 shrink-0 rounded-[calc(var(--radius-shell)-0.125rem)] px-3 font-mono text-xs whitespace-nowrap",
                    "focus-visible:-outline-offset-1 focus-visible:outline-[1.5px] focus-visible:outline-fg",
                    item.filename === activeExport.filename
                      ? "bg-raised text-fg shadow-sm dark:shadow-none ring-1 ring-fg/8"
                      : "text-shell-muted hover:text-fg",
                  )}
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

            <pre className="min-h-90 flex-1 overflow-auto rounded-(--radius-shell) bg-raised p-5 font-mono text-xs leading-6 text-fg ring-1 ring-fg/10">
              <code>{activeExport.content}</code>
            </pre>

            <DialogFooter>
              <span aria-live="polite" className="mr-auto font-mono text-xs text-shell-muted">
                {copyState === "copied" ? "Copied" : null}
                {copyState === "error" ? "Copy failed" : null}
              </span>
              <Dialog.Close render={<Button variant="ghost" />}>Close</Dialog.Close>
              <Button onClick={() => void copy()}>Copy {activeExport.filename}</Button>
            </DialogFooter>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
