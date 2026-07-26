export function renderRadioGroupPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      ${radioGroupMarkup({
        description: "Choose the plan that suits you best",
        label: "Plan selection",
        name: "plan",
        options: [
          ["basic", "Basic Plan", "Includes 100 messages per month"],
          ["premium", "Premium Plan", "Includes 200 messages per month"],
          ["business", "Business Plan", "Unlimited messages"],
        ],
        selected: "premium",
      })}
      <div class="specimen__label">Default</div>
    </section>
    <section class="specimen">
      ${radioGroupMarkup({
        horizontal: true,
        label: "Subscription plan",
        name: "subscription",
        options: [
          ["starter", "Starter", "For side projects"],
          ["pro", "Pro", "Advanced reporting"],
          ["teams", "Teams", "Up to 10 teammates"],
        ],
        selected: "pro",
      })}
      <div class="specimen__label">Horizontal</div>
    </section>
    <section class="specimen">
      <div class="control-stack">
        ${radioGroupMarkup({
          name: "primary-emphasis",
          options: [
            ["primary-one", "Option 1", "Default emphasis"],
            ["primary-two", "Option 2", "Same group"],
          ],
          selected: "primary-one",
        })}
        ${radioGroupMarkup({
          name: "secondary-emphasis",
          options: [
            ["secondary-one", "Option 1", "Lower emphasis"],
            ["secondary-two", "Option 2", "For surfaces"],
          ],
          selected: "secondary-one",
          variant: "secondary",
        })}
      </div>
      <div class="specimen__label">Variants</div>
    </section>
    <section class="specimen">
      ${radioGroupMarkup({
        description: "Plan changes are temporarily paused while we roll out updates.",
        disabled: true,
        label: "Subscription plan",
        name: "disabled-plan",
        options: [
          ["disabled-starter", "Starter", "For side projects and small teams"],
          ["disabled-pro", "Pro", "Advanced reporting and analytics"],
          ["disabled-teams", "Teams", "Share access with up to 10 teammates"],
        ],
        selected: "disabled-pro",
      })}
      <div class="specimen__label">Disabled</div>
    </section>
  </div>`;
}

interface RadioGroupMarkupOptions {
  description?: string;
  disabled?: boolean;
  horizontal?: boolean;
  label?: string;
  name: string;
  options: readonly (readonly [value: string, label: string, description: string])[];
  selected: string;
  variant?: "primary" | "secondary";
}

function radioGroupMarkup({
  description,
  disabled,
  horizontal,
  label,
  name,
  options,
  selected,
  variant = "primary",
}: RadioGroupMarkupOptions): string {
  return `<div class="radio-group radio-group--${variant} radio-group--${horizontal ? "horizontal" : "vertical"}"${disabled ? " data-disabled" : ""} role="radiogroup"${label ? ` aria-label="${label}"` : ""}>
    ${
      label || description
        ? `<div class="radio-group__header">
      ${label ? `<div class="radio-group__label">${label}</div>` : ""}
      ${description ? `<div class="radio-group__description">${description}</div>` : ""}
    </div>`
        : ""
    }
    <div class="radio-group__items">
      ${options
        .map(
          ([value, optionLabel, optionDescription]) => `<label class="radio">
        <input class="radio__native" name="${name}" type="radio" value="${value}"${value === selected ? " checked" : ""}${disabled ? " disabled" : ""} />
        <span class="radio__control"><span class="radio__indicator"></span></span>
        <span class="radio__copy">
          <span class="radio__label">${optionLabel}</span>
          <span class="radio__description">${optionDescription}</span>
        </span>
      </label>`,
        )
        .join("")}
    </div>
  </div>`;
}
