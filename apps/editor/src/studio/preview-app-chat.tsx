import { Avatar, Button, Chip, Sidebar, Skeleton, Textarea } from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import type { ReactElement, ReactNode } from "react";
import { AppFrame, AppHeader, AppIdentity, AppNav, type AppNavItem } from "./preview-app-shell.tsx";
import { createPreviewIconElements } from "./preview-icons.ts";

/*
 * An assistant conversation. It earns its place next to the dashboard because it stresses a
 * different half of the system: long-form reading rather than dense figures, so the type scale,
 * the mono face and the soft roles all have to hold up at paragraph length.
 *
 * The script walks the anatomy of an AI thread the way the reference does — reasoning, markdown
 * with highlighted code, grouped tool calls, an approval, a skeleton, media, and sources — each
 * in the state it would first appear in, so every role the theme defines gets read at least once.
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
          <Sidebar.Group>
            <Sidebar.GroupLabel>Recent</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                {RECENT.map((title, index) => (
                  <Sidebar.MenuItem key={title}>
                    <Sidebar.MenuButton isActive={index === 0}>
                      <Sidebar.MenuLabel>{title}</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
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
        <UserTurn>Walk me through the Buttercream chat components.</UserTurn>

        {/* Streaming, before any content: the shimmer is the whole message. No avatar yet. */}
        <div className="chat__turn chat__turn--assistant">
          <p className="chat__thinking">
            <span className="chat__shimmer">Thinking...</span>
            <span aria-hidden className="chat__dots">
              <span className="chat__dot" />
              <span className="chat__dot" />
              <span className="chat__dot" />
            </span>
          </p>
        </div>

        <UserTurn>Show me reasoning, markdown, and code highlighting.</UserTurn>

        <div className="chat__turn chat__turn--assistant">
          <Avatar size="sm">
            <Avatar.Fallback>AI</Avatar.Fallback>
          </Avatar>
          <div className="chat__answer">
            <span className="chat__disclosure">
              Thought for 4 seconds
              {icon.chevronDown}
            </span>

            <p className="chat__text">
              Here is a concise answer with <strong>markdown</strong> support:
            </p>

            <figure className="chat__code">
              <figcaption className="chat__code-head">
                <span className="chat__code-lang">TS</span>
                <Button aria-label="Copy code" iconOnly size="sm" variant="ghost">
                  {icon.copy}
                </Button>
              </figcaption>
              <pre className="chat__code-body">
                <code>
                  <span className="chat__code-keyword">export type</span>{" "}
                  <span className="chat__code-type">ChatStatus</span>
                  {" = "}
                  <span className="chat__code-string">"ready"</span>
                  {" | "}
                  <span className="chat__code-string">"streaming"</span>
                  {" | "}
                  <span className="chat__code-string">"submitted"</span>
                  {";"}
                </code>
              </pre>
            </figure>

            <ul className="chat__list">
              <li>Presentation-only preview compounds</li>
              <li>Your app owns the message array and SDK wiring</li>
              <li>
                Compose <code className="chat__inline-code">ChatMessage</code>,{" "}
                <code className="chat__inline-code">Markdown</code>, and{" "}
                <code className="chat__inline-code">ChainOfThought</code> explicitly
              </li>
            </ul>

            <div className="chat__actions">
              <Button aria-label="Copy" iconOnly size="sm" variant="ghost">
                {icon.copy}
              </Button>
              <Button aria-label="Helpful" iconOnly size="sm" variant="ghost">
                {icon.thumbUp}
              </Button>
              <Button aria-label="Not helpful" iconOnly size="sm" variant="ghost">
                {icon.thumbDown}
              </Button>
              <Button aria-label="Retry" iconOnly size="sm" variant="ghost">
                {icon.refresh}
              </Button>
              <Button aria-label="More" iconOnly size="sm" variant="ghost">
                {icon.more}
              </Button>
            </div>
          </div>
        </div>

        <UserTurn>Show me tool calls — streaming, grouped, and approval.</UserTurn>

        <div className="chat__turn chat__turn--assistant">
          <div className="chat__group">
            <span className="chat__group-head">
              <span>2 tool calls</span>
              {icon.chevronDown}
            </span>
          </div>
        </div>

        <UserTurn>What if a tool needs approval?</UserTurn>

        <div className="chat__turn chat__turn--assistant">
          <div className="chat__approval">
            <span className="chat__approval-head">
              {icon.warning}
              <span>
                Approval needed: <code className="chat__approval-tool">sendEmail</code>
              </span>
            </span>
            <pre className="chat__args">
              <code>{'{"to":"team@acme.com","subject":"Launch update"}'}</code>
            </pre>
            <div className="chat__approval-actions">
              <Button size="sm" variant="secondary">
                Reject
              </Button>
              <Button size="sm">Approve</Button>
            </div>
          </div>
        </div>

        <UserTurn>What do skeleton loaders look like while a reply is pending?</UserTurn>

        <div className="chat__turn chat__turn--assistant">
          <Skeleton className="chat__skeleton-avatar" />
          <div className="chat__skeleton-lines">
            <Skeleton className="chat__skeleton-line" />
            <Skeleton className="chat__skeleton-line" style={{ width: "92%" }} />
            <Skeleton className="chat__skeleton-line" style={{ width: "60%" }} />
          </div>
        </div>

        <UserTurn>Show media and compact actions too.</UserTurn>

        <div className="chat__turn chat__turn--assistant">
          <Avatar size="sm">
            <Avatar.Fallback>AI</Avatar.Fallback>
          </Avatar>
          <div className="chat__answer">
            <p className="chat__text">
              Assistant messages can include media and a minimal action set beneath the body.
            </p>
            {/* A stand-in image painted from the chart ramp, so media previews follow the theme. */}
            <div aria-hidden className="chat__media" />
            <div className="chat__actions">
              <Button aria-label="Copy" iconOnly size="sm" variant="ghost">
                {icon.copy}
              </Button>
              <Button aria-label="More" iconOnly size="sm" variant="ghost">
                {icon.more}
              </Button>
            </div>
          </div>
        </div>

        <UserTurn>Show sources and file attachments.</UserTurn>

        <div className="chat__turn chat__turn--user">
          <span className="chat__attachment">
            <span aria-hidden className="chat__attachment-thumb" />
            dashboard-wireframe.png
          </span>
        </div>
        <UserTurn>What can you tell me about this wireframe?</UserTurn>

        <div className="chat__turn chat__turn--assistant">
          <div className="chat__answer">
            <p className="chat__text">
              The wireframe follows a familiar dashboard shell with a persistent sidebar, top bar,
              and a scrollable content region for cards and charts.
            </p>
            <span className="chat__disclosure">
              3 sources
              {icon.chevronDown}
            </span>
          </div>
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
          <Button
            aria-label="Attach a file"
            className="chat__round"
            iconOnly
            size="sm"
            variant="secondary"
          >
            {icon.attach}
          </Button>
          <Chip className="chat__model" size="sm" variant="tertiary">
            {icon.globe}
            GPT-5.4
            {icon.chevronDown}
          </Chip>
          <span className="chat__composer-spacer" />
          <Button aria-label="Send message" className="chat__round" iconOnly size="sm">
            {icon.arrowUp}
          </Button>
        </div>
      </div>
      <p className="chat__disclaimer">AI can make mistakes. Check important info.</p>
    </AppFrame>
  );
}

function UserTurn({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="chat__turn chat__turn--user">
      <p className="chat__bubble">{children}</p>
    </div>
  );
}
