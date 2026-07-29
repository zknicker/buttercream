import type { ComponentDoc } from "../component-docs.tsx";

export const sliderDoc: ComponentDoc = {
  usage:
    "Use Slider for picking one value or a range within bounds — volume, price, a percentage. Pass label and defaultValue (or value for a controlled slider) for the common case: it renders a header with the label and a live value readout above a draggable track. Multiple thumbs are inferred automatically from an array value — pass thumbLabels alongside for accessible per-thumb names. size picks sm/md/lg, and orientation switches to a vertical layout. For anything beyond the default layout — a custom output format, a repositioned value slot — pass children and compose Slider.Control/Track/Indicator/Thumb/Label/Value directly.",
  example: '<Slider defaultValue={30} label="Volume" />',
  api: [
    {
      component: "Slider",
      props: [
        {
          name: "label",
          type: "string",
          description: "Header label text. Omit along with showValue to skip the header entirely.",
        },
        {
          name: "showValue",
          type: "boolean",
          defaultValue: "true",
          description: "Toggles the built-in value readout in the header.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Track and thumb scale variant.",
        },
        {
          name: "thumbLabels",
          type: "readonly string[]",
          description: "Per-thumb aria-label, matched by index for range sliders.",
        },
        {
          name: "defaultValue / value",
          type: "number | readonly number[]",
          description:
            "Uncontrolled starting value or controlled value. An array renders one thumb per entry.",
        },
        {
          name: "min / max / step",
          type: "number",
          defaultValue: "0 / 100 / 1",
          description: "Bounds and granularity the thumb snaps to.",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"horizontal"',
          description: "Layout axis; vertical sizes the control to a fixed height.",
        },
        {
          name: "format",
          type: "Intl.NumberFormatOptions",
          description: 'Formats the value readout, e.g. { style: "currency", currency: "USD" }.',
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Blocks interaction and dims the slider.",
        },
        {
          name: "children",
          type: "ReactNode",
          description:
            "Replaces the default header + Control/Track/Indicator/Thumb layout with a custom composition of the parts below.",
        },
        {
          name: "...props",
          type: "Base UI Slider.Root props",
          description:
            "onValueChange, onValueCommitted, name, form, and other native passthrough props.",
        },
      ],
    },
    {
      component: "Slider.Control",
      props: [
        {
          name: "...props",
          type: "Base UI Slider.Control props",
          description: "Wraps the track and thumb(s); positions the interactive hit area.",
        },
      ],
    },
    {
      component: "Slider.Track",
      props: [
        {
          name: "...props",
          type: "Base UI Slider.Track props",
          description: "The full-length background rail.",
        },
      ],
    },
    {
      component: "Slider.Indicator",
      props: [
        {
          name: "...props",
          type: "Base UI Slider.Indicator props",
          description:
            "The filled portion of the track between min (or the lower thumb) and the value.",
        },
      ],
    },
    {
      component: "Slider.Thumb",
      props: [
        {
          name: "index",
          type: "number",
          description:
            "Which value in the value/defaultValue array this thumb tracks. Required for SSR of range sliders.",
        },
        {
          name: "getAriaLabel",
          type: "(index: number) => string",
          description: "Returns the aria-label for the thumb's hidden range input.",
        },
        {
          name: "...props",
          type: "Base UI Slider.Thumb props",
          description: "The draggable handle; renders a nested input[type=range].",
        },
      ],
    },
    {
      component: "Slider.Label",
      props: [
        {
          name: "...props",
          type: "Base UI Slider.Label props",
          description: "Associates a label with the slider's input(s).",
        },
      ],
    },
    {
      component: "Slider.Value",
      props: [
        {
          name: "children",
          type: "(formattedValues: readonly string[], values: readonly number[]) => ReactNode",
          description: "Renders the readout yourself instead of the plain formatted text.",
        },
        {
          name: "...props",
          type: "Base UI Slider.Value props",
          description: "Renders an <output> holding the current formatted value(s).",
        },
      ],
    },
  ],
  classes: [
    {
      name: ".slider",
      description: "Root container; carries the size modifier and orientation data attribute.",
    },
    { name: ".slider__header", description: "Row wrapping the label and value readout." },
    { name: ".slider__label", description: "The label text." },
    { name: ".slider__output", description: "The value readout." },
    {
      name: ".slider__control",
      description: "Interactive hit area wrapping the track and thumb(s).",
    },
    { name: ".slider__track", description: "The full-length background rail." },
    { name: ".slider__fill", description: "The filled portion of the track (Slider.Indicator)." },
    { name: ".slider__thumb", description: "The draggable handle." },
    { name: ".slider--sm / .slider--lg", description: "Non-default size variants." },
  ],
};
