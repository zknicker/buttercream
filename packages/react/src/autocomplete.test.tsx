import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Autocomplete } from "./autocomplete.tsx";

const PETS = ["Cat", "Dog", "Parrot"];

const items = (pet: string) => (
  <Autocomplete.Item key={pet} value={pet}>
    {pet}
  </Autocomplete.Item>
);

describe("Autocomplete", () => {
  test("renders a labelled trigger carrying the selected value", () => {
    const markup = renderToStaticMarkup(
      <Autocomplete
        defaultValue="Cat"
        description="Pick one pet"
        items={PETS}
        label="Favorite animal"
        name="pet"
        placeholder="Select one"
      >
        {items}
      </Autocomplete>,
    );

    expect(markup).toContain('data-slot="autocomplete"');
    expect(markup).toContain('data-slot="autocomplete-trigger"');
    expect(markup).toContain('name="pet"');
    expect(markup).toContain("Cat");
    expect(markup).toContain("Pick one pet");
  });

  test("carries the size, variant and full-width modifiers", () => {
    const markup = renderToStaticMarkup(
      <Autocomplete fullWidth items={PETS} label="Favorite animal" size="lg" variant="secondary">
        {items}
      </Autocomplete>,
    );

    expect(markup).toContain("autocomplete--lg");
    expect(markup).toContain("autocomplete--secondary");
    expect(markup).toContain("autocomplete--full-width");
  });

  test("renders the clear button only once there is a value to clear", () => {
    const empty = renderToStaticMarkup(
      <Autocomplete clearable items={PETS} label="Favorite animal">
        {items}
      </Autocomplete>,
    );
    const chosen = renderToStaticMarkup(
      <Autocomplete clearable defaultValue="Cat" items={PETS} label="Favorite animal">
        {items}
      </Autocomplete>,
    );

    expect(empty).toContain("autocomplete__control--clearable");
    expect(empty).not.toContain('data-slot="autocomplete-clear"');
    expect(chosen).toContain('data-slot="autocomplete-clear"');
    expect(chosen).toContain('aria-label="Clear selection"');
  });

  test("renders a chip per value in multiple mode, and no popup search", () => {
    const markup = renderToStaticMarkup(
      <Autocomplete
        clearable
        defaultValue={["Cat", "Dog"]}
        items={PETS}
        label="Favorite animals"
        multiple
        placeholder="Add a pet"
      >
        {items}
      </Autocomplete>,
    );

    expect(markup).toContain("autocomplete--multiple");
    expect(markup).toContain('data-slot="autocomplete-chips"');
    expect(markup).toContain('aria-label="Remove Cat"');
    expect(markup).toContain('aria-label="Remove Dog"');
    expect(markup).not.toContain('data-slot="autocomplete-search"');
  });

  test("labels chips with an object item's label", () => {
    const markup = renderToStaticMarkup(
      <Autocomplete
        defaultValue={[{ label: "Cat", value: "cat" }]}
        items={[{ label: "Cat", value: "cat" }]}
        label="Favorite animals"
        multiple
      >
        {(item: { label: string; value: string }) => (
          <Autocomplete.Item key={item.value} value={item}>
            {item.label}
          </Autocomplete.Item>
        )}
      </Autocomplete>,
    );

    expect(markup).toContain('data-slot="autocomplete-chip"');
    expect(markup).toContain('aria-label="Remove Cat"');
  });

  test("swaps the description for the error message while invalid", () => {
    const markup = renderToStaticMarkup(
      <Autocomplete
        description="Pick one pet"
        errorMessage="Choose an animal"
        invalid
        items={PETS}
        label="Favorite animal"
      >
        {items}
      </Autocomplete>,
    );

    expect(markup).toContain("autocomplete--invalid");
    expect(markup).toContain('aria-invalid="true"');
    expect(markup).toContain("Choose an animal");
    expect(markup).not.toContain("Pick one pet");
  });

  test("swaps the chevron for the shared spinner while loading", () => {
    const markup = renderToStaticMarkup(
      <Autocomplete items={PETS} label="Favorite animal" loading>
        {items}
      </Autocomplete>,
    );

    expect(markup).toContain("autocomplete__spinner");
    expect(markup).not.toContain("autocomplete__chevron");
  });
});
