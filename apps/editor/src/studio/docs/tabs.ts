import type { ComponentDoc } from "../component-docs.tsx";

export const tabsDoc: ComponentDoc = {
  usage:
    'Use Tabs to split related content into switchable sections the user selects one at a time. Compose Tabs.List with Tabs.Tab entries (each identified by value, matched to a sibling Tabs.Panel) and set defaultValue or a controlled value/onValueChange on the Tabs root. Choose variant="secondary" for an underline style instead of the default pill track, set orientation="vertical" for a side-by-side layout, and pass separated to Tabs.List to add retracting hairlines between tabs. Disable a tab with disabled, and use the render prop on Tabs.Tab when a tab should navigate, e.g. render an anchor.',
  example:
    '<Tabs defaultValue="account">\n  <Tabs.List>\n    <Tabs.Tab value="account">Account</Tabs.Tab>\n    <Tabs.Tab value="billing">Billing</Tabs.Tab>\n  </Tabs.List>\n  <Tabs.Panel value="account">Account settings</Tabs.Panel>\n  <Tabs.Panel value="billing">Billing settings</Tabs.Panel>\n</Tabs>',
  api: [
    {
      component: "Tabs",
      props: [
        {
          name: "variant",
          type: '"primary" | "secondary"',
          defaultValue: '"primary"',
          description: "Sunken pill track, or an underline that rides the bottom edge.",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"horizontal"',
          description: "Layout flow of the tab list relative to its panels.",
        },
        {
          name: "value",
          type: "unknown",
          description: "The active tab's value. Use for a controlled Tabs.",
        },
        {
          name: "defaultValue",
          type: "unknown",
          defaultValue: "0",
          description: "The initially active tab's value. Use for an uncontrolled Tabs.",
        },
        {
          name: "onValueChange",
          type: "(value, eventDetails) => void",
          description: "Called when the active tab changes, by click, keyboard, or fallback.",
        },
        {
          name: "...props",
          type: "Base UI Tabs.Root props",
          description: "Native div attributes and the render prop pass through.",
        },
      ],
    },
    {
      component: "Tabs.List",
      props: [
        {
          name: "separated",
          type: "boolean",
          defaultValue: "false",
          description: "Adds retracting hairlines between adjacent tabs.",
        },
        {
          name: "activateOnFocus",
          type: "boolean",
          defaultValue: "false",
          description:
            "Changes the active tab as arrow keys move focus, instead of on Enter/Space.",
        },
        {
          name: "loopFocus",
          type: "boolean",
          defaultValue: "true",
          description: "Wraps keyboard focus from the last tab back to the first.",
        },
        {
          name: "...props",
          type: "Base UI Tabs.List props",
          description: "Native div attributes and the render prop pass through.",
        },
      ],
    },
    {
      component: "Tabs.Tab",
      props: [
        {
          name: "value",
          type: "unknown",
          description: "Identifies this tab, matched against a sibling Tabs.Panel's value.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Blocks interaction and dims the tab.",
        },
        {
          name: "...props",
          type: "Base UI Tabs.Tab props",
          description:
            "Native button attributes and the render prop pass through, e.g. render an anchor for a tab that navigates.",
        },
      ],
    },
    {
      component: "Tabs.Panel",
      props: [
        {
          name: "value",
          type: "unknown",
          description: "Shown when the Tabs.Tab with the matching value is active.",
        },
        {
          name: "keepMounted",
          type: "boolean",
          defaultValue: "false",
          description: "Keeps the panel in the DOM while hidden, instead of unmounting it.",
        },
        {
          name: "...props",
          type: "Base UI Tabs.Panel props",
          description: "Native div attributes and the render prop pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".tabs", description: "The root container." },
    { name: ".tabs--secondary", description: "Underline style instead of the pill track." },
    { name: ".tabs__list", description: "The scrollable tab strip." },
    { name: ".tabs__list--separated", description: "Adds hairlines between adjacent tabs." },
    { name: ".tabs__tab", description: "An individual tab trigger." },
    { name: ".tabs__indicator", description: "The sliding active-tab pill or underline." },
    { name: ".tabs__panel", description: "A content panel." },
  ],
};
