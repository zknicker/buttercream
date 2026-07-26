export function renderSelectPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      ${selectMarkup({ label: "State", placeholder: "Select one" })}
      <div class="specimen__label">Default</div>
    </section>
    <section class="specimen">
      ${selectMarkup({
        description: "Select your state of residence",
        label: "State",
        placeholder: "Select one",
      })}
      <div class="specimen__label">With description</div>
    </section>
    <section class="specimen">
      ${selectMarkup({ label: "Countries to visit", placeholder: "Select countries" })}
      <div class="specimen__label">Multiple selection</div>
    </section>
    <section class="specimen">
      ${selectMarkup({ label: "Country", placeholder: "Select a country" })}
      <div class="specimen__label">Sections</div>
    </section>
    <section class="specimen">
      ${selectMarkup({ label: "Animal", placeholder: "Select an animal" })}
      <div class="specimen__label">Disabled options</div>
    </section>
    <section class="specimen">
      ${selectMarkup({ customIndicator: true, label: "State", placeholder: "Select one" })}
      <div class="specimen__label">Custom indicator</div>
    </section>
  </div>`;
}

interface SelectMarkupOptions {
  customIndicator?: boolean;
  description?: string;
  label: string;
  placeholder: string;
}

function selectMarkup({
  customIndicator,
  description,
  label,
  placeholder,
}: SelectMarkupOptions): string {
  return `<div class="select" data-slot="select">
    <div class="select__label">${label}</div>
    <button aria-label="${placeholder} ${label}" aria-haspopup="listbox" class="select__trigger" type="button">
      <span class="select__value" data-placeholder>${placeholder}</span>
      <span class="select__icon">
        ${customIndicator ? '<span aria-hidden="true">↕</span>' : '<span aria-hidden="true" class="select__chevron"></span>'}
      </span>
    </button>
    ${description ? `<div class="select__description">${description}</div>` : ""}
  </div>`;
}
