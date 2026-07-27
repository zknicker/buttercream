import { Checkbox, Switch } from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";

const CHOICE_SIZES = ["sm", "md", "lg"] as const;

export function CheckboxPreview(): ReactElement {
  /* "Select all" clears its mixed state on first interaction, like a real bulk toggle. */
  const [indeterminate, setIndeterminate] = useState(true);

  return (
    <div className="specimens">
      <section className="specimen">
        <div className="control-stack">
          <Checkbox name="terms">Accept terms and conditions</Checkbox>
          <Checkbox defaultChecked name="notifications">
            Enable email notifications
          </Checkbox>
        </div>
        <div className="specimen__label">Default and selected</div>
      </section>
      <section className="specimen">
        <div className="control-stack">
          <Checkbox defaultChecked name="variant-primary">
            Primary
          </Checkbox>
          <Checkbox defaultChecked name="variant-secondary" variant="secondary">
            Secondary
          </Checkbox>
        </div>
        <div className="specimen__label">Variants</div>
      </section>
      <section className="specimen">
        <div className="control-stack">
          {CHOICE_SIZES.map((size) => (
            <Checkbox defaultChecked key={size} name={`size-${size}`} size={size}>
              {sizeLabel(size)}
            </Checkbox>
          ))}
        </div>
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen">
        <Checkbox defaultChecked name="rounded" rounded>
          Rounded control
        </Checkbox>
        <div className="specimen__label">Rounded</div>
      </section>
      <section className="specimen">
        <Checkbox defaultChecked description="We only send a digest once a week." name="described">
          Weekly digest
        </Checkbox>
        <div className="specimen__label">Description</div>
      </section>
      <section className="specimen">
        <Checkbox
          indeterminate={indeterminate}
          name="indeterminate"
          onCheckedChange={() => setIndeterminate(false)}
        >
          Select all
        </Checkbox>
        <div className="specimen__label">Indeterminate</div>
      </section>
      <section className="specimen">
        <div className="control-stack">
          <Checkbox disabled name="disabled-off">
            Premium feature
          </Checkbox>
          <Checkbox defaultChecked disabled name="disabled-on">
            Included feature
          </Checkbox>
        </div>
        <div className="specimen__label">Disabled</div>
      </section>
    </div>
  );
}

export function SwitchPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <div className="control-stack">
          <Switch name="default">Enable notifications</Switch>
          <Switch defaultChecked name="selected">
            Enable notifications
          </Switch>
        </div>
        <div className="specimen__label">Default and selected</div>
      </section>
      <section className="specimen">
        <div className="control-stack">
          {CHOICE_SIZES.map((size) => (
            <Switch defaultChecked key={size} name={`size-${size}`} size={size}>
              {sizeLabel(size)}
            </Switch>
          ))}
        </div>
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen">
        <Switch
          defaultChecked
          description="Automatically match the system appearance."
          name="described"
        >
          Dark mode
        </Switch>
        <div className="specimen__label">Description</div>
      </section>
      <section className="specimen">
        <div className="control-stack">
          <Switch disabled name="disabled-off">
            Notifications unavailable
          </Switch>
          <Switch defaultChecked disabled name="disabled-on">
            Locked on
          </Switch>
        </div>
        <div className="specimen__label">Disabled</div>
      </section>
    </div>
  );
}

function sizeLabel(size: (typeof CHOICE_SIZES)[number]): string {
  return size === "sm" ? "Small" : size === "md" ? "Medium" : "Large";
}
