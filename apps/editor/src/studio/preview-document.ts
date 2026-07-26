import { type DesignSystem, exportGlobalCss } from "@buttercream/theme-core";

interface PreviewDocumentOptions {
  componentCss: string;
  designSystem: DesignSystem;
  section: "Guides" | "Button" | "Input" | "Card" | "Avatar";
  theme: "light" | "dark";
}

export function createPreviewDocument({
  componentCss,
  designSystem,
  section,
  theme,
}: PreviewDocumentOptions): string {
  const themeOverrides = exportGlobalCss(designSystem).replace(/^@import.*$/gmu, "");

  return `<!doctype html>
<html data-theme="${theme}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      ${componentCss}
      ${themeOverrides}
      html, body { margin: 0; min-height: 100%; background: var(--background); color: var(--foreground); }
      body { padding: 32px; font-family: var(--font-sans); }
      .specimens { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
      .specimen { min-height: 260px; display: flex; flex-wrap: wrap; align-content: center; align-items: center; justify-content: center; gap: 16px; border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; }
      .specimen__label { width: 100%; align-self: flex-end; color: color-mix(in oklab, var(--foreground) 55%, transparent); font-size: 13px; }
      .input-demo { display: grid; width: min(100%, 15rem); gap: 16px; }
      .input-demo--types { gap: 12px; }
      .input-field { display: grid; gap: 6px; }
      .input-field__label { color: var(--foreground); font-size: 14px; font-weight: 500; }
      .input-field__helper { color: color-mix(in oklab, var(--foreground) 55%, transparent); font-size: 12px; }
      .surface-demo { width: min(100%, 22rem); padding: 40px; border-radius: var(--radius); }
      .guide-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
      .swatch { min-height: 180px; padding: 20px; border-radius: var(--radius); font-weight: 700; }
      @media (max-width: 800px) { .specimens, .guide-grid { grid-template-columns: 1fr; } }
    </style>
  </head>
  <body>
    ${renderSection(section)}
  </body>
</html>`;
}

function renderSection(section: PreviewDocumentOptions["section"]): string {
  if (section === "Guides") {
    return `<div class="guide-grid">
      <div class="swatch" style="background:var(--accent);color:var(--accent-foreground)">Accent<br><small>--accent</small></div>
      <div class="swatch" style="background:var(--accent-soft)">Accent soft<br><small>--accent-soft</small></div>
      <div class="swatch" style="background:var(--card)">Card<br><small>--card</small></div>
      <div class="swatch" style="background:var(--success);color:var(--success-foreground)">Success</div>
      <div class="swatch" style="background:var(--warning);color:var(--warning-foreground)">Warning</div>
      <div class="swatch" style="background:var(--danger);color:var(--danger-foreground)">Danger</div>
    </div>`;
  }

  if (section === "Card") {
    return `<div class="specimens">
      <section class="specimen">
        <article class="card" style="width:min(100%,360px)">
          <header class="card__header">
            <div class="card__title">Default card</div>
            <div class="card__description">Composed from the stock Card slots.</div>
          </header>
          <div class="card__content">Theme changes update this surface directly.</div>
          <footer class="card__footer"><button class="button button--primary">Continue</button></footer>
        </article>
        <div class="specimen__label">Default</div>
      </section>
      <section class="specimen">
        <article class="card card--secondary" style="width:min(100%,360px)">
          <header class="card__header"><div class="card__title">Secondary card</div></header>
          <div class="card__content">Same component, alternate stock surface.</div>
        </article>
        <div class="specimen__label">Secondary</div>
      </section>
    </div>`;
  }

  if (section === "Input") {
    return `<div class="specimens">
      <section class="specimen">
        <input aria-label="Name" class="input" name="name" placeholder="Enter your name" />
        <div class="specimen__label">Default</div>
      </section>
      <section class="specimen">
        <div class="input-demo input-demo--types">
          <label class="input-field">
            <span class="input-field__label">Email</span>
            <input class="input input--full-width" name="email" type="email" value="jane@example.com" />
          </label>
          <label class="input-field">
            <span class="input-field__label">Age</span>
            <input class="input input--full-width" name="age" type="number" value="30" />
          </label>
          <label class="input-field">
            <span class="input-field__label">Password</span>
            <input class="input input--full-width" name="password" type="password" value="buttercream" />
          </label>
        </div>
        <div class="specimen__label">Types</div>
      </section>
      <section class="specimen">
        <label class="input-field">
          <span class="input-field__label">Website</span>
          <input class="input" name="website" type="url" value="buttercream.studio" />
          <span class="input-field__helper">https://buttercream.studio</span>
        </label>
        <div class="specimen__label">Controlled</div>
      </section>
      <section class="specimen">
        <div class="input-demo">
          <input aria-label="Primary input" class="input input--full-width" name="primary" placeholder="Primary" />
          <input aria-label="Secondary input" class="input input--secondary input--full-width" name="secondary" placeholder="Secondary" />
        </div>
        <div class="specimen__label">Variants</div>
      </section>
      <section class="specimen">
        <div class="surface surface-demo">
          <input aria-label="Input on surface" class="input input--secondary input--full-width" name="surface" placeholder="Enter your name" />
        </div>
        <div class="specimen__label">On surface</div>
      </section>
      <section class="specimen">
        <input aria-label="Disabled input" class="input" disabled name="disabled" placeholder="Enter your name" />
        <div class="specimen__label">Disabled</div>
      </section>
    </div>`;
  }

  if (section === "Avatar") {
    return `<div class="specimens">
      <section class="specimen">
        <span class="avatar avatar--sm"><span class="avatar__fallback">BC</span></span>
        <span class="avatar"><span class="avatar__fallback">BC</span></span>
        <span class="avatar avatar--lg"><span class="avatar__fallback">BC</span></span>
        <div class="specimen__label">Sizes</div>
      </section>
      <section class="specimen">
        <span class="agent-avatar">
          <span class="avatar avatar--lg avatar--rounded"><span class="avatar__fallback">AI</span></span>
          <span class="agent-avatar__status agent-avatar__status--online"></span>
        </span>
        <div class="specimen__label">Agent avatar</div>
      </section>
    </div>`;
  }

  return `<div class="specimens">
    <section class="specimen">
      <button class="button button--primary">Primary</button>
      <button class="button button--secondary">Secondary</button>
      <button class="button button--tertiary">Tertiary</button>
      <button class="button button--outline">Outline</button>
      <button class="button button--ghost">Ghost</button>
      <button class="button button--danger">Danger</button>
      <button class="button button--danger-soft">Danger soft</button>
      <div class="specimen__label">Variants</div>
    </section>
    <section class="specimen">
      <button class="button button--primary button--sm">Small</button>
      <button class="button button--primary">Medium</button>
      <button class="button button--primary button--lg">Large</button>
      <div class="specimen__label">Sizes</div>
    </section>
  </div>`;
}
