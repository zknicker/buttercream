import {
  CloseButton,
  Field,
  Fieldset,
  Input,
  Meter,
  NumberField,
  ProgressBar,
  SearchField,
  Textarea,
} from "@buttercream/react";
import type { ReactElement } from "react";

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
    </div>
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
    </div>
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
    </div>
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
    </div>
  );
}

export function SearchFieldPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <Field name="search">
          <Field.Label>Search</Field.Label>
          <SearchField placeholder="Search..." />
        </Field>
        <div className="specimen__label">Basic</div>
      </section>
      <section className="specimen specimen--stack">
        <Field name="search-products">
          <Field.Label>Search products</Field.Label>
          <SearchField defaultValue="running shoes" />
          <Field.Description>Enter keywords to search for products</Field.Description>
        </Field>
        <div className="specimen__label">With a value</div>
      </section>
      <section className="specimen specimen--stack">
        <Field name="search-disabled">
          <Field.Label>Search archive</Field.Label>
          <SearchField disabled placeholder="Unavailable" />
        </Field>
        <div className="specimen__label">Disabled</div>
      </section>
    </div>
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
    </div>
  );
}
