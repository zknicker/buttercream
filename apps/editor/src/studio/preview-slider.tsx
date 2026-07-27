import { Slider } from "@buttercream/react";
import type { ReactElement } from "react";

export function SliderPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <div className="slider-demo">
          <Slider defaultValue={30} label="Small" size="sm" />
          <Slider defaultValue={30} label="Medium" size="md" />
          <Slider defaultValue={30} label="Large" size="lg" />
        </div>
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen specimen--stack">
        <div className="slider-demo">
          <Slider defaultValue={40} label="Steps of 10" step={10} />
          <Slider defaultValue={0.5} label="Fine steps" max={1} min={0} step={0.01} />
        </div>
        <div className="specimen__label">Steps</div>
      </section>
      <section className="specimen">
        <div className="slider-demo">
          <Slider
            defaultValue={[100, 500]}
            format={{ currency: "USD", style: "currency" }}
            label="Price"
            max={1000}
            thumbLabels={["Minimum price", "Maximum price"]}
          />
        </div>
        <div className="specimen__label">Range</div>
      </section>
      <section className="specimen">
        <div className="slider-demo">
          <Slider defaultValue={30} label="Volume" showValue={false} />
        </div>
        <div className="specimen__label">Hidden value</div>
      </section>
      <section className="specimen">
        <div className="slider-demo--vertical">
          <Slider
            defaultValue={40}
            orientation="vertical"
            showValue={false}
            thumbLabels={["Vertical slider"]}
          />
        </div>
        <div className="specimen__label">Vertical</div>
      </section>
      <section className="specimen">
        <div className="slider-demo">
          <Slider defaultValue={30} disabled label="Volume" />
        </div>
        <div className="specimen__label">Disabled</div>
      </section>
    </div>
  );
}
