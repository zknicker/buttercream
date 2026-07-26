import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { ReactElement } from "react";
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
      className={classes("flex items-center", className)}
      data-slot="slider-control"
      {...props}
    />
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
  Track: SliderTrack,
  Value: SliderValueText,
});
