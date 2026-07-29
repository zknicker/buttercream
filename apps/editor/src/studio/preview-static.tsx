import { Button, ButtonGroup, type ButtonSize, ColorSwatch, Kbd, Link } from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import type { ReactElement } from "react";
import { createPreviewIconElements } from "./preview-icons.ts";
import { Specimen } from "./preview-specimen.tsx";

const SWATCH_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

export function KbdPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Keys and chords">
        <Kbd>⌘ K</Kbd>
        <Kbd>⇧ ⌘ P</Kbd>
        <Kbd>Esc</Kbd>
      </Specimen>
      <Specimen label="Inline with text">
        <span>
          Press <Kbd>⌘ K</Kbd> to search.
        </span>
      </Specimen>
      <Specimen label="Named keys and light variant">
        <Kbd keys="command">K</Kbd>
        <Kbd keys={["shift", "command"]}>P</Kbd>
        <Kbd keys="escape" />
        <Kbd keys="command" variant="light">
          K
        </Kbd>
      </Specimen>
      <Specimen label="Navigation and special keys">
        <Kbd keys="up" />
        <Kbd keys="down" />
        <Kbd keys="left" />
        <Kbd keys="right" />
        <Kbd keys="pageup" />
        <Kbd keys="pagedown" />
        <Kbd keys="enter" />
        <Kbd keys="tab" />
        <Kbd keys="space" />
      </Specimen>
      <Specimen className="specimen--stack" label="Instructional list">
        <div>
          <Kbd keys={["command", "shift"]}>N</Kbd> New window
        </div>
        <div>
          <Kbd keys="command">S</Kbd> Save
        </div>
        <div>
          <Kbd keys="escape" /> Close dialog
        </div>
      </Specimen>
    </div>
  );
}

/* A stand-in custom glyph for the "Custom icon" specimen below — Link's icon prop accepts any
   ReactNode, so this deliberately avoids the built-in arrow rather than reusing an icon-set
   element, to keep this file independent of any single icon family for a non-icon-set demo. */
function StarGlyph(): ReactElement {
  return (
    <svg aria-hidden="true" fill="currentcolor" role="presentation" viewBox="0 0 16 16">
      <path d="M8 1.5 9.9 5.9 14.5 6.3 11 9.3 12 13.8 8 11.3 4 13.8 5 9.3 1.5 6.3 6.1 5.9Z" />
    </svg>
  );
}

export function LinkPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Default">
        <Link href="#docs">Read the documentation</Link>
      </Specimen>
      <Specimen label="External">
        <Link href="https://example.com" icon target="_blank">
          Opens in a new tab
        </Link>
      </Specimen>
      <Specimen label="Inline">
        <span>
          Built on <Link href="#base-ui">Base UI</Link> and styled with tokens.
        </span>
      </Specimen>
      <Specimen label="Disabled">
        <Link aria-disabled="true" href="#none">
          Unavailable
        </Link>
      </Specimen>
      <Specimen label="Custom icon">
        <Link href="#favorites" icon={<StarGlyph />}>
          Add to favorites
        </Link>
      </Specimen>
      <Specimen label="Custom styling via style">
        {/* style passes through like any other native anchor attribute, so a caller can override the resting underline. */}
        <Link href="#terms" style={{ textDecorationLine: "underline" }}>
          Terms of service
        </Link>
      </Specimen>
    </div>
  );
}

export function ColorSwatchPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Sizes">
        {SWATCH_SIZES.map((size) => (
          <ColorSwatch color="var(--accent)" key={size} label={`Accent ${size}`} size={size} />
        ))}
      </Specimen>
      <Specimen label="Circle">
        <ColorSwatch color="var(--accent)" label="Accent" shape="circle" />
        <ColorSwatch color="var(--success)" label="Success" shape="circle" />
        <ColorSwatch color="var(--warning)" label="Warning" shape="circle" />
        <ColorSwatch color="var(--danger)" label="Danger" shape="circle" />
      </Specimen>
      <Specimen label="Translucent">
        {/* The checkerboard is what makes a translucent value readable as translucent. */}
        <ColorSwatch color="rgb(4 133 247 / 0.25)" label="Accent at 25%" />
        <ColorSwatch color="rgb(4 133 247 / 0.5)" label="Accent at 50%" />
        <ColorSwatch color="transparent" label="Transparent" />
      </Specimen>
      <Specimen label="Custom style via style">
        {/* className and style both pass through, so a caller can layer its own treatment on top. */}
        <ColorSwatch
          color="var(--accent)"
          label="Accent, heavier ring"
          style={{ boxShadow: "inset 0 0 0 2px var(--accent)" }}
        />
      </Specimen>
    </div>
  );
}

const GROUP_VARIANTS = ["primary", "secondary", "tertiary", "outline", "ghost", "danger"] as const;
const GROUP_SIZES: readonly ButtonSize[] = ["sm", "md", "lg"];

export function ButtonGroupPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  /* Real icons from the configured family, so the Icons panel drives these specimens too. */
  const icon = createPreviewIconElements(icons);

  return (
    <div className="specimens">
      <Specimen label="Split button">
        <ButtonGroup>
          <Button>Merge pull request</Button>
          <Button aria-label="More merge options" iconOnly>
            {icon.chevronDown}
          </Button>
        </ButtonGroup>
      </Specimen>
      <Specimen label="Paged">
        <ButtonGroup>
          <Button variant="tertiary">Previous</Button>
          <Button variant="tertiary">Next</Button>
        </ButtonGroup>
      </Specimen>
      <Specimen className="specimen--stack" label="Variants">
        {GROUP_VARIANTS.map((variant) => (
          <ButtonGroup key={variant}>
            <Button variant={variant}>First</Button>
            <Button variant={variant}>Second</Button>
            <Button variant={variant}>Third</Button>
          </ButtonGroup>
        ))}
      </Specimen>
      <Specimen label="Vertical, icon-only">
        {/*
         * Icon-only, as the reference shows it. A vertical stack of text labels reads as a
         * tall slab rather than one control, which is why that is not a shape it offers.
         */}
        <ButtonGroup orientation="vertical">
          <Button aria-label="Add item" iconOnly variant="tertiary">
            {icon.add}
          </Button>
          <Button aria-label="Search" iconOnly variant="tertiary">
            {icon.search}
          </Button>
          <Button aria-label="Settings" iconOnly variant="tertiary">
            {icon.settings}
          </Button>
        </ButtonGroup>
      </Specimen>
      <Specimen label="Single button keeps all corners">
        <ButtonGroup>
          <Button>Only child</Button>
        </ButtonGroup>
      </Specimen>
      <Specimen label="Cascading variant and size">
        {/* variant/size/disabled set once on the group cascade to every child; a Button's own prop still wins. */}
        <ButtonGroup size="lg" variant="secondary">
          <Button>Default</Button>
          <Button>Cascaded</Button>
          <Button variant="danger">Overridden</Button>
        </ButtonGroup>
      </Specimen>
      <Specimen className="specimen--stack" label="Sizes">
        {GROUP_SIZES.map((size) => (
          <ButtonGroup key={size} size={size} variant="outline">
            <Button>First</Button>
            <Button>Second</Button>
            <Button>Third</Button>
          </ButtonGroup>
        ))}
      </Specimen>
      <Specimen className="specimen--stack" label="Full width">
        <ButtonGroup fullWidth>
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </Specimen>
      <Specimen label="Disabled">
        <ButtonGroup disabled variant="secondary">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </Specimen>
    </div>
  );
}
