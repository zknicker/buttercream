import { HugeiconsIcon } from "@hugeicons/react";
import Tick02Icon from "@hugeicons-pro/core-stroke-rounded/Tick02Icon";
import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { Badge, Button, Card, classes, DitherBand } from "../ui/index.ts";

export type BillingPeriod = "Monthly" | "Yearly";

export interface Tier {
  cta: string;
  description: string;
  features: readonly string[];
  featured?: boolean;
  name: string;
  price: Record<BillingPeriod, number>;
}

export const TIERS: readonly Tier[] = [
  {
    cta: "Start for free",
    description: "Perfect for trying Buttercream.",
    features: ["Unlimited components", "Theme studio", "1 design system", "Community support"],
    name: "Sample",
    price: { Monthly: 0, Yearly: 0 },
  },
  {
    cta: "Choose Bakery",
    description: "For growing teams building unique products.",
    featured: true,
    features: ["Unlimited components", "Theme studio", "AI token agent", "Figma export"],
    name: "Bakery",
    price: { Monthly: 19, Yearly: 15 },
  },
  {
    cta: "Choose Patisserie",
    description: "For scaling teams with advanced needs.",
    features: ["Everything in Bakery", "Unlimited seats", "Dedicated support", "Audit log"],
    name: "Patisserie",
    price: { Monthly: 49, Yearly: 39 },
  },
];

export function PricingTiers({ period }: { period: BillingPeriod }): ReactElement {
  return (
    <ul
      className="grid gap-4 lg:grid-cols-3 lg:grid-rows-[--spacing(6)_1fr_--spacing(6)]"
      role="list"
    >
      {TIERS.map((tier) => (
        <li
          className={classes(tier.featured ? "lg:row-span-full" : "lg:row-start-2")}
          key={tier.name}
        >
          <TierCard tier={tier} period={period} />
        </li>
      ))}
    </ul>
  );
}

function TierCard({ period, tier }: { period: BillingPeriod; tier: Tier }): ReactElement {
  return (
    <Card
      className={classes(
        "flex h-full flex-col justify-between overflow-hidden",
        tier.featured && "ring-fg/20",
      )}
    >
      <div>
        {tier.featured ? <DitherBand className="text-butter" height={14} /> : null}
        <div className={classes("px-6", tier.featured ? "pt-5" : "pt-8")}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-2xl text-fg">{tier.name}</h3>
            {tier.featured ? <Badge variant="accent">Most ordered</Badge> : null}
          </div>
          <p className="mt-2 max-w-[48ch] text-base text-pretty text-muted sm:text-sm">
            {tier.description}
          </p>

          <p className="mt-6 flex items-baseline gap-1.5">
            <span className="font-mono text-5xl tabular-nums text-fg">${tier.price[period]}</span>
            <span className="font-mono text-sm text-muted">/mo</span>
          </p>

          <ul className="mt-6 flex flex-col gap-2.5 text-base sm:text-sm" role="list">
            {tier.features.map((feature) => (
              <li className="flex items-start gap-2.5 text-fg" key={feature}>
                <HugeiconsIcon
                  aria-hidden="true"
                  className="h-lh size-4 shrink-0 text-crust"
                  icon={Tick02Icon}
                  size={16}
                  strokeWidth={2}
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6">
        <Button
          className="w-full"
          render={<Link params={{ id: "preview" }} to="/ds/$id" />}
          size="lg"
          variant={tier.featured ? "primary" : "outline"}
        >
          {tier.cta}
        </Button>
      </div>
    </Card>
  );
}
