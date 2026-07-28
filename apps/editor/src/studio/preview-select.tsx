import { Select } from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import { usePreviewSurface } from "./preview-surface.tsx";

const stateNames = ["Florida", "Georgia", "Delaware", "Vermont", "Ohio", "Nevada"];

export function SelectPreview(): ReactElement {
  // Controlled so picking from the grouped listbox visibly updates the trigger.
  const [region, setRegion] = useState<string | null>("Florida");
  const surface = usePreviewSurface();

  return (
    <div className="specimens">
      <section className="specimen">
        <div className="input-demo">
          <Select container={surface} label="State" placeholder="Select one">
            <StateItems />
          </Select>
          <Select container={surface} defaultValue="Florida" label="Preselected">
            <StateItems />
          </Select>
        </div>
        <div className="specimen__label">Basic</div>
      </section>
      <section className="specimen">
        <div className="input-demo">
          <Select
            description="Select your state of residence"
            label="State"
            placeholder="Select one"
          >
            <StateItems />
          </Select>
        </div>
        <div className="specimen__label">Description</div>
      </section>
      <section className="specimen">
        <div className="input-demo">
          <Select container={surface} defaultValue="Florida" disabled label="Disabled">
            <StateItems />
          </Select>
          <Select container={surface} label="Disabled item" placeholder="Select one">
            <Select.Item value="Florida">Florida</Select.Item>
            <Select.Item disabled value="Vermont">
              Vermont
            </Select.Item>
            <Select.Item value="Ohio">Ohio</Select.Item>
          </Select>
        </div>
        <div className="specimen__label">Disabled</div>
      </section>
      <section className="specimen">
        <div className="input-demo">
          {/*
           * A long grouped list: it overflows the popup's max-height, so opening it also
           * exercises the Base UI scroll arrows, group labels, and a disabled item.
           */}
          <Select
            label="State"
            onValueChange={(value) => setRegion(value)}
            placeholder="Select one"
            value={region}
          >
            <Select.Group>
              <Select.GroupLabel>South</Select.GroupLabel>
              <Select.Item value="Florida">Florida</Select.Item>
              <Select.Item value="Georgia">Georgia</Select.Item>
              <Select.Item value="Alabama">Alabama</Select.Item>
              <Select.Item value="Tennessee">Tennessee</Select.Item>
              <Select.Item value="Louisiana">Louisiana</Select.Item>
            </Select.Group>
            <Select.Group>
              <Select.GroupLabel>Northeast</Select.GroupLabel>
              <Select.Item value="Delaware">Delaware</Select.Item>
              <Select.Item disabled value="Vermont">
                Vermont
              </Select.Item>
              <Select.Item value="Maine">Maine</Select.Item>
              <Select.Item value="New York">New York</Select.Item>
              <Select.Item value="Massachusetts">Massachusetts</Select.Item>
            </Select.Group>
            <Select.Group>
              <Select.GroupLabel>Midwest</Select.GroupLabel>
              <Select.Item value="Ohio">Ohio</Select.Item>
              <Select.Item value="Michigan">Michigan</Select.Item>
              <Select.Item value="Illinois">Illinois</Select.Item>
              <Select.Item value="Iowa">Iowa</Select.Item>
              <Select.Item value="Kansas">Kansas</Select.Item>
            </Select.Group>
            <Select.Group>
              <Select.GroupLabel>West</Select.GroupLabel>
              <Select.Item value="California">California</Select.Item>
              <Select.Item value="Oregon">Oregon</Select.Item>
              <Select.Item value="Washington">Washington</Select.Item>
              <Select.Item value="Nevada">Nevada</Select.Item>
              <Select.Item value="Arizona">Arizona</Select.Item>
            </Select.Group>
          </Select>
        </div>
        <div className="specimen__label">Listbox</div>
      </section>
    </div>
  );
}

function StateItems(): ReactElement {
  return (
    <>
      {stateNames.map((name) => (
        <Select.Item key={name} value={name}>
          {name}
        </Select.Item>
      ))}
    </>
  );
}
