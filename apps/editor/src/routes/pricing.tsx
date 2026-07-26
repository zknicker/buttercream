import { Accordion } from "@base-ui/react/accordion";
import { HugeiconsIcon } from "@hugeicons/react";
import PlusSignIcon from "@hugeicons-pro/core-stroke-rounded/PlusSignIcon";
import Tick02Icon from "@hugeicons-pro/core-stroke-rounded/Tick02Icon";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { type BillingPeriod, PricingTiers } from "../marketing/pricing-tiers.tsx";
import { SiteFooter } from "../marketing/site-footer.tsx";
import { SiteHeader } from "../marketing/site-header.tsx";
import { Badge, Button, DitherBand, Eyebrow, Input, Segmented, Surface } from "../ui/index.ts";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
});

const PERIODS = ["Monthly", "Yearly"] as const;

const COMPARISON = [
  { feature: "Components", sample: "Unlimited", bakery: "Unlimited", patisserie: "Unlimited" },
  { feature: "Theme studio", sample: true, bakery: true, patisserie: true },
  { feature: "AI token agent", sample: false, bakery: true, patisserie: true },
  { feature: "Figma export", sample: false, bakery: true, patisserie: true },
  { feature: "Design systems", sample: "1", bakery: "10", patisserie: "Unlimited" },
  { feature: "Seats", sample: "1", bakery: "5", patisserie: "Unlimited" },
  { feature: "Support", sample: "Community", bakery: "Priority", patisserie: "Dedicated" },
];

const FAQ = [
  {
    answer:
      "Yes. Every tier includes a commercial licence for unlimited client and internal projects. The components are yours to ship.",
    question: "Can I use Buttercream in commercial projects?",
  },
  {
    answer:
      "Any time, in both directions. Upgrades are prorated immediately and downgrades take effect at the end of the current period.",
    question: "Can I upgrade or downgrade anytime?",
  },
  {
    answer:
      "Patisserie covers most teams. If you need invoicing, SSO, or an on-premise export pipeline, get in touch and we will put something together.",
    question: "Do you offer team or enterprise plans?",
  },
];

function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>("Yearly");

  return (
    <div className="min-h-dvh">
      <SiteHeader current="pricing" />

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-14 lg:px-10">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="mt-5 max-w-[20ch] font-display text-6xl tracking-tight text-balance text-fg lg:text-7xl">
            The menu.
          </h1>
          <p className="mt-6 max-w-[56ch] text-lg text-pretty text-muted sm:text-base">
            Simple, transparent pricing for teams of every size. No seat maths, no surprise
            invoices.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Segmented
              className="w-56"
              label="Billing period"
              onChange={setPeriod}
              options={PERIODS}
              value={period}
            />
            <Badge variant="accent">-20%</Badge>
          </div>

          <div className="mt-12">
            <PricingTiers period={period} />
          </div>
        </section>

        <DitherBand className="text-butter" />

        <section
          aria-labelledby="compare-heading"
          className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10"
        >
          <h2 className="font-display text-3xl tracking-tight text-fg" id="compare-heading">
            Compare the tiers
          </h2>

          <div className="-mx-6 -my-2 mt-8 overflow-x-auto whitespace-nowrap lg:-mx-10">
            <div className="inline-block min-w-full px-6 py-2 align-middle lg:px-10">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-fg/12">
                    <th className="pb-3 font-mono text-sm font-normal whitespace-nowrap text-muted sm:text-xs">
                      Feature
                    </th>
                    {["Sample", "Bakery", "Patisserie"].map((tier) => (
                      <th
                        className="pb-3 font-mono text-sm font-normal whitespace-nowrap text-muted sm:text-xs"
                        key={tier}
                      >
                        {tier}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr className="border-b border-fg/8" key={row.feature}>
                      <th className="py-3.5 text-base font-normal whitespace-nowrap text-fg sm:text-sm">
                        {row.feature}
                      </th>
                      <ComparisonCell value={row.sample} />
                      <ComparisonCell value={row.bakery} />
                      <ComparisonCell value={row.patisserie} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-20 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div>
            <h2 className="font-display text-3xl tracking-tight text-fg" id="faq-heading">
              Questions
            </h2>
            <Accordion.Root aria-labelledby="faq-heading" className="mt-6">
              {FAQ.map((item) => (
                <Accordion.Item className="border-b border-fg/10" key={item.question}>
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg">
                      <span className="text-base text-fg sm:text-sm">{item.question}</span>
                      <HugeiconsIcon
                        aria-hidden="true"
                        className="size-4 shrink-0 text-muted transition-transform group-data-panel-open:rotate-45"
                        icon={PlusSignIcon}
                        size={16}
                        strokeWidth={2}
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0">
                    <p className="max-w-[56ch] pb-4 text-base text-pretty text-muted sm:text-sm">
                      {item.answer}
                    </p>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>

          <Surface className="h-fit p-8" variant="secondary">
            <h2 className="font-display text-2xl text-fg">Stay in the loop</h2>
            <p className="mt-2 max-w-[48ch] text-base text-pretty text-muted sm:text-sm">
              New components, recipes, and releases — served fresh.
            </p>
            <form
              className="mt-6 flex max-w-xs flex-col gap-3"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="flex flex-col gap-1.5" htmlFor="changelog-email">
                <span className="font-mono text-sm text-muted uppercase sm:text-xs">Email</span>
                <Input
                  autoComplete="email"
                  fullWidth
                  id="changelog-email"
                  name="email"
                  placeholder="you@yourbrand.com"
                  type="email"
                />
              </label>
              <p className="text-base text-muted sm:text-sm">No spam. Unsubscribe anytime.</p>
              <Button className="w-full" size="lg" type="submit">
                Get the changelog
              </Button>
            </form>
          </Surface>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function ComparisonCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return (
      <td className="py-3.5 font-mono text-sm tabular-nums whitespace-nowrap text-muted sm:text-xs">
        {value}
      </td>
    );
  }

  return (
    <td className="py-3.5">
      {value ? (
        <HugeiconsIcon
          aria-label="Included"
          className="size-4 text-crust"
          icon={Tick02Icon}
          size={16}
          strokeWidth={2}
        />
      ) : (
        <span aria-label="Not included" className="block h-px w-3 bg-fg/25" role="img" />
      )}
    </td>
  );
}
