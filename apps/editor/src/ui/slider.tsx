import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { HTMLAttributes, ReactElement } from "react";
import { classes } from "./classes.ts";

/*
 * Shell kit slider. Wraps the Base UI primitive directly rather than
 * @buttercream/react, so the studio chrome stays independent of the package it
 * edits. The compound shape matches the published Slider part-for-part, so
 * switching over later is an import change.
 */

type SliderValue = number | readonly number[];

export interface SliderProps<Value extends SliderValue = SliderValue>
  extends Omit<BaseSlider.Root.Props<Value>, "className"> {
  className?: string;
}

function SliderRoot<Value extends SliderValue = SliderValue>({
  className,
  ...props
}: SliderProps<Value>): ReactElement {
  return <BaseSlider.Root className={className} data-slot="slider" {...props} />;
}

function SliderLabel({
  className,
  ...props
}: Omit<BaseSlider.Label.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseSlider.Label
      className={classes("min-w-0", className)}
      data-slot="slider-label"
      {...props}
    />
  );
}

function SliderValueText({
  className,
  ...props
}: Omit<BaseSlider.Value.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseSlider.Value
      className={classes("shrink-0 tabular-nums", className)}
      data-slot="slider-value"
      {...props}
    />
  );
}

function SliderControl({
  className,
  ...props
}: Omit<BaseSlider.Control.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseSlider.Control
      /*
       * No alignment here. Tailwind resolves conflicting utilities by their order in the generated
       * stylesheet, not by their order in the class string, so a default `items-center` baked in
       * here cannot be overridden by a call site that wants its track on an edge.
       */
      className={classes("flex", className)}
      data-slot="slider-control"
      {...props}
    />
  );
}

/** Most dots a row can carry before the marks read as texture rather than as steps. */
const MAX_TICKS = 20;

/*
 * Dots along the track, at a density the eye can resolve.
 *
 * They mark every step where a row has few enough of them, and every nth step where it does not.
 * Dropping them entirely past a threshold — which is what this did first — meant a row's step size
 * decided whether it had dots at all, so the one slider with a hundred steps was the one slider
 * with a bare track, and it read as a different control rather than a finer one.
 *
 * Subsampled dots still land on real steps, so they never imply a stop that does not exist.
 */
function SliderTicks({
  className,
  max,
  min,
  step,
  ...props
}: {
  className?: string;
  max: number;
  min: number;
  step: number;
} & Omit<HTMLAttributes<HTMLSpanElement>, "children">): ReactElement | null {
  const count = Math.floor((max - min) / step);
  if (count < 1) {
    return null;
  }

  /* Every step, or every nth, whichever keeps the row under the density the eye can read. */
  const stride = Math.ceil(count / MAX_TICKS);
  const drawn = Math.floor(count / stride);

  return (
    <span
      aria-hidden
      className={classes("pointer-events-none absolute inset-y-0 inset-x-1 block", className)}
      data-slot="slider-ticks"
      {...props}
    >
      {Array.from({ length: drawn + 1 }, (_, index) => min + index * stride * step).map((tick) => (
        <span
          className="absolute top-1/2 size-px -translate-x-1/2 -translate-y-1/2 bg-fg/25"
          key={tick}
          style={{ left: `${((tick - min) / (max - min)) * 100}%` }}
        />
      ))}
    </span>
  );
}

function SliderTrack({
  className,
  ...props
}: Omit<BaseSlider.Track.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseSlider.Track
      className={classes("relative overflow-hidden", className)}
      data-slot="slider-track"
      {...props}
    />
  );
}

function SliderIndicator({
  className,
  ...props
}: Omit<BaseSlider.Indicator.Props, "className"> & { className?: string }): ReactElement {
  return <BaseSlider.Indicator className={className} data-slot="slider-indicator" {...props} />;
}

function SliderThumb({
  className,
  ...props
}: Omit<BaseSlider.Thumb.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseSlider.Thumb
      className={classes("shrink-0", className)}
      data-slot="slider-thumb"
      {...props}
    />
  );
}

export const Slider = Object.assign(SliderRoot, {
  Control: SliderControl,
  Indicator: SliderIndicator,
  Label: SliderLabel,
  Thumb: SliderThumb,
  Ticks: SliderTicks,
  Track: SliderTrack,
  Value: SliderValueText,
});
