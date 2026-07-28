import type { DesignSystem } from "@buttercream/theme-core";
import {
  ControlSection,
  RangeControl,
  SelectControl,
  type SelectControlOption,
} from "./theme-controls.tsx";

type IconSettings = DesignSystem["icons"];
type IconFamily = IconSettings["family"];
type HugeiconsTreatment = Extract<IconSettings, { family: "hugeicons" }>["treatment"];

const iconFamilyOptions = [
  { label: "Lucide", value: "lucide" },
  { label: "Hugeicons", value: "hugeicons" },
] satisfies readonly SelectControlOption<IconFamily>[];

const lucideTreatmentOptions = [
  { label: "Stroke", value: "stroke" },
] satisfies readonly SelectControlOption<"stroke">[];

const hugeiconsTreatmentOptions = [
  { label: "Stroke rounded", value: "stroke-rounded" },
  { label: "Stroke standard", value: "stroke-standard" },
  { label: "Stroke sharp", value: "stroke-sharp" },
  { label: "Solid rounded", value: "solid-rounded" },
  { label: "Solid standard", value: "solid-standard" },
  { label: "Solid sharp", value: "solid-sharp" },
  { label: "Duotone rounded", value: "duotone-rounded" },
  { label: "Duotone standard", value: "duotone-standard" },
  { label: "Twotone rounded", value: "twotone-rounded" },
  { label: "Bulk rounded", value: "bulk-rounded" },
] satisfies readonly SelectControlOption<HugeiconsTreatment>[];

export function ThemeIconControls({
  icons,
  onChange,
}: {
  icons: IconSettings;
  /* The sliders name their gesture so a drag is one history entry; the pickers are discrete. */
  onChange: (icons: IconSettings, coalesceKey?: string) => void;
}) {
  return (
    <ControlSection title="Icons">
      <SelectControl
        label="Family"
        onChange={(family) => onChange(normalizeIconFamily(icons, family))}
        options={iconFamilyOptions}
        value={icons.family}
      />
      {icons.family === "lucide" ? (
        <SelectControl
          disabled
          label="Treatment"
          onChange={() => undefined}
          options={lucideTreatmentOptions}
          value={icons.treatment}
        />
      ) : (
        <SelectControl
          label="Treatment"
          onChange={(treatment) => onChange({ ...icons, treatment })}
          options={hugeiconsTreatmentOptions}
          value={icons.treatment}
        />
      )}
      <RangeControl
        label="Size"
        max={32}
        min={12}
        onChange={(size) => onChange({ ...icons, size }, "icons.size")}
        step={1}
        value={icons.size}
      />
      {isStrokeBasedIconTreatment(icons) ? (
        <RangeControl
          label="Stroke width"
          max={3}
          min={0.5}
          onChange={(strokeWidth) => onChange({ ...icons, strokeWidth }, "icons.strokeWidth")}
          step={0.25}
          value={icons.strokeWidth}
        />
      ) : null}
    </ControlSection>
  );
}

export function normalizeIconFamily(current: IconSettings, family: IconFamily): IconSettings {
  if (current.family === family) {
    return current;
  }

  const shared = {
    size: current.size,
    strokeWidth: current.strokeWidth,
  };

  return family === "lucide"
    ? { ...shared, family: "lucide", treatment: "stroke" }
    : { ...shared, family: "hugeicons", treatment: "stroke-rounded" };
}

export function isStrokeBasedIconTreatment(icons: IconSettings): boolean {
  return icons.family === "lucide" || icons.treatment.startsWith("stroke-");
}
