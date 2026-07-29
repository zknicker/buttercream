import { Tabs, type TabsProps } from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import type { ReactElement, ReactNode } from "react";
import { createPreviewIconElements } from "./preview-icons.ts";

export function TabsPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const iconElements = createPreviewIconElements(icons);
  const iconTabs: readonly SpecimenTab[] = [
    { icon: iconElements.mail, label: "Inbox" },
    { icon: iconElements.search, label: "Search" },
    { icon: iconElements.settings, label: "Settings" },
  ];

  return <TabsSpecimens iconTabs={iconTabs} />;
}

function TabsSpecimens({ iconTabs }: { iconTabs: readonly SpecimenTab[] }): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <TabsSpecimen />
        <div className="specimen__label">Primary</div>
      </section>
      <section className="specimen">
        <TabsSpecimen variant="secondary" />
        <div className="specimen__label">Secondary</div>
      </section>
      <section className="specimen">
        <TabsSpecimen separated />
        <div className="specimen__label">Separated list</div>
      </section>
      <section className="specimen">
        <TabsSpecimen orientation="vertical" />
        <div className="specimen__label">Vertical</div>
      </section>
      <section className="specimen">
        <TabsSpecimen items={iconTabs} />
        <div className="specimen__label">With icons</div>
      </section>
      <section className="specimen">
        <TabsSpecimen disabledTab="Videos" />
        <div className="specimen__label">Disabled tab</div>
      </section>
      <section className="specimen">
        <TabsSpecimen orientation="vertical" variant="secondary" />
        <div className="specimen__label">Secondary vertical</div>
      </section>
      <section className="specimen">
        <AnchorTabsSpecimen />
        <div className="specimen__label">Rendered as links</div>
      </section>
    </div>
  );
}

/* Tabs.Tab forwards Base UI's render prop, so a tab can navigate instead of just switching panels. */
function AnchorTabsSpecimen(): ReactElement {
  return (
    <Tabs defaultValue={MEDIA_TABS[0]?.label}>
      <Tabs.List>
        {MEDIA_TABS.map((item) => (
          <Tabs.Tab
            key={item.label}
            render={<a href={`#${item.label.toLowerCase()}`} />}
            value={item.label}
          >
            {item.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {MEDIA_TABS.map((item) => (
        <Tabs.Panel key={item.label} value={item.label}>
          Content for the {item.label} tab.
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

interface SpecimenTab {
  /* A real icon element from the configured family, not a text glyph standing in for one. */
  icon?: ReactNode;
  label: string;
}

const MEDIA_TABS: readonly SpecimenTab[] = [
  { label: "Photos" },
  { label: "Music" },
  { label: "Videos" },
];

interface TabsSpecimenProps extends TabsProps {
  /** Label of the one tab to disable, leaving the rest interactive. */
  disabledTab?: string;
  items?: readonly SpecimenTab[];
  /** Renders the tab list with separators between tabs. */
  separated?: boolean;
}

/*
 * One uncontrolled Tabs instance per specimen: Base UI owns the selected value, so
 * every specimen switches panels independently.
 */
function TabsSpecimen({
  disabledTab,
  items = MEDIA_TABS,
  separated = false,
  ...props
}: TabsSpecimenProps): ReactElement {
  return (
    <Tabs defaultValue={items[0]?.label} {...props}>
      <Tabs.List separated={separated}>
        {items.map((item) => (
          <Tabs.Tab disabled={item.label === disabledTab} key={item.label} value={item.label}>
            {item.icon}
            {item.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {items.map((item) => (
        <Tabs.Panel key={item.label} value={item.label}>
          Content for the {item.label} tab.
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
