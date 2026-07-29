import { Autocomplete, Button, Checkbox, CheckboxGroup, InputOTP } from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import { Specimen } from "./preview-specimen.tsx";
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
      <Specimen className="specimen--stack" label="Default">
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
      </Specimen>
      <Specimen className="specimen--stack" label="In surface">
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
      </Specimen>
      <Specimen className="specimen--stack" label="Indeterminate">
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
      </Specimen>
      <Specimen className="specimen--stack" label="Disabled">
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
      </Specimen>
      <Specimen className="specimen--stack" label="Custom render">
        {/* render swaps the group's own <div> for a semantic <fieldset>; children are unaffected. */}
        <CheckboxGroup label="Notify me by" render={<fieldset />}>
          <Checkbox value="email">Email</Checkbox>
          <Checkbox value="sms">SMS</Checkbox>
          <Checkbox value="push">Push</Checkbox>
        </CheckboxGroup>
      </Specimen>
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
  const petsWithDisabled = (pet: string) => (
    <Autocomplete.Item disabled={pet === "Hamster"} key={pet} value={pet}>
      {pet}
    </Autocomplete.Item>
  );

  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Default">
        <Autocomplete
          container={surface}
          defaultValue="Cat"
          items={PETS}
          label="Favorite animal"
          placeholder="Select one"
        >
          {pets}
        </Autocomplete>
      </Specimen>
      <Specimen className="specimen--stack" label="With description">
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
      </Specimen>
      <Specimen className="specimen--stack" label="Disabled">
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
      </Specimen>
      <Specimen className="specimen--stack" label="Clearable">
        <Autocomplete
          clearable
          container={surface}
          defaultValue="Cat"
          items={PETS}
          label="Favorite animal"
          placeholder="Select one"
        >
          {pets}
        </Autocomplete>
      </Specimen>
      <Specimen className="specimen--stack" label="Multiple selection">
        <Autocomplete
          clearable
          container={surface}
          defaultValue={["Cat", "Dog"]}
          items={PETS}
          label="Favorite animals"
          multiple
          placeholder="Select one or more"
        >
          {pets}
        </Autocomplete>
      </Specimen>
      <Specimen className="specimen--stack" label="Disabled option">
        <Autocomplete
          container={surface}
          defaultValue="Cat"
          items={PETS}
          label="Favorite animal"
          placeholder="Select one"
        >
          {petsWithDisabled}
        </Autocomplete>
      </Specimen>
    </div>
  );
}

export function InputOTPPreview(): ReactElement {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [completedCode, setCompletedCode] = useState<string | null>(null);
  const invalid = submitted && code !== "123456";

  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Default">
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
      </Specimen>
      <Specimen className="specimen--stack" label="Four digits">
        <div className="otp-demo">
          <div className="otp-demo__title">Enter PIN</div>
          <InputOTP length={4} />
        </div>
      </Specimen>
      <Specimen className="specimen--stack" label="Letters only">
        <div className="otp-demo">
          <div className="otp-demo__title">Enter code (letters only)</div>
          <InputOTP length={6} validationType="alpha" />
          <div className="otp-demo__hint">Only alphabetic characters are allowed</div>
        </div>
      </Specimen>
      <Specimen className="specimen--stack" label="Controlled">
        <div className="otp-demo">
          <div className="otp-demo__title">Verify account</div>
          <InputOTP groupSize={3} length={6} onValueChange={setCode} value={code} />
          <div className="otp-demo__hint">Enter a 6-digit code</div>
        </div>
      </Specimen>
      <Specimen className="specimen--stack" label="Validation">
        <div className="otp-demo">
          <div className="otp-demo__title">Verify account</div>
          <InputOTP groupSize={3} length={6} onValueChange={setCode} value={code} />
          <div className="otp-demo__hint">Hint: The code is 123456</div>
          {invalid ? <div className="otp-demo__error">Invalid code. Please try again.</div> : null}
          <Button onClick={() => setSubmitted(true)} size="sm">
            Submit
          </Button>
        </div>
      </Specimen>
      <Specimen className="specimen--stack" label="Disabled">
        <div className="otp-demo">
          <div className="otp-demo__title">Verify account</div>
          <InputOTP disabled groupSize={3} length={6} />
          <div className="otp-demo__hint">Code verification is currently disabled</div>
        </div>
      </Specimen>
      <Specimen className="specimen--stack" label="On complete">
        <div className="otp-demo">
          <div className="otp-demo__title">Enter code</div>
          <InputOTP groupSize={3} length={6} onValueComplete={setCompletedCode} />
          <div className="otp-demo__hint">
            {completedCode === null ? "Fill all six digits" : `Completed: ${completedCode}`}
          </div>
        </div>
      </Specimen>
      <Specimen className="specimen--stack" label="In surface">
        <div className="preview-block">
          <div className="otp-demo">
            <div className="otp-demo__title">Verify account</div>
            <InputOTP groupSize={3} length={6} />
          </div>
        </div>
      </Specimen>
    </div>
  );
}
