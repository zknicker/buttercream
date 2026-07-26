import { AlertDialog } from "@base-ui/react/alert-dialog";

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
        <AlertDialog.Backdrop className="studio-dialog__backdrop" />
        <AlertDialog.Viewport className="studio-dialog__viewport">
          <AlertDialog.Popup className="studio-dialog studio-dialog--conflict">
            <header className="studio-dialog__header">
              <div>
                <AlertDialog.Title>This design system changed elsewhere</AlertDialog.Title>
                <AlertDialog.Description>
                  Reload the saved version, or overwrite it with the changes in this window.
                </AlertDialog.Description>
              </div>
            </header>
            {overwriteFailed ? (
              <p className="studio-dialog__error" role="alert">
                The saved version changed again or could not be reached. Try overwriting again, or
                reload the latest version.
              </p>
            ) : null}
            <footer className="studio-dialog__actions">
              <button
                className="studio-button studio-button--quiet"
                disabled={overwriting}
                onClick={() => window.location.reload()}
                type="button"
              >
                Reload latest
              </button>
              <button
                className="studio-button"
                disabled={overwriting}
                onClick={() => void onOverwrite()}
                type="button"
              >
                {overwriting ? "Overwriting…" : "Overwrite saved version"}
              </button>
            </footer>
          </AlertDialog.Popup>
        </AlertDialog.Viewport>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
