import { Button, Checkbox, Switch } from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import { Specimen } from "./preview-specimen.tsx";

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
      <Specimen label="Default and selected">
        <div className="control-stack">
          <Checkbox name="terms">Accept terms and conditions</Checkbox>
          <Checkbox defaultChecked name="notifications">
            Enable email notifications
          </Checkbox>
        </div>
      </Specimen>
      <Specimen label="Variants">
        <div className="control-stack">
          <Checkbox defaultChecked name="variant-primary">
            Primary
          </Checkbox>
          <Checkbox defaultChecked name="variant-secondary" variant="secondary">
            Secondary
          </Checkbox>
        </div>
      </Specimen>
      <Specimen label="Sizes">
        <div className="control-stack">
          {CHOICE_SIZES.map((size) => (
            <Checkbox defaultChecked key={size} name={`size-${size}`} size={size}>
              {sizeLabel(size)}
            </Checkbox>
          ))}
        </div>
      </Specimen>
      <Specimen label="Rounded">
        <Checkbox defaultChecked name="rounded" rounded>
          Rounded control
        </Checkbox>
      </Specimen>
      <Specimen label="Description">
        <Checkbox defaultChecked description="We only send a digest once a week." name="described">
          Weekly digest
        </Checkbox>
      </Specimen>
      <Specimen label="Indeterminate">
        <Checkbox
          indeterminate={indeterminate}
          name="indeterminate"
          onCheckedChange={() => setIndeterminate(false)}
        >
          Select all
        </Checkbox>
      </Specimen>
      <Specimen label="Disabled">
        <div className="control-stack">
          <Checkbox disabled name="disabled-off">
            Premium feature
          </Checkbox>
          <Checkbox defaultChecked disabled name="disabled-on">
            Included feature
          </Checkbox>
        </div>
      </Specimen>
      <Specimen label="External label">
        <span style={{ alignItems: "center", display: "flex", gap: "0.5rem" }}>
          <Checkbox id="external-label-row" name="external-label" />
          <label htmlFor="external-label-row">Acme Corp</label>
        </span>
      </Specimen>
      <Specimen label="Invalid">
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
      </Specimen>
      <Specimen label="Custom render function">
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
      </Specimen>
      <Specimen label="Form integration">
        <CheckboxFormDemo />
      </Specimen>
    </div>
  );
}

export function SwitchPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Default and selected">
        <div className="control-stack">
          <Switch name="default">Enable notifications</Switch>
          <Switch defaultChecked name="selected">
            Enable notifications
          </Switch>
        </div>
      </Specimen>
      <Specimen label="Sizes">
        <div className="control-stack">
          {CHOICE_SIZES.map((size) => (
            <Switch defaultChecked key={size} name={`size-${size}`} size={size}>
              {sizeLabel(size)}
            </Switch>
          ))}
        </div>
      </Specimen>
      <Specimen label="Description">
        <Switch
          defaultChecked
          description="Automatically match the system appearance."
          name="described"
        >
          Dark mode
        </Switch>
      </Specimen>
      <Specimen label="Disabled">
        <div className="control-stack">
          <Switch disabled name="disabled-off">
            Notifications unavailable
          </Switch>
          <Switch defaultChecked disabled name="disabled-on">
            Locked on
          </Switch>
        </div>
      </Specimen>
      <Specimen label="Without label">
        <Switch aria-label="Wi-Fi" defaultChecked name="no-label-wifi" />
        <Switch aria-label="Airplane mode" name="no-label-airplane" />
      </Specimen>
      <Specimen label="Group (horizontal)">
        <Switch defaultChecked name="group-wifi">
          Wi-Fi
        </Switch>
        <Switch name="group-bluetooth">Bluetooth</Switch>
        <Switch defaultChecked name="group-airplane">
          Airplane mode
        </Switch>
      </Specimen>
      <Specimen label="Render props">
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
      </Specimen>
      <Specimen label="Form integration">
        <SwitchFormDemo />
      </Specimen>
    </div>
  );
}

function sizeLabel(size: (typeof CHOICE_SIZES)[number]): string {
  return size === "sm" ? "Small" : size === "md" ? "Medium" : "Large";
}
