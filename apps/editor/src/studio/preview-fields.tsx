import {
  Button,
  CloseButton,
  Field,
  Fieldset,
  Input,
  Meter,
  NumberField,
  ProgressBar,
  SearchField,
  Surface,
  Textarea,
} from "@buttercream/react";
import { type ReactElement, useState } from "react";
import { Specimen } from "./preview-specimen.tsx";

export function TextFieldPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Basic">
        <Field name="email">
          <Field.Label>Email</Field.Label>
          <Input placeholder="Enter your email" />
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Required">
        <Field name="full-name">
          <Field.Label required>Full name</Field.Label>
          <Input placeholder="John Doe" />
          <Field.Description>This field is required</Field.Description>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Description">
        <Field name="username">
          <Field.Label>Username</Field.Label>
          <Input defaultValue="jane_doe" />
          <Field.Description>Choose a unique username for your profile.</Field.Description>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Disabled">
        <Field name="locked">
          <Field.Label>Account ID</Field.Label>
          <Input defaultValue="acct_18fc2" disabled />
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Validation">
        <Field invalid name="password">
          <Field.Label required>Password</Field.Label>
          <Input type="password" />
          <Field.Error match>Must be at least 8 characters</Field.Error>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Controlled">
        <TextFieldControlledDemo />
      </Specimen>
      <Specimen className="specimen--stack" label="Full width">
        <Field fullWidth name="full-width-field">
          <Field.Label>Display name</Field.Label>
          <Input fullWidth placeholder="Spans the container" />
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Input types">
        <Field name="type">
          <Field.Label>Contact email</Field.Label>
          <Input placeholder="you@example.com" type="email" />
        </Field>
        <Field name="type-password">
          <Field.Label>API key</Field.Label>
          <Input placeholder="sk_live_..." type="password" />
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="In Surface">
        <Surface variant="secondary">
          <Field name="on-surface">
            <Field.Label>Company</Field.Label>
            <Input placeholder="Acme Inc." variant="secondary" />
          </Field>
        </Surface>
      </Specimen>
    </div>
  );
}

/* value/onChange already round-trip through Base UI's Input; this proves it against a real Field. */
function TextFieldControlledDemo(): ReactElement {
  const [value, setValue] = useState("");
  return (
    <Field name="controlled-email">
      <Field.Label>Email</Field.Label>
      <Input
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Enter your email"
        value={value}
      />
      <Field.Description>
        {value === "" ? "Nothing typed yet" : `Typed: ${value}`}
      </Field.Description>
    </Field>
  );
}

export function TextareaPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Basic">
        <Field name="bio">
          <Field.Label>Bio</Field.Label>
          <Textarea placeholder="Tell us about yourself..." />
          <Field.Description>Minimum 20 characters.</Field.Description>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Secondary">
        <Field name="notes">
          <Field.Label>Notes</Field.Label>
          <Textarea placeholder="Secondary variant" variant="secondary" />
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Rows">
        <Field name="tall">
          <Field.Label>Release notes</Field.Label>
          <Textarea rows={6} />
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Disabled">
        <Field name="readonly-notes">
          <Field.Label>Archived note</Field.Label>
          <Textarea defaultValue="This note can no longer be edited." disabled />
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Controlled">
        <TextareaControlledDemo />
      </Specimen>
      <Specimen className="specimen--stack" label="Full width">
        <Field fullWidth name="full-width-bio">
          <Field.Label>Summary</Field.Label>
          <Textarea fullWidth placeholder="Spans the container" />
        </Field>
      </Specimen>
    </div>
  );
}

/* maxLength plus a live count is the textarea's own common real pattern, not a new capability. */
function TextareaControlledDemo(): ReactElement {
  const max = 280;
  const [value, setValue] = useState("");
  return (
    <Field name="post">
      <Field.Label>Post</Field.Label>
      <Textarea
        maxLength={max}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="What's on your mind?"
        value={value}
      />
      <Field.Description>
        {value.length}/{max}
      </Field.Description>
    </Field>
  );
}

export function NumberFieldPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Basic">
        <Field name="quantity">
          <Field.Label>Quantity</Field.Label>
          <NumberField defaultValue={1} min={0} />
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Step and bounds">
        <Field name="seats">
          <Field.Label>Seats</Field.Label>
          <NumberField defaultValue={5} max={20} min={1} step={5} />
          <Field.Description>Sold in blocks of five.</Field.Description>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Disabled">
        <Field name="locked-count">
          <Field.Label>Allocated</Field.Label>
          <NumberField defaultValue={12} disabled />
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Controlled">
        <NumberFieldControlledDemo />
      </Specimen>
      <Specimen className="specimen--stack" label="Format options">
        <Field name="price">
          <Field.Label>Price</Field.Label>
          <NumberField
            defaultValue={49.99}
            format={{ currency: "USD", style: "currency" }}
            min={0}
          />
        </Field>
        <Field name="discount">
          <Field.Label>Discount</Field.Label>
          <NumberField
            defaultValue={0.15}
            format={{ style: "percent" }}
            max={1}
            min={0}
            step={0.01}
          />
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Custom icons">
        <Field name="custom-glyphs">
          <Field.Label>Volume</Field.Label>
          <NumberField decrementLabel="◁" defaultValue={50} incrementLabel="▷" max={100} min={0} />
        </Field>
      </Specimen>
    </div>
  );
}

/* onValueChange hands back number | null; this proves the round trip against a real Field. */
function NumberFieldControlledDemo(): ReactElement {
  const [value, setValue] = useState<number | null>(3);
  return (
    <Field name="controlled-quantity">
      <Field.Label>Quantity</Field.Label>
      <NumberField min={0} onValueChange={setValue} value={value} />
      <Field.Description>{value === null ? "No value" : `Value: ${value}`}</Field.Description>
    </Field>
  );
}

export function FieldsetPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Grouped fields">
        <Fieldset>
          <Fieldset.Legend>Billing address</Fieldset.Legend>
          <Fieldset.Group>
            <Field name="street">
              <Field.Label>Street</Field.Label>
              <Input placeholder="1 Market St" />
            </Field>
            <Field name="city">
              <Field.Label>City</Field.Label>
              <Input placeholder="San Francisco" />
            </Field>
          </Fieldset.Group>
        </Fieldset>
      </Specimen>
      <Specimen className="specimen--stack" label="On Surface">
        <Surface variant="secondary">
          <Fieldset>
            <Fieldset.Legend>Shipping address</Fieldset.Legend>
            <Fieldset.Group>
              <Field name="surface-street">
                <Field.Label>Street</Field.Label>
                <Input placeholder="1 Market St" variant="secondary" />
              </Field>
              <Field name="surface-city">
                <Field.Label>City</Field.Label>
                <Input placeholder="San Francisco" variant="secondary" />
              </Field>
            </Fieldset.Group>
          </Fieldset>
        </Surface>
      </Specimen>
      <Specimen className="specimen--stack" label="Actions">
        <Fieldset>
          <Fieldset.Legend>Profile</Fieldset.Legend>
          <Fieldset.Group>
            <Field name="display-name">
              <Field.Label>Display name</Field.Label>
              <Input placeholder="Jane Doe" />
            </Field>
          </Fieldset.Group>
          <Fieldset.Actions>
            <Button variant="ghost">Cancel</Button>
            <Button>Save</Button>
          </Fieldset.Actions>
        </Fieldset>
      </Specimen>
    </div>
  );
}

export function SearchFieldPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Basic">
        <Field name="search">
          <Field.Label>Search</Field.Label>
          <SearchField>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="With a value">
        <Field name="search-products">
          <Field.Label>Search products</Field.Label>
          <SearchField defaultValue="running shoes">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <Field.Description>Enter keywords to search for products</Field.Description>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Disabled">
        <Field name="search-disabled">
          <Field.Label>Search archive</Field.Label>
          <SearchField>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input disabled placeholder="Unavailable" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Controlled">
        <SearchFieldControlledDemo />
      </Specimen>
      <Specimen className="specimen--stack" label="Full width">
        <Field fullWidth name="search-full-width">
          <Field.Label>Search everything</Field.Label>
          <SearchField fullWidth>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Custom icon">
        <Field name="search-custom-icon">
          <Field.Label>Filter results</Field.Label>
          <SearchField>
            <SearchField.Group>
              <SearchField.SearchIcon>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4h12M4.5 8h7M7 12h2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </SearchField.SearchIcon>
              <SearchField.Input placeholder="Filter..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </Field>
      </Specimen>
    </div>
  );
}

/*
 * The root owns the controlled `value`; `onChange` lives on Input, which hands the native change
 * event back after the root updates its own empty-state tracking.
 */
function SearchFieldControlledDemo(): ReactElement {
  const [value, setValue] = useState("");
  return (
    <Field name="controlled-search">
      <Field.Label>Search</Field.Label>
      <SearchField onClear={() => setValue("")} value={value}>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder="Search..."
          />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
      <Field.Description>
        {value === "" ? "Nothing typed yet" : `Typed: ${value}`}
      </Field.Description>
    </Field>
  );
}

export function CloseButtonPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Default">
        <CloseButton />
      </Specimen>
      <Specimen label="Disabled">
        <CloseButton disabled />
      </Specimen>
      <Specimen label="Custom icon">
        <CloseButton>
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m4 8 3 3 5-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
            />
          </svg>
        </CloseButton>
      </Specimen>
    </div>
  );
}

export function ProgressBarPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="With label and value">
        <ProgressBar label="Uploading" showValue value={40} />
      </Specimen>
      <Specimen className="specimen--stack" label="Sizes">
        <ProgressBar size="sm" value={30} />
        <ProgressBar value={55} />
        <ProgressBar size="lg" value={80} />
      </Specimen>
      <Specimen className="specimen--stack" label="Colours">
        <ProgressBar color="accent" value={45} />
        <ProgressBar color="success" value={60} />
        <ProgressBar color="warning" value={75} />
        <ProgressBar color="danger" value={90} />
      </Specimen>
      <Specimen className="specimen--stack" label="Indeterminate">
        <ProgressBar label="Preparing" value={null} />
      </Specimen>
      <Specimen className="specimen--stack" label="Custom value scale">
        <ProgressBar label="Steps completed" max={10} min={0} showValue value={3} />
      </Specimen>
      <Specimen className="specimen--stack" label="Without label">
        <ProgressBar aria-label="Syncing files" value={65} />
      </Specimen>
    </div>
  );
}

export function MeterPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="With label and value">
        <Meter label="Storage" showValue value={62} />
      </Specimen>
      <Specimen className="specimen--stack" label="Sizes">
        <Meter size="sm" value={30} />
        <Meter value={55} />
        <Meter size="lg" value={80} />
      </Specimen>
      <Specimen className="specimen--stack" label="Colours">
        <Meter color="success" value={35} />
        <Meter color="warning" value={70} />
        <Meter color="danger" value={95} />
      </Specimen>
      <Specimen className="specimen--stack" label="Custom value scale">
        <Meter label="Score" max={10} min={0} showValue value={7} />
      </Specimen>
      <Specimen className="specimen--stack" label="Without label">
        <Meter aria-label="Battery level" value={45} />
      </Specimen>
    </div>
  );
}
