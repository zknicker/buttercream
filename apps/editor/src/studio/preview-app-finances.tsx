import { Avatar, Badge, Button, Chip, Segment, Table } from "@buttercream/react";
import { Area, AreaChart, ChartTooltip, Grid, XAxis } from "@buttercream/react/charts";
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

/*
 * A crypto portfolio, which is a good stress test for a theme: it leans on the success and
 * danger tokens for meaning rather than decoration, and it puts numbers next to each other in
 * three different densities — stat, list row and table cell.
 */

const NAV: AppNavItem[] = [
  { current: true, icon: "settings", label: "Dashboard" },
  { icon: "users", label: "Portfolio" },
  { icon: "mail", label: "Spending" },
  { icon: "search", label: "Transactions" },
  { badge: "New", icon: "add", label: "Earn" },
  { icon: "settings", label: "Settings" },
];

const FOOTER_NAV: AppNavItem[] = [
  { icon: "settings", label: "Help & information" },
  { icon: "close", label: "Log out" },
];

/* Fixed figures, fixed dates: the preview has to render the same page every time. */
const BALANCE = [
  5018.32, 5042.11, 4996.74, 5061.9, 5108.45, 5083.2, 5140.66, 5172.31, 5129.88, 5195.4, 5241.06,
  5208.73, 5263.19, 5299.55, 5254.82, 5312.4, 5348.97, 5321.64, 5286.1, 5339.72, 5375.28, 5352.9,
  5401.16, 5368.44, 5412.7, 5389.33, 5438.05, 5427.48,
].map((balance, index) => ({ balance, date: new Date(2025, 5, index + 1) }));

interface Holding {
  change: string;
  name: string;
  ticker: string;
  tone: "up" | "down";
  value: string;
}

const HOLDINGS: Holding[] = [
  { change: "2.34%", name: "Bitcoin", ticker: "BTC", tone: "up", value: "$1,283.84" },
  { change: "0.01%", name: "USDC", ticker: "USDC", tone: "up", value: "$2,087.25" },
  { change: "1.12%", name: "Ethereum", ticker: "ETH", tone: "down", value: "$1,087.25" },
  { change: "0.92%", name: "BNB Chain", ticker: "BNB", tone: "up", value: "$165.20" },
  { change: "4.72%", name: "Solana", ticker: "SOL", tone: "up", value: "$195.54" },
];

interface Activity {
  amount: string;
  asset: string;
  date: string;
  fiat: string;
  hash: string;
  type: "Contract Interaction" | "Received" | "Sent" | "Swapped";
}

const ACTIVITY: Activity[] = [
  {
    amount: "0.0241 ETH",
    asset: "ETH",
    date: "Jun 24, 2025",
    fiat: "$87.20",
    hash: "0xaa2bf905d3…",
    type: "Contract Interaction",
  },
  {
    amount: "0.0125 BTC",
    asset: "BTC",
    date: "Jun 23, 2025",
    fiat: "$1,283.84",
    hash: "0x7c31de84b0…",
    type: "Received",
  },
  {
    amount: "250.00 USDC",
    asset: "USDC",
    date: "Jun 22, 2025",
    fiat: "$250.00",
    hash: "0x4f90ab21c7…",
    type: "Sent",
  },
  {
    amount: "1.4200 SOL",
    asset: "SOL",
    date: "Jun 21, 2025",
    fiat: "$195.54",
    hash: "0x93be07f5a2…",
    type: "Swapped",
  },
];

const ACTIVITY_COLOR = {
  "Contract Interaction": "default",
  Received: "success",
  Sent: "danger",
  Swapped: "accent",
} as const;

export function FinancesAppPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);

  return (
    <AppFrame
      sidebar={
        <>
          <AppIdentity email="fred@example.com" name="Fred Palmer" />
          <AppNav icons={icons} items={NAV} />
          <div className="app__sidebar-spacer" />
          <AppNav icons={icons} items={FOOTER_NAV} />
        </>
      }
    >
      <AppHeader
        actions={
          <>
            <Button size="sm" variant="secondary">
              Swap
            </Button>
            <Button size="sm" variant="secondary">
              Receive
            </Button>
            <Button size="sm">{icon.upload}Send</Button>
          </>
        }
        title="Good afternoon, Fred"
      />

      <AppStats
        stats={[
          { delta: "5.32%", label: "Total balance", value: "$5,427.48" },
          { delta: "2.24%", label: "24h change", value: "$120.18" },
          { delta: "4.72%", label: "Top performer · SOL", value: "4.72" },
          { label: "Holdings", value: "8" },
        ]}
      />

      <div className="app__split">
        <AppPanel
          actions={
            <Segment aria-label="Range" defaultValue="1M" size="sm">
              <Segment.Item value="1D">1D</Segment.Item>
              <Segment.Item value="1W">1W</Segment.Item>
              <Segment.Item value="1M">1M</Segment.Item>
              <Segment.Item value="3M">3M</Segment.Item>
              <Segment.Item value="1Y">1Y</Segment.Item>
              <Segment.Item value="All">All</Segment.Item>
            </Segment>
          }
          title="Portfolio"
        >
          <p className="finances__balance">
            <span className="finances__balance-value">$5,427.48</span>
            <span className="finances__balance-delta">+8.16% 1M</span>
          </p>
          <AreaChart data={BALANCE}>
            <Grid horizontal />
            <XAxis />
            <Area dataKey="balance" />
            <ChartTooltip />
          </AreaChart>
        </AppPanel>

        <AppPanel actions={<Badge>8</Badge>} title="Holdings">
          <div className="finances__holdings-body">
            <ul className="finances__holdings">
              {HOLDINGS.map((holding) => (
                <li className="finances__holding" key={holding.ticker}>
                  <Avatar size="sm">
                    <Avatar.Fallback>{holding.ticker.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                  <span className="finances__holding-text">
                    <span className="finances__holding-ticker">{holding.ticker}</span>
                    <span className="finances__holding-name">{holding.name}</span>
                  </span>
                  <span className="finances__holding-figures">
                    <span className="finances__holding-value">{holding.value}</span>
                    <span className="finances__holding-change" data-tone={holding.tone}>
                      {holding.tone === "down" ? "−" : "+"}
                      {holding.change}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="finances__holdings-spacer" />
            <Button fullWidth size="sm" variant="secondary">
              See all holdings
            </Button>
          </div>
        </AppPanel>
      </div>

      <AppPanel
        actions={
          <Button iconOnly size="sm" variant="ghost">
            {icon.more}
          </Button>
        }
        title="Recent activity"
      >
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Column>Txn #</Table.Column>
              <Table.Column>Type</Table.Column>
              <Table.Column>Asset</Table.Column>
              <Table.Column>Value</Table.Column>
              <Table.Column>Date</Table.Column>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {ACTIVITY.map((entry) => (
              <Table.Row key={entry.hash}>
                <Table.Cell>
                  <span className="finances__hash">{entry.hash}</span>
                </Table.Cell>
                <Table.Cell>
                  <Chip color={ACTIVITY_COLOR[entry.type]} size="sm">
                    {entry.type}
                  </Chip>
                </Table.Cell>
                <Table.Cell>{entry.asset}</Table.Cell>
                <Table.Cell>
                  <span className="finances__value">
                    <span className="finances__value-amount">{entry.amount}</span>
                    <span className="finances__value-fiat">{entry.fiat}</span>
                  </span>
                </Table.Cell>
                <Table.Cell>{entry.date}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </AppPanel>
    </AppFrame>
  );
}
