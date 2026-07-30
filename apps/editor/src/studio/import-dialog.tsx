import { Dialog } from "@base-ui/react/dialog";
import { type DesignSystem, importDesignSystemSource } from "@buttercream/theme-core";
import { HugeiconsIcon } from "@hugeicons/react";
import Cancel01Icon from "@hugeicons-pro/core-stroke-rounded/Cancel01Icon";
import { useState } from "react";
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
  Textarea,
} from "../ui/index.ts";

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
      <Dialog.Trigger render={<Button size="sm" variant="ghost" />}>Import</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={dialogBackdropClass} />
        <Dialog.Viewport className={dialogViewportClass}>
          <Dialog.Popup className={classes(dialogPanelClass, "w-[min(39rem,calc(100vw-3rem))]")}>
            <DialogHeader
              close={
                <Dialog.Close
                  aria-label="Close import"
                  render={<Button iconOnly size="sm" variant="ghost" />}
                >
                  <HugeiconsIcon aria-hidden="true" icon={Cancel01Icon} size={16} strokeWidth={2} />
                </Dialog.Close>
              }
            >
              <Dialog.Title className={dialogTitleClass}>Import design system</Dialog.Title>
              <Dialog.Description className={dialogDescriptionClass}>
                Paste Buttercream JSON or global CSS to replace the current editor state.
              </Dialog.Description>
            </DialogHeader>

            <label className="flex flex-col gap-2" htmlFor="import-source">
              <span className="font-mono text-xs tracking-wide text-shell-muted uppercase">
                Design-system JSON or global CSS
              </span>
              <Textarea
                className="min-h-75"
                code
                id="import-source"
                name="source"
                onChange={(event) => setSource(event.currentTarget.value)}
                placeholder={'{\n  "schemaVersion": 2,\n  …\n}'}
                spellCheck="false"
                value={source}
              />
            </label>

            <p className="text-base text-pretty text-shell-muted sm:text-sm">
              JSON replaces the complete document. CSS replaces recognized theme variables and
              resets omitted variables to defaults.
            </p>

            {error ? (
              <p className="text-base text-berry sm:text-sm" role="alert">
                {error}
              </p>
            ) : null}

            <DialogFooter>
              <Dialog.Close render={<Button variant="ghost" />}>Cancel</Dialog.Close>
              <Button disabled={!source.trim()} onClick={importSource}>
                Import
              </Button>
            </DialogFooter>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
