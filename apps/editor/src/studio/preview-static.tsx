import { Button, ButtonGroup, ColorSwatch, Kbd, Link } from "@buttercream/react";
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
    </div>
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
    </div>
  );
}

const GROUP_VARIANTS = ["primary", "secondary", "tertiary", "outline", "ghost", "danger"] as const;

export function ButtonGroupPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  /* Real icons from the configured family, so the Icons panel drives these specimens too. */
  const icon = createPreviewIconElements(icons);

  return (
    <div className="specimens">
      <section className="specimen">
        <ButtonGroup>
          <Button>Merge pull request</Button>
          <Button aria-label="More merge options" iconOnly>
            {icon.more}
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
    </div>
  );
}
