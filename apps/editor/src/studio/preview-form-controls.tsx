import { Button, Input, Surface } from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";

export function InputPreview(): ReactElement {
  // Controlled so the clear button visibly empties the field and it can be retyped.
  const [search, setSearch] = useState("buttercream");

  return (
    <div className="specimens">
      <section className="specimen">
        <div className="input-demo">
          <Input aria-label="Primary" placeholder="Primary" />
          <Input aria-label="Secondary" placeholder="Secondary" variant="secondary" />
        </div>
        <div className="specimen__label">Variants</div>
      </section>
      <section className="specimen">
        <div className="input-demo">
          <Input aria-label="Price" placeholder="0.00" prefix="$" />
          <Input aria-label="Website" placeholder="buttercream.dev" prefix="https://" />
        </div>
        <div className="specimen__label">Prefix</div>
      </section>
      <section className="specimen">
        <div className="input-demo input-demo--types">
          <Input aria-label="Email" placeholder="jane@example.com" type="email" />
          <Input aria-label="Password" defaultValue="hunter2" type="password" />
          <Input aria-label="Quantity" defaultValue={3} type="number" />
        </div>
        <div className="specimen__label">Types</div>
      </section>
      <section className="specimen">
        <Input aria-label="Full width" fullWidth placeholder="Stretches to the container" />
        <div className="specimen__label">Full width</div>
      </section>
      <section className="specimen">
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
        <div className="specimen__label">Controlled with clear</div>
      </section>
      <section className="specimen">
        <div className="input-demo">
          <Input aria-label="Required" placeholder="Required" required />
          <Input aria-label="Disabled" defaultValue="Read only" disabled />
        </div>
        <div className="specimen__label">Required and disabled</div>
      </section>
      <section className="specimen">
        <Surface>
          <Input aria-label="Name" placeholder="Name" variant="secondary" />
        </Surface>
        <div className="specimen__label">On surface</div>
      </section>
    </div>
  );
}
