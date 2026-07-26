export function renderCheckboxPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      ${checkboxMarkup("terms", "Accept terms and conditions")}
      <div class="specimen__label">Default</div>
    </section>
    <section class="specimen">
      ${checkboxMarkup("notifications", "Enable email notifications", { checked: true })}
      <div class="specimen__label">Default selected</div>
    </section>
    <section class="specimen">
      ${checkboxMarkup("mentions", "Email notifications", {
        checked: true,
        description: "Get notified when someone mentions you in a comment",
      })}
      <div class="specimen__label">With description</div>
    </section>
    <section class="specimen">
      ${checkboxMarkup("premium", "Premium feature", {
        description: "This feature is coming soon",
        disabled: true,
      })}
      <div class="specimen__label">Disabled</div>
    </section>
    <section class="specimen">
      <label class="checkbox">
        <button aria-checked="mixed" class="checkbox__control" data-indeterminate role="checkbox" type="button">
          <span class="checkbox__indicator"></span>
        </button>
        <span class="checkbox__copy">
          <span class="checkbox__label">Select all</span>
          <span class="checkbox__description">Shows indeterminate state</span>
        </span>
      </label>
      <div class="specimen__label">Indeterminate</div>
    </section>
    <section class="specimen">
      ${checkboxMarkup("invalid", "I agree to the terms", {
        description: "You must accept the terms to continue",
        invalid: true,
      })}
      <div class="specimen__label">Invalid</div>
    </section>
    <section class="specimen">
      <div class="control-stack">
        ${checkboxMarkup("primary", "Primary", {
          checked: true,
          description: "Card surface and field shadow",
        })}
        ${checkboxMarkup("secondary", "Secondary", {
          checked: true,
          description: "Neutral surface without shadow",
          variant: "secondary",
        })}
      </div>
      <div class="specimen__label">Variants</div>
    </section>
    <section class="specimen">
      <div class="control-stack">
        ${checkboxMarkup("rounded-medium", "Rounded medium", {
          checked: true,
          rounded: true,
        })}
        ${checkboxMarkup("rounded-large", "Rounded large", {
          checked: true,
          large: true,
          rounded: true,
        })}
      </div>
      <div class="specimen__label">Rounded</div>
    </section>
  </div>`;
}

export function renderSwitchPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      ${switchMarkup("default", "Enable notifications")}
      <div class="specimen__label">Default</div>
    </section>
    <section class="specimen">
      ${switchMarkup("selected", "Enable notifications", { checked: true })}
      <div class="specimen__label">Selected by default</div>
    </section>
    <section class="specimen">
      <div class="control-stack">
        ${switchMarkup("controlled", "Controlled switch")}
        <span class="control-status">Switch is off</span>
      </div>
      <div class="specimen__label">Controlled</div>
    </section>
    <section class="specimen">
      <div class="control-stack">
        ${switchMarkup("small", "Small", { checked: true, size: "sm" })}
        ${switchMarkup("medium", "Medium", { checked: true })}
        ${switchMarkup("large", "Large", { checked: true, size: "lg" })}
      </div>
      <div class="specimen__label">Sizes</div>
    </section>
    <section class="specimen">
      <div class="control-stack">
        ${switchMarkup("email", "Email notifications", { checked: true })}
        ${switchMarkup("push", "Push notifications")}
        ${switchMarkup("sms", "SMS notifications", { checked: true })}
      </div>
      <div class="specimen__label">Group</div>
    </section>
    <section class="specimen">
      ${switchMarkup("disabled", "Notifications unavailable", { disabled: true })}
      <div class="specimen__label">Disabled</div>
    </section>
  </div>`;
}

interface CheckboxMarkupOptions {
  checked?: boolean;
  description?: string;
  disabled?: boolean;
  invalid?: boolean;
  large?: boolean;
  rounded?: boolean;
  variant?: "primary" | "secondary";
}

function checkboxMarkup(name: string, label: string, options: CheckboxMarkupOptions = {}): string {
  const modifiers = [
    options.variant === "secondary" ? "checkbox--secondary" : "",
    options.rounded ? "checkbox--rounded" : "",
    options.large ? "checkbox--lg" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `<label class="checkbox ${modifiers}"${options.disabled ? " data-disabled" : ""}>
    <input class="checkbox__native" name="${name}" type="checkbox"${options.checked ? " checked" : ""}${options.disabled ? " disabled" : ""}${options.invalid ? ' aria-invalid="true"' : ""} />
    <span class="checkbox__control"><span class="checkbox__indicator"></span></span>
    <span class="checkbox__copy">
      <span class="checkbox__label">${label}</span>
      ${options.description ? `<span class="checkbox__description">${options.description}</span>` : ""}
    </span>
  </label>`;
}

interface SwitchMarkupOptions {
  checked?: boolean;
  disabled?: boolean;
  size?: "sm" | "lg";
}

function switchMarkup(name: string, label: string, options: SwitchMarkupOptions = {}): string {
  const modifier = options.size ? ` switch--${options.size}` : "";

  return `<label class="switch${modifier}"${options.disabled ? " data-disabled" : ""}>
    <input class="switch__native" name="${name}" type="checkbox"${options.checked ? " checked" : ""}${options.disabled ? " disabled" : ""} />
    <span class="switch__control"><span class="switch__thumb"></span></span>
    <span class="switch__copy"><span class="switch__label">${label}</span></span>
  </label>`;
}
