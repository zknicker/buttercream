import { RadioGroup } from "@buttercream/react";
import type { ReactElement } from "react";

const RADIO_SIZES = ["sm", "md", "lg"] as const;

export function RadioGroupPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <RadioGroup
          defaultValue="premium"
          description="Choose the plan that suits you best"
          label="Plan selection"
          name="plan"
        >
          <RadioGroup.Item value="basic">Basic Plan</RadioGroup.Item>
          <RadioGroup.Item value="premium">Premium Plan</RadioGroup.Item>
          <RadioGroup.Item value="business">Business Plan</RadioGroup.Item>
        </RadioGroup>
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen">
        <RadioGroup
          defaultValue="pro"
          label="Subscription plan"
          name="subscription"
          orientation="horizontal"
        >
          <RadioGroup.Item value="starter">Starter</RadioGroup.Item>
          <RadioGroup.Item value="pro">Pro</RadioGroup.Item>
          <RadioGroup.Item value="teams">Teams</RadioGroup.Item>
        </RadioGroup>
        <div className="specimen__label">Horizontal</div>
      </section>
      <section className="specimen">
        <div className="control-stack">
          <RadioGroup
            defaultValue="primary-one"
            label="Primary"
            name="variant-primary"
            orientation="horizontal"
          >
            <RadioGroup.Item value="primary-one">Primary</RadioGroup.Item>
            <RadioGroup.Item value="primary-two">Alternative</RadioGroup.Item>
          </RadioGroup>
          <RadioGroup
            defaultValue="secondary-one"
            label="Secondary"
            name="variant-secondary"
            orientation="horizontal"
            variant="secondary"
          >
            <RadioGroup.Item value="secondary-one">Secondary</RadioGroup.Item>
            <RadioGroup.Item value="secondary-two">Alternative</RadioGroup.Item>
          </RadioGroup>
        </div>
        <div className="specimen__label">Variants</div>
      </section>
      <section className="specimen">
        <div className="control-stack">
          {RADIO_SIZES.map((size) => (
            <RadioGroup
              defaultValue={`${size}-one`}
              key={size}
              name={`size-${size}`}
              orientation="horizontal"
              size={size}
            >
              <RadioGroup.Item value={`${size}-one`}>{sizeLabel(size)}</RadioGroup.Item>
              <RadioGroup.Item value={`${size}-two`}>Alternative</RadioGroup.Item>
            </RadioGroup>
          ))}
        </div>
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen">
        <RadioGroup defaultValue="described-pro" label="Plan selection" name="described-plan">
          <RadioGroup.Item description="For side projects" value="described-starter">
            Starter
          </RadioGroup.Item>
          <RadioGroup.Item description="Advanced reporting and analytics" value="described-pro">
            Pro
          </RadioGroup.Item>
          <RadioGroup.Item
            description="Share access with up to 10 teammates"
            value="described-teams"
          >
            Teams
          </RadioGroup.Item>
        </RadioGroup>
        <div className="specimen__label">Item descriptions</div>
      </section>
      <section className="specimen">
        <RadioGroup
          defaultValue="required-basic"
          description="A selection is required to continue"
          label="Plan selection"
          name="required-plan"
          required
        >
          <RadioGroup.Item value="required-basic">Basic Plan</RadioGroup.Item>
          <RadioGroup.Item value="required-premium">Premium Plan</RadioGroup.Item>
        </RadioGroup>
        <div className="specimen__label">Required</div>
      </section>
      <section className="specimen">
        <RadioGroup
          defaultValue="disabled-pro"
          description="Plan changes are temporarily paused while we roll out updates."
          disabled
          label="Subscription plan"
          name="disabled-plan"
        >
          <RadioGroup.Item value="disabled-starter">Starter</RadioGroup.Item>
          <RadioGroup.Item value="disabled-pro">Pro</RadioGroup.Item>
        </RadioGroup>
        <div className="specimen__label">Disabled</div>
      </section>
    </div>
  );
}

function sizeLabel(size: (typeof RADIO_SIZES)[number]): string {
  return size === "sm" ? "Small" : size === "md" ? "Medium" : "Large";
}
