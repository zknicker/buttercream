import type { ReactElement } from "react";
import { useResolvedTokens } from "./preview-tokens.ts";

/* The guides page is the design system explaining itself, so every value on it is read back out
   of the DOM rather than retyped here — see useResolvedTokens. */

const ROLES = [
  { name: "accent", purpose: "Primary action" },
  { name: "default", purpose: "Neutral action" },
  { name: "success", purpose: "Confirmed" },
  { name: "warning", purpose: "Needs attention" },
  { name: "danger", purpose: "Destructive" },
] as const;

const SURFACES = [
  { name: "background", purpose: "The page beneath everything" },
  { name: "surface", purpose: "Raised panels and cards" },
  { name: "overlay", purpose: "Menus, dialogs, anything floating" },
] as const;

const RADIUS_STEPS = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const;
const CHART_STEPS = [1, 2, 3, 4, 5] as const;

const TOKEN_NAMES = [
  ...ROLES.flatMap((role) => [`--${role.name}`, `--${role.name}-foreground`]),
  ...SURFACES.map((surface) => `--${surface.name}`),
  ...CHART_STEPS.map((step) => `--chart-${step}`),
  "--foreground",
  "--muted",
  "--radius",
  "--field-radius",
  "--font-heading",
  "--font-sans",
  "--font-mono",
];

export function GuidesPreview(): ReactElement {
  const { ref, value } = useResolvedTokens(TOKEN_NAMES);

  return (
    <div className="guides" ref={ref}>
      <section className="guides__section">
        <header className="guides__heading">
          <h2 className="guides__title">Palette</h2>
          <p className="guides__lede">
            Five roles carry every meaning in the system. Each pairs a fill with the foreground that
            stays legible on it, and a soft variant for backgrounds that must not shout.
          </p>
        </header>
        <div className="guides__palette">
          {ROLES.map((role, index) => (
            <article
              className={`swatch${index === 0 ? " swatch--hero" : ""}`}
              key={role.name}
              style={
                {
                  "--bc-swatch-bg": `var(--${role.name})`,
                  "--bc-swatch-fg": `var(--${role.name}-foreground)`,
                } as React.CSSProperties
              }
            >
              <div className="swatch__head">
                <span className="swatch__name">{role.name}</span>
                <span className="swatch__purpose">{role.purpose}</span>
              </div>
              <dl className="swatch__tokens">
                <div className="swatch__token">
                  <dt>--{role.name}</dt>
                  <dd>{value(`--${role.name}`)}</dd>
                </div>
                <div className="swatch__token">
                  <dt>--{role.name}-foreground</dt>
                  <dd>{value(`--${role.name}-foreground`)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        {/*
         * The soft variants sit on the page rather than inside their own card. Each is a low
         * percentage of the role mixed into transparent, so composited over its own fill it
         * disappears; over the page it reads the way it actually will in use.
         */}
        <div className="soft-row">
          {ROLES.map((role) => (
            <div
              className="soft-chip"
              key={role.name}
              style={
                {
                  "--bc-soft-bg": `var(--${role.name}-soft)`,
                  "--bc-soft-fg": `var(--${role.name}-soft-foreground)`,
                } as React.CSSProperties
              }
            >
              <span className="soft-chip__name">{role.name} soft</span>
              <code className="soft-chip__token">--{role.name}-soft</code>
            </div>
          ))}
        </div>
      </section>

      <section className="guides__section">
        <header className="guides__heading">
          <h2 className="guides__title">Surfaces</h2>
          <p className="guides__lede">
            Three depths, from the page itself up to anything that floats above it. Each carries its
            own shadow so elevation reads without a border.
          </p>
        </header>
        <div className="guides__surfaces">
          {SURFACES.map((surface) => (
            <article
              className={`depth depth--${surface.name}`}
              key={surface.name}
              style={
                {
                  "--bc-depth-bg": `var(--${surface.name})`,
                  "--bc-depth-fg": `var(--${surface.name}-foreground, var(--foreground))`,
                } as React.CSSProperties
              }
            >
              <span className="depth__name">{surface.name}</span>
              <code className="depth__token">--{surface.name}</code>
              <code className="depth__value">{value(`--${surface.name}`)}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="guides__section">
        <header className="guides__heading">
          <h2 className="guides__title">Typography</h2>
          <p className="guides__lede">
            Two families and one scale. Headings carry the brand; body text carries the work.
          </p>
        </header>
        <div className="guides__type">
          <article className="type-card">
            <span className="type-card__role">Heading</span>
            <p className="type-card__specimen type-card__specimen--heading">Buttercream</p>
            <code className="type-card__family">{value("--font-heading")}</code>
          </article>
          <article className="type-card">
            <span className="type-card__role">Body</span>
            <p className="type-card__specimen">Aa Bb Cc</p>
            <code className="type-card__family">{value("--font-sans")}</code>
          </article>
          <article className="type-card">
            <span className="type-card__role">Mono</span>
            <p className="type-card__specimen type-card__specimen--mono">0O 1lI</p>
            <code className="type-card__family">{value("--font-mono")}</code>
          </article>
        </div>
        <ol className="type-scale">
          {(["4xl", "3xl", "2xl", "xl", "lg", "base", "sm", "xs"] as const).map((step) => (
            <li className="type-scale__row" key={step}>
              <code className="type-scale__label">--text-{step}</code>
              <span className="type-scale__sample" style={{ fontSize: `var(--text-${step})` }}>
                The quick brown fox
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="guides__section">
        <header className="guides__heading">
          <h2 className="guides__title">Corners</h2>
          <p className="guides__lede">
            Every step is derived from a single radius, so the whole system turns together. A child
            nested inside a rounded parent subtracts the padding between them, which is what keeps
            the two curves concentric at any setting.
          </p>
        </header>
        <div className="guides__radii">
          {RADIUS_STEPS.map((step) => (
            <div className="radius-chip" key={step}>
              <div className="radius-chip__box" style={{ borderRadius: `var(--radius-${step})` }} />
              <code className="radius-chip__label">{step}</code>
            </div>
          ))}
        </div>
        {/* The nesting rule, drawn rather than described. */}
        <div className="nesting">
          <div className="nesting__outer">
            <div className="nesting__inner">concentric</div>
          </div>
          <p className="nesting__note">
            The outer corner is the inner one plus the padding between them, so the two curves stay
            parallel instead of drifting apart as the radius moves.
          </p>
        </div>
      </section>

      <section className="guides__section">
        <header className="guides__heading">
          <h2 className="guides__title">Charts</h2>
          <p className="guides__lede">
            Five steps of one hue rather than five unrelated colours, so a series reads as one
            measurement split into parts. The ladder is anchored rather than walked outward from the
            accent, so the steps stay separable whatever the brand colour is. A single-series chart
            should use <code>--chart-accent</code>, which is the accent itself.
          </p>
        </header>
        <div className="chart-ramp">
          {CHART_STEPS.map((step) => (
            <div className="chart-ramp__step" key={step}>
              <div
                className="chart-ramp__fill"
                style={{ background: `var(--chart-${step})`, height: `${28 + step * 14}px` }}
              />
              <code className="chart-ramp__label">--chart-{step}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
