import type { PreviewIcons } from "./preview-icons.ts";

export function renderCardPreview(previewIcons: PreviewIcons): string {
  return `<div class="specimens">
    <section class="specimen">
      <article class="card preview-card">
        <header class="card__header">
          <div class="card__title">Become an Acme Creator!</div>
          <div class="card__description">Visit the Acme Creator Hub to sign up today and start earning credits from your fans and followers.</div>
        </header>
        <footer class="card__footer">
          <button class="button button--ghost">Creator hub</button>
        </footer>
      </article>
      <div class="specimen__label">Default</div>
    </section>
    <section class="specimen">
      <div class="preview-card-grid">
        ${variantCard("Transparent", "Minimal prominence with transparent background", "card--transparent")}
        ${variantCard("Default", "Standard card appearance")}
        ${variantCard("Secondary", "Medium prominence", "card--secondary")}
        ${variantCard("Tertiary", "Higher prominence", "card--tertiary")}
      </div>
      <div class="specimen__label">Variants</div>
    </section>
    <section class="specimen">
      <article class="card preview-card preview-card--horizontal">
        <div aria-hidden="true" class="preview-card__media"></div>
        <div>
          <div class="card__title">Become an ACME Creator!</div>
          <div class="card__description">Lorem ipsum dolor sit amet consectetur. Sed arcu donec id aliquam dolor.</div>
        </div>
        <button aria-label="Close" class="button button--tertiary button--icon-only">${previewIcons.close}</button>
        <div class="preview-card__meta">
          <strong>Only 10 spots</strong>
          <span>Submission ends Oct 10.</span>
        </div>
        <button class="button button--primary">Apply now</button>
      </article>
      <div class="specimen__label">Horizontal</div>
    </section>
    <section class="specimen">
      <div class="preview-card-stack">
        <article class="card preview-card preview-card--community">
          <span class="avatar avatar--lg"><span class="avatar__fallback avatar__fallback--accent">${previewIcons.users}</span></span>
          <div>
            <div class="card__title">Indie Hackers</div>
            <div class="card__description">148 members</div>
          </div>
          <span class="preview-byline"><span class="avatar avatar--sm"><span class="avatar__fallback">M</span></span>By Martha</span>
        </article>
        <article class="card preview-card preview-card--community">
          <span class="avatar avatar--lg"><span class="avatar__fallback avatar__fallback--accent">${previewIcons.users}</span></span>
          <div>
            <div class="card__title">AI Builders</div>
            <div class="card__description">362 members</div>
          </div>
          <span class="preview-byline"><span class="avatar avatar--sm"><span class="avatar__fallback">J</span></span>By John</span>
        </article>
      </div>
      <div class="specimen__label">With avatar</div>
    </section>
    <section class="specimen">
      <article class="card preview-card">
        <header class="card__header">
          <div class="card__title">Login</div>
          <div class="card__description">Enter your credentials to access your account</div>
        </header>
        <div class="card__content preview-login">
          <label class="input-field"><span class="input-field__label">Email</span><input class="input input--full-width" placeholder="email@example.com" type="email" /></label>
          <label class="input-field"><span class="input-field__label">Password</span><input class="input input--full-width" placeholder="••••••••" type="password" /></label>
        </div>
        <footer class="card__footer preview-card__actions">
          <button class="button button--primary">Sign in</button>
          <button class="button button--ghost">Forgot password?</button>
        </footer>
      </article>
      <div class="specimen__label">With form</div>
    </section>
  </div>`;
}

function variantCard(title: string, description: string, className = ""): string {
  return `<article class="card ${className}">
    <div class="card__title">${title}</div>
    <div class="card__description">${description}</div>
  </article>`;
}
