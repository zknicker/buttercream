import { AlertDialog } from "@base-ui/react/alert-dialog";
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

export function SaveConflictDialog({
  open,
  overwriting,
  overwriteFailed,
  onOverwrite,
}: {
  open: boolean;
  overwriting: boolean;
  overwriteFailed: boolean;
  onOverwrite: () => Promise<void>;
}) {
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className={dialogBackdropClass} />
        <AlertDialog.Viewport className={dialogViewportClass}>
          <AlertDialog.Popup
            className={classes(dialogPanelClass, "w-[min(30rem,calc(100vw-3rem))]")}
          >
            <DialogHeader>
              <AlertDialog.Title className={dialogTitleClass}>
                This design system changed elsewhere
              </AlertDialog.Title>
              <AlertDialog.Description className={dialogDescriptionClass}>
                Reload the saved version, or overwrite it with the changes in this window.
              </AlertDialog.Description>
            </DialogHeader>

            {overwriteFailed ? (
              <p className="text-base text-berry sm:text-sm" role="alert">
                The saved version changed again or could not be reached. Try overwriting again, or
                reload the latest version.
              </p>
            ) : null}

            <DialogFooter>
              <Button
                disabled={overwriting}
                onClick={() => window.location.reload()}
                variant="ghost"
              >
                Reload latest
              </Button>
              <Button
                disabled={overwriting}
                loading={overwriting}
                onClick={() => void onOverwrite()}
              >
                Overwrite saved version
              </Button>
            </DialogFooter>
          </AlertDialog.Popup>
        </AlertDialog.Viewport>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
