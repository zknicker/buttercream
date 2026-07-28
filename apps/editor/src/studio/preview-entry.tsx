import { Autocomplete, Button, Checkbox, CheckboxGroup, InputOTP } from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import { usePreviewSurface } from "./preview-surface.tsx";

/* The reference's own copy, so the two pages can be read side by side. */
const INTERESTS = [
  { description: "Love building software", label: "Coding" },
  { description: "Enjoy creating beautiful interfaces", label: "Design" },
  { description: "Passionate about content creation", label: "Writing" },
];

const PETS = ["Cat", "Dog", "Rabbit", "Hamster"];

export function CheckboxGroupPreview(): ReactElement {
  const [checked, setChecked] = useState<string[]>(["Coding"]);
  const all = INTERESTS.map((interest) => interest.label);
  const some = checked.length > 0 && checked.length < all.length;

  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <CheckboxGroup description="Choose all that apply" label="Select your interests">
          {INTERESTS.map((interest) => (
            <Checkbox
              description={interest.description}
              key={interest.label}
              value={interest.label}
            >
              {interest.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen specimen--stack">
        <div className="preview-block">
          <CheckboxGroup description="Choose all that apply" label="Select your interests">
            {INTERESTS.map((interest) => (
              <Checkbox
                description={interest.description}
                key={interest.label}
                value={interest.label}
              >
                {interest.label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
        <div className="specimen__label">In surface</div>
      </section>
      <section className="specimen specimen--stack">
        {/*
         * The parent is indeterminate whenever the set is partly checked, which is the state a
         * plain boolean cannot express — neither on nor off, but "some of these".
         */}
        <CheckboxGroup onValueChange={setChecked} value={checked}>
          <Checkbox
            checked={checked.length === all.length}
            indeterminate={some}
            onCheckedChange={(next) => setChecked(next ? all : [])}
          >
            Select all
          </Checkbox>
          {INTERESTS.map((interest) => (
            <Checkbox key={interest.label} value={interest.label}>
              {interest.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <div className="specimen__label">Indeterminate</div>
      </section>
      <section className="specimen specimen--stack">
        <CheckboxGroup
          description="Feature selection is temporarily disabled"
          disabled
          label="Features"
        >
          <Checkbox description="This feature is coming soon" value="one">
            Feature 1
          </Checkbox>
          <Checkbox description="This feature is coming soon" value="two">
            Feature 2
          </Checkbox>
        </CheckboxGroup>
        <div className="specimen__label">Disabled</div>
      </section>
    </div>
  );
}

export function AutocompletePreview(): ReactElement {
  const surface = usePreviewSurface();
  const pets = (pet: string) => (
    <Autocomplete.Item key={pet} value={pet}>
      {pet}
    </Autocomplete.Item>
  );

  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <Autocomplete
          container={surface}
          defaultValue="Cat"
          items={PETS}
          label="Favorite animal"
          placeholder="Select one"
        >
          {pets}
        </Autocomplete>
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen specimen--stack">
        <Autocomplete
          container={surface}
          defaultValue="Cat"
          description="Pick one pet to personalize recommendations."
          items={PETS}
          label="Favorite animal"
          placeholder="Select one"
        >
          {pets}
        </Autocomplete>
        <div className="specimen__label">With description</div>
      </section>
      <section className="specimen specimen--stack">
        <Autocomplete
          container={surface}
          defaultValue="Cat"
          disabled
          items={PETS}
          label="Favorite animal"
          placeholder="Select one"
        >
          {pets}
        </Autocomplete>
        <div className="specimen__label">Disabled</div>
      </section>
    </div>
  );
}

export function InputOTPPreview(): ReactElement {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const invalid = submitted && code !== "123456";

  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <div className="otp-demo">
          <div className="otp-demo__title">Verify account</div>
          <div className="otp-demo__hint">We&rsquo;ve sent a code to a****@gmail.com</div>
          <InputOTP groupSize={3} length={6} />
          <div className="otp-demo__hint">
            Didn&rsquo;t receive a code?{" "}
            <Button size="sm" variant="ghost">
              Resend
            </Button>
          </div>
        </div>
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen specimen--stack">
        <div className="otp-demo">
          <div className="otp-demo__title">Enter PIN</div>
          <InputOTP length={4} />
        </div>
        <div className="specimen__label">Four digits</div>
      </section>
      <section className="specimen specimen--stack">
        <div className="otp-demo">
          <div className="otp-demo__title">Enter code (letters only)</div>
          <InputOTP length={6} validationType="alpha" />
          <div className="otp-demo__hint">Only alphabetic characters are allowed</div>
        </div>
        <div className="specimen__label">Letters only</div>
      </section>
      <section className="specimen specimen--stack">
        <div className="otp-demo">
          <div className="otp-demo__title">Verify account</div>
          <InputOTP groupSize={3} length={6} onValueChange={setCode} value={code} />
          <div className="otp-demo__hint">Enter a 6-digit code</div>
        </div>
        <div className="specimen__label">Controlled</div>
      </section>
      <section className="specimen specimen--stack">
        <div className="otp-demo">
          <div className="otp-demo__title">Verify account</div>
          <InputOTP groupSize={3} length={6} onValueChange={setCode} value={code} />
          <div className="otp-demo__hint">Hint: The code is 123456</div>
          {invalid ? <div className="otp-demo__error">Invalid code. Please try again.</div> : null}
          <Button onClick={() => setSubmitted(true)} size="sm">
            Submit
          </Button>
        </div>
        <div className="specimen__label">Validation</div>
      </section>
      <section className="specimen specimen--stack">
        <div className="otp-demo">
          <div className="otp-demo__title">Verify account</div>
          <InputOTP disabled groupSize={3} length={6} />
          <div className="otp-demo__hint">Code verification is currently disabled</div>
        </div>
        <div className="specimen__label">Disabled</div>
      </section>
    </div>
  );
}
