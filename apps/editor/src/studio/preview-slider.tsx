import { Slider } from "@buttercream/react";
import type { ReactElement } from "react";
import { Specimen } from "./preview-specimen.tsx";

export function SliderPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Sizes">
        <div className="slider-demo">
          <Slider defaultValue={30} label="Small" size="sm" />
          <Slider defaultValue={30} label="Medium" size="md" />
          <Slider defaultValue={30} label="Large" size="lg" />
        </div>
      </Specimen>
      <Specimen className="specimen--stack" label="Steps">
        <div className="slider-demo">
          <Slider defaultValue={40} label="Steps of 10" step={10} />
          <Slider defaultValue={0.5} label="Fine steps" max={1} min={0} step={0.01} />
        </div>
      </Specimen>
      <Specimen label="Range">
        <div className="slider-demo">
          <Slider
            defaultValue={[100, 500]}
            format={{ currency: "USD", style: "currency" }}
            label="Price"
            max={1000}
            thumbLabels={["Minimum price", "Maximum price"]}
          />
        </div>
      </Specimen>
      <Specimen label="Hidden value">
        <div className="slider-demo">
          <Slider defaultValue={30} label="Volume" showValue={false} />
        </div>
      </Specimen>
      <Specimen label="Vertical">
        <div className="slider-demo--vertical">
          <Slider
            defaultValue={40}
            orientation="vertical"
            showValue={false}
            thumbLabels={["Vertical slider"]}
          />
        </div>
      </Specimen>
      <Specimen label="Disabled">
        <div className="slider-demo">
          <Slider defaultValue={30} disabled label="Volume" />
        </div>
      </Specimen>
      <Specimen label="Custom output">
        <div className="slider-demo">
          <Slider defaultValue={45}>
            <div className="slider__header">
              <Slider.Label>Storage used</Slider.Label>
            </div>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb getAriaLabel={() => "Storage used"} index={0} />
            </Slider.Control>
            <Slider.Value>{(formattedValues) => `${formattedValues[0]} GB free`}</Slider.Value>
          </Slider>
        </div>
      </Specimen>
    </div>
  );
}
