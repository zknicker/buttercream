import { Avatar, Badge, Button, Segment, Table } from "@buttercream/react";
import {
  Bar,
  BarChart,
  BarXAxis,
  ChartTooltip,
  Grid,
  Line,
  LineChart,
} from "@buttercream/react/charts";
import type { DesignSystem } from "@buttercream/theme-core";
import type { ReactElement } from "react";
import {
  AppFrame,
  AppHeader,
  AppIdentity,
  AppNav,
  type AppNavItem,
  AppPanel,
  AppStats,
} from "./preview-app-shell.tsx";
import { createPreviewIconElements } from "./preview-icons.ts";

const NAV: AppNavItem[] = [
  { current: true, icon: "settings", label: "Dashboard" },
  { icon: "mail", label: "Orders" },
  { icon: "search", label: "Tracker" },
  { icon: "users", label: "Analytics" },
  { icon: "settings", label: "Settings" },
];

const SALES = [
  { name: "Wk 1", sales: 42 },
  { name: "Wk 2", sales: 55 },
  { name: "Wk 3", sales: 38 },
  { name: "Wk 4", sales: 61 },
  { name: "Wk 5", sales: 49 },
  { name: "Wk 6", sales: 72 },
  { name: "Wk 7", sales: 66 },
  { name: "Wk 8", sales: 84 },
];

const TRAFFIC = [18, 24, 21, 32, 29, 41, 38, 47, 44, 56, 61, 72].map((organic, index) => ({
  date: new Date(2025, index, 1),
  organic,
  paid: Math.round(organic * 0.62),
}));

const PEOPLE = [
  { email: "ana@example.com", id: "#0018", name: "Ana Tarrar", role: "Product Manager" },
  { email: "emma@example.com", id: "#0037", name: "Emma Davis", role: "Senior Designer" },
  { email: "john@example.com", id: "#0033", name: "John Smith", role: "Chief Technology Officer" },
  { email: "kate@example.com", id: "#0032", name: "Kate Moore", role: "Chief Executive Officer" },
];

/* No photos to ship, so the fallback carries initials — which is what it is for. */
function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function DashboardAppPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);

  return (
    <AppFrame
      sidebar={
        <>
          <AppIdentity email="kate@example.com" name="Kate Moore" />
          <AppNav icons={icons} items={NAV} />
          <div className="app__sidebar-spacer" />
          <AppNav icons={icons} items={[{ icon: "settings", label: "Help & information" }]} />
        </>
      }
    >
      <AppHeader
        actions={
          <>
            <Segment aria-label="Range" defaultValue="monthly">
              <Segment.Item value="weekly">Weekly</Segment.Item>
              <Segment.Item value="monthly">Monthly</Segment.Item>
            </Segment>
            <Button size="sm">{icon.upload}Export</Button>
          </>
        }
        title="Good morning, Kate"
      />

      <AppStats
        stats={[
          { delta: "3.5%", label: "Revenue", value: "$228,441" },
          { delta: "1.2%", label: "Expenses", tone: "down", value: "$25,108" },
          { delta: "5.1%", label: "Sales", value: "458" },
          { delta: "3.1%", label: "Profit", value: "$203,133" },
        ]}
      />

      <div className="app__split">
        <AppPanel
          actions={<span className="panel__meta">Last 8 weeks</span>}
          title="Sales performance"
        >
          <BarChart data={SALES} xDataKey="name">
            <Grid horizontal />
            <BarXAxis />
            <Bar dataKey="sales" />
            <ChartTooltip />
          </BarChart>
        </AppPanel>
        <AppPanel actions={<span className="panel__meta">231,856</span>} title="Traffic source">
          <LineChart data={TRAFFIC}>
            <Grid horizontal />
            <Line dataKey="organic" stroke="var(--chart-2)" />
            <Line dataKey="paid" stroke="var(--chart-4)" />
            <ChartTooltip />
          </LineChart>
        </AppPanel>
      </div>

      <AppPanel
        actions={
          <Button size="sm" variant="secondary">
            {icon.add}Add
          </Button>
        }
        title="All employees"
      >
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Column>Member</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Worker</Table.Column>
              <Table.Column>ID</Table.Column>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {PEOPLE.map((person) => (
              <Table.Row key={person.id}>
                <Table.Cell>
                  <span className="cell-person">
                    <Avatar size="sm">
                      <Avatar.Fallback>{initials(person.name)}</Avatar.Fallback>
                    </Avatar>
                    <span className="cell-person__text">
                      <span className="cell-person__name">{person.name}</span>
                      <span className="cell-person__email">{person.email}</span>
                    </span>
                  </span>
                </Table.Cell>
                <Table.Cell>{person.role}</Table.Cell>
                <Table.Cell>
                  <Badge>Employee</Badge>
                </Table.Cell>
                <Table.Cell>{person.id}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </AppPanel>
    </AppFrame>
  );
}
