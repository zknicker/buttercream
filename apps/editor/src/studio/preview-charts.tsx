import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  BarXAxis,
  ChartTooltip,
  Grid,
  Line,
  LineChart,
  XAxis,
} from "@buttercream/react/charts";
import type { ReactElement } from "react";

/*
 * Chart specimens. Every series here paints from --chart-* tokens, so the point of the page is
 * that nothing on it is a literal colour: drag the accent and the plots follow.
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* Deterministic, so the page looks the same on every render and in every screenshot. */
const REVENUE = [42, 55, 49, 68, 74, 71, 88, 96, 91, 108, 121, 134];
const EXPENSES = [31, 38, 36, 44, 47, 52, 55, 61, 58, 66, 70, 78];

/*
 * Both keys are present on purpose: the time-series charts read `date`, while BarChart is a
 * categorical scale and keys its bars off `name`. Giving it only a date collapses every bar
 * onto one empty category.
 */
const SERIES = MONTHS.map((month, index) => ({
  date: new Date(2025, index, 1),
  expenses: EXPENSES[index],
  name: month,
  revenue: REVENUE[index],
}));

function Specimen({
  caption,
  children,
}: {
  caption: string;
  children: ReactElement;
}): ReactElement {
  return (
    <section className="specimen specimen--stack">
      <div className="chart-demo">{children}</div>
      <div className="specimen__label">{caption}</div>
    </section>
  );
}

export function ChartsPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen caption="Line">
        <LineChart data={SERIES}>
          <Grid horizontal />
          <XAxis />
          <Line dataKey="revenue" />
          <ChartTooltip />
        </LineChart>
      </Specimen>

      <Specimen caption="Two series">
        {/*
         * Adjacent steps of the ramp rather than two unrelated hues, so the pair reads as one
         * measurement split in two.
         */}
        <LineChart data={SERIES}>
          <Grid horizontal />
          <XAxis />
          <Line dataKey="revenue" stroke="var(--chart-2)" />
          <Line dataKey="expenses" stroke="var(--chart-4)" />
          <ChartTooltip />
        </LineChart>
      </Specimen>

      <Specimen caption="Area">
        <AreaChart data={SERIES}>
          <Grid horizontal />
          <XAxis />
          <Area dataKey="revenue" />
          <ChartTooltip />
        </AreaChart>
      </Specimen>

      <Specimen caption="Bar">
        <BarChart data={SERIES}>
          <Grid horizontal />
          <BarXAxis />
          <Bar dataKey="revenue" />
          <ChartTooltip />
        </BarChart>
      </Specimen>

      <Specimen caption="Stacked bars">
        <BarChart data={SERIES} stacked>
          <Grid horizontal />
          <BarXAxis />
          <Bar dataKey="expenses" fill="var(--chart-4)" />
          <Bar dataKey="revenue" fill="var(--chart-2)" />
          <ChartTooltip />
        </BarChart>
      </Specimen>

      <Specimen caption="Horizontal bars">
        <BarChart data={SERIES.slice(0, 6)} orientation="horizontal">
          <Grid vertical />
          <Bar dataKey="revenue" />
          <ChartTooltip />
        </BarChart>
      </Specimen>

      <Specimen caption="Loading">
        {/* The shimmer reads --chart-foreground-muted, so it tracks the theme too. */}
        <LineChart data={SERIES} loadingLabel="Loading revenue…" status="loading">
          <Grid horizontal />
          <XAxis />
          <Line dataKey="revenue" />
        </LineChart>
      </Specimen>
    </div>
  );
}
