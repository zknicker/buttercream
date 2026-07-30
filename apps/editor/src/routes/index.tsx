import { HugeiconsIcon } from "@hugeicons/react";
import Copy01Icon from "@hugeicons-pro/core-stroke-rounded/Copy01Icon";
import Tick02Icon from "@hugeicons-pro/core-stroke-rounded/Tick02Icon";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { type Feature, FeatureRow } from "../marketing/feature-row.tsx";
import { ProductShot } from "../marketing/product-shot.tsx";
import { SiteFooter } from "../marketing/site-footer.tsx";
import { SiteHeader } from "../marketing/site-header.tsx";
import { Button, DitherBand, Eyebrow, Swirled } from "../ui/index.ts";

/*
 * Marketing only. The signed-in workspace lives at /systems, so this page no longer runs a
 * per-visit list query for the majority of visitors who are not signed in.
 */
export const Route = createFileRoute("/")({
  component: Home,
});

const FEATURES: readonly Feature[] = [
  {
    body: "Accessible React components built on Base UI behavior, ready to ship the day you install them.",
    glyph: "whisk",
    title: "Bake faster",
  },
  {
    body: "One canonical document drives tokens, CSS, and guides. Change it once and every surface follows.",
    glyph: "swatch",
    title: "Your flavor",
  },
  {
    body: "An agent that reads your design system and rewrites tokens from a sentence, not a spec sheet.",
    glyph: "caret",
    title: "AI native",
  },
];

const PROOF = ["Acme", "Northwood", "Lattice", "Veridian", "Cloudline"];

function Home() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 lg:px-10 lg:pt-24">
          <Eyebrow>AI-native component library</Eyebrow>
          <h1 className="mt-5 max-w-[24ch] font-display text-5xl tracking-tight text-balance text-fg sm:text-6xl lg:text-7xl">
            Components that <Swirled>taste</Swirled> like your brand.
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg text-pretty text-shell-muted sm:text-base">
            Buttercream is a premium React component library and theme studio for design systems
            that feel unique, consistent, and unmistakably yours.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              nativeButton={false}
              render={<Link params={{ id: "preview" }} to="/ds/$id" />}
              size="lg"
            >
              Start baking
            </Button>
            <InstallChip />
          </div>

          <div className="mt-16 @container">
            <ProductShot />
          </div>
        </section>

        <DitherBand className="text-butter" />

        <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
          <FeatureRow features={FEATURES} />
        </section>

        <section
          aria-labelledby="proof-heading"
          className="mx-auto w-full max-w-6xl px-6 pb-8 lg:px-10"
        >
          <h2
            className="font-mono text-sm tracking-wide text-shell-muted uppercase sm:text-xs"
            id="proof-heading"
          >
            Trusted by teams shipping fast
          </h2>
          <ul className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-6" role="list">
            {PROOF.map((name) => (
              <li className="font-display text-xl text-fg/35" key={name}>
                {name}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function InstallChip() {
  const [copied, setCopied] = useState(false);
  const command = "npm i buttercream";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Button
      aria-label={`Copy ${command}`}
      className="font-mono"
      onClick={() => void copy()}
      size="lg"
      variant="outline"
    >
      {command}
      <HugeiconsIcon
        aria-hidden="true"
        className="shrink-0 text-shell-muted"
        icon={copied ? Tick02Icon : Copy01Icon}
        size={16}
        strokeWidth={2}
      />
    </Button>
  );
}
