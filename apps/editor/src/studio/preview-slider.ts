export function renderSliderPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      ${sliderMarkup({ label: "Volume", values: [30] })}
      <div class="specimen__label">Default</div>
    </section>
    <section class="specimen">
      ${sliderMarkup({
        label: "Price",
        max: 1000,
        output: "$100.00 – $500.00",
        values: [100, 500],
      })}
      <div class="specimen__label">Range</div>
    </section>
    <section class="specimen">
      ${sliderMarkup({ label: "Level", orientation: "vertical", values: [40] })}
      <div class="specimen__label">Vertical</div>
    </section>
    <section class="specimen">
      ${sliderMarkup({ disabled: true, label: "Volume", values: [30] })}
      <div class="specimen__label">Disabled</div>
    </section>
  </div>`;
}

interface SliderMarkupOptions {
  disabled?: boolean;
  label: string;
  max?: number;
  orientation?: "horizontal" | "vertical";
  output?: string;
  values: readonly number[];
}

function sliderMarkup({
  disabled,
  label,
  max = 100,
  orientation = "horizontal",
  output,
  values,
}: SliderMarkupOptions): string {
  const start = Math.min(...values) / max;
  const end = Math.max(...values) / max;
  const vertical = orientation === "vertical";
  const indicatorStyle = vertical
    ? `bottom:${start * 100}%;height:${(end - start) * 100 || end * 100}%`
    : `left:${start * 100}%;width:${(end - start) * 100 || end * 100}%`;
  const thumbStyles = values
    .map((value) =>
      vertical
        ? `bottom:calc(${(value / max) * 100}% - var(--bc-slider-thumb-height) / 2)`
        : `left:calc(${(value / max) * 100}% - var(--bc-slider-thumb-width) / 2)`,
    )
    .map((style) => `<span aria-hidden="true" class="slider__thumb" style="${style}"></span>`)
    .join("");

  return `<div aria-label="${label}" class="slider" data-orientation="${orientation}"${disabled ? " data-disabled" : ""} role="group">
    <div class="slider__header">
      <span class="slider__label">${label}</span>
      <span class="slider__value">${output ?? values.join(" – ")}</span>
    </div>
    <div class="slider__control">
      <div class="slider__track">
        <div class="slider__indicator" style="${indicatorStyle}"></div>
      </div>
      ${thumbStyles}
    </div>
  </div>`;
}
