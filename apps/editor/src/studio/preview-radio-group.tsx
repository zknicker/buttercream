import { Field, RadioGroup, Surface } from "@buttercream/react";
import { type ReactElement, useState } from "react";
import { Specimen } from "./preview-specimen.tsx";

const RADIO_SIZES = ["sm", "md", "lg"] as const;

/* Controlled so the selection visibly follows value/onValueChange rather than only its initial state. */
function ControlledDemo(): ReactElement {
  const [value, setValue] = useState("email");
  return (
    <RadioGroup label="Contact method" name="contact-method" onValueChange={setValue} value={value}>
      <RadioGroup.Item value="email">Email</RadioGroup.Item>
      <RadioGroup.Item value="sms">SMS</RadioGroup.Item>
      <RadioGroup.Item value="phone">Phone call</RadioGroup.Item>
    </RadioGroup>
  );
}

export function RadioGroupPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Default">
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
      </Specimen>
      <Specimen label="Horizontal">
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
      </Specimen>
      <Specimen label="Variants">
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
      </Specimen>
      <Specimen label="Sizes">
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
      </Specimen>
      <Specimen label="Item descriptions">
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
      </Specimen>
      <Specimen label="Controlled">
        <ControlledDemo />
      </Specimen>
      <Specimen label="Validation">
        <Field invalid>
          <RadioGroup label="Notification channel" name="validation-channel" required>
            <RadioGroup.Item value="email">Email</RadioGroup.Item>
            <RadioGroup.Item value="sms">SMS</RadioGroup.Item>
          </RadioGroup>
          <Field.Error match>Choose a notification channel to continue.</Field.Error>
        </Field>
      </Specimen>
      <Specimen label="In Surface">
        <Surface variant="secondary">
          <RadioGroup
            defaultValue="surface-pro"
            label="Plan"
            name="surface-plan"
            orientation="horizontal"
            size="sm"
          >
            <RadioGroup.Item value="surface-starter">Starter</RadioGroup.Item>
            <RadioGroup.Item value="surface-pro">Pro</RadioGroup.Item>
          </RadioGroup>
        </Surface>
      </Specimen>
      <Specimen label="Render prop">
        <RadioGroup defaultValue="render-pro" label="Plan" name="render-plan" render={<fieldset />}>
          <RadioGroup.Item value="render-starter">Starter</RadioGroup.Item>
          <RadioGroup.Item value="render-pro">Pro</RadioGroup.Item>
        </RadioGroup>
      </Specimen>
      <Specimen label="Required">
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
      </Specimen>
      <Specimen label="Disabled">
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
      </Specimen>
    </div>
  );
}

function sizeLabel(size: (typeof RADIO_SIZES)[number]): string {
  return size === "sm" ? "Small" : size === "md" ? "Medium" : "Large";
}
