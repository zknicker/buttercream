import type { CSSProperties, ReactNode } from "react";

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
  const progress = ((value - min) / (max - min)) * 100;
  return (
    <label
      className="studio-range"
      style={{ "--studio-progress": `${progress}%` } as CSSProperties}
    >
      <span>{label}</span>
      <output>{value.toFixed(step < 1 ? 2 : 0)}</output>
      <input
        aria-label={label}
        max={max}
        min={min}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

function normalizeHex(value: string): string {
  return /^#[\da-f]{6}$/iu.test(value) ? value : "#1b1b1b";
}
