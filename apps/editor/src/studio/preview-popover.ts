export function renderPopoverPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      <div class="preview-popover">
        <button class="button button--tertiary popover__trigger" type="button">Open</button>
        ${popoverPopup({
          description: "Use the command palette to jump anywhere.",
          title: "Shortcuts",
        })}
      </div>
      <div class="specimen__label">Basic</div>
    </section>
    <section class="specimen">
      <div class="preview-popover">
        <button class="button button--tertiary popover__trigger" type="button">Arrow</button>
        ${popoverPopup({
          arrow: true,
          description: "Anchored to its trigger.",
          title: "With arrow",
        })}
      </div>
      <div class="preview-popover">
        <button aria-label="More" class="button button--tertiary button--icon-only popover__trigger" type="button">•••</button>
        ${popoverPopup({
          arrow: true,
          description: "Rename, duplicate, or archive.",
          title: "Actions",
        })}
      </div>
      <div class="specimen__label">With arrow</div>
    </section>
    <section class="specimen">
      <div class="placement-cross">
        ${placementPopover("Top", "top")}
        ${placementPopover("Left", "left")}
        <span class="placement-cross__center">Click</span>
        ${placementPopover("Right", "right")}
        ${placementPopover("Bottom", "bottom")}
      </div>
      <div class="specimen__label">Placements</div>
    </section>
    <section class="specimen">
      <div class="preview-popover preview-profile-popover">
        <button aria-label="Profile" class="popover__trigger profile-trigger" type="button">
          <span class="avatar avatar--sm"><span class="avatar__fallback">AL</span></span>
          <span><strong>Alex Lee</strong><small>@alex</small></span>
        </button>
        <div class="popover__positioner preview-popover__overlay" data-side="bottom">
          <div class="popover__popup profile-popover" data-side="bottom">
            <div class="profile-popover__header">
              <span class="avatar"><span class="avatar__fallback">AL</span></span>
              <span><strong>Alex Lee</strong><small>@alex</small></span>
              <button class="button button--primary button--sm" type="button">Follow</button>
            </div>
            <p class="popover__description">Designer building tools for creative teams.</p>
          </div>
        </div>
      </div>
      <div class="specimen__label">Interactive</div>
    </section>
  </div>`;
}

type PopoverSide = "top" | "right" | "bottom" | "left";

function placementPopover(label: string, side: PopoverSide): string {
  return `<div class="preview-popover placement-cross__${side}">
    <button class="button button--tertiary popover__trigger" type="button">${label}</button>
    ${popoverPopup({
      description: `${label} placement`,
      side,
      title: `${label} popover`,
    })}
  </div>`;
}

function popoverPopup({
  arrow = false,
  description,
  side = "bottom",
  title,
}: {
  arrow?: boolean;
  description: string;
  side?: PopoverSide;
  title: string;
}): string {
  return `<div class="popover__positioner preview-popover__overlay"${arrow ? " data-arrow" : ""} data-side="${side}">
    <div class="popover__popup" data-side="${side}">
      <h2 class="popover__title">${title}</h2>
      <p class="popover__description">${description}</p>
    </div>
  </div>`;
}
