import { Field, Fieldset, Input, NumberField, Textarea } from "@buttercream/react";
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
