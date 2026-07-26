import { renderCheckboxPreview, renderSwitchPreview } from "./preview-choice-controls.ts";
import { renderInputPreview } from "./preview-form-controls.ts";
import { renderRadioGroupPreview } from "./preview-radio-group.ts";
import { renderSelectPreview } from "./preview-select.ts";
import { renderSliderPreview } from "./preview-slider.ts";
import { renderTabsPreview } from "./preview-tabs.ts";

export type PreviewSection =
  | "Guides"
  | "Button"
  | "Input"
  | "Checkbox"
  | "Radio Group"
  | "Select"
  | "Slider"
  | "Switch"
  | "Tabs"
  | "Card"
  | "Avatar";

export function renderPreviewSection(section: PreviewSection): string {
  if (section === "Guides") {
    return renderGuides();
  }
  if (section === "Card") {
    return renderCardPreview();
  }
  if (section === "Input") {
    return renderInputPreview();
  }
  if (section === "Checkbox") {
    return renderCheckboxPreview();
  }
  if (section === "Radio Group") {
    return renderRadioGroupPreview();
  }
  if (section === "Select") {
    return renderSelectPreview();
  }
  if (section === "Slider") {
    return renderSliderPreview();
  }
  if (section === "Switch") {
    return renderSwitchPreview();
  }
  if (section === "Tabs") {
    return renderTabsPreview();
  }
  if (section === "Avatar") {
    return renderAvatarPreview();
  }
  return renderButtonPreview();
}

function renderGuides(): string {
  return `<div class="guide-grid">
    <div class="swatch" style="background:var(--accent);color:var(--accent-foreground)">Accent<br><small>--accent</small></div>
    <div class="swatch" style="background:var(--accent-soft)">Accent soft<br><small>--accent-soft</small></div>
    <div class="swatch" style="background:var(--card)">Card<br><small>--card</small></div>
    <div class="swatch" style="background:var(--success);color:var(--success-foreground)">Success</div>
    <div class="swatch" style="background:var(--warning);color:var(--warning-foreground)">Warning</div>
    <div class="swatch" style="background:var(--danger);color:var(--danger-foreground)">Danger</div>
  </div>`;
}

function renderCardPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      <article class="card" style="width:min(100%,360px)">
        <header class="card__header">
          <div class="card__title">Default card</div>
          <div class="card__description">Composed from the stock Card slots.</div>
        </header>
        <div class="card__content">Theme changes update this surface directly.</div>
        <footer class="card__footer"><button class="button button--primary">Continue</button></footer>
      </article>
      <div class="specimen__label">Default</div>
    </section>
    <section class="specimen">
      <article class="card card--secondary" style="width:min(100%,360px)">
        <header class="card__header"><div class="card__title">Secondary card</div></header>
        <div class="card__content">Same component, alternate stock surface.</div>
      </article>
      <div class="specimen__label">Secondary</div>
    </section>
  </div>`;
}

function renderAvatarPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      <span class="avatar avatar--sm"><span class="avatar__fallback">BC</span></span>
      <span class="avatar"><span class="avatar__fallback">BC</span></span>
      <span class="avatar avatar--lg"><span class="avatar__fallback">BC</span></span>
      <div class="specimen__label">Sizes</div>
    </section>
    <section class="specimen">
      <span class="agent-avatar">
        <span class="avatar avatar--lg avatar--rounded"><span class="avatar__fallback">AI</span></span>
        <span class="agent-avatar__status agent-avatar__status--online"></span>
      </span>
      <div class="specimen__label">Agent avatar</div>
    </section>
  </div>`;
}

function renderButtonPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      <button class="button button--primary">Primary</button>
      <button class="button button--secondary">Secondary</button>
      <button class="button button--tertiary">Tertiary</button>
      <button class="button button--outline">Outline</button>
      <button class="button button--ghost">Ghost</button>
      <button class="button button--danger">Danger</button>
      <button class="button button--danger-soft">Danger soft</button>
      <div class="specimen__label">Variants</div>
    </section>
    <section class="specimen">
      <button class="button button--primary button--sm">Small</button>
      <button class="button button--primary">Medium</button>
      <button class="button button--primary button--lg">Large</button>
      <div class="specimen__label">Sizes</div>
    </section>
  </div>`;
}
