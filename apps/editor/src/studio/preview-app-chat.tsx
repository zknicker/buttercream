import { Avatar, Button, Chip, Textarea } from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import type { ReactElement } from "react";
import { AppFrame, AppHeader, AppIdentity, AppNav, type AppNavItem } from "./preview-app-shell.tsx";
import { createPreviewIconElements } from "./preview-icons.ts";

/*
 * An assistant conversation. It earns its place next to the dashboard because it stresses a
 * different half of the system: long-form reading rather than dense figures, so the type scale,
 * the mono face and the soft roles all have to hold up at paragraph length.
 */

const NAV: AppNavItem[] = [
  { icon: "add", label: "New Chat" },
  { icon: "mail", label: "Library" },
  { icon: "search", label: "Explore" },
];

const RECENT = [
  "Pro AI components showcase",
  "Quick recipes for dinner",
  "Launch plan for Q3 rollout",
  "Rewrite homepage value prop",
  "Weekly team update summary",
];

export function ChatAppPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);

  return (
    <AppFrame
      sidebar={
        <>
          <AppIdentity email="darnell@example.com" name="Darnell Howe" />
          <AppNav icons={icons} items={NAV} />
          <div className="chat__recent">
            <span className="app__sidebar-heading">Recent</span>
            <div className="chat__recent-list">
              {RECENT.map((title, index) => (
                <span
                  className="chat__recent-item"
                  data-current={index === 0 || undefined}
                  key={title}
                >
                  {title}
                </span>
              ))}
            </div>
          </div>
          <div className="app__sidebar-spacer" />
          <AppNav icons={icons} items={[{ icon: "settings", label: "Settings" }]} />
        </>
      }
    >
      <AppHeader
        actions={
          <>
            <Button size="sm" variant="secondary">
              {icon.search}Search
            </Button>
            <Button size="sm">{icon.upload}Share</Button>
          </>
        }
        subtitle="Updated just now"
        title="Pro AI components showcase"
      />

      <div className="chat__thread">
        <div className="chat__turn chat__turn--user">
          <p className="chat__bubble">
            We are documenting the chat surface. What should a composer own, and what belongs to the
            thread?
          </p>
        </div>

        <div className="chat__turn chat__turn--assistant">
          <Avatar size="sm">
            <Avatar.Fallback>AI</Avatar.Fallback>
          </Avatar>
          <div className="chat__answer">
            <p className="chat__text">
              Keep them separate. The thread owns reading — measure, rhythm, and the quiet
              affordances under each answer. The composer owns intent: what you are about to send,
              which model receives it, and what is attached to it.
            </p>
          </div>
        </div>

        <div className="chat__turn chat__turn--user">
          <p className="chat__bubble">Show me the model chip wired to theme tokens.</p>
        </div>

        <div className="chat__turn chat__turn--assistant">
          <Avatar size="sm">
            <Avatar.Fallback>AI</Avatar.Fallback>
          </Avatar>
          <div className="chat__answer">
            <span className="chat__tools">
              {icon.more}
              <span className="chat__tools-label">2 tool calls</span>
            </span>

            <p className="chat__text">
              The chip reads its colour from the same <strong>tokens</strong> every other control
              uses, so the composer restyles with the theme rather than against it.
            </p>

            <figure className="chat__code">
              <figcaption className="chat__code-head">
                <span className="chat__code-lang">TS</span>
                <Button size="sm" variant="ghost">
                  Copy
                </Button>
              </figcaption>
              <pre className="chat__code-body">
                <code>
                  <span className="chat__code-keyword">import</span>
                  {" { Chip } "}
                  <span className="chat__code-keyword">from</span>{" "}
                  <span className="chat__code-string">"@buttercream/react"</span>
                  {";\n\n"}
                  <span className="chat__code-keyword">export const</span>
                  {" model = {\n  id: "}
                  <span className="chat__code-string">"gpt-5.4"</span>
                  {",\n  label: "}
                  <span className="chat__code-string">"GPT-5.4"</span>
                  {",\n} "}
                  <span className="chat__code-keyword">as const</span>
                  {";"}
                </code>
              </pre>
            </figure>

            <ul className="chat__list">
              <li>The chip inherits the soft accent role, so it never needs a literal colour.</li>
              <li>Its radius follows the theme, matching the send button beside it.</li>
              <li>Swapping the model only changes the label, never the styling.</li>
            </ul>

            <div className="chat__actions">
              <Button size="sm" variant="ghost">
                Copy
              </Button>
              <Button size="sm" variant="ghost">
                Helpful
              </Button>
              <Button size="sm" variant="ghost">
                Not helpful
              </Button>
              <Button size="sm" variant="ghost">
                Retry
              </Button>
            </div>
          </div>
        </div>

        <div className="chat__turn chat__turn--user">
          <p className="chat__bubble">Great. Now do the same for the dark theme.</p>
        </div>

        <div className="chat__turn chat__turn--assistant">
          <Avatar size="sm">
            <Avatar.Fallback>AI</Avatar.Fallback>
          </Avatar>
          <p className="chat__thinking">
            Thinking
            <span aria-hidden className="chat__dots">
              <span className="chat__dot" />
              <span className="chat__dot" />
              <span className="chat__dot" />
            </span>
          </p>
        </div>
      </div>

      <div className="chat__composer">
        <Textarea
          className="chat__input"
          placeholder="What do you want to know?"
          rows={2}
          variant="secondary"
        />
        <div className="chat__composer-row">
          <Button aria-label="Attach a file" iconOnly size="sm" variant="ghost">
            {icon.add}
          </Button>
          <Chip size="sm">GPT-5.4</Chip>
          <span className="chat__composer-spacer" />
          <Button aria-label="Send message" className="chat__send" iconOnly size="sm">
            {icon.upload}
          </Button>
        </div>
      </div>
      <p className="chat__disclaimer">AI can make mistakes. Check important info.</p>
    </AppFrame>
  );
}
