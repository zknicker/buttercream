import type { ComponentDoc } from "../component-docs.tsx";

export const drawerDoc: ComponentDoc = {
  usage:
    "Use Drawer for supplementary content or actions that slide in from an edge of the screen without leaving the current context — notification panels, filters, or secondary forms. Compose it from Drawer.Trigger, Drawer.Backdrop, Drawer.Content (placement top/right/bottom/left), and Drawer.Dialog with Header/Heading/Description/Body/Footer parts inside. Control it uncontrolled with defaultOpen, or pass open/onOpenChange for controlled state; add Drawer.Handle for a drag affordance, Drawer.CloseTrigger for a dismiss button, and disablePointerDismissal to keep it open until an explicit close.",
  example:
    '<Drawer open={open} onOpenChange={setOpen}>\n  <Drawer.Trigger render={<Button />}>Open drawer</Drawer.Trigger>\n  <Drawer.Portal>\n    <Drawer.Backdrop />\n    <Drawer.Content placement="right">\n      <Drawer.Dialog>\n        <Drawer.Header>\n          <Drawer.Heading>Notifications</Drawer.Heading>\n          <Drawer.CloseTrigger />\n        </Drawer.Header>\n        <Drawer.Body>\n          <Drawer.Description>Review recent activity and mentions.</Drawer.Description>\n        </Drawer.Body>\n        <Drawer.Footer>\n          <Button onClick={() => setOpen(false)} variant="tertiary">\n            Close\n          </Button>\n          <Button onClick={() => setOpen(false)}>Save</Button>\n        </Drawer.Footer>\n      </Drawer.Dialog>\n    </Drawer.Content>\n  </Drawer.Portal>\n</Drawer>',
  api: [
    {
      component: "Drawer",
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
          description: "Fires when the drawer opens or closes, from any trigger or dismissal.",
        },
        {
          name: "modal",
          type: 'boolean | "trap-focus"',
          defaultValue: "true",
          description:
            'true traps focus and locks page scroll; "trap-focus" traps focus without locking scroll; false allows interaction outside the drawer.',
        },
        {
          name: "disablePointerDismissal",
          type: "boolean",
          defaultValue: "false",
          description: "Prevents closing on outside press; the drawer closes only explicitly.",
        },
        {
          name: "...props",
          type: "Base UI Dialog.Root props",
          description: "actionsRef, handle, onOpenChangeComplete, and other pass-through props.",
        },
      ],
    },
    {
      component: "Drawer.Trigger",
      props: [
        {
          name: "render",
          type: "ReactElement",
          description: "Renders the trigger as a different element, e.g. render={<Chip />}.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Blocks interaction with the trigger.",
        },
        {
          name: "payload",
          type: "Payload",
          description: "Value passed through to the drawer's children render function.",
        },
        {
          name: "...props",
          type: "Base UI Dialog.Trigger props",
          description: "Native button attributes pass through.",
        },
      ],
    },
    {
      component: "Drawer.Backdrop",
      props: [
        {
          name: "variant",
          type: '"opaque" | "blur" | "transparent"',
          defaultValue: '"opaque"',
          description: "Visual treatment of the overlay beneath the drawer.",
        },
        {
          name: "...props",
          type: "Base UI Dialog.Backdrop props",
          description: "Native div attributes pass through.",
        },
      ],
    },
    {
      component: "Drawer.Content",
      props: [
        {
          name: "placement",
          type: '"top" | "right" | "bottom" | "left"',
          defaultValue: '"bottom"',
          description: "Edge of the viewport the panel slides in from.",
        },
        {
          name: "...props",
          type: "Base UI Dialog.Viewport props",
          description: "Native div attributes pass through.",
        },
      ],
    },
    {
      component: "Drawer.Dialog",
      props: [
        {
          name: "initialFocus",
          type: "boolean | RefObject<HTMLElement> | (interactionType) => boolean | HTMLElement | null",
          description:
            "Element to focus when the drawer opens; defaults to the first tabbable child.",
        },
        {
          name: "finalFocus",
          type: "boolean | RefObject<HTMLElement> | (interactionType) => boolean | HTMLElement | null",
          description: "Element to focus when the drawer closes; defaults to the trigger.",
        },
        {
          name: "...props",
          type: "Base UI Dialog.Popup props",
          description: "Native div attributes pass through.",
        },
      ],
    },
    {
      component: "Drawer.Header",
      props: [
        {
          name: "render",
          type: "ReactElement",
          description: "Renders the part as a different element.",
        },
        {
          name: "...props",
          type: "Native div attributes",
          description: "Pass through to the rendered element.",
        },
      ],
    },
    {
      component: "Drawer.Heading",
      props: [
        {
          name: "...props",
          type: "Base UI Dialog.Title props",
          description: "Renders an h2 by default; native heading attributes pass through.",
        },
      ],
    },
    {
      component: "Drawer.Description",
      props: [
        {
          name: "...props",
          type: "Base UI Dialog.Description props",
          description: "Native p attributes pass through.",
        },
      ],
    },
    {
      component: "Drawer.Body",
      props: [
        {
          name: "render",
          type: "ReactElement",
          description: "Renders the part as a different element.",
        },
        {
          name: "...props",
          type: "Native div attributes",
          description: "Scrolls internally when content exceeds the drawer's size.",
        },
      ],
    },
    {
      component: "Drawer.Footer",
      props: [
        {
          name: "render",
          type: "ReactElement",
          description: "Renders the part as a different element.",
        },
        {
          name: "...props",
          type: "Native div attributes",
          description: "Pass through to the rendered element.",
        },
      ],
    },
    {
      component: "Drawer.Handle",
      props: [
        {
          name: "render",
          type: "ReactElement",
          description: "Renders the part as a different element.",
        },
        {
          name: "...props",
          type: "Native div attributes",
          description:
            "Visual drag affordance; a pill anchored to the top of the panel. Purely decorative — dragging to dismiss is not implemented.",
        },
      ],
    },
    {
      component: "Drawer.CloseTrigger",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description:
            'Custom close content; defaults to the built-in close icon with aria-label "Close".',
        },
        {
          name: "render",
          type: "ReactElement",
          description: "Renders the trigger as a different element, e.g. render={<Button />}.",
        },
        {
          name: "...props",
          type: "Base UI Dialog.Close props",
          description: "Native button attributes pass through.",
        },
      ],
    },
    {
      component: "Drawer.Portal",
      props: [
        {
          name: "container",
          type: "Element | RefObject<Element> | null",
          description: "Alternate DOM node to render the portal into; defaults to document.body.",
        },
        {
          name: "keepMounted",
          type: "boolean",
          defaultValue: "false",
          description: "Keeps the portal mounted in the DOM while the drawer is closed.",
        },
      ],
    },
  ],
  classes: [
    { name: ".drawer__trigger", description: "The element that opens the drawer." },
    {
      name: ".drawer__backdrop",
      description: "Overlay behind the panel; [data-variant] carries opaque/blur/transparent.",
    },
    {
      name: ".drawer__content",
      description: "Fixed positioning wrapper; [data-placement] carries top/right/bottom/left.",
    },
    { name: ".drawer__dialog", description: "The sliding panel itself." },
    {
      name: ".drawer__header",
      description: "Header section holding the heading and close trigger.",
    },
    { name: ".drawer__heading", description: "The panel's title." },
    { name: ".drawer__description", description: "Supporting text under the title." },
    {
      name: ".drawer__body",
      description: "Main content area; scrolls internally when it overflows.",
    },
    { name: ".drawer__footer", description: "Footer row for actions, right-aligned." },
    { name: ".drawer__handle", description: "The decorative drag-handle pill." },
    {
      name: ".drawer__close-trigger",
      description: "The default icon close button, absolutely positioned.",
    },
    { name: ".drawer__close-icon", description: "The × glyph inside the default close trigger." },
    {
      name: "[data-starting-style] / [data-ending-style]",
      description: "Present on the backdrop and dialog during their enter/exit transitions.",
    },
  ],
};
