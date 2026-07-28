import type { DesignSystem } from "@buttercream/theme-core";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import type { ShellTheme } from "../shell-theme.ts";
import { Card, classes, Eyebrow, SectionHeading, Swirled } from "../ui/index.ts";
import { BrandEditorDialog } from "./brand-editor-dialog.tsx";
import { BrandPreview } from "./preview-brand.tsx";
import { PreviewSurface } from "./preview-surface.tsx";

/*
 * The Brand page: the half of the document that is prose rather than tokens.
 *
 * Identity, agent rules and custom CSS are stored in `DesignSystem` and exported into
 * `DESIGN.md`, but until now nothing in the editor could write them — a system could only
 * acquire them by import. This page is where they are authored.
 *
 * It is the one section that is editor chrome rather than a preview, so the shell renders it
 * without wrapping it in a surface. The themed material it does show — the colour and type
 * summary and the live component strip — sits inside its own PreviewSurface island, which keeps
 * the user's tokens and custom CSS off the fields editing them (CONTEXT.md invariant 4).
 */

type IdentityProseField = "antiPatterns" | "description" | "targetAudience" | "voiceAndTone";

interface IdentityFieldSpec {
  /** The dialog's subtitle: why the field exists, not what a text box is. */
  description: string;
  /** Shown in place of a value, so an unauthored field still says what belongs in it. */
  hint: string;
  key: IdentityProseField;
  placeholder: string;
  title: string;
  /** Mission statements run long; audience and tone are a line or two. */
  wide?: boolean;
}

const IDENTITY_FIELDS: readonly IdentityFieldSpec[] = [
  {
    description: "Opens the exported DESIGN.md, so an agent reads it before anything else.",
    hint: "Add a description and mission for this brand.",
    key: "description",
    placeholder: "A themeable component system for teams that ship with agents.",
    title: "Description and mission",
    wide: true,
  },
  {
    description: "Who the interface is built for, and what they are trying to get done.",
    hint: "Who is this for?",
    key: "targetAudience",
    placeholder: "Small product teams shipping internal tools without a designer.",
    title: "Target audience",
  },
  {
    description: "How the product speaks: copy, labels, error messages, empty states.",
    hint: "How should it sound?",
    key: "voiceAndTone",
    placeholder: "Plain, warm, and specific. Never chirpy, never apologetic.",
    title: "Voice and tone",
  },
  {
    description: "What must never appear. Agents follow prohibitions more reliably than taste.",
    hint: "What should never happen here?",
    key: "antiPatterns",
    placeholder: "No gradients on interactive surfaces. No icon-only destructive actions.",
    title: "Anti-patterns",
    wide: true,
  },
];

export function BrandPage({
  designSystem,
  onUpdate,
  surfaceStyle,
  theme,
}: {
  designSystem: DesignSystem;
  /** Absent for a shared visitor: the document is displayed, never authored. */
  onUpdate?: (mutate: (designSystem: DesignSystem) => void) => void;
  /** The same inline token map the main preview surface carries. */
  surfaceStyle: CSSProperties;
  theme: ShellTheme;
}): ReactElement {
  const { identity, rules } = designSystem;
  const authoredIdentity = IDENTITY_FIELDS.filter((field) => identity[field.key]?.trim());

  return (
    <div className="min-h-full bg-canvas">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-10 sm:px-10">
        <header>
          <Eyebrow>Design system</Eyebrow>
          <h1 className="mt-2 font-display text-3xl text-fg">
            {/* The one swirl this page gets; the motif stops reading as a signature if it repeats. */}
            <Swirled>{identity.name}</Swirled>
          </h1>
          {/* The "not set yet" state is a prompt to an author. A visitor gets no empty row. */}
          {onUpdate || identity.website?.trim() ? (
            <div className="mt-4 flex min-h-8.5 items-center gap-2">
              <WebsiteValue value={identity.website ?? ""} />
              {onUpdate ? (
                <BrandEditorDialog
                  description="Where the product lives. Exported into DESIGN.md as the project's home."
                  label="Website"
                  multiline={false}
                  onSave={(value) =>
                    onUpdate((next) => {
                      next.identity.website = value.trim();
                    })
                  }
                  placeholder="buttercream.studio"
                  title="Website"
                  triggerLabel={identity.website ? "Edit" : "Add website"}
                  value={identity.website ?? ""}
                />
              ) : null}
            </div>
          ) : null}
        </header>

        {onUpdate || authoredIdentity.length > 0 ? (
          <section>
            <SectionHeading title="Identity" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(onUpdate ? IDENTITY_FIELDS : authoredIdentity).map((field) => (
                <BrandBlock
                  key={field.key}
                  title={field.title}
                  {...(field.wide ? { className: "sm:col-span-2" } : {})}
                  {...(onUpdate
                    ? {
                        action: (
                          <BrandEditorDialog
                            description={field.description}
                            label={field.title}
                            onSave={(value) =>
                              onUpdate((next) => {
                                next.identity[field.key] = value.trim();
                              })
                            }
                            placeholder={field.placeholder}
                            title={field.title}
                            triggerLabel={identity[field.key]?.trim() ? "Edit" : "Add"}
                            value={identity[field.key] ?? ""}
                          />
                        ),
                      }
                    : {})}
                >
                  <ProseValue hint={field.hint} value={identity[field.key] ?? ""} />
                </BrandBlock>
              ))}
            </div>
          </section>
        ) : null}

        <section>
          <SectionHeading title="Theme" />
          {/*
           * The island. Its own surface rather than a share of the page's, so the tokens and the
           * user's custom CSS reach the specimens and stop there — the fields above and the cards
           * below are chrome and stay chrome.
           */}
          <div className="mt-4 overflow-hidden rounded-(--radius-shell) ring-1 ring-fg/10">
            <PreviewSurface customCss={rules.customCss} style={surfaceStyle} theme={theme}>
              <BrandPreview components={designSystem.components} />
            </PreviewSurface>
          </div>
        </section>

        {onUpdate || rules.agent.trim() || rules.customCss.trim() ? (
          <section>
            <SectionHeading title="Rules" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {onUpdate || rules.agent.trim() ? (
                <BrandBlock
                  title="Design rules for AI"
                  {...(onUpdate
                    ? {
                        action: (
                          <BrandEditorDialog
                            description="Project-specific instructions, exported verbatim into DESIGN.md."
                            label="Agent rules"
                            onSave={(value) =>
                              onUpdate((next) => {
                                next.rules.agent = value;
                              })
                            }
                            placeholder={
                              "Prefer Card over a bare panel for grouped content.\nNever nest two accent actions in one row."
                            }
                            title="Design rules for AI"
                            triggerLabel={rules.agent.trim() ? "Edit" : "Add"}
                            value={rules.agent}
                          />
                        ),
                      }
                    : {})}
                >
                  <ProseValue
                    hint="Tell agents how to build with this system."
                    value={rules.agent}
                  />
                </BrandBlock>
              ) : null}

              {onUpdate || rules.customCss.trim() ? (
                <BrandBlock
                  title="Custom CSS"
                  {...(onUpdate
                    ? {
                        action: (
                          <BrandEditorDialog
                            code
                            /* Invariant 3: custom CSS is authored here and never inferred from
                               an imported stylesheet, which is why this is the only way in. */
                            description="BEM overrides and utilities, scoped to this system's previews and shipped with its export."
                            label="Custom CSS"
                            onSave={(value) =>
                              onUpdate((next) => {
                                next.rules.customCss = value;
                              })
                            }
                            placeholder={
                              ".button--secondary {\n  background: var(--accent-soft);\n}"
                            }
                            title="Custom CSS"
                            triggerLabel={rules.customCss.trim() ? "Edit" : "Add"}
                            value={rules.customCss}
                          />
                        ),
                      }
                    : {})}
                >
                  <CodeValue
                    hint="Add BEM overrides the token controls cannot express."
                    value={rules.customCss}
                  />
                </BrandBlock>
              ) : null}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function BrandBlock({
  action,
  children,
  className,
  title,
}: {
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  title: string;
}): ReactElement {
  return (
    <Card className={classes("flex flex-col gap-2.5 p-5", className)}>
      <div className="flex min-h-7 items-start justify-between gap-3">
        <h3 className="text-sm font-medium text-fg">{title}</h3>
        {action}
      </div>
      {children}
    </Card>
  );
}

function ProseValue({ hint, value }: { hint: string; value: string }): ReactElement {
  const content = value.trim();
  return content ? (
    <p className="text-sm whitespace-pre-wrap text-pretty text-muted">{content}</p>
  ) : (
    <p className="text-sm text-muted/60">{hint}</p>
  );
}

function CodeValue({ hint, value }: { hint: string; value: string }): ReactElement {
  const content = value.trim();
  return content ? (
    /* Capped rather than scrolled: the card reports that rules exist, the dialog reads them. */
    <pre className="max-h-40 overflow-hidden rounded-(--radius-shell-sm) bg-sunken p-3 font-mono text-xs leading-5 text-muted">
      <code>{content}</code>
    </pre>
  ) : (
    <p className="text-sm text-muted/60">{hint}</p>
  );
}

function WebsiteValue({ value }: { value: string }): ReactElement {
  const href = websiteHref(value);
  if (!value.trim()) {
    return <span className="text-sm text-muted/60">No website yet</span>;
  }

  return href ? (
    <a
      className="rounded-(--radius-shell-sm) text-sm text-muted underline decoration-fg/25 underline-offset-3 hover:text-fg focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-fg"
      href={href}
      rel="noreferrer noopener"
      target="_blank"
    >
      {value}
    </a>
  ) : (
    <span className="text-sm text-muted">{value}</span>
  );
}

/**
 * A link only for `http(s)`. The schema stores free text, and `/ds/:id` is public — an unchecked
 * scheme here would put whatever a document author typed behind a click.
 */
function websiteHref(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  try {
    const url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}
