import type { ReactElement } from "react";
import { Badge, Button, classes } from "../ui/index.ts";

/*
 * A still of the theme studio for the marketing pages. Deliberately inert markup rather
 * than a live embed — it has to stay legible at any width and must not drag the editor's
 * state into a marketing route.
 */

const TOKEN_ROWS = [
  { group: "Color", label: "Accent", swatch: "#f0b429", value: "#F0B429" },
  { group: null, label: "Surface", swatch: "#f2ede3", value: "#F2EDE3" },
  { group: "Type", label: "Display", value: "Young Serif" },
  { group: null, label: "Body", value: "Geist" },
  { group: "Shape", label: "Radius", value: "0.50" },
  { group: null, label: "Density", value: "1.00" },
];

export function ProductShot({ className }: { className?: string }): ReactElement {
  return (
    <div
      className={classes(
        "overflow-hidden rounded-[min(1vw,12px)] bg-raised shadow-2xl shadow-ink/12 dark:shadow-none ring-1 ring-fg/10",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-fg/8 bg-sunken px-3 py-2.5">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-berry/50" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-honey" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-pistachio" />
        <p className="ml-2 font-mono text-xs text-muted">buttercream / studio</p>
      </div>

      <div className="grid grid-cols-1 @2xl:grid-cols-[1fr_13rem]">
        <div className="flex min-w-0 flex-col gap-5 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Button</Button>
            <Button size="sm" variant="secondary">
              Button
            </Button>
            <Button size="sm" variant="outline">
              Button
            </Button>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-xs text-muted uppercase">Label</p>
            <div className="flex h-8.5 items-center rounded-(--radius-shell) bg-raised px-2.5 text-sm text-muted ring-1 ring-fg/12 ring-inset">
              Pistachio cream
            </div>
          </div>

          <div className="grid gap-3 @md:grid-cols-2">
            <div className="rounded-(--radius-shell) bg-sunken p-4">
              <p className="font-mono text-xs text-muted uppercase">Orders</p>
              <p className="mt-1 font-display text-2xl tabular-nums text-fg">1,248</p>
              <p className="font-mono text-xs text-crust">+18.6%</p>
            </div>
            <div className="flex items-center justify-between rounded-(--radius-shell) bg-sunken p-4">
              <p className="text-sm text-fg">Active oven</p>
              <span
                aria-hidden="true"
                className="flex h-5 w-9 items-center rounded-full bg-butter p-0.5"
              >
                <span className="ml-auto size-4 rounded-full bg-raised" />
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">Fresh</Badge>
            <Badge variant="accent">Popular</Badge>
            <Badge>Draft</Badge>
            <Badge variant="danger">Stale</Badge>
          </div>

          <div className="flex flex-col gap-2">
            {["Croissant", "Sourdough", "Financier"].map((item, index) => (
              <div
                className="flex items-center justify-between border-t border-fg/8 pt-2 first:border-t-0 first:pt-0"
                key={item}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="size-6 shrink-0 rounded-full bg-sunken ring-1 ring-fg/8"
                  />
                  <p className="truncate text-sm text-fg">{item}</p>
                </div>
                <p className="shrink-0 font-mono text-xs tabular-nums text-muted">
                  {[128, 96, 64][index]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-fg/8 bg-sunken/60 p-4 max-@2xl:border-t @2xl:border-l">
          <div className="flex gap-0.5 rounded-(--radius-shell) bg-fg/6 p-0.5">
            {["Style", "Tokens", "Agent"].map((tab, index) => (
              <span
                className={classes(
                  "flex-1 rounded-[calc(var(--radius-shell)-0.125rem)] py-1 text-center font-mono text-xs",
                  index === 0 ? "bg-raised text-fg" : "text-muted",
                )}
                key={tab}
              >
                {tab}
              </span>
            ))}
          </div>

          {TOKEN_ROWS.map((row) => (
            <div key={row.label}>
              {row.group ? (
                <p className="mt-3 mb-1 font-mono text-xs tracking-wide text-muted uppercase">
                  {row.group}
                </p>
              ) : null}
              <div className="flex h-8 items-center justify-between gap-2 rounded-(--radius-shell) bg-raised px-2.5">
                <span className="truncate text-xs text-fg">{row.label}</span>
                <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted">
                  {row.value}
                  {row.swatch ? (
                    <span
                      aria-hidden="true"
                      className="size-3 rounded-full ring-1 ring-fg/15"
                      style={{ background: row.swatch }}
                    />
                  ) : null}
                </span>
              </div>
            </div>
          ))}

          <div className="mt-3 rounded-(--radius-shell) bg-raised p-3">
            <Badge variant="accent">Agent</Badge>
            <p className="mt-2 font-mono text-xs leading-5 text-muted">
              <span className="text-berry">- accent: #1B1B1B</span>
              <br />
              <span className="text-crust">+ accent: #F0B429</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
