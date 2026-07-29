import { Button, ButtonGroup, type ButtonSize, ColorSwatch, Kbd, Link } from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import type { ReactElement } from "react";
import { createPreviewIconElements } from "./preview-icons.ts";

const SWATCH_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

export function KbdPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <Kbd>⌘ K</Kbd>
        <Kbd>⇧ ⌘ P</Kbd>
        <Kbd>Esc</Kbd>
        <div className="specimen__label">Keys and chords</div>
      </section>
      <section className="specimen">
        <span>
          Press <Kbd>⌘ K</Kbd> to search.
        </span>
        <div className="specimen__label">Inline with text</div>
      </section>
      <section className="specimen">
        <Kbd keys="command">K</Kbd>
        <Kbd keys={["shift", "command"]}>P</Kbd>
        <Kbd keys="escape" />
        <Kbd keys="command" variant="light">
          K
        </Kbd>
        <div className="specimen__label">Named keys and light variant</div>
      </section>
      <section className="specimen">
        <Kbd keys="up" />
        <Kbd keys="down" />
        <Kbd keys="left" />
        <Kbd keys="right" />
        <Kbd keys="pageup" />
        <Kbd keys="pagedown" />
        <Kbd keys="enter" />
        <Kbd keys="tab" />
        <Kbd keys="space" />
        <div className="specimen__label">Navigation and special keys</div>
      </section>
      <section className="specimen specimen--stack">
        <div>
          <Kbd keys={["command", "shift"]}>N</Kbd> New window
        </div>
        <div>
          <Kbd keys="command">S</Kbd> Save
        </div>
        <div>
          <Kbd keys="escape" /> Close dialog
        </div>
        <div className="specimen__label">Instructional list</div>
      </section>
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
      <section className="specimen">
        <Link href="#docs">Read the documentation</Link>
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen">
        <Link href="https://example.com" icon target="_blank">
          Opens in a new tab
        </Link>
        <div className="specimen__label">External</div>
      </section>
      <section className="specimen">
        <span>
          Built on <Link href="#base-ui">Base UI</Link> and styled with tokens.
        </span>
        <div className="specimen__label">Inline</div>
      </section>
      <section className="specimen">
        <Link aria-disabled="true" href="#none">
          Unavailable
        </Link>
        <div className="specimen__label">Disabled</div>
      </section>
      <section className="specimen">
        <Link href="#favorites" icon={<StarGlyph />}>
          Add to favorites
        </Link>
        <div className="specimen__label">Custom icon</div>
      </section>
      <section className="specimen">
        {/* style passes through like any other native anchor attribute, so a caller can override the resting underline. */}
        <Link href="#terms" style={{ textDecorationLine: "underline" }}>
          Terms of service
        </Link>
        <div className="specimen__label">Custom styling via style</div>
      </section>
    </div>
  );
}

export function ColorSwatchPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        {SWATCH_SIZES.map((size) => (
          <ColorSwatch color="var(--accent)" key={size} label={`Accent ${size}`} size={size} />
        ))}
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen">
        <ColorSwatch color="var(--accent)" label="Accent" shape="circle" />
        <ColorSwatch color="var(--success)" label="Success" shape="circle" />
        <ColorSwatch color="var(--warning)" label="Warning" shape="circle" />
        <ColorSwatch color="var(--danger)" label="Danger" shape="circle" />
        <div className="specimen__label">Circle</div>
      </section>
      <section className="specimen">
        {/* The checkerboard is what makes a translucent value readable as translucent. */}
        <ColorSwatch color="rgb(4 133 247 / 0.25)" label="Accent at 25%" />
        <ColorSwatch color="rgb(4 133 247 / 0.5)" label="Accent at 50%" />
        <ColorSwatch color="transparent" label="Transparent" />
        <div className="specimen__label">Translucent</div>
      </section>
      <section className="specimen">
        {/* className and style both pass through, so a caller can layer its own treatment on top. */}
        <ColorSwatch
          color="var(--accent)"
          label="Accent, heavier ring"
          style={{ boxShadow: "inset 0 0 0 2px var(--accent)" }}
        />
        <div className="specimen__label">Custom style via style</div>
      </section>
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
      <section className="specimen">
        <ButtonGroup>
          <Button>Merge pull request</Button>
          <Button aria-label="More merge options" iconOnly>
            {icon.chevronDown}
          </Button>
        </ButtonGroup>
        <div className="specimen__label">Split button</div>
      </section>
      <section className="specimen">
        <ButtonGroup>
          <Button variant="tertiary">Previous</Button>
          <Button variant="tertiary">Next</Button>
        </ButtonGroup>
        <div className="specimen__label">Paged</div>
      </section>
      <section className="specimen specimen--stack">
        {GROUP_VARIANTS.map((variant) => (
          <ButtonGroup key={variant}>
            <Button variant={variant}>First</Button>
            <Button variant={variant}>Second</Button>
            <Button variant={variant}>Third</Button>
          </ButtonGroup>
        ))}
        <div className="specimen__label">Variants</div>
      </section>
      <section className="specimen">
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
        <div className="specimen__label">Vertical, icon-only</div>
      </section>
      <section className="specimen">
        <ButtonGroup>
          <Button>Only child</Button>
        </ButtonGroup>
        <div className="specimen__label">Single button keeps all corners</div>
      </section>
      <section className="specimen">
        {/* variant/size/disabled set once on the group cascade to every child; a Button's own prop still wins. */}
        <ButtonGroup size="lg" variant="secondary">
          <Button>Default</Button>
          <Button>Cascaded</Button>
          <Button variant="danger">Overridden</Button>
        </ButtonGroup>
        <div className="specimen__label">Cascading variant and size</div>
      </section>
      <section className="specimen specimen--stack">
        {GROUP_SIZES.map((size) => (
          <ButtonGroup key={size} size={size} variant="outline">
            <Button>First</Button>
            <Button>Second</Button>
            <Button>Third</Button>
          </ButtonGroup>
        ))}
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen specimen--stack">
        <ButtonGroup fullWidth>
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
        <div className="specimen__label">Full width</div>
      </section>
      <section className="specimen">
        <ButtonGroup disabled variant="secondary">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
        <div className="specimen__label">Disabled</div>
      </section>
    </div>
  );
}
