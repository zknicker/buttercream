import {
  Accordion,
  Avatar,
  Button,
  Select,
  Sidebar,
  Skeleton,
  Surface,
  Textarea,
  Typography,
} from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import { type FormEvent, type ReactElement, type ReactNode, useState } from "react";
import { AppFrame, AppHeader, AppIdentity, AppNav, type AppNavItem } from "./preview-app-shell.tsx";
import { createPreviewIconElements } from "./preview-icons.ts";
import { usePreviewSurface } from "./preview-surface.tsx";

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
  const surface = usePreviewSurface();
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
  };

  return (
    <AppFrame
      sidebar={
        <>
          <AppIdentity email="darnell@email.com" name="Darnell Howe" />
          <AppNav icons={icons} items={NAV} />
          <Sidebar.Separator />
          <Sidebar.Group>
            <Sidebar.GroupLabel>Recent</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                {RECENT.map((title, index) => (
                  <Sidebar.MenuItem key={title}>
                    <Sidebar.MenuButton isActive={index === 0}>
                      <Sidebar.MenuIcon>{icon.message}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>{title}</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </>
      }
      sidebarOpen={sidebarOpen}
    >
      <AppHeader
        actions={
          <>
            <Button aria-label="Search chats" size="sm" variant="secondary">
              {icon.search}Search
            </Button>
            <Button size="sm">{icon.upload}Share</Button>
          </>
        }
        leading={
          <Button
            aria-label="Toggle sidebar"
            iconOnly
            onClick={() => setSidebarOpen((open) => !open)}
            size="sm"
            variant="ghost"
          >
            {icon.sidebar}
          </Button>
        }
        subtitle="Updated just now"
        title="Pro AI components showcase"
      />

      <div aria-label="Conversation" className="chat__thread" role="log">
        <div className="chat__content">
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
            <Avatar aria-label="AI assistant" size="sm">
              <Avatar.Fallback>AI</Avatar.Fallback>
            </Avatar>
            <div className="chat__answer">
              <Accordion className="chat__disclosure">
                <Accordion.Item value="reasoning">
                  <Accordion.Trigger indicator={icon.chevronDown}>
                    Thought for 4 seconds
                  </Accordion.Trigger>
                  <Accordion.Panel>
                    Compared the requested states with the component APIs and theme roles.
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>

              <Typography className="chat__text" variant="body-sm">
                Here is a concise answer with <strong>markdown</strong> support:
              </Typography>

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
                <Button aria-label="Good response" iconOnly size="sm" variant="ghost">
                  {icon.thumbUp}
                </Button>
                <Button aria-label="Bad response" iconOnly size="sm" variant="ghost">
                  {icon.thumbDown}
                </Button>
                <Button aria-label="Regenerate" iconOnly size="sm" variant="ghost">
                  {icon.refresh}
                </Button>
                <Button aria-label="More actions" iconOnly size="sm" variant="ghost">
                  {icon.more}
                </Button>
              </div>
            </div>
          </div>

          <UserTurn>Show me tool calls — streaming, grouped, and approval.</UserTurn>

          <div className="chat__turn chat__turn--assistant">
            <Accordion className="chat__group" variant="surface">
              <Accordion.Item value="tool-calls">
                <Accordion.Trigger className="chat__group-head" indicator={icon.chevronDown}>
                  2 tool calls
                </Accordion.Trigger>
                <Accordion.Panel>
                  <ul className="chat__tool-list">
                    <li>Read component APIs</li>
                    <li>Compare theme roles</li>
                  </ul>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>

          <UserTurn>What if a tool needs approval?</UserTurn>

          <div className="chat__turn chat__turn--assistant">
            <Accordion className="chat__approval" defaultValue={["approval"]}>
              <Accordion.Item value="approval">
                <Accordion.Trigger className="chat__approval-head" indicator={icon.chevronDown}>
                  {icon.warning}
                  <span>
                    Approval needed: <code className="chat__approval-tool">sendEmail</code>
                  </span>
                </Accordion.Trigger>
                <Accordion.Panel>
                  <pre className="chat__args">
                    <code>{'{"to":"team@acme.com","subject":"Launch update"}'}</code>
                  </pre>
                  <div className="chat__approval-actions">
                    <Button size="sm" variant="secondary">
                      Reject
                    </Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>

          <UserTurn>What do skeleton loaders look like while a reply is pending?</UserTurn>

          <div
            aria-label="Loading response"
            className="chat__turn chat__turn--assistant"
            role="status"
          >
            <Skeleton className="chat__skeleton-avatar" />
            <div className="chat__skeleton-lines">
              <Skeleton className="chat__skeleton-line" />
              <Skeleton className="chat__skeleton-line" style={{ width: "92%" }} />
              <Skeleton className="chat__skeleton-line" style={{ width: "60%" }} />
            </div>
          </div>

          <UserTurn>Show media and compact actions too.</UserTurn>

          <div className="chat__turn chat__turn--assistant">
            <Avatar aria-label="AI assistant" size="sm">
              <Avatar.Fallback>AI</Avatar.Fallback>
            </Avatar>
            <div className="chat__answer">
              <Typography className="chat__text" variant="body-sm">
                Assistant messages can include media and a minimal action set beneath the body.
              </Typography>
              {/* A stand-in image painted from the chart ramp, so media previews follow the theme. */}
              <div
                aria-label="Component architecture diagram placeholder"
                className="chat__media"
                role="img"
              />
              <div className="chat__actions">
                <Button aria-label="Copy" iconOnly size="sm" variant="ghost">
                  {icon.copy}
                </Button>
                <Button aria-label="More actions" iconOnly size="sm" variant="ghost">
                  {icon.more}
                </Button>
              </div>
            </div>
          </div>

          <UserTurn>Show sources and file attachments.</UserTurn>

          <div className="chat__turn chat__turn--user">
            <Surface className="chat__attachment" render={<span />} variant="secondary">
              <span aria-hidden className="chat__attachment-thumb" />
              dashboard-wireframe.png
            </Surface>
          </div>
          <UserTurn>What can you tell me about this wireframe?</UserTurn>

          <div className="chat__turn chat__turn--assistant">
            <div className="chat__answer">
              <Typography className="chat__text" variant="body-sm">
                The wireframe follows a familiar dashboard shell with a persistent sidebar, top bar,
                and a scrollable content region for cards and charts.
              </Typography>
              <Accordion className="chat__disclosure">
                <Accordion.Item value="sources">
                  <Accordion.Trigger indicator={icon.chevronDown}>3 sources</Accordion.Trigger>
                  <Accordion.Panel>
                    <ul className="chat__sources">
                      <li>Dashboard shell patterns</li>
                      <li>Responsive card layouts</li>
                      <li>Chart composition guidance</li>
                    </ul>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <div className="chat__composer-dock">
        <Surface
          className="chat__composer"
          render={<form onSubmit={submitMessage} />}
          variant="default"
        >
          <Textarea
            aria-label="Message input"
            className="chat__input"
            onChange={(event) => setMessage(event.target.value)}
            placeholder="What do you want to know?"
            rows={2}
            value={message}
            variant="secondary"
          />
          <div className="chat__composer-row">
            <Button
              aria-label="Attach file"
              className="chat__round"
              iconOnly
              size="sm"
              type="button"
              variant="secondary"
            >
              {icon.attach}
            </Button>
            <Select
              className="chat__model"
              container={surface}
              defaultValue="GPT-5.4"
              indicator={
                <>
                  {icon.globe}
                  {icon.chevronDown}
                </>
              }
              label="Model"
            >
              <Select.Item value="GPT-5.4">GPT-5.4</Select.Item>
              <Select.Item value="GPT-5.3">GPT-5.3</Select.Item>
              <Select.Item value="GPT-5 mini">GPT-5 mini</Select.Item>
            </Select>
            <span className="chat__composer-spacer" />
            <Button
              aria-label="Send message"
              className="chat__round"
              disabled={message.trim().length === 0}
              iconOnly
              size="sm"
              type="submit"
            >
              {icon.arrowUp}
            </Button>
          </div>
        </Surface>
        <Typography className="chat__disclaimer" variant="body-xs">
          AI can make mistakes. Check important info.
        </Typography>
      </div>
    </AppFrame>
  );
}

function UserTurn({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="chat__turn chat__turn--user">
      <Surface
        className="chat__bubble"
        render={<Typography as="p" variant="body-sm" />}
        variant="secondary"
      >
        {children}
      </Surface>
    </div>
  );
}
