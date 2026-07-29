import type { ComponentDoc } from "../component-docs.tsx";

export const closeButtonDoc: ComponentDoc = {
  usage:
    'CloseButton is a small round dismiss control for the corner of a dialog, a search field\'s clear affordance, or any dismissible content. Render it bare for the default X glyph, or pass children to swap in a custom icon — Base UI has no close-button primitive, so this is its Button with a built-in glyph. label sets the accessible name announced in place of the (decorative) glyph, defaulting to "Close"; disabled and onClick behave like any button.',
  example: '<CloseButton aria-label="Dismiss" onClick={dismiss} />',
  api: [
    {
      component: "CloseButton",
      props: [
        {
          name: "label",
          type: "string",
          defaultValue: '"Close"',
          description: "Accessible name announced in place of the glyph, which is decorative.",
        },
        {
          name: "variant",
          type: '"default"',
          defaultValue: '"default"',
          description: "Single fixed visual style; kept as a prop for parity with other controls.",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Replaces the default X glyph outright when given.",
        },
        {
          name: "...props",
          type: "Base UI Button props",
          description:
            "Native button attributes (disabled, onClick, ...) and the render prop pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".close-button", description: "The round control." },
    { name: ".close-button--default", description: "The (only) variant modifier." },
  ],
};

export const fieldsetDoc: ComponentDoc = {
  usage:
    "Use Fieldset to group related Field controls under a shared legend, such as a billing-address or profile section of a form. Wrap fields in Fieldset.Group for consistent spacing between them, label the group with Fieldset.Legend, and place submit or cancel controls in Fieldset.Actions below. Group and Actions are plain layout slots — Base UI has no primitive for either — while Legend renders onto a native <legend> so the fieldset stays correctly labelled.",
  example:
    '<Fieldset>\n  <Fieldset.Legend>Billing address</Fieldset.Legend>\n  <Fieldset.Group>\n    <Field name="street">\n      <Field.Label>Street</Field.Label>\n      <Input />\n    </Field>\n  </Fieldset.Group>\n</Fieldset>',
  api: [
    {
      component: "Fieldset",
      props: [
        {
          name: "...props",
          type: "Base UI Fieldset.Root props",
          description:
            "Native fieldset attributes (disabled, name, form, ...) and the render prop pass through.",
        },
      ],
    },
    {
      component: "Fieldset.Legend",
      props: [
        {
          name: "...props",
          type: "Base UI Fieldset.Legend props",
          description: "Native legend attributes; always renders onto a real <legend> element.",
        },
      ],
    },
    {
      component: "Fieldset.Group",
      props: [
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"div">',
          description: "A plain div; native attributes pass through.",
        },
      ],
    },
    {
      component: "Fieldset.Actions",
      props: [
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"div">',
          description: "A plain div; native attributes pass through.",
        },
      ],
    },
  ],
  classes: [
    {
      name: ".fieldset",
      description:
        "Root container; column layout with spacing between the legend, groups, and actions.",
    },
    { name: ".fieldset__legend", description: "The legend element." },
    {
      name: ".fieldset__field-group",
      description: "A Group wrapper; spaces the fields it contains.",
    },
    { name: ".fieldset__actions", description: "The action row below the fields." },
  ],
};

export const textFieldDoc: ComponentDoc = {
  usage:
    "Field wraps a labelled control — an Input, Textarea, NumberField, or SearchField — so label association, disabled/invalid state, and description-vs-error swapping are handled for you. Pass name to identify the field on submission and disabled to lock every part at once; invalid (or validate/validationMode, passed straight through to Base UI) drives the invalid styling and swaps Field.Description for Field.Error automatically in the stylesheet. Field.Label takes its own required prop for the decorative asterisk — the control still needs its own native required for the actual constraint. Compose exactly one of Field.Description or Field.Error per field.",
  example:
    '<Field invalid name="email">\n  <Field.Label required>Email</Field.Label>\n  <Input type="email" />\n  <Field.Error match>Enter a valid email address</Field.Error>\n</Field>',
  api: [
    {
      component: "Field",
      props: [
        {
          name: "fullWidth",
          type: "boolean",
          defaultValue: "false",
          description: "Stretches the field to fill its container.",
        },
        {
          name: "name",
          type: "string",
          description: "Identifies the field when a form is submitted.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Disables every part of the field at once.",
        },
        {
          name: "invalid",
          type: "boolean",
          description: "Marks the field invalid; useful when validity is controlled externally.",
        },
        {
          name: "validate",
          type: "(value: unknown, formValues: Form.Values) => string | string[] | null | Promise<...>",
          description: "Custom validation; return an error message, an array of messages, or null.",
        },
        {
          name: "validationMode",
          type: '"onSubmit" | "onBlur" | "onChange"',
          defaultValue: '"onSubmit"',
          description: "When validate runs.",
        },
        {
          name: "...props",
          type: "Base UI Field.Root props",
          description: "touched, dirty, actionsRef, and the render prop pass through.",
        },
      ],
    },
    {
      component: "Field.Label",
      props: [
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Adds a decorative asterisk; does not set the control's own required.",
        },
        {
          name: "...props",
          type: "Base UI Field.Label props",
          description:
            "Automatically associates with the field's control; native label attributes pass through.",
        },
      ],
    },
    {
      component: "Field.Description",
      props: [
        {
          name: "...props",
          type: "Base UI Field.Description props",
          description: "Renders a <p>; native attributes pass through.",
        },
      ],
    },
    {
      component: "Field.Error",
      props: [
        {
          name: "match",
          type: "boolean | keyof ValidityState",
          description:
            "Controls when the error shows; true always shows it regardless of ValidityState.",
        },
        {
          name: "...props",
          type: "Base UI Field.Error props",
          description: "Native div attributes pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".field", description: "Root container; column layout with a small gap." },
    { name: ".field--full-width", description: "Fields with fullWidth set." },
    { name: ".label", description: "Field.Label." },
    { name: ".label--required", description: "Labels with required set; renders the asterisk." },
    { name: ".label--disabled", description: "Labels inside a disabled field." },
    { name: ".label--invalid", description: "Labels inside an invalid field." },
    {
      name: ".description",
      description: "Field.Description; hidden automatically while the field is invalid.",
    },
    { name: ".field-error", description: "Field.Error." },
  ],
};

export const meterDoc: ComponentDoc = {
  usage:
    "Use Meter for a static reading within a known range — disk used, quota remaining, a score — anywhere ProgressBar's task-in-motion semantics do not fit. Pass value (min/max default to 0/100) plus label and showValue to render a labelled track with a live numeric readout. color communicates status (accent/success/warning/danger) and size adjusts track thickness. Value formatting goes through format/locale/getAriaValueText, and there is no indeterminate state since a meter always reports a known measurement.",
  example: '<Meter color="warning" label="Storage" showValue value={82} />',
  api: [
    {
      component: "Meter",
      props: [
        {
          name: "value",
          type: "number",
          description: "The current reading.",
        },
        {
          name: "min",
          type: "number",
          defaultValue: "0",
          description: "The minimum value.",
        },
        {
          name: "max",
          type: "number",
          defaultValue: "100",
          description: "The maximum value.",
        },
        {
          name: "label",
          type: "ReactNode",
          description: "Renders a Meter.Label above the track; omitted entirely when not given.",
        },
        {
          name: "showValue",
          type: "boolean",
          defaultValue: "false",
          description: "Renders the formatted value beside the label.",
        },
        {
          name: "color",
          type: '"default" | "accent" | "success" | "warning" | "danger"',
          defaultValue: '"default"',
          description: "Fill colour of the indicator.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Track thickness.",
        },
        {
          name: "format",
          type: "Intl.NumberFormatOptions",
          description: "Formatting options applied to the displayed value.",
        },
        {
          name: "...props",
          type: "Base UI Meter.Root props",
          description:
            "locale, getAriaValueText, aria-valuetext, and the render prop pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".meter", description: "Root container." },
    { name: ".meter__label", description: "The label, when label is given." },
    { name: ".meter__output", description: "The value text, when showValue is set." },
    { name: ".meter__track", description: "The track background." },
    { name: ".meter__fill", description: "The filled indicator." },
    { name: ".meter--sm / .meter--lg", description: "Non-default sizes." },
    {
      name: ".meter--accent / .meter--success / .meter--warning / .meter--danger",
      description: "Non-default colours.",
    },
  ],
};

export const numberFieldDoc: ComponentDoc = {
  usage:
    "Use NumberField for a bounded numeric input with stepper buttons, such as quantities or seat counts. Set min/max/step to constrain the range and increment size, allowWheelScrub to let a focused, hovered field scrub with the mouse wheel, and rely on onValueChange (value: number | null) for controlled use. Swap the default −/+ glyphs via decrementLabel/incrementLabel when a custom icon set is needed. NumberField carries no label of its own — wrap it in Field for label, description, and error composition.",
  example:
    "<NumberField defaultValue={5} max={20} min={1} step={5}>\n  {/* Field.Label / Field.Description wrap this in practice */}\n</NumberField>",
  api: [
    {
      component: "NumberField",
      props: [
        {
          name: "value",
          type: "number | null",
          description: "The controlled numeric value.",
        },
        {
          name: "defaultValue",
          type: "number",
          description: "The uncontrolled initial value.",
        },
        {
          name: "min",
          type: "number",
          description: "The minimum value.",
        },
        {
          name: "max",
          type: "number",
          description: "The maximum value.",
        },
        {
          name: "step",
          type: 'number | "any"',
          defaultValue: "1",
          description: "Amount to increment/decrement with the buttons and arrow keys.",
        },
        {
          name: "smallStep",
          type: "number",
          defaultValue: "0.1",
          description: "Step used while incrementing with the alt key held.",
        },
        {
          name: "largeStep",
          type: "number",
          defaultValue: "10",
          description: "Step used while incrementing with the shift key held.",
        },
        {
          name: "decrementLabel",
          type: "ReactNode",
          defaultValue: '"−"',
          description: "Replaces the default minus glyph on the decrement stepper.",
        },
        {
          name: "incrementLabel",
          type: "ReactNode",
          defaultValue: '"+"',
          description: "Replaces the default plus glyph on the increment stepper.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Ignores user interaction.",
        },
        {
          name: "readOnly",
          type: "boolean",
          defaultValue: "false",
          description: "Blocks changes while keeping the field focusable.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Requires a value before form submission.",
        },
        {
          name: "allowWheelScrub",
          type: "boolean",
          defaultValue: "false",
          description: "Lets the mouse wheel change the value while focused and hovered.",
        },
        {
          name: "format",
          type: "Intl.NumberFormatOptions",
          description: "Formatting options applied to the displayed input value.",
        },
        {
          name: "onValueChange",
          type: "(value: number | null, eventDetails) => void",
          description:
            "Fires whenever the value changes, from typing, steppers, keyboard, wheel, or scrub.",
        },
        {
          name: "...props",
          type: "Base UI NumberField.Root props",
          description:
            "name, form, locale, allowOutOfRange, snapOnStep, inputRef, and the render prop pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".number-field", description: "Root container." },
    { name: ".number-field__group", description: "The bordered input/stepper group." },
    { name: ".number-field__input", description: "The numeric input." },
    { name: ".number-field__decrement", description: "The decrement stepper button." },
    { name: ".number-field__increment", description: "The increment stepper button." },
  ],
};

export const progressBarDoc: ComponentDoc = {
  usage:
    "Use ProgressBar to show a task advancing toward completion, with optional label and showValue for the live percentage. Pass value as a number (min/max default to 0/100, or set them for another scale) for determinate progress, or value={null} to switch to an indeterminate shuttle animation. color and size follow the same semantic tokens as Meter (default/accent/success/warning/danger, sm/md/lg) — the two components share a shape but report different things, a task in motion versus a static reading.",
  example: '<ProgressBar label="Uploading" showValue value={62} />',
  api: [
    {
      component: "ProgressBar",
      props: [
        {
          name: "value",
          type: "number | null",
          defaultValue: "null",
          description: "The current progress. null renders the indeterminate shuttle.",
        },
        {
          name: "min",
          type: "number",
          defaultValue: "0",
          description: "The minimum value.",
        },
        {
          name: "max",
          type: "number",
          defaultValue: "100",
          description: "The maximum value.",
        },
        {
          name: "label",
          type: "ReactNode",
          description: "Renders a Progress.Label above the track; omitted entirely when not given.",
        },
        {
          name: "showValue",
          type: "boolean",
          defaultValue: "false",
          description: "Renders the formatted value beside the label.",
        },
        {
          name: "color",
          type: '"default" | "accent" | "success" | "warning" | "danger"',
          defaultValue: '"default"',
          description: "Fill colour of the indicator.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Track thickness.",
        },
        {
          name: "format",
          type: "Intl.NumberFormatOptions",
          description: "Formatting options applied to the displayed value.",
        },
        {
          name: "...props",
          type: "Base UI Progress.Root props",
          description:
            "locale, getAriaValueText, aria-valuetext, and the render prop pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".progress-bar", description: "Root container." },
    { name: ".progress-bar__label", description: "The label, when label is given." },
    { name: ".progress-bar__output", description: "The value text, when showValue is set." },
    { name: ".progress-bar__track", description: "The track background." },
    {
      name: ".progress-bar__fill",
      description: "The filled indicator; shuttles when value is null.",
    },
    { name: ".progress-bar--sm / .progress-bar--lg", description: "Non-default sizes." },
    {
      name: ".progress-bar--accent / .progress-bar--success / .progress-bar--warning / .progress-bar--danger",
      description: "Non-default colours.",
    },
  ],
};

export const searchFieldDoc: ComponentDoc = {
  usage:
    'SearchField is a search input built from Group, Input, SearchIcon, and ClearButton — compose all four inside the root, which tracks the current value and empty state and hands them down through context to its parts, the same split as NumberField. There is no built-in label or description slot: pair it with Field for that, so a second labelling path never competes with the first. clearLabel sets the clear button\'s accessible name (default "Clear search"); onClear fires when it is pressed, alongside clearing the value. fullWidth stretches the root to fill its container.',
  example:
    '<SearchField onClear={reset}>\n  <SearchField.Group>\n    <SearchField.SearchIcon />\n    <SearchField.Input placeholder="Search..." />\n    <SearchField.ClearButton />\n  </SearchField.Group>\n</SearchField>',
  api: [
    {
      component: "SearchField",
      props: [
        {
          name: "value",
          type: "string",
          description: "The controlled value.",
        },
        {
          name: "defaultValue",
          type: "string",
          description: "The uncontrolled initial value.",
        },
        {
          name: "onClear",
          type: "() => void",
          description: "Fires when the clear button is pressed, after the value resets.",
        },
        {
          name: "clearLabel",
          type: "string",
          defaultValue: '"Clear search"',
          description: "Accessible label for the clear button.",
        },
        {
          name: "fullWidth",
          type: "boolean",
          defaultValue: "false",
          description: "Stretches the root to fill its container.",
        },
        {
          name: "...props",
          type: 'Omit<ComponentPropsWithoutRef<"div">, "children">',
          description: "Native div attributes pass through to the root.",
        },
      ],
    },
    {
      component: "SearchField.Group",
      props: [
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"div">',
          description: "The bordered pill holding the icon, input, and clear button.",
        },
      ],
    },
    {
      component: "SearchField.Input",
      props: [
        {
          name: "...props",
          type: 'Base UI Input props (type fixed to "search")',
          description:
            "Native input attributes pass through; value/defaultValue come from the root.",
        },
      ],
    },
    {
      component: "SearchField.SearchIcon",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description: "Replaces the default search glyph outright when given.",
        },
        {
          name: "...props",
          type: 'ComponentPropsWithoutRef<"span">',
          description: "Native span attributes pass through.",
        },
      ],
    },
    {
      component: "SearchField.ClearButton",
      props: [
        {
          name: "onClick",
          type: "() => void",
          description: "Fires after onClear, in addition to it.",
        },
        {
          name: "...props",
          type: "CloseButton props (minus className, label, onClick)",
          description: "tabIndex is managed automatically: -1 while the field is empty.",
        },
      ],
    },
  ],
  classes: [
    { name: ".search-field", description: "Root container." },
    { name: ".search-field--full-width", description: "Roots with fullWidth set." },
    { name: ".search-field__group", description: "The bordered pill." },
    { name: ".search-field__icon", description: "SearchField.SearchIcon." },
    { name: ".search-field__input", description: "SearchField.Input." },
    {
      name: ".search-field__clear",
      description: "SearchField.ClearButton; fades out while the field is empty.",
    },
  ],
};

export const textareaDoc: ComponentDoc = {
  usage:
    'Use Textarea for multi-line free-text input such as bios, notes, or comments. Pass rows to size it, variant="secondary" to de-emphasize it inside a Surface, and fullWidth to span its container; it forwards standard textarea attributes (value, defaultValue, onChange, placeholder, disabled, readOnly, required, maxLength, wrap, etc.) since it is Base UI\'s Input rendered onto a <textarea> rather than a hand-rolled control, so it keeps the same validation plumbing as Input.',
  example: '<Textarea placeholder="Tell us about yourself..." rows={6} />',
  api: [
    {
      component: "Textarea",
      props: [
        {
          name: "variant",
          type: '"primary" | "secondary"',
          defaultValue: '"primary"',
          description: "Visual weight; secondary is flatter, meant for placement on a Surface.",
        },
        {
          name: "rows",
          type: "number",
          defaultValue: "3",
          description: "Visible text rows.",
        },
        {
          name: "fullWidth",
          type: "boolean",
          defaultValue: "false",
          description: "Stretches the field to fill its container.",
        },
        {
          name: "...props",
          type: "Base UI Input props (minus render)",
          description: "Native textarea attributes (value, disabled, maxLength, ...) pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".textarea", description: "The textarea element." },
    { name: ".textarea--secondary", description: "The secondary variant." },
    { name: ".textarea--full-width", description: "Textareas with fullWidth set." },
  ],
};
