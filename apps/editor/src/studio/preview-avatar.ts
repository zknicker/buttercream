export function renderAvatarPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      ${avatar("AK", "accent")}
      ${avatar("BC")}
      <div class="specimen__label">Image and fallback</div>
    </section>
    <section class="specimen">
      ${avatar("S", undefined, "sm")}
      ${avatar("M")}
      ${avatar("L", undefined, "lg")}
      <div class="specimen__label">Sizes</div>
    </section>
    <section class="specimen">
      ${avatar("A", "accent")}
      ${avatar("S", "success")}
      ${avatar("W", "warning")}
      ${avatar("D", "danger")}
      <div class="specimen__label">Colors</div>
    </section>
    <section class="specimen">
      ${avatar("BC")}
      ${avatar("BC", undefined, undefined, "avatar--accent avatar--soft")}
      ${avatar("BC", undefined, undefined, "avatar--circle")}
      <div class="specimen__label">Variants</div>
    </section>
    <section class="specimen">
      <div class="avatar-group">
        ${avatar("AK", "accent")}
        ${avatar("MN", "success")}
        ${avatar("JL", "warning")}
        ${avatar("+4")}
      </div>
      <div class="specimen__label">Stacked group</div>
    </section>
    <section class="specimen">
      <span class="agent-avatar">
        ${avatar("AI", undefined, "lg")}
        <span class="agent-avatar__status agent-avatar__status--online"></span>
      </span>
      <div class="specimen__label">Agent avatar</div>
    </section>
  </div>`;
}

type AvatarColor = "accent" | "success" | "warning" | "danger";
type AvatarSize = "sm" | "lg";

function avatar(
  initials: string,
  color?: AvatarColor,
  size?: AvatarSize,
  variant?: string,
): string {
  const rootClasses = ["avatar", size && `avatar--${size}`, variant].filter(Boolean).join(" ");
  const fallbackClasses = ["avatar__fallback", color && `avatar__fallback--${color}`]
    .filter(Boolean)
    .join(" ");

  return `<span class="${rootClasses}"><span class="${fallbackClasses}">${initials}</span></span>`;
}
