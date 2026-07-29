import type { ComponentDoc } from "../component-docs.tsx";

export const autocompleteDoc: ComponentDoc = {
  usage:
    "Autocomplete is a select whose list you can search: the chosen value shows in a closed trigger, with the search box living inside the popup rather than the field itself. Pass items and render each with Autocomplete.Item; set multiple to collect several values as removable chips instead of one, and clearable to add a button that empties the field (chips or not). label, description, placeholder and searchPlaceholder cover the trigger and search copy, and container portals the popup into a themed subtree. Standard field props — disabled, required, invalid, name, value/defaultValue, onValueChange, open/onOpenChange — pass straight through to the underlying Base UI Combobox.Root.",
  example:
    '<Autocomplete items={pets} label="Favorite animal" multiple clearable>\n  {(pet) => <Autocomplete.Item key={pet} value={pet}>{pet}</Autocomplete.Item>}\n</Autocomplete>',
  api: [
    {
      component: "Autocomplete",
      props: [
        {
          name: "children",
          type: "ReactNode | ((item: Item, index: number) => ReactNode)",
          description: "Autocomplete.Item elements, or a function that renders one per item.",
        },
        {
          name: "items",
          type: "readonly Item[]",
          description: "The data driving the list. Each item is handed to children.",
        },
        {
          name: "multiple",
          type: "boolean",
          defaultValue: "false",
          description: "Collects several values as removable chips instead of one closed value.",
        },
        {
          name: "value / defaultValue",
          type: "Value | Value[] | null",
          description:
            "The selected value(s) — an array when multiple. Controlled or uncontrolled.",
        },
        {
          name: "onValueChange",
          type: "(value, eventDetails) => void",
          description: "Fires when the selection changes.",
        },
        {
          name: "clearable",
          type: "boolean",
          defaultValue: "false",
          description:
            "Adds a button that empties the field. Only rendered while there is something to clear.",
        },
        {
          name: "clearLabel",
          type: "string",
          defaultValue: '"Clear selection"',
          description: "Announced on the clear button, which is otherwise only a glyph.",
        },
        {
          name: "removeLabel",
          type: "(label: string) => string",
          defaultValue: '(value) => "Remove " + value',
          description: "Announced on a chip's remove button. Receives the chip's text.",
        },
        {
          name: "container",
          type: "HTMLElement | null",
          description:
            "Where the popup is portalled. Pass the themed subtree when tokens are scoped to one.",
        },
        {
          name: "label",
          type: "ReactNode",
          description: "Field label, rendered above the trigger.",
        },
        {
          name: "description",
          type: "ReactNode",
          description: "Help text under the field. Hidden while an errorMessage is shown instead.",
        },
        {
          name: "errorMessage",
          type: "ReactNode",
          description: "Rendered under the field while invalid. Replaces the description.",
        },
        {
          name: "invalid",
          type: "boolean",
          defaultValue: "false",
          description: "Marks the field invalid and switches the description for errorMessage.",
        },
        {
          name: "placeholder",
          type: "ReactNode",
          description: "Sits in the trigger before anything is chosen.",
        },
        {
          name: "searchPlaceholder",
          type: "string",
          defaultValue: '"Search…"',
          description: "Placeholder for the search input inside the popup.",
        },
        {
          name: "emptyMessage",
          type: "ReactNode",
          defaultValue: '"No results"',
          description: "Shown in the popup when the query matches nothing.",
        },
        {
          name: "icon",
          type: "ReactNode",
          description:
            "Replaces the chevron. The default one rotates when the popup is open; a custom one does not.",
        },
        {
          name: "loading",
          type: "boolean",
          defaultValue: "false",
          description:
            "Swaps the chevron for the shared Spinner. The list stays usable while it spins.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Control height and padding step.",
        },
        {
          name: "variant",
          type: '"primary" | "secondary"',
          defaultValue: '"primary"',
          description: "Shadowed field vs. flat, filled field.",
        },
        {
          name: "fullWidth",
          type: "boolean",
          defaultValue: "false",
          description: "Stretches the field across its container.",
        },
        {
          name: "triggerLabel",
          type: "string",
          defaultValue: '"Show suggestions"',
          description: "Announced on the button that opens the popup in multiple mode.",
        },
        {
          name: "disabled / required / readOnly / name",
          type: "boolean | boolean | boolean | string",
          defaultValue: "false",
          description:
            "Standard field and form wiring, forwarded to the underlying Base UI Combobox.Root.",
        },
        {
          name: "...props",
          type: "Base UI Combobox.Root props",
          description:
            "open/defaultOpen/onOpenChange, itemToStringLabel, filter, and the rest pass through.",
        },
      ],
    },
    {
      component: "Autocomplete.Item",
      props: [
        {
          name: "value",
          type: "Value",
          description: "The item's identity, compared against the field's selected value.",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "The item's visible content.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Ignores interaction for this item and dims it.",
        },
      ],
    },
    {
      component: "Autocomplete.Group",
      props: [
        {
          name: "label",
          type: "ReactNode",
          description: "The heading rendered above the group.",
        },
        {
          name: "children",
          type: "ReactNode",
          description:
            "Give the root grouped items — [{ value, items }] — and put an Autocomplete.Collection inside so the group's items filter too.",
        },
      ],
    },
  ],
  classes: [
    { name: ".autocomplete", description: "Field container." },
    {
      name: ".autocomplete--secondary",
      description: "Flat, filled variant instead of the shadowed default.",
    },
    { name: ".autocomplete--sm / .autocomplete--lg", description: "Non-default sizes." },
    { name: ".autocomplete--invalid", description: "Fields with invalid set." },
    { name: ".autocomplete--full-width", description: "Fields with fullWidth set." },
    { name: ".autocomplete--multiple", description: "Fields with multiple set." },
    { name: ".autocomplete__label", description: "The field label." },
    {
      name: ".autocomplete__control",
      description: "Wraps the single-select trigger and its clear button.",
    },
    {
      name: ".autocomplete__trigger",
      description: "The closed-value button in single-select mode.",
    },
    {
      name: ".autocomplete__chips",
      description: "The chip row and typeahead input in multiple mode.",
    },
    {
      name: ".autocomplete__chip / .autocomplete__chip-remove",
      description: "One selected value and its remove button.",
    },
    { name: ".autocomplete__chips-input", description: "The typeahead input among the chips." },
    {
      name: ".autocomplete__value",
      description: "The selected value's text in single-select mode.",
    },
    {
      name: ".autocomplete__placeholder",
      description: "Placeholder text shown before a value is chosen.",
    },
    { name: ".autocomplete__chevron", description: "The default open/close indicator." },
    { name: ".autocomplete__spinner", description: "Indicator shown while loading is set." },
    { name: ".autocomplete__clear", description: "The clear-selection button." },
    {
      name: ".autocomplete__toggle",
      description: "The button that opens the popup in multiple mode.",
    },
    { name: ".autocomplete__description", description: "Help text under the field." },
    {
      name: ".autocomplete__error",
      description: "Error text shown in place of the description while invalid.",
    },
    {
      name: ".autocomplete__popup",
      description: "The dropdown surface. Has --sm / --lg size modifiers.",
    },
    {
      name: ".autocomplete__search",
      description: "The search row pinned to the top of the popup.",
    },
    { name: ".autocomplete__input", description: "The search input inside the popup." },
    { name: ".autocomplete__list", description: "The scrollable list of items." },
    {
      name: ".autocomplete__group / .autocomplete__group-label",
      description: "A titled run of items and its heading.",
    },
    { name: ".autocomplete__item", description: "One selectable row." },
    {
      name: ".autocomplete__item-indicator / .autocomplete__check",
      description: "The selected-item checkmark.",
    },
    { name: ".autocomplete__empty", description: "The no-results message." },
  ],
};

export const checkboxGroupDoc: ComponentDoc = {
  usage:
    "CheckboxGroup collects a set of related Checkbox controls under one shared label and description, so the individual boxes don't have to repeat the context — the group wires aria-labelledby and aria-describedby automatically. Manage the array of checked values with value/onValueChange, or defaultValue for an uncontrolled group; disabled cascades to every checkbox in the set. Combine with a Checkbox whose checked/indeterminate reflect the group's own state to build a parent 'select all' control.",
  example:
    '<CheckboxGroup label="Notify me by" description="Choose all that apply" value={value} onValueChange={setValue}>\n  <Checkbox value="email">Email</Checkbox>\n  <Checkbox value="sms">SMS</Checkbox>\n</CheckboxGroup>',
  api: [
    {
      component: "CheckboxGroup",
      props: [
        {
          name: "label",
          type: "ReactNode",
          description:
            "Names the set. Rendered above the checkboxes and wired via aria-labelledby.",
        },
        {
          name: "description",
          type: "ReactNode",
          description: "Help text under the label, wired via aria-describedby.",
        },
        {
          name: "value",
          type: "string[]",
          description: "Names of the checked checkboxes. Controlled — pair with onValueChange.",
        },
        {
          name: "defaultValue",
          type: "string[]",
          description:
            "Names of the checkboxes that are initially ticked, for an uncontrolled group.",
        },
        {
          name: "onValueChange",
          type: "(value: string[], eventDetails) => void",
          description: "Fires when a checkbox in the group is ticked or unticked.",
        },
        {
          name: "allValues",
          type: "string[]",
          description:
            "Names of every checkbox in the group. Use this when building a parent checkbox.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Ignores interaction for every checkbox in the set.",
        },
        {
          name: "...props",
          type: "Base UI CheckboxGroup props",
          description: "render and native div attributes pass through.",
        },
      ],
    },
  ],
  classes: [
    {
      name: ".checkbox-group",
      description: "Container for the label, description, and checkboxes.",
    },
    { name: ".checkbox-group__label", description: "The group's name." },
    { name: ".checkbox-group__description", description: "Help text under the label." },
  ],
};

export const inputOtpDoc: ComponentDoc = {
  usage:
    "InputOTP collects a verification code across a run of real inputs rather than a single field painted with boxes, so paste, autofill and the software keyboard all behave natively — pasting a whole code fills the run. Pass length for the slot count and groupSize to auto-chunk them with separators; groupSize={3} on a six-digit code reads as two runs of three. Control it with value/onValueChange or defaultValue, and hook onValueComplete to react once every slot is filled — an auto-submit flow can also set autoSubmit instead. validationType restricts which characters a slot accepts.",
  example: "<InputOTP length={6} groupSize={3} onValueComplete={(code) => verify(code)} />",
  api: [
    {
      component: "InputOTP",
      props: [
        {
          name: "length",
          type: "number",
          description: "Number of OTP input slots. Required.",
        },
        {
          name: "groupSize",
          type: "number",
          description:
            "How many slots sit between separators. Defaults to one unbroken run of length slots.",
        },
        {
          name: "validationType",
          type: '"numeric" | "alpha" | "alphanumeric" | "none"',
          defaultValue: '"numeric"',
          description: "Restricts which characters a slot accepts.",
        },
        {
          name: "value / defaultValue",
          type: "string",
          description: "The OTP value, controlled or uncontrolled.",
        },
        {
          name: "onValueChange",
          type: "(value: string, eventDetails) => void",
          description: "Fires whenever the value changes — typing, paste, or a keyboard edit.",
        },
        {
          name: "onValueComplete",
          type: "(value: string, eventDetails) => void",
          description:
            "Fires once every slot is filled, or when a complete value is pasted while the OTP is already complete.",
        },
        {
          name: "onValueInvalid",
          type: "(value: string, eventDetails) => void",
          description:
            "Fires when typed or pasted characters are rejected by validation before the value updates.",
        },
        {
          name: "normalizeValue",
          type: "(value: string) => string",
          description:
            "Custom normalizer run on every OTP normalization pass, after validationType filtering.",
        },
        {
          name: "autoSubmit",
          type: "boolean",
          defaultValue: "false",
          description: "Submits the owning form automatically once the OTP becomes complete.",
        },
        {
          name: "mask",
          type: "boolean",
          defaultValue: "false",
          description: "Masks entered characters, like a password field.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Ignores user interaction and dims the slots.",
        },
        {
          name: "readOnly",
          type: "boolean",
          defaultValue: "false",
          description: "Displays the value without allowing edits.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Requires a value before the owning form submits.",
        },
        {
          name: "name / form / autoComplete / id",
          type: "string",
          description:
            "Standard field and form wiring, forwarded to the slot inputs and hidden validation input.",
        },
        {
          name: "...props",
          type: "Base UI OTPField.Root props",
          description: "inputMode and the rest pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".input-otp", description: "Container for every run of slots." },
    {
      name: ".input-otp__run",
      description: "One run of slots together with the separator that precedes it.",
    },
    { name: ".input-otp__group", description: "The slots within a single run." },
    { name: ".input-otp__slot", description: "One digit input." },
    { name: ".input-otp__separator", description: "The dash between runs." },
  ],
};
