import type { DesignSystem } from "@buttercream/theme-core";
import { HugeiconsIcon } from "@hugeicons/react";
import PencilEdit02Icon from "@hugeicons-pro/core-stroke-rounded/PencilEdit02Icon";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import type { ShellTheme } from "../shell-theme.ts";
import { Button, Card, classes, Eyebrow, SectionHeading, Swirled } from "../ui/index.ts";
import { BrandEditorDialog, type BrandEditorDialogProps } from "./brand-editor-dialog.tsx";
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
                  trigger={
                    <Button size="sm" variant="ghost">
                      {identity.website ? "Edit" : "Add website"}
                    </Button>
                  }
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
                        edit: {
                          description: field.description,
                          label: field.title,
                          onSave: (value: string) =>
                            onUpdate((next) => {
                              next.identity[field.key] = value.trim();
                            }),
                          placeholder: field.placeholder,
                          title: field.title,
                          value: identity[field.key] ?? "",
                        },
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
                        edit: {
                          description:
                            "Project-specific instructions, exported verbatim into DESIGN.md.",
                          label: "Agent rules",
                          onSave: (value: string) =>
                            onUpdate((next) => {
                              next.rules.agent = value;
                            }),
                          placeholder:
                            "Prefer Card over a bare panel for grouped content.\nNever nest two accent actions in one row.",
                          title: "Design rules for AI",
                          value: rules.agent,
                        },
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
                        edit: {
                          code: true,
                          /* Invariant 3: custom CSS is authored here and never inferred from
                             an imported stylesheet, which is why this is the only way in. */
                          description:
                            "BEM overrides and utilities, scoped to this system's previews and shipped with its export.",
                          label: "Custom CSS",
                          onSave: (value: string) =>
                            onUpdate((next) => {
                              next.rules.customCss = value;
                            }),
                          placeholder: ".button--secondary {\n  background: var(--accent-soft);\n}",
                          title: "Custom CSS",
                          value: rules.customCss,
                        },
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

/*
 * The whole card opens its editor, not a button in its corner — the reference behaves the same
 * way. The trigger is a stretched overlay rather than the card itself rendered as a <button>,
 * because the card holds headings and <pre> blocks that are invalid inside one. The pencil is
 * decorative: it surfaces on hover and focus to say the card is editable, and the overlay
 * carries the accessible name.
 */
function BrandBlock({
  children,
  className,
  edit,
  title,
}: {
  children: ReactNode;
  className?: string;
  /** Dialog configuration for an author; absent for a shared visitor, and the card sits inert. */
  edit?: Omit<BrandEditorDialogProps, "trigger">;
  title: string;
}): ReactElement {
  return (
    <Card
      className={classes(
        "group relative flex flex-col gap-2.5 p-5",
        edit && "transition-shadow hover:ring-fg/20",
        className,
      )}
    >
      <div className="flex min-h-7 items-start justify-between gap-3">
        <h3 className="text-sm font-medium text-fg">{title}</h3>
        {edit ? (
          <span
            aria-hidden
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-fg/8 text-shell-muted opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
          >
            <HugeiconsIcon icon={PencilEdit02Icon} size={14} strokeWidth={2} />
          </span>
        ) : null}
      </div>
      {children}
      {edit ? (
        <BrandEditorDialog
          {...edit}
          trigger={
            <button
              aria-label={`${edit.value.trim() ? "Edit" : "Add"} ${title.toLowerCase()}`}
              className="absolute inset-0 cursor-pointer rounded-(--radius-shell) focus-visible:outline-[1.5px] focus-visible:-outline-offset-1 focus-visible:outline-fg"
              type="button"
            />
          }
        />
      ) : null}
    </Card>
  );
}

function ProseValue({ hint, value }: { hint: string; value: string }): ReactElement {
  const content = value.trim();
  return content ? (
    <p className="text-sm whitespace-pre-wrap text-pretty text-shell-muted">{content}</p>
  ) : (
    <p className="text-sm text-shell-muted/60">{hint}</p>
  );
}

function CodeValue({ hint, value }: { hint: string; value: string }): ReactElement {
  const content = value.trim();
  return content ? (
    /*
     * Capped rather than scrolled: the card reports that rules exist, the dialog reads them.
     * Bare mono on the card — a panelled block made a box inside a box — with the last couple
     * of lines fading out so the cap reads as "there is more", not a clipping bug.
     */
    <pre className="max-h-40 overflow-hidden font-mono text-xs leading-5 text-shell-muted [mask-image:linear-gradient(to_bottom,black_calc(100%-2.5rem),transparent)]">
      <code>{content}</code>
    </pre>
  ) : (
    <p className="text-sm text-shell-muted/60">{hint}</p>
  );
}

function WebsiteValue({ value }: { value: string }): ReactElement {
  const href = websiteHref(value);
  if (!value.trim()) {
    return <span className="text-sm text-shell-muted/60">No website yet</span>;
  }

  return href ? (
    <a
      className="rounded-(--radius-shell-sm) text-sm text-shell-muted underline decoration-fg/25 underline-offset-3 hover:text-fg focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-fg"
      href={href}
      rel="noreferrer noopener"
      target="_blank"
    >
      {value}
    </a>
  ) : (
    <span className="text-sm text-shell-muted">{value}</span>
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
