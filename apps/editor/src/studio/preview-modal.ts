export function renderModalPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      ${modalTrigger("Open modal")}
      <div class="specimen__label">Welcome</div>
    </section>
    <section class="specimen">
      ${modalTrigger("Auto", { placement: "auto" })}
      ${modalTrigger("Top", { placement: "top" })}
      ${modalTrigger("Center", { placement: "center" })}
      ${modalTrigger("Bottom", { placement: "bottom" })}
      <div class="specimen__label">Placements</div>
    </section>
    <section class="specimen">
      ${modalTrigger("Opaque", { backdrop: "opaque" })}
      ${modalTrigger("Blur", { backdrop: "blur" })}
      ${modalTrigger("Transparent", {
        backdrop: "transparent",
      })}
      <div class="specimen__label">Backdrop variants</div>
    </section>
  </div>`;
}

type ModalBackdrop = "opaque" | "blur" | "transparent";
type ModalPlacement = "auto" | "top" | "center" | "bottom";

function modalTrigger(
  label: string,
  {
    backdrop = "opaque",
    placement = "auto",
  }: {
    backdrop?: ModalBackdrop;
    placement?: ModalPlacement;
  } = {},
): string {
  const overlayId = `preview-modal-${label.toLowerCase().replaceAll(" ", "-")}`;

  return `<div class="preview-modal">
    <button class="button button--tertiary modal__trigger" popovertarget="${overlayId}" type="button">${label}</button>
    <div class="modal__backdrop preview-modal__overlay" data-variant="${backdrop}" id="${overlayId}" popover="auto">
      <div class="modal__container" data-placement="${placement}">
        <div aria-label="Buttercream" class="modal__dialog" role="dialog">
          <button aria-label="Close" class="modal__close-trigger" popovertarget="${overlayId}" popovertargetaction="hide" type="button"><span aria-hidden="true" class="modal__close-icon"></span></button>
          <header class="modal__header">
            <div aria-hidden="true" class="modal__icon">✦</div>
            <h2 class="modal__heading">Buttercream</h2>
          </header>
          <div class="modal__body">
            <p class="modal__description">Build accessible interfaces with composable Buttercream components.</p>
          </div>
          <footer class="modal__footer">
            <button class="button button--primary" popovertarget="${overlayId}" popovertargetaction="hide" type="button">Continue</button>
          </footer>
        </div>
      </div>
    </div>
  </div>`;
}
