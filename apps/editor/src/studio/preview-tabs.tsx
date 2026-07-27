import { Tabs, type TabsProps } from "@buttercream/react";
import type { ReactElement } from "react";

export function TabsPreview(): ReactElement {
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
        <TabsSpecimen items={ICON_TABS} />
        <div className="specimen__label">With icons</div>
      </section>
      <section className="specimen">
        <TabsSpecimen disabledTab="Videos" />
        <div className="specimen__label">Disabled tab</div>
      </section>
    </div>
  );
}

interface SpecimenTab {
  icon?: string;
  label: string;
}

const MEDIA_TABS: readonly SpecimenTab[] = [
  { label: "Photos" },
  { label: "Music" },
  { label: "Videos" },
];

const ICON_TABS: readonly SpecimenTab[] = [
  { icon: "⌂", label: "Home" },
  { icon: "♫", label: "Music" },
  { icon: "▶", label: "Videos" },
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
            {item.icon ? <span aria-hidden>{item.icon} </span> : null}
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
