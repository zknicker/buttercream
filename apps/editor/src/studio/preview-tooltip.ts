export function renderTooltipPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      <div class="preview-tooltip">
        <button class="button button--tertiary tooltip__trigger" type="button">Hover</button>
        ${tooltipPopup("Helpful context")}
      </div>
      <div class="preview-tooltip">
        <button aria-label="Info" class="button button--tertiary button--icon-only tooltip__trigger" type="button">i</button>
        ${tooltipPopup("More information")}
      </div>
      <div class="specimen__label">Default</div>
    </section>
    <section class="specimen">
      <div class="preview-tooltip">
        <button class="button button--tertiary tooltip__trigger" type="button">Arrow</button>
        ${tooltipPopup("With an arrow", true)}
      </div>
      <div class="preview-tooltip preview-tooltip--offset">
        <button class="button button--primary tooltip__trigger" type="button">Offset</button>
        ${tooltipPopup("With extra offset", true)}
      </div>
      <div class="specimen__label">Arrow + offset</div>
    </section>
    <section class="specimen">
      <div class="placement-cross">
        ${placementTooltip("Top", "top")}
        ${placementTooltip("Left", "left")}
        <span class="placement-cross__center">Hover</span>
        ${placementTooltip("Right", "right")}
        ${placementTooltip("Bottom", "bottom")}
      </div>
      <div class="specimen__label">Placements</div>
    </section>
  </div>`;
}

type TooltipSide = "top" | "right" | "bottom" | "left";

function placementTooltip(label: string, side: TooltipSide): string {
  return `<div class="preview-tooltip placement-cross__${side}">
    <button class="button button--tertiary tooltip__trigger" type="button">${label}</button>
    ${tooltipPopup(`${label} tooltip`, false, side)}
  </div>`;
}

function tooltipPopup(content: string, arrow = false, side: TooltipSide = "top"): string {
  return `<div class="tooltip__positioner preview-tooltip__overlay"${arrow ? " data-arrow" : ""} data-side="${side}">
    <div class="tooltip__popup" data-side="${side}">
      ${content}
    </div>
  </div>`;
}
