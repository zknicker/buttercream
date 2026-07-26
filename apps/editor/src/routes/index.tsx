import { Show, SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/tanstack-react-start";
import { HugeiconsIcon } from "@hugeicons/react";
import Copy01Icon from "@hugeicons-pro/core-stroke-rounded/Copy01Icon";
import Tick02Icon from "@hugeicons-pro/core-stroke-rounded/Tick02Icon";
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { type Feature, FeatureRow } from "../marketing/feature-row.tsx";
import { ProductShot } from "../marketing/product-shot.tsx";
import { SiteFooter } from "../marketing/site-footer.tsx";
import { SiteHeader } from "../marketing/site-header.tsx";
import { createDesignSystemFn, listDesignSystemsFn } from "../server/design-system-functions.ts";
import { Button, Card, DitherBand, Eyebrow, Swirled } from "../ui/index.ts";

export const Route = createFileRoute("/")({
  component: Home,
  loader: () => listDesignSystemsFn(),
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
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  const { designSystems } = Route.useLoaderData();

  return (
    <div className="min-h-dvh">
      <SiteHeader actions={clerkEnabled ? <AuthActions /> : null} />

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 lg:px-10 lg:pt-24">
          <Eyebrow>AI-native component library</Eyebrow>
          <h1 className="mt-5 max-w-[24ch] font-display text-5xl tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl">
            Components that <Swirled>taste</Swirled> like your brand.
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg text-pretty text-graphite sm:text-base">
            Buttercream is a premium React component library and theme studio for design systems
            that feel unique, consistent, and unmistakably yours.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button render={<Link params={{ id: "preview" }} to="/ds/$id" />} size="lg">
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
            className="font-mono text-sm tracking-wide text-graphite uppercase sm:text-xs"
            id="proof-heading"
          >
            Trusted by teams shipping fast
          </h2>
          <ul className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-6" role="list">
            {PROOF.map((name) => (
              <li className="font-display text-xl text-ink/35" key={name}>
                {name}
              </li>
            ))}
          </ul>
        </section>

        {clerkEnabled ? (
          <Show when="signed-in">
            <DesignSystemList designSystems={designSystems} />
          </Show>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}

function AuthActions() {
  return (
    <>
      <Show when="signed-out">
        <SignInButton>
          <Button className="max-sm:hidden" variant="ghost">
            Sign in
          </Button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <RefreshOnSignIn />
        <UserButton />
      </Show>
    </>
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
        className="shrink-0 text-graphite"
        icon={copied ? Tick02Icon : Copy01Icon}
        size={16}
        strokeWidth={2}
      />
    </Button>
  );
}

function RefreshOnSignIn() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const refreshed = useRef(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && !refreshed.current) {
      refreshed.current = true;
      void router.invalidate();
    }
  }, [isLoaded, isSignedIn, router]);

  return null;
}

function DesignSystemList({
  designSystems,
}: {
  designSystems: Array<{ id: string; name: string; updatedAt: number }>;
}) {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  const create = async () => {
    setCreating(true);
    try {
      const designSystem = await createDesignSystemFn({
        data: { name: "Untitled design system" },
      });
      await navigate({ params: { id: designSystem.id }, to: "/ds/$id" });
    } finally {
      setCreating(false);
    }
  };

  return (
    <section
      aria-labelledby="your-design-systems"
      className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Workspace</Eyebrow>
          <h2
            className="mt-2 font-display text-3xl tracking-tight text-ink"
            id="your-design-systems"
          >
            Your design systems
          </h2>
        </div>
        <SignUpButton>
          <Button className="max-sm:hidden" variant="secondary">
            Create account
          </Button>
        </SignUpButton>
        <Button disabled={creating} loading={creating} onClick={() => void create()}>
          New design system
        </Button>
      </div>

      {designSystems.length ? (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {designSystems.map((designSystem) => (
            <li key={designSystem.id}>
              <Card
                className="flex h-full min-h-32 flex-col justify-between gap-6 p-5 hover:ring-ink/25"
                render={<Link params={{ id: designSystem.id }} to="/ds/$id" />}
              >
                <p className="font-display text-lg text-ink">{designSystem.name}</p>
                <p className="font-mono text-xs text-graphite">
                  Updated {formatDate(designSystem.updatedAt)}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-(--radius-shell) border border-dashed border-ink/15 p-8 text-center text-base text-graphite sm:text-sm">
          Create your first saved design system.
        </p>
      )}
    </section>
  );
}

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(timestamp);
}
