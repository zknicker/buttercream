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

/*
 * A dot per step, drawn inside the track.
 *
 * Above a certain density ticks stop reading as steps and start reading as texture, so past the
 * cap they are dropped rather than drawn faintly — a fill with no dots is honest about being
 * continuous, where a grey smear only looks like a rendering fault.
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
  if (count < 1 || count > 40) {
    return null;
  }

  return (
    <span
      aria-hidden
      className={classes("pointer-events-none absolute inset-y-0 inset-x-1 block", className)}
      data-slot="slider-ticks"
      {...props}
    >
      {Array.from({ length: count + 1 }, (_, index) => min + index * step).map((tick) => (
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
