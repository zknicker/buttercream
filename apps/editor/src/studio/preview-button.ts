import type { PreviewIcons } from "./preview-icons.ts";

export function renderButtonPreview(previewIcons: PreviewIcons): string {
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
    <section class="specimen">
      <button class="button button--primary">${previewIcons.search}Search</button>
      <button class="button button--secondary">${previewIcons.add}Add member</button>
      <button class="button button--tertiary">${previewIcons.mail}Email</button>
      <button class="button button--danger">${previewIcons.delete}Delete</button>
      <div class="specimen__label">With icons</div>
    </section>
    <section class="specimen">
      <button aria-label="More options" class="button button--tertiary button--icon-only">${previewIcons.more}</button>
      <button aria-label="Settings" class="button button--secondary button--icon-only">${previewIcons.settings}</button>
      <button aria-label="Delete" class="button button--danger button--icon-only">${previewIcons.delete}</button>
      <div class="specimen__label">Icon only</div>
    </section>
    <section class="specimen">
      <button class="button button--primary" data-loading><span class="button__spinner"></span>${previewIcons.upload}Upload file</button>
      <div class="specimen__label">Loading</div>
    </section>
    <section class="specimen">
      <button class="button button--primary" disabled>Primary</button>
      <button class="button button--secondary" disabled>Secondary</button>
      <button class="button button--tertiary" disabled>Tertiary</button>
      <button class="button button--outline" disabled>Outline</button>
      <button class="button button--ghost" disabled>Ghost</button>
      <button class="button button--danger" disabled>Danger</button>
      <div class="specimen__label">Disabled</div>
    </section>
    <section class="specimen specimen--stack">
      <button class="button button--primary button--full-width">Primary button</button>
      <button class="button button--secondary button--full-width">${previewIcons.add}With icon</button>
      <div class="specimen__label">Full width</div>
    </section>
  </div>`;
}
