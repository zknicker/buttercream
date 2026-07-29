import type { ComponentDoc } from "../component-docs.tsx";

export const modalDoc: ComponentDoc = {
  usage:
    "Use Modal for focused, blocking overlays — confirmations, forms, or detail views — composed from Modal.Trigger, Modal.Backdrop, Modal.Container, and Modal.Dialog with Header/Body/Footer parts inside. Control it uncontrolled with defaultOpen, or pass open/onOpenChange for controlled state; disablePointerDismissal keeps it open until an explicit close. Tune Modal.Backdrop's variant (opaque/blur/transparent) and Modal.Container's placement (auto/top/center/bottom), and render into an alternate DOM node via Modal.Portal's container prop.",
  example:
    '<Modal open={open} onOpenChange={setOpen}>\n  <Modal.Trigger render={<Button />}>Open modal</Modal.Trigger>\n  <Modal.Portal>\n    <Modal.Backdrop />\n    <Modal.Container>\n      <Modal.Dialog>\n        <Modal.Header>\n          <Modal.Heading>Buttercream</Modal.Heading>\n          <Modal.CloseTrigger />\n        </Modal.Header>\n        <Modal.Body>\n          <Modal.Description>Build accessible interfaces.</Modal.Description>\n        </Modal.Body>\n        <Modal.Footer>\n          <Button onClick={() => setOpen(false)} variant="tertiary">\n            Cancel\n          </Button>\n          <Button onClick={() => setOpen(false)}>Continue</Button>\n        </Modal.Footer>\n      </Modal.Dialog>\n    </Modal.Container>\n  </Modal.Portal>\n</Modal>',
  api: [
    {
      component: "Modal",
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
          description: "Fires when the dialog opens or closes, from any trigger or dismissal.",
        },
        {
          name: "modal",
          type: 'boolean | "trap-focus"',
          defaultValue: "true",
          description:
            'true traps focus and locks page scroll; "trap-focus" traps focus without locking scroll; false allows interaction outside the dialog.',
        },
        {
          name: "disablePointerDismissal",
          type: "boolean",
          defaultValue: "false",
          description: "Prevents closing on outside press; the dialog closes only explicitly.",
        },
        {
          name: "...props",
          type: "Base UI Dialog.Root props",
          description: "actionsRef, handle, onOpenChangeComplete, and other pass-through props.",
        },
      ],
    },
    {
      component: "Modal.Trigger",
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
          description: "Value passed through to the dialog's children render function.",
        },
        {
          name: "...props",
          type: "Base UI Dialog.Trigger props",
          description: "Native button attributes pass through.",
        },
      ],
    },
    {
      component: "Modal.Backdrop",
      props: [
        {
          name: "variant",
          type: '"opaque" | "blur" | "transparent"',
          defaultValue: '"opaque"',
          description: "Visual treatment of the overlay beneath the dialog.",
        },
        {
          name: "...props",
          type: "Base UI Dialog.Backdrop props",
          description: "Native div attributes pass through.",
        },
      ],
    },
    {
      component: "Modal.Container",
      props: [
        {
          name: "placement",
          type: '"auto" | "top" | "center" | "bottom"',
          defaultValue: '"auto"',
          description: "Vertical position of the dialog within the viewport.",
        },
        {
          name: "...props",
          type: "Base UI Dialog.Viewport props",
          description: "Native div attributes pass through.",
        },
      ],
    },
    {
      component: "Modal.Dialog",
      props: [
        {
          name: "initialFocus",
          type: "boolean | RefObject<HTMLElement> | (interactionType) => boolean | HTMLElement | null",
          description:
            "Element to focus when the dialog opens; defaults to the first tabbable child.",
        },
        {
          name: "finalFocus",
          type: "boolean | RefObject<HTMLElement> | (interactionType) => boolean | HTMLElement | null",
          description: "Element to focus when the dialog closes; defaults to the trigger.",
        },
        {
          name: "...props",
          type: "Base UI Dialog.Popup props",
          description: "Native div attributes pass through.",
        },
      ],
    },
    {
      component: "Modal.Header",
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
      component: "Modal.Icon",
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
            "Pass through to the rendered element. No HeroUI equivalent — a leading icon badge for the header.",
        },
      ],
    },
    {
      component: "Modal.Heading",
      props: [
        {
          name: "...props",
          type: "Base UI Dialog.Title props",
          description: "Renders an h2 by default; native heading attributes pass through.",
        },
      ],
    },
    {
      component: "Modal.Description",
      props: [
        {
          name: "...props",
          type: "Base UI Dialog.Description props",
          description: "Native p attributes pass through.",
        },
      ],
    },
    {
      component: "Modal.Body",
      props: [
        {
          name: "render",
          type: "ReactElement",
          description: "Renders the part as a different element.",
        },
        {
          name: "...props",
          type: "Native div attributes",
          description: "Scrolls internally when content exceeds the dialog's max height.",
        },
      ],
    },
    {
      component: "Modal.Footer",
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
      component: "Modal.CloseTrigger",
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
      component: "Modal.Portal",
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
          description: "Keeps the portal mounted in the DOM while the dialog is closed.",
        },
      ],
    },
  ],
  classes: [
    { name: ".modal__trigger", description: "The element that opens the modal." },
    {
      name: ".modal__backdrop",
      description: "Overlay behind the dialog; [data-variant] carries opaque/blur/transparent.",
    },
    {
      name: ".modal__container",
      description: "Fixed positioning wrapper; [data-placement] carries top/center/bottom.",
    },
    { name: ".modal__dialog", description: "The dialog surface itself." },
    {
      name: ".modal__header",
      description: "Header section holding the icon, heading, and close trigger.",
    },
    { name: ".modal__icon", description: "Leading icon badge in the header." },
    { name: ".modal__heading", description: "The dialog's title." },
    { name: ".modal__description", description: "Supporting text under the title." },
    {
      name: ".modal__body",
      description: "Main content area; scrolls internally when it overflows.",
    },
    { name: ".modal__footer", description: "Footer row for actions, right-aligned." },
    {
      name: ".modal__close-trigger",
      description: "The default icon close button, absolutely positioned.",
    },
    { name: ".modal__close-icon", description: "The × glyph inside the default close trigger." },
    {
      name: "[data-starting-style] / [data-ending-style]",
      description: "Present on the backdrop and dialog during their enter/exit transitions.",
    },
  ],
};
