import type { ComponentSettings, DesignSystem } from "@buttercream/theme-core";
import type { ReactElement } from "react";
import {
  ControlSection,
  RangeControl,
  SelectControl,
  type SelectControlOption,
  ToggleControl,
} from "./theme-controls.tsx";

/*
 * Component defaults: the typed props every `@buttercream/react` component takes when a call site
 * says nothing. They are part of the document and are exported into DESIGN.md's "Component
 * defaults" list, so an agent building against the system starts from the same shapes the Brand
 * page's strip renders.
 *
 * They live in the rail rather than on a page because they are settings, not prose — the same row
 * vocabulary every other token uses, in the same place the user already looks for it.
 */

type Size = ComponentSettings["button"]["defaultSize"];
type Side = ComponentSettings["popover"]["defaultSide"];
type Backdrop = ComponentSettings["modal"]["defaultBackdrop"];
type Orientation = ComponentSettings["tabs"]["defaultOrientation"];
type ChoiceVariant = ComponentSettings["checkbox"]["defaultVariant"];

const SIZES: readonly SelectControlOption<Size>[] = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
];

const SIDES: readonly SelectControlOption<Side>[] = [
  { label: "Top", value: "top" },
  { label: "Right", value: "right" },
  { label: "Bottom", value: "bottom" },
  { label: "Left", value: "left" },
];

const BACKDROPS: readonly SelectControlOption<Backdrop>[] = [
  { label: "Opaque", value: "opaque" },
  { label: "Blur", value: "blur" },
  { label: "Transparent", value: "transparent" },
];

const ORIENTATIONS: readonly SelectControlOption<Orientation>[] = [
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical", value: "vertical" },
];

const CHOICE_VARIANTS: readonly SelectControlOption<ChoiceVariant>[] = [
  { label: "Primary", value: "primary" },
  { label: "Secondary", value: "secondary" },
];

export function ComponentsPanel({
  components,
  onUpdate,
}: {
  components: ComponentSettings;
  onUpdate: (mutate: (designSystem: DesignSystem) => void) => void;
}): ReactElement {
  return (
    <>
      <ControlSection title="Avatar">
        <SelectControl
          label="Shape"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.avatar.defaultShape = value;
            })
          }
          options={[
            { label: "Square", value: "square" },
            { label: "Rounded", value: "rounded" },
            { label: "Circle", value: "circle" },
          ]}
          value={components.avatar.defaultShape}
        />
        <SelectControl
          label="Size"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.avatar.defaultSize = value;
            })
          }
          options={SIZES}
          value={components.avatar.defaultSize}
        />
      </ControlSection>

      <ControlSection title="Button">
        <SelectControl
          label="Variant"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.button.defaultVariant = value;
            })
          }
          options={[
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Tertiary", value: "tertiary" },
            { label: "Outline", value: "outline" },
            { label: "Ghost", value: "ghost" },
            { label: "Danger", value: "danger" },
            { label: "Danger soft", value: "danger-soft" },
          ]}
          value={components.button.defaultVariant}
        />
        <SelectControl
          label="Size"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.button.defaultSize = value;
            })
          }
          options={SIZES}
          value={components.button.defaultSize}
        />
      </ControlSection>

      <ControlSection title="Card">
        <SelectControl
          label="Variant"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.card.defaultVariant = value;
            })
          }
          options={[
            { label: "Default", value: "default" },
            { label: "Secondary", value: "secondary" },
            { label: "Tertiary", value: "tertiary" },
            { label: "Transparent", value: "transparent" },
          ]}
          value={components.card.defaultVariant}
        />
      </ControlSection>

      <ControlSection title="Checkbox">
        <SelectControl
          label="Variant"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.checkbox.defaultVariant = value;
            })
          }
          options={CHOICE_VARIANTS}
          value={components.checkbox.defaultVariant}
        />
        <SelectControl
          label="Size"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.checkbox.defaultSize = value;
            })
          }
          options={SIZES}
          value={components.checkbox.defaultSize}
        />
        <ToggleControl
          label="Rounded"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.checkbox.defaultRounded = value;
            })
          }
          value={components.checkbox.defaultRounded}
        />
      </ControlSection>

      <ControlSection title="Drawer">
        <SelectControl
          label="Placement"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.drawer.defaultPlacement = value;
            })
          }
          options={SIDES}
          value={components.drawer.defaultPlacement}
        />
        <SelectControl
          label="Backdrop"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.drawer.defaultBackdrop = value;
            })
          }
          options={BACKDROPS}
          value={components.drawer.defaultBackdrop}
        />
      </ControlSection>

      <ControlSection title="Input">
        <SelectControl
          label="Variant"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.input.defaultVariant = value;
            })
          }
          options={CHOICE_VARIANTS}
          value={components.input.defaultVariant}
        />
        <ToggleControl
          label="Full width"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.input.defaultFullWidth = value;
            })
          }
          value={components.input.defaultFullWidth}
        />
      </ControlSection>

      <ControlSection title="Modal">
        <SelectControl
          label="Placement"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.modal.defaultPlacement = value;
            })
          }
          options={[
            { label: "Auto", value: "auto" },
            { label: "Top", value: "top" },
            { label: "Center", value: "center" },
            { label: "Bottom", value: "bottom" },
          ]}
          value={components.modal.defaultPlacement}
        />
        <SelectControl
          label="Backdrop"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.modal.defaultBackdrop = value;
            })
          }
          options={BACKDROPS}
          value={components.modal.defaultBackdrop}
        />
      </ControlSection>

      <ControlSection title="Popover">
        <SelectControl
          label="Side"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.popover.defaultSide = value;
            })
          }
          options={SIDES}
          value={components.popover.defaultSide}
        />
      </ControlSection>

      <ControlSection title="Radio group">
        <SelectControl
          label="Variant"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.radioGroup.defaultVariant = value;
            })
          }
          options={CHOICE_VARIANTS}
          value={components.radioGroup.defaultVariant}
        />
        <SelectControl
          label="Size"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.radioGroup.defaultSize = value;
            })
          }
          options={SIZES}
          value={components.radioGroup.defaultSize}
        />
        <SelectControl
          label="Orientation"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.radioGroup.defaultOrientation = value;
            })
          }
          options={ORIENTATIONS}
          value={components.radioGroup.defaultOrientation}
        />
      </ControlSection>

      <ControlSection title="Select">
        <ToggleControl
          label="Multiple"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.select.defaultMultiple = value;
            })
          }
          value={components.select.defaultMultiple}
        />
      </ControlSection>

      <ControlSection title="Slider">
        <SelectControl
          label="Size"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.slider.defaultSize = value;
            })
          }
          options={SIZES}
          value={components.slider.defaultSize}
        />
      </ControlSection>

      <ControlSection title="Switch">
        <SelectControl
          label="Size"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.switch.defaultSize = value;
            })
          }
          options={SIZES}
          value={components.switch.defaultSize}
        />
      </ControlSection>

      <ControlSection title="Tabs">
        <SelectControl
          label="Variant"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.tabs.defaultVariant = value;
            })
          }
          options={CHOICE_VARIANTS}
          value={components.tabs.defaultVariant}
        />
        <SelectControl
          label="Orientation"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.tabs.defaultOrientation = value;
            })
          }
          options={ORIENTATIONS}
          value={components.tabs.defaultOrientation}
        />
      </ControlSection>

      <ControlSection title="Tooltip">
        <SelectControl
          label="Side"
          onChange={(value) =>
            onUpdate((next) => {
              next.components.tooltip.defaultSide = value;
            })
          }
          options={SIDES}
          value={components.tooltip.defaultSide}
        />
        {/* Hover intent, in milliseconds. Past about two seconds a tooltip stops arriving. */}
        <RangeControl
          format={(value) => `${value}ms`}
          label="Delay"
          max={2000}
          min={0}
          onChange={(value) =>
            onUpdate((next) => {
              next.components.tooltip.defaultDelay = value;
            })
          }
          step={50}
          value={components.tooltip.defaultDelay}
        />
      </ControlSection>
    </>
  );
}
