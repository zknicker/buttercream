import type { ComponentDoc } from "../component-docs.tsx";

export const popoverDoc: ComponentDoc = {
  usage:
    "Use Popover to surface rich, focus-managed content anchored to a trigger — command menus, session details, profile cards — without a full modal. Wrap any trigger element with Popover.Trigger (its render prop accepts a custom element or a function of the trigger's own state), then compose Popover.Portal > Popover.Positioner > Popover.Popup, optionally adding Popover.Arrow, Popover.Backdrop, and Popover.Close. Popover.Content is a shorthand that wires Portal, Positioner, and Popup together in one call and is the right choice unless you need to reach into the intermediate parts, such as portalling to a themed subtree instead of document.body.",
  example:
    '<Popover>\n  <Popover.Trigger render={<Button variant="secondary" />}>Notifications</Popover.Trigger>\n  <Popover.Content arrow>\n    <Popover.Title>Shortcuts</Popover.Title>\n    <Popover.Description>Use the command palette to jump anywhere.</Popover.Description>\n    <Popover.Close />\n  </Popover.Content>\n</Popover>',
  api: [
    {
      component: "Popover",
      props: [
        {
          name: "open",
          type: "boolean",
          description: "Controlled open state.",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          defaultValue: "false",
          description: "Initial open state when uncontrolled.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean, eventDetails) => void",
          description: "Called when the popover opens or closes, with the reason it changed.",
        },
        {
          name: "onOpenChangeComplete",
          type: "(open: boolean) => void",
          description: "Called after the open/close transition finishes.",
        },
        {
          name: "modal",
          type: 'boolean | "trap-focus"',
          defaultValue: "false",
          description:
            'true locks page scroll and disables outside pointer interaction; "trap-focus" traps focus inside the popup without locking scroll. true requires a Popover.Close inside the popup so it stays dismissable.',
        },
        {
          name: "triggerId / defaultTriggerId",
          type: "string | null",
          description:
            "Associates a controlled (or initially open) popover with one of several triggers that share it.",
        },
        {
          name: "handle",
          type: "PopoverHandle",
          description: "Lets external triggers outside this tree open the popover.",
        },
        {
          name: "actionsRef",
          type: "RefObject<{ unmount(): void; close(): void }>",
          description: "Imperative escape hatch to close or force-unmount the popover.",
        },
        {
          name: "children",
          type: "ReactNode",
          description:
            "Popover.Trigger plus Popover.Content, or a manual Portal/Positioner/Popup composition.",
        },
      ],
    },
    {
      component: "Popover.Trigger",
      props: [
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Blocks opening the popover from this trigger.",
        },
        {
          name: "openOnHover",
          type: "boolean",
          defaultValue: "false",
          description: "Also opens the popover on hover, not just click/focus.",
        },
        {
          name: "delay / closeDelay",
          type: "number",
          defaultValue: "300 / 0",
          description: "Hover open/close delay in ms. Requires openOnHover.",
        },
        {
          name: "payload",
          type: "unknown",
          description: "Data handed to the popover's children when this trigger opens it.",
        },
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description:
            "Replaces the rendered <button> with a custom element or component, e.g. render={<Button />}.",
        },
        {
          name: "...props",
          type: "Base UI Trigger props",
          description: "Native button attributes pass through.",
        },
      ],
    },
    {
      component: "Popover.Content",
      props: [
        {
          name: "arrow",
          type: "boolean",
          defaultValue: "false",
          description: "Renders a Popover.Arrow inside the popup, pointed at the trigger.",
        },
        {
          name: "side",
          type: '"top" | "bottom" | "left" | "right" | "inline-end" | "inline-start"',
          defaultValue: '"bottom"',
          description:
            "Which side of the trigger the popup opens toward. Flips to fit the viewport.",
        },
        {
          name: "sideOffset",
          type: "number",
          defaultValue: "8",
          description: "Gap between trigger and popup, in pixels.",
        },
        {
          name: "align / alignOffset",
          type: '"start" | "center" | "end" / number',
          defaultValue: '"center" / 0',
          description: "Alignment along the chosen side, and a pixel nudge along that axis.",
        },
        {
          name: "collisionBoundary / collisionPadding",
          type: "Element | Element[] | Rect / number",
          defaultValue: "clipping ancestors / 5",
          description:
            "What the popup avoids overflowing, and how much space to keep from its edge.",
        },
        {
          name: "collisionAvoidance",
          type: "{ side?, align?, fallbackAxisSide? }",
          description:
            'How the popup reacts to running out of room — flip to the opposite side, shift to stay visible, or hold position. No plain on/off switch; pass { side: "none", align: "none" } to disable collision handling entirely.',
        },
        {
          name: "arrowPadding / sticky",
          type: "number / boolean",
          defaultValue: "5 / false",
          description:
            "Minimum distance to keep the arrow from the popup's corners, and whether the popup stays visible after its anchor scrolls off screen.",
        },
        {
          name: "container",
          type: "Element | RefObject<Element> | (() => Element)",
          description:
            "Portal target. Pass the themed ancestor when the trigger sits inside a subtree with its own theme tokens — content portalled to document.body falls outside that subtree and loses them.",
        },
        {
          name: "initialFocus",
          type: "boolean | RefObject<HTMLElement> | (openType) => ...",
          description: "Which element receives focus when the popup opens.",
        },
        {
          name: "className / positionerClassName",
          type: "string",
          description: "Extra classes on the popup and, separately, its positioner.",
        },
      ],
    },
    {
      component: "Popover.Popup",
      props: [
        {
          name: "initialFocus / finalFocus",
          type: "boolean | RefObject<HTMLElement> | (interactionType) => ...",
          description:
            "Focus target on open and on close, when composing manually instead of via Content.",
        },
        {
          name: "...props",
          type: "Base UI Popup props",
          description: "Native div attributes and the render prop pass through.",
        },
      ],
    },
    {
      component: "Popover.Positioner",
      props: [
        {
          name: "side / sideOffset / align / alignOffset",
          type: "see Popover.Content",
          defaultValue: '"bottom" / 0 / "center" / 0',
          description:
            "Same anchor-positioning options as Popover.Content, for manual Portal/Positioner/Popup composition. sideOffset defaults to 0 here — Content's default of 8 is our wrapper's choice, not Base UI's.",
        },
        {
          name: "collisionBoundary / collisionPadding / collisionAvoidance / arrowPadding / sticky",
          type: "see Popover.Content",
          description: "Same collision handling as Popover.Content.",
        },
        {
          name: "anchor",
          type: "Element | VirtualElement | RefObject | (() => Element)",
          description: "Positions against an element other than the trigger.",
        },
      ],
    },
    {
      component: "Popover.Arrow",
      props: [
        {
          name: "...props",
          type: "Base UI Arrow props",
          description: "Native div attributes and the render prop pass through.",
        },
      ],
    },
    {
      component: "Popover.Backdrop",
      props: [
        {
          name: "...props",
          type: "Base UI Backdrop props",
          description: "Native div attributes and the render prop pass through.",
        },
      ],
    },
    {
      component: "Popover.Close",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description:
            'Custom close content. Omit it for a default geometric close icon with aria-label="Close" applied automatically.',
        },
        {
          name: "...props",
          type: "Base UI Close props",
          description: "Native button attributes and the render prop pass through.",
        },
      ],
    },
    {
      component: "Popover.Title / Popover.Description",
      props: [
        {
          name: "...props",
          type: "Base UI Title / Description props",
          description:
            "Native heading/paragraph attributes and the render prop pass through. Title renders h1–h6 via render.",
        },
      ],
    },
    {
      component: "Popover.Viewport",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description:
            "Only needed when one popup is shared by multiple triggers and its content should animate as it switches between them.",
        },
      ],
    },
    {
      component: "Popover.Portal",
      props: [
        {
          name: "keepMounted",
          type: "boolean",
          defaultValue: "false",
          description: "Keeps the portal in the DOM while the popup is hidden.",
        },
        {
          name: "container",
          type: "Element | RefObject<Element> | (() => Element)",
          description: "Portal target, same as Popover.Content's container.",
        },
      ],
    },
  ],
  classes: [
    {
      name: ".popover__trigger",
      description:
        "The trigger element, wherever render points it; a hook class with no styles of its own.",
    },
    { name: ".popover__backdrop", description: "The dim overlay rendered by Popover.Backdrop." },
    {
      name: ".popover__positioner",
      description: "The positioning wrapper; sizing and z-index only, no visuals.",
    },
    {
      name: ".popover__popup",
      description:
        "The visible card — background, border radius, shadow, and the open/close transition.",
    },
    { name: ".popover__title", description: "The heading rendered by Popover.Title." },
    {
      name: ".popover__description",
      description: "The body copy rendered by Popover.Description.",
    },
    { name: ".popover__close", description: "The dismiss button rendered by Popover.Close." },
    {
      name: ".popover__close-icon",
      description: "The default X glyph inside Popover.Close, shown when no children are passed.",
    },
    {
      name: ".popover__arrow",
      description: "The triangle rendered by Popover.Arrow, pointed at the trigger.",
    },
    {
      name: ".popover__viewport",
      description:
        "The content-transition wrapper rendered by Popover.Viewport; a hook class with no styles of its own.",
    },
  ],
};
