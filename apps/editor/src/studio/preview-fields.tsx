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

export function TextFieldPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <Field name="email">
          <Field.Label>Email</Field.Label>
          <Input placeholder="Enter your email" />
        </Field>
        <div className="specimen__label">Basic</div>
      </section>
      <section className="specimen specimen--stack">
        <Field name="full-name">
          <Field.Label required>Full name</Field.Label>
          <Input placeholder="John Doe" />
          <Field.Description>This field is required</Field.Description>
        </Field>
        <div className="specimen__label">Required</div>
      </section>
      <section className="specimen specimen--stack">
        <Field name="username">
          <Field.Label>Username</Field.Label>
          <Input defaultValue="jane_doe" />
          <Field.Description>Choose a unique username for your profile.</Field.Description>
        </Field>
        <div className="specimen__label">Description</div>
      </section>
      <section className="specimen specimen--stack">
        <Field name="locked">
          <Field.Label>Account ID</Field.Label>
          <Input defaultValue="acct_18fc2" disabled />
        </Field>
        <div className="specimen__label">Disabled</div>
      </section>
      <section className="specimen specimen--stack">
        <Field invalid name="password">
          <Field.Label required>Password</Field.Label>
          <Input type="password" />
          <Field.Error match>Must be at least 8 characters</Field.Error>
        </Field>
        <div className="specimen__label">Validation</div>
      </section>
      <section className="specimen specimen--stack">
        <TextFieldControlledDemo />
        <div className="specimen__label">Controlled</div>
      </section>
      <section className="specimen specimen--stack">
        <Field fullWidth name="full-width-field">
          <Field.Label>Display name</Field.Label>
          <Input fullWidth placeholder="Spans the container" />
        </Field>
        <div className="specimen__label">Full width</div>
      </section>
      <section className="specimen specimen--stack">
        <Field name="type">
          <Field.Label>Contact email</Field.Label>
          <Input placeholder="you@example.com" type="email" />
        </Field>
        <Field name="type-password">
          <Field.Label>API key</Field.Label>
          <Input placeholder="sk_live_..." type="password" />
        </Field>
        <div className="specimen__label">Input types</div>
      </section>
      <section className="specimen specimen--stack">
        <Surface variant="secondary">
          <Field name="on-surface">
            <Field.Label>Company</Field.Label>
            <Input placeholder="Acme Inc." variant="secondary" />
          </Field>
        </Surface>
        <div className="specimen__label">In Surface</div>
      </section>
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
      <section className="specimen specimen--stack">
        <Field name="bio">
          <Field.Label>Bio</Field.Label>
          <Textarea placeholder="Tell us about yourself..." />
          <Field.Description>Minimum 20 characters.</Field.Description>
        </Field>
        <div className="specimen__label">Basic</div>
      </section>
      <section className="specimen specimen--stack">
        <Field name="notes">
          <Field.Label>Notes</Field.Label>
          <Textarea placeholder="Secondary variant" variant="secondary" />
        </Field>
        <div className="specimen__label">Secondary</div>
      </section>
      <section className="specimen specimen--stack">
        <Field name="tall">
          <Field.Label>Release notes</Field.Label>
          <Textarea rows={6} />
        </Field>
        <div className="specimen__label">Rows</div>
      </section>
      <section className="specimen specimen--stack">
        <Field name="readonly-notes">
          <Field.Label>Archived note</Field.Label>
          <Textarea defaultValue="This note can no longer be edited." disabled />
        </Field>
        <div className="specimen__label">Disabled</div>
      </section>
      <section className="specimen specimen--stack">
        <TextareaControlledDemo />
        <div className="specimen__label">Controlled</div>
      </section>
      <section className="specimen specimen--stack">
        <Field fullWidth name="full-width-bio">
          <Field.Label>Summary</Field.Label>
          <Textarea fullWidth placeholder="Spans the container" />
        </Field>
        <div className="specimen__label">Full width</div>
      </section>
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
      <section className="specimen specimen--stack">
        <Field name="quantity">
          <Field.Label>Quantity</Field.Label>
          <NumberField defaultValue={1} min={0} />
        </Field>
        <div className="specimen__label">Basic</div>
      </section>
      <section className="specimen specimen--stack">
        <Field name="seats">
          <Field.Label>Seats</Field.Label>
          <NumberField defaultValue={5} max={20} min={1} step={5} />
          <Field.Description>Sold in blocks of five.</Field.Description>
        </Field>
        <div className="specimen__label">Step and bounds</div>
      </section>
      <section className="specimen specimen--stack">
        <Field name="locked-count">
          <Field.Label>Allocated</Field.Label>
          <NumberField defaultValue={12} disabled />
        </Field>
        <div className="specimen__label">Disabled</div>
      </section>
      <section className="specimen specimen--stack">
        <NumberFieldControlledDemo />
        <div className="specimen__label">Controlled</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Format options</div>
      </section>
      <section className="specimen specimen--stack">
        <Field name="custom-glyphs">
          <Field.Label>Volume</Field.Label>
          <NumberField decrementLabel="◁" defaultValue={50} incrementLabel="▷" max={100} min={0} />
        </Field>
        <div className="specimen__label">Custom icons</div>
      </section>
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
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Grouped fields</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">On Surface</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Actions</div>
      </section>
    </div>
  );
}

export function SearchFieldPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Basic</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">With a value</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Disabled</div>
      </section>
      <section className="specimen specimen--stack">
        <SearchFieldControlledDemo />
        <div className="specimen__label">Controlled</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Full width</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Custom icon</div>
      </section>
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
      <section className="specimen">
        <CloseButton />
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen">
        <CloseButton disabled />
        <div className="specimen__label">Disabled</div>
      </section>
      <section className="specimen">
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
        <div className="specimen__label">Custom icon</div>
      </section>
    </div>
  );
}

export function ProgressBarPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <ProgressBar label="Uploading" showValue value={40} />
        <div className="specimen__label">With label and value</div>
      </section>
      <section className="specimen specimen--stack">
        <ProgressBar size="sm" value={30} />
        <ProgressBar value={55} />
        <ProgressBar size="lg" value={80} />
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen specimen--stack">
        <ProgressBar color="accent" value={45} />
        <ProgressBar color="success" value={60} />
        <ProgressBar color="warning" value={75} />
        <ProgressBar color="danger" value={90} />
        <div className="specimen__label">Colours</div>
      </section>
      <section className="specimen specimen--stack">
        <ProgressBar label="Preparing" value={null} />
        <div className="specimen__label">Indeterminate</div>
      </section>
      <section className="specimen specimen--stack">
        <ProgressBar label="Steps completed" max={10} min={0} showValue value={3} />
        <div className="specimen__label">Custom value scale</div>
      </section>
      <section className="specimen specimen--stack">
        <ProgressBar aria-label="Syncing files" value={65} />
        <div className="specimen__label">Without label</div>
      </section>
    </div>
  );
}

export function MeterPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <Meter label="Storage" showValue value={62} />
        <div className="specimen__label">With label and value</div>
      </section>
      <section className="specimen specimen--stack">
        <Meter size="sm" value={30} />
        <Meter value={55} />
        <Meter size="lg" value={80} />
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen specimen--stack">
        <Meter color="success" value={35} />
        <Meter color="warning" value={70} />
        <Meter color="danger" value={95} />
        <div className="specimen__label">Colours</div>
      </section>
      <section className="specimen specimen--stack">
        <Meter label="Score" max={10} min={0} showValue value={7} />
        <div className="specimen__label">Custom value scale</div>
      </section>
      <section className="specimen specimen--stack">
        <Meter aria-label="Battery level" value={45} />
        <div className="specimen__label">Without label</div>
      </section>
    </div>
  );
}
