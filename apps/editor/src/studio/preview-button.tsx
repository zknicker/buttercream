import { Button, type ButtonSize, type ButtonVariant } from "@buttercream/react";
import { type ReactElement, useState } from "react";
import type { PreviewIconElements } from "./preview-icons.ts";
import { Specimen } from "./preview-specimen.tsx";

const VARIANTS: readonly ButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "outline",
  "ghost",
  "danger",
  "danger-soft",
];
const SIZES: readonly ButtonSize[] = ["sm", "md", "lg"];

const SIZE_LABELS: Record<ButtonSize, string> = {
  lg: "Large",
  md: "Medium",
  sm: "Small",
};

/* Loading is a prop the caller flips, so one specimen proves it round-trips: click, wait, settle. */
function SubmitDemoButton(): ReactElement {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true);
        window.setTimeout(() => setLoading(false), 2500);
      }}
      variant="outline"
    >
      Click to submit
    </Button>
  );
}

function label(value: string): string {
  const spaced = value.replace("-", " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function ButtonPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Variants">
        {VARIANTS.map((variant) => (
          <Button key={variant} variant={variant}>
            {label(variant)}
          </Button>
        ))}
      </Specimen>
      <Specimen label="Sizes">
        {SIZES.map((size) => (
          <Button key={size} size={size}>
            {SIZE_LABELS[size]}
          </Button>
        ))}
      </Specimen>
      <Specimen label="With icons">
        <Button>{icons.search} Search</Button>
        <Button variant="secondary">{icons.add} Add member</Button>
        <Button variant="tertiary">Email {icons.mail}</Button>
        <Button variant="danger-soft">{icons.delete} Delete</Button>
      </Specimen>
      <Specimen label="Icon only">
        <Button aria-label="More options" iconOnly variant="ghost">
          {icons.more}
        </Button>
        <Button aria-label="Settings" iconOnly variant="outline">
          {icons.settings}
        </Button>
        <Button aria-label="Delete" iconOnly variant="danger">
          {icons.delete}
        </Button>
      </Specimen>
      <Specimen label="Loading">
        <Button loading>Loading</Button>
        <Button loading variant="secondary">
          Uploading
        </Button>
        <SubmitDemoButton />
      </Specimen>
      <Specimen label="Disabled">
        {VARIANTS.map((variant) => (
          <Button disabled key={variant} variant={variant}>
            {label(variant)}
          </Button>
        ))}
      </Specimen>
      <Specimen className="specimen--stack" label="Full width">
        <Button fullWidth>Full width button</Button>
        <Button fullWidth variant="secondary">
          {icons.add} With icon
        </Button>
      </Specimen>
    </div>
  );
}
