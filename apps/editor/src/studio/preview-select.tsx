import { Button, Select } from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import { Specimen } from "./preview-specimen.tsx";
import { usePreviewSurface } from "./preview-surface.tsx";

const stateNames = ["Florida", "Georgia", "Delaware", "Vermont", "Ohio", "Nevada"];

/* Controlled multi-select: value/onValueChange with the Multiple generic. */
function ControlledMultipleSelect(): ReactElement {
  const [regions, setRegions] = useState<string[]>(["Florida", "Ohio"]);
  const surface = usePreviewSurface();

  return (
    <Select
      container={surface}
      label="States (controlled)"
      multiple
      onValueChange={(value) => setRegions(value)}
      placeholder="Select states"
      value={regions}
    >
      <StateItems />
    </Select>
  );
}

/* open/onOpenChange are Base UI Select.Root props that pass straight through — this proves
 * the popup can be driven from outside the trigger, not only by clicking it. */
function OpenStateSelect(): ReactElement {
  const [open, setOpen] = useState(false);
  const surface = usePreviewSurface();

  return (
    <>
      <Select
        container={surface}
        label="State"
        onOpenChange={setOpen}
        open={open}
        placeholder="Select one"
      >
        <StateItems />
      </Select>
      <Button onClick={() => setOpen((value) => !value)} variant="outline">
        {open ? "Close" : "Open"} externally
      </Button>
    </>
  );
}

export function SelectPreview(): ReactElement {
  // Controlled so picking from the grouped listbox visibly updates the trigger.
  const [region, setRegion] = useState<string | null>("Florida");
  const surface = usePreviewSurface();

  return (
    <div className="specimens">
      <Specimen label="Basic">
        <div className="input-demo">
          <Select container={surface} label="State" placeholder="Select one">
            <StateItems />
          </Select>
          <Select container={surface} defaultValue="Florida" label="Preselected">
            <StateItems />
          </Select>
        </div>
      </Specimen>
      <Specimen label="Description">
        <div className="input-demo">
          <Select
            container={surface}
            description="Select your state of residence"
            label="State"
            placeholder="Select one"
          >
            <StateItems />
          </Select>
        </div>
      </Specimen>
      <Specimen label="Required">
        <div className="input-demo">
          <Select
            container={surface}
            description="A selection is required to continue"
            label="State"
            placeholder="Select one"
            required
          >
            <StateItems />
          </Select>
        </div>
      </Specimen>
      <Specimen label="Disabled">
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
      </Specimen>
      <Specimen label="Listbox">
        <div className="input-demo">
          {/*
           * A long grouped list: it overflows the popup's max-height, so opening it also
           * exercises the Base UI scroll arrows, group labels, and a disabled item.
           */}
          <Select
            container={surface}
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
      </Specimen>
      <Specimen label="Multiple">
        <div className="input-demo">
          <Select
            container={surface}
            defaultValue={["Florida", "Georgia"]}
            label="States"
            multiple
            placeholder="Select states"
          >
            <StateItems />
          </Select>
          <ControlledMultipleSelect />
        </div>
      </Specimen>
      <Specimen label="Custom indicator">
        <div className="input-demo">
          {/* indicator overrides the trigger chevron; each Select.Item can override its own
           * checkmark independently. */}
          <Select
            container={surface}
            defaultValue="Florida"
            indicator={<span aria-hidden="true">▾</span>}
            label="Custom indicator"
            placeholder="Select one"
          >
            <Select.Item indicator={<span aria-hidden="true">★</span>} value="Florida">
              Florida
            </Select.Item>
            <Select.Item indicator={<span aria-hidden="true">★</span>} value="Georgia">
              Georgia
            </Select.Item>
            <Select.Item indicator={<span aria-hidden="true">★</span>} value="Delaware">
              Delaware
            </Select.Item>
          </Select>
        </div>
      </Specimen>
      <Specimen label="Controlled open state">
        <div className="input-demo">
          <OpenStateSelect />
        </div>
      </Specimen>
      <Specimen label="Custom render function">
        <div className="input-demo">
          {/* render is Base UI's escape hatch for augmenting an item's rendered element from
           * its own state — here it bolds whichever item is currently selected. */}
          <Select
            container={surface}
            defaultValue="Florida"
            label="Bold selected item"
            placeholder="Select one"
          >
            {stateNames.map((name) => (
              <Select.Item
                key={name}
                render={(itemProps, state) => (
                  <div {...itemProps} style={state.selected ? { fontWeight: 700 } : undefined} />
                )}
                value={name}
              >
                {name}
              </Select.Item>
            ))}
          </Select>
        </div>
      </Specimen>
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
