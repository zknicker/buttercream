import type { ComponentDoc } from "../component-docs.tsx";

export const tooltipDoc: ComponentDoc = {
  usage:
    "Wrap a group of triggers in a shared Tooltip.Provider to get consistent show/hide delays (1500ms/500ms by default, hovering one tooltip shortens the wait before the next), then compose Tooltip, Tooltip.Trigger, and Tooltip.Content per instance. Content is the flattened shorthand — Portal, Positioner, and Popup wired together — and the right choice unless you need to portal to a themed subtree instead of document.body, in which case drop to the individual parts and pass container yourself. Pass arrow to render Tooltip.Arrow automatically, and side/sideOffset to control placement. Tooltip.Trigger's render prop swaps the rendered element for any custom trigger, including an icon-only button.",
  example:
    '<Tooltip.Provider>\n  <Tooltip>\n    <Tooltip.Trigger render={<Button variant="secondary" />}>Hover me</Tooltip.Trigger>\n    <Tooltip.Content arrow side="top">\n      Helpful context\n    </Tooltip.Content>\n  </Tooltip>\n</Tooltip.Provider>',
  api: [
    {
      component: "Tooltip.Provider",
      props: [
        {
          name: "delay",
          type: "number",
          defaultValue: "1500",
          description: "Milliseconds a trigger must be hovered/focused before its tooltip opens.",
        },
        {
          name: "closeDelay",
          type: "number",
          defaultValue: "500",
          description: "Milliseconds after the pointer leaves before the tooltip closes.",
        },
        {
          name: "...props",
          type: "Base UI Provider props",
          description: "Shares open-state timing across every Tooltip nested inside it.",
        },
      ],
    },
    {
      component: "Tooltip",
      props: [
        {
          name: "...props",
          type: "Base UI Root props",
          description: "Open state, default open, and onOpenChange for one trigger/content pair.",
        },
      ],
    },
    {
      component: "Tooltip.Trigger",
      props: [
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description:
            "Replaces the rendered <button> with a custom element or component; render as {<Button />}",
        },
        {
          name: "...props",
          type: "Base UI Trigger props",
          description: "Native button attributes pass through, including disabled.",
        },
      ],
    },
    {
      component: "Tooltip.Content",
      props: [
        {
          name: "arrow",
          type: "boolean",
          defaultValue: "false",
          description: "Renders a Tooltip.Arrow inside the popup, pointed at the trigger.",
        },
        {
          name: "side",
          type: '"top" | "bottom" | "left" | "right" | "inline-end" | "inline-start"',
          defaultValue: '"top"',
          description:
            "Which side of the trigger the popup opens toward. Flips to fit the viewport.",
        },
        {
          name: "sideOffset",
          type: "number",
          defaultValue: "3 (7 with arrow)",
          description: "Gap between trigger and popup, in pixels.",
        },
        {
          name: "container",
          type: "Element | RefObject<Element> | (() => Element)",
          description:
            "Portal target. Pass the themed ancestor when the trigger sits inside a subtree with its own theme tokens — content portalled to document.body falls outside that subtree and loses them.",
        },
        {
          name: "className / positionerClassName",
          type: "string",
          description: "Extra classes on the popup and, separately, its positioner.",
        },
        {
          name: "...props",
          type: "Base UI Positioner props",
          description: "Collision handling, alignment, and anchor options pass through.",
        },
      ],
    },
    {
      component: "Tooltip.Popup",
      props: [
        {
          name: "...props",
          type: "Base UI Popup props",
          description:
            "Native div attributes and the render prop pass through. Used directly instead of Content when composing Portal/Positioner/Popup manually.",
        },
      ],
    },
    {
      component: "Tooltip.Positioner",
      props: [
        {
          name: "side / sideOffset",
          type: "see Tooltip.Content",
          defaultValue: '"top" / 0',
          description:
            "Same anchor-positioning options as Tooltip.Content, for manual Portal/Positioner/Popup composition. sideOffset defaults to 0 here — Content's default is our wrapper's choice, not Base UI's.",
        },
      ],
    },
    {
      component: "Tooltip.Arrow",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description:
            "Custom arrow content; defaults to the built-in SVG notch filled with the overlay colour.",
        },
        {
          name: "...props",
          type: "Base UI Arrow props",
          description: "Native div attributes and the render prop pass through.",
        },
      ],
    },
    {
      component: "Tooltip.Portal",
      props: [
        {
          name: "container",
          type: "Element | RefObject<Element> | (() => Element)",
          description: "Portal target, same as Tooltip.Content's container.",
        },
        {
          name: "...props",
          type: "Base UI Portal props",
          description:
            "Used when composing Portal/Positioner/Popup manually instead of via Content.",
        },
      ],
    },
    {
      component: "Tooltip.Viewport",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description:
            "Only needed when one popup is shared by multiple triggers and its content should animate as it switches between them.",
        },
      ],
    },
  ],
  classes: [
    {
      name: ".tooltip__trigger",
      description:
        "The trigger element, wherever render points it; a hook class with no styles of its own.",
    },
    {
      name: ".tooltip__positioner",
      description: "The positioning wrapper; sizing and z-index only, no visuals.",
    },
    {
      name: ".tooltip__popup",
      description: "The visible bubble — background, padding, and the open/close transition.",
    },
    {
      name: ".tooltip__arrow",
      description:
        "The notch rendered by Tooltip.Arrow — an SVG filled with the overlay colour, pointed at the trigger.",
    },
    {
      name: ".tooltip__viewport",
      description:
        "The content-transition wrapper rendered by Tooltip.Viewport; a hook class with no styles of its own.",
    },
  ],
};
