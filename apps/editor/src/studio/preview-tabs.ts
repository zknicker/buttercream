export function renderTabsPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      ${tabsMarkup({
        labels: ["Tab 1", "Tab 2", "Tab 3"],
      })}
      <div class="specimen__label">Default</div>
    </section>
    <section class="specimen">
      ${tabsMarkup({
        labels: ["Account", "Billing", "Notifications"],
        variant: "secondary",
      })}
      <div class="specimen__label">Secondary variant</div>
    </section>
    <section class="specimen">
      ${tabsMarkup({
        labels: ["Tab 1", "Tab 2", "Tab 3"],
        orientation: "vertical",
      })}
      <div class="specimen__label">Vertical</div>
    </section>
    <section class="specimen">
      ${tabsMarkup({
        labels: ["Overview", "Details", "Settings"],
        separated: true,
      })}
      <div class="specimen__label">With separators</div>
    </section>
    <section class="specimen">
      ${tabsMarkup({
        icons: ["⌂", "⚙", "✉"],
        labels: ["Home", "Settings", "Mail"],
      })}
      <div class="specimen__label">With icons</div>
    </section>
    <section class="specimen">
      ${tabsMarkup({
        disabledIndex: 2,
        labels: ["Tab 1", "Tab 2", "Tab 3"],
      })}
      <div class="specimen__label">Disabled tab</div>
    </section>
  </div>`;
}

interface TabsMarkupOptions {
  disabledIndex?: number;
  icons?: readonly string[];
  labels: readonly string[];
  orientation?: "horizontal" | "vertical";
  separated?: boolean;
  variant?: "primary" | "secondary";
}

function tabsMarkup({
  disabledIndex,
  icons,
  labels,
  orientation = "horizontal",
  separated,
  variant = "primary",
}: TabsMarkupOptions): string {
  const vertical = orientation === "vertical";
  const indicatorStyle = vertical
    ? "--active-tab-left:4px;--active-tab-top:4px;--active-tab-width:calc(100% - 8px);--active-tab-height:32px"
    : `--active-tab-left:${variant === "primary" ? "4px" : "0px"};--active-tab-top:${variant === "primary" ? "4px" : "0px"};--active-tab-width:calc((100% - ${variant === "primary" ? "8px" : "0px"}) / ${labels.length});--active-tab-height:${variant === "primary" ? "32px" : "2px"}`;

  return `<div class="tabs tabs--${variant}" data-orientation="${orientation}">
    <div class="tabs__list${separated ? " tabs__list--separated" : ""}" role="tablist">
      ${labels
        .map(
          (
            label,
            index,
          ) => `<button aria-selected="${index === 0}" class="tabs__tab"${index === 0 ? " data-active" : ""}${index === disabledIndex ? " data-disabled disabled" : ""} role="tab" type="button">
        ${icons?.[index] ? `<span aria-hidden="true">${icons[index]}</span>` : ""}${label}
      </button>`,
        )
        .join("")}
      <span aria-hidden="true" class="tabs__indicator" style="${indicatorStyle}"></span>
    </div>
    <div class="tabs__panel" role="tabpanel">Content for tab one.</div>
  </div>`;
}
