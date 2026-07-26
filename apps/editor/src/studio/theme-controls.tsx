import { Slider } from "@base-ui/react/slider";
import type { ReactNode } from "react";

export function ControlSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="studio-control-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function ColorControl({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="studio-control-row">
      <span>{label}</span>
      <span className="studio-color-value">
        {value}
        <input
          aria-label={label}
          onChange={(event) => onChange(event.currentTarget.value)}
          type="color"
          value={normalizeHex(value)}
        />
      </span>
    </label>
  );
}

export function RangeControl({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  return (
    <Slider.Root
      className="studio-range"
      max={max}
      min={min}
      name={controlName(label)}
      onValueChange={onChange}
      step={step}
      value={value}
    >
      <div className="studio-range__header">
        <Slider.Label className="studio-range__label">{label}</Slider.Label>
        <output>{value.toFixed(step < 1 ? 2 : 0)}</output>
      </div>
      <Slider.Control className="studio-range__control">
        <Slider.Track className="studio-range__track">
          <Slider.Indicator className="studio-range__indicator" />
        </Slider.Track>
        <Slider.Thumb className="studio-range__thumb" getAriaLabel={() => label} index={0} />
      </Slider.Control>
    </Slider.Root>
  );
}

function controlName(label: string): string {
  return label.toLowerCase().replaceAll(" ", "-");
}

function normalizeHex(value: string): string {
  return /^#[\da-f]{6}$/iu.test(value) ? value : "#1b1b1b";
}
