import { Button, Checkbox, Switch } from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";

const CHOICE_SIZES = ["sm", "md", "lg"] as const;

/* Round-trips name/value through FormData, like a real submit handler would. */
function CheckboxFormDemo(): ReactElement {
  const [result, setResult] = useState<string | null>(null);

  return (
    <form
      className="control-stack"
      onSubmit={(event) => {
        event.preventDefault();
        const subscribed = new FormData(event.currentTarget).get("newsletter") !== null;
        setResult(subscribed ? "Submitted: subscribed" : "Submitted: not subscribed");
      }}
    >
      <Checkbox name="newsletter" value="subscribed">
        Subscribe to the newsletter
      </Checkbox>
      <Button type="submit" variant="secondary">
        Save
      </Button>
      {result ? <p style={{ color: "var(--muted)", fontSize: "0.8125rem" }}>{result}</p> : null}
    </form>
  );
}

function SwitchFormDemo(): ReactElement {
  const [result, setResult] = useState<string | null>(null);

  return (
    <form
      className="control-stack"
      onSubmit={(event) => {
        event.preventDefault();
        const marketing = new FormData(event.currentTarget).get("marketing") !== null;
        setResult(marketing ? "Submitted: on" : "Submitted: off");
      }}
    >
      <Switch name="marketing" value="on">
        Marketing emails
      </Switch>
      <Button type="submit" variant="secondary">
        Save
      </Button>
      {result ? <p style={{ color: "var(--muted)", fontSize: "0.8125rem" }}>{result}</p> : null}
    </form>
  );
}

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
      <section className="specimen">
        <span style={{ alignItems: "center", display: "flex", gap: "0.5rem" }}>
          <Checkbox id="external-label-row" name="external-label" />
          <label htmlFor="external-label-row">Acme Corp</label>
        </span>
        <div className="specimen__label">External label</div>
      </section>
      <section className="specimen">
        <div className="control-stack">
          <Checkbox aria-invalid="true" name="invalid" required>
            I agree to the terms
          </Checkbox>
          <Checkbox
            aria-invalid="true"
            defaultChecked
            description="This selection is no longer valid."
            name="invalid-selected"
          >
            Legacy plan
          </Checkbox>
        </div>
        <div className="specimen__label">Invalid</div>
      </section>
      <section className="specimen">
        <Checkbox
          name="custom-render"
          render={(props, state) => (
            <span
              {...props}
              style={{
                ...props.style,
                outline: state.checked ? "2px solid var(--danger)" : undefined,
                outlineOffset: 2,
              }}
            />
          )}
        >
          Custom render function
        </Checkbox>
        <div className="specimen__label">Custom render function</div>
      </section>
      <section className="specimen">
        <CheckboxFormDemo />
        <div className="specimen__label">Form integration</div>
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
      <section className="specimen">
        <Switch aria-label="Wi-Fi" defaultChecked name="no-label-wifi" />
        <Switch aria-label="Airplane mode" name="no-label-airplane" />
        <div className="specimen__label">Without label</div>
      </section>
      <section className="specimen">
        <Switch defaultChecked name="group-wifi">
          Wi-Fi
        </Switch>
        <Switch name="group-bluetooth">Bluetooth</Switch>
        <Switch defaultChecked name="group-airplane">
          Airplane mode
        </Switch>
        <div className="specimen__label">Group (horizontal)</div>
      </section>
      <section className="specimen">
        <Switch
          name="custom-render"
          render={(props, state) => (
            <span
              {...props}
              style={{
                ...props.style,
                outline: state.checked ? "2px solid var(--danger)" : undefined,
                outlineOffset: 2,
              }}
            />
          )}
        >
          Custom render function
        </Switch>
        <div className="specimen__label">Render props</div>
      </section>
      <section className="specimen">
        <SwitchFormDemo />
        <div className="specimen__label">Form integration</div>
      </section>
    </div>
  );
}

function sizeLabel(size: (typeof CHOICE_SIZES)[number]): string {
  return size === "sm" ? "Small" : size === "md" ? "Medium" : "Large";
}
