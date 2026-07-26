export function renderDrawerPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      ${drawerTrigger("Open drawer", {
        placement: "right",
      })}
      <div class="specimen__label">Right edge</div>
    </section>
    <section class="specimen">
      ${drawerTrigger("Bottom", { placement: "bottom" })}
      ${drawerTrigger("Left", { placement: "left" })}
      ${drawerTrigger("Top", { placement: "top" })}
      ${drawerTrigger("Right", { placement: "right" })}
      <div class="specimen__label">Placements</div>
    </section>
    <section class="specimen">
      ${drawerTrigger("Opaque", { backdrop: "opaque" })}
      ${drawerTrigger("Blur", { backdrop: "blur" })}
      ${drawerTrigger("Transparent", {
        backdrop: "transparent",
      })}
      <div class="specimen__label">Backdrop variants</div>
    </section>
  </div>`;
}

type DrawerBackdrop = "opaque" | "blur" | "transparent";
type DrawerPlacement = "top" | "right" | "bottom" | "left";

function drawerTrigger(
  label: string,
  {
    backdrop = "opaque",
    placement = "bottom",
  }: {
    backdrop?: DrawerBackdrop;
    placement?: DrawerPlacement;
  } = {},
): string {
  const overlayId = `preview-drawer-${label.toLowerCase().replaceAll(" ", "-")}`;

  return `<div class="preview-drawer">
    <button class="button button--tertiary drawer__trigger" popovertarget="${overlayId}" type="button">${label}</button>
    <div class="drawer__backdrop preview-drawer__overlay" data-variant="${backdrop}" id="${overlayId}" popover="auto">
      <div class="drawer__content" data-placement="${placement}">
        <div aria-label="Notifications" class="drawer__dialog" role="dialog">
          ${placement === "bottom" ? '<div class="drawer__handle"></div>' : ""}
          <button aria-label="Close" class="drawer__close-trigger" popovertarget="${overlayId}" popovertargetaction="hide" type="button"><span aria-hidden="true" class="drawer__close-icon"></span></button>
          <header class="drawer__header">
            <h2 class="drawer__heading">Notifications</h2>
          </header>
          <div class="drawer__body">
            <p class="drawer__description">Review recent activity and mentions.</p>
          </div>
          <footer class="drawer__footer">
            <button class="button button--tertiary" popovertarget="${overlayId}" popovertargetaction="hide" type="button">Close</button>
            <button class="button button--primary" popovertarget="${overlayId}" popovertargetaction="hide" type="button">Save</button>
          </footer>
        </div>
      </div>
    </div>
  </div>`;
}
