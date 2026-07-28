import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";

/*
 * The guides page is the design system explaining itself, so every value on it is read back
 * out of the DOM rather than retyped here. A hardcoded hex would keep reading #1B1B1B after the
 * accent moved, and a page that lies about the theme is worse than no page.
 */
function useResolvedTokens(names: string[]): Record<string, string> {
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const host = ref.current;
    if (host === null) {
      return;
    }

    /*
     * Reading the custom property back gives whatever was declared, which for a generated
     * neutral is the generator expression rather than a colour. Painting each token onto a
     * probe and reading `color` back makes the browser resolve it, so the page reports the
     * colour you actually get.
     */
    const read = (): void => {
      const styles = getComputedStyle(host);
      const probe = document.createElement("span");
      probe.style.display = "none";
      host.appendChild(probe);

      const resolve = (name: string): string => {
        const declared = styles.getPropertyValue(name).trim();
        if (!declared.startsWith("oklch(from") && !declared.startsWith("color-mix(")) {
          return declared;
        }
        probe.style.color = `var(${name})`;
        return getComputedStyle(probe).color || declared;
      };

      setValues(Object.fromEntries(names.map((name) => [name, resolve(name)])));
      probe.remove();
    };

    read();

    /* The Style panel writes tokens as an inline style on an ancestor, so watch for that. */
    const surface = host.closest(".preview-surface");
    if (surface === null) {
      return;
    }

    const observer = new MutationObserver(read);
    observer.observe(surface, { attributeFilter: ["style", "data-theme"] });
    return () => observer.disconnect();
  }, [names]);

  return { ...values, __ref: ref } as unknown as Record<string, string>;
}

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
  const tokens = useResolvedTokens(TOKEN_NAMES);
  const ref = tokens.__ref as unknown as React.RefObject<HTMLDivElement>;
  const value = (name: string): string => tokens[name] ?? "";

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
            outer <code>{value("--radius")}</code> &rarr; inner subtracts its inset, so the curves
            stay parallel instead of drifting apart.
          </p>
        </div>
      </section>

      <section className="guides__section">
        <header className="guides__heading">
          <h2 className="guides__title">Charts</h2>
          <p className="guides__lede">
            Five steps of one hue rather than five unrelated colours, so a series reads as one
            measurement split into parts. The middle step is the accent exactly, so a single-series
            chart needs no special case.
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
