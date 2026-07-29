import { Button, Input, Surface } from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import { Specimen } from "./preview-specimen.tsx";

export function InputPreview(): ReactElement {
  // Controlled so the clear button visibly empties the field and it can be retyped.
  const [search, setSearch] = useState("buttercream");

  return (
    <div className="specimens">
      <Specimen label="Variants">
        <div className="input-demo">
          <Input aria-label="Primary" placeholder="Primary" />
          <Input aria-label="Secondary" placeholder="Secondary" variant="secondary" />
        </div>
      </Specimen>
      <Specimen label="Prefix">
        <div className="input-demo">
          <Input aria-label="Price" placeholder="0.00" prefix="$" />
          <Input aria-label="Website" placeholder="buttercream.dev" prefix="https://" />
        </div>
      </Specimen>
      <Specimen label="Types">
        <div className="input-demo input-demo--types">
          <Input aria-label="Email" placeholder="jane@example.com" type="email" />
          <Input aria-label="Password" defaultValue="hunter2" type="password" />
          <Input aria-label="Quantity" defaultValue={3} type="number" />
        </div>
      </Specimen>
      <Specimen label="Full width">
        <Input aria-label="Full width" fullWidth placeholder="Stretches to the container" />
      </Specimen>
      <Specimen label="Controlled with clear">
        <div className="input-demo">
          <Input
            aria-label="Search"
            onValueChange={(value) => setSearch(value)}
            placeholder="Search"
            value={search}
          />
          <Button disabled={search === ""} onClick={() => setSearch("")} variant="tertiary">
            Clear
          </Button>
        </div>
      </Specimen>
      <Specimen label="Required and disabled">
        <div className="input-demo">
          <Input aria-label="Required" placeholder="Required" required />
          <Input aria-label="Disabled" defaultValue="Read only" disabled />
        </div>
      </Specimen>
      <Specimen label="On surface">
        <Surface>
          <Input aria-label="Name" placeholder="Name" variant="secondary" />
        </Surface>
      </Specimen>
    </div>
  );
}
