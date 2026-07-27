"use client";

import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type SliderSize = "sm" | "md" | "lg";
type SliderValue = number | readonly number[];

export interface SliderProps<Value extends SliderValue = SliderValue>
  extends Omit<BaseSlider.Root.Props<Value>, "children" | "className"> {
  children?: ReactNode;
  className?: string;
  label?: string;
  showValue?: boolean;
  size?: SliderSize;
  thumbLabels?: readonly string[];
}

function SliderRoot<Value extends SliderValue = SliderValue>({
  children,
  className,
  defaultValue,
  label,
  showValue = true,
  size = "md",
  thumbLabels,
  value,
  ...props
}: SliderProps<Value>): ReactElement {
  const thumbCount = getThumbCount(value ?? defaultValue);

  return (
    <BaseSlider.Root
      className={classes("slider", size !== "md" && `slider--${size}`, className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      {...props}
    >
      {children ?? (
        <>
          {label !== undefined || showValue ? (
            <div className="slider__header">
              {label !== undefined ? (
                <BaseSlider.Label className="slider__label" data-slot="slider-label">
                  {label}
                </BaseSlider.Label>
              ) : (
                <span />
              )}
              {showValue ? (
                <BaseSlider.Value className="slider__output" data-slot="slider-value" />
              ) : null}
            </div>
          ) : null}
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
            </SliderTrack>
            {Array.from({ length: thumbCount }, (_, index) => (
              <SliderThumb
                getAriaLabel={() => thumbLabels?.[index] ?? label ?? `Value ${index + 1}`}
                index={index}
                // biome-ignore lint/suspicious/noArrayIndexKey: Base UI thumb indices are stable part identities.
                key={index}
              />
            ))}
          </SliderControl>
        </>
      )}
    </BaseSlider.Root>
  );
}

function SliderLabel({
  className,
  ...props
}: Omit<BaseSlider.Label.Props, "className"> & { className?: string }): ReactElement {
  return <BaseSlider.Label className={classes("slider__label", className)} {...props} />;
}

function SliderValueText({
  className,
  ...props
}: Omit<BaseSlider.Value.Props, "className"> & { className?: string }): ReactElement {
  return <BaseSlider.Value className={classes("slider__output", className)} {...props} />;
}

function SliderControl({
  className,
  ...props
}: Omit<BaseSlider.Control.Props, "className"> & { className?: string }): ReactElement {
  return <BaseSlider.Control className={classes("slider__control", className)} {...props} />;
}

function SliderTrack({
  className,
  ...props
}: Omit<BaseSlider.Track.Props, "className"> & { className?: string }): ReactElement {
  return <BaseSlider.Track className={classes("slider__track", className)} {...props} />;
}

function SliderIndicator({
  className,
  ...props
}: Omit<BaseSlider.Indicator.Props, "className"> & { className?: string }): ReactElement {
  return <BaseSlider.Indicator className={classes("slider__fill", className)} {...props} />;
}

function SliderThumb({
  className,
  ...props
}: Omit<BaseSlider.Thumb.Props, "className"> & { className?: string }): ReactElement {
  return <BaseSlider.Thumb className={classes("slider__thumb", className)} {...props} />;
}

function getThumbCount(value: SliderValue | undefined): number {
  return Array.isArray(value) ? Math.max(value.length, 1) : 1;
}

export const Slider = Object.assign(SliderRoot, {
  Control: SliderControl,
  Indicator: SliderIndicator,
  Label: SliderLabel,
  Thumb: SliderThumb,
  Track: SliderTrack,
  Value: SliderValueText,
});
