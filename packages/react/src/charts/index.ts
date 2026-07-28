"use client";

/*
 * The chart surface. Everything else under this directory is vendored from the bklit registry
 * (see README.md); this file is the seam, so consumers get a curated set rather than the
 * seventy-odd internals the vendored tree happens to export.
 *
 * Nothing here decides a colour. The charts paint from --chart-* custom properties, which
 * theme.css maps onto Buttercream's semantic tokens, so a chart follows the configured theme
 * the same way every other component does.
 */

export { Area, type AreaProps } from "./area";
export { AreaChart, type AreaChartProps } from "./area-chart";
export { Bar, type BarProps } from "./bar";
export { BarChart, type BarChartProps, type BarOrientation } from "./bar-chart";
export { ChartTooltip, type ChartTooltipProps } from "./chart-tooltip";
export { DateTicker, type DateTickerProps } from "./date-ticker";
export { Grid, type GridProps } from "./grid";
export { Line, type LineProps } from "./line";
export { LineChart, type LineChartProps } from "./line-chart";
export { TooltipBox, type TooltipBoxProps } from "./tooltip-box";
export { TooltipContent, type TooltipContentProps, type TooltipRow } from "./tooltip-content";
export { TooltipDot, type TooltipDotProps } from "./tooltip-dot";
export {
  type IndicatorWidth,
  TooltipIndicator,
  type TooltipIndicatorProps,
} from "./tooltip-indicator";
export { XAxis, type XAxisProps } from "./x-axis";
