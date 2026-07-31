import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Sidebar } from "./sidebar.tsx";

function markupFor(children: React.ReactNode): string {
  return renderToStaticMarkup(<Sidebar.Provider>{children}</Sidebar.Provider>);
}

describe("Sidebar", () => {
  test("renders menu entries as real buttons inside the desktop panel", () => {
    const markup = markupFor(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Recent</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton isActive>
                  <Sidebar.MenuIcon>
                    <svg aria-hidden="true" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>Inbox</Sidebar.MenuLabel>
                  <Sidebar.MenuBadge>12</Sidebar.MenuBadge>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>,
    );

    expect(markup).toContain('class="sidebar__menu-button"');
    expect(markup).toContain("<button");
    expect(markup).toContain("data-active");
    /* The badge is the real Chip seated by a sidebar class, so chip custom CSS reaches it. */
    expect(markup).toContain("sidebar__menu-badge");
    expect(markup).toContain("chip--sm");
    expect(markup).toContain('class="sidebar__menu-icon"');
    expect(markup).toContain('class="sidebar__menu-label"');
    /* The scrollable middle is the real ScrollShadow with its scrollbar hidden. */
    expect(markup).toContain("scroll-shadow--hide-scrollbar");
    expect(markup).toContain("sidebar__content");
    /* Desktop structure: a gap holding the place in flow, and the fixed panel painting over it. */
    expect(markup).toContain('data-slot="sidebar-gap"');
    expect(markup).toContain('data-state="expanded"');
    expect(markup).toContain('data-variant="sidebar"');
  });

  test("renders trailing text furniture through the chip slot", () => {
    const markup = markupFor(
      <Sidebar>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              <Sidebar.MenuLabel>Flaky tests root cause</Sidebar.MenuLabel>
              <Sidebar.MenuChip>10h</Sidebar.MenuChip>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar>,
    );

    /* Bare caption text, unlike the badge's Chip: no chip classes, just the seated span. */
    expect(markup).toContain('class="sidebar__menu-chip"');
    expect(markup).toContain(">10h</span>");
    expect(markup).not.toContain("sidebar__menu-chip chip");
  });

  test("renders a menu entry as a link through the render prop", () => {
    const markup = markupFor(
      <Sidebar collapsible="none">
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton render={<a href="/inbox" />}>
              <span>Inbox</span>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar>,
    );

    expect(markup).toContain('href="/inbox"');
    expect(markup).toContain('class="sidebar__menu-button"');
    expect(markup).not.toContain("<button");
  });

  test("menu action opts into hover reveal through the data attribute", () => {
    const markup = markupFor(
      <Sidebar collapsible="none">
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              <span>Inbox</span>
            </Sidebar.MenuButton>
            <Sidebar.MenuAction aria-label="Archive" showOnHover>
              <svg aria-hidden="true" />
            </Sidebar.MenuAction>
            <Sidebar.MenuAction aria-label="Options">
              <svg aria-hidden="true" />
            </Sidebar.MenuAction>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar>,
    );

    const actions = markup.match(/data-show-on-hover/gu);
    expect(actions).toHaveLength(1);
  });

  test("menu collapsible renders a real disclosure around the sub-menu", () => {
    const markup = markupFor(
      <Sidebar collapsible="none">
        <Sidebar.Menu>
          <Sidebar.MenuCollapsible defaultOpen>
            <Sidebar.MenuCollapsibleTrigger>
              <Sidebar.MenuLabel>Spaces</Sidebar.MenuLabel>
              <Sidebar.MenuChevron>
                <svg aria-hidden="true" />
              </Sidebar.MenuChevron>
            </Sidebar.MenuCollapsibleTrigger>
            <Sidebar.MenuCollapsibleContent>
              <Sidebar.MenuSub>
                <Sidebar.MenuSubItem>
                  <Sidebar.MenuSubButton>
                    <span>Library</span>
                  </Sidebar.MenuSubButton>
                </Sidebar.MenuSubItem>
              </Sidebar.MenuSub>
            </Sidebar.MenuCollapsibleContent>
          </Sidebar.MenuCollapsible>
        </Sidebar.Menu>
      </Sidebar>,
    );

    /* The trigger is the same menu-button anatomy, now carrying the disclosure state. */
    expect(markup).toContain('class="sidebar__menu-button"');
    expect(markup).toContain('aria-expanded="true"');
    expect(markup).toContain("sidebar__menu-chevron");
    expect(markup).toContain("sidebar__menu-collapsible-panel");
    expect(markup).toContain("Library");
  });

  test("reduceMotion projects onto the provider for the styles to read", () => {
    const markup = renderToStaticMarkup(
      <Sidebar.Provider reduceMotion>
        <Sidebar collapsible="none">
          <Sidebar.Header>Header</Sidebar.Header>
        </Sidebar>
      </Sidebar.Provider>,
    );

    expect(markup).toContain("data-reduce-motion");
  });

  test("collapsed rail derives its tooltip from the row label", () => {
    const markup = renderToStaticMarkup(
      <Sidebar.Provider defaultOpen={false}>
        <Sidebar collapsible="icon">
          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <Sidebar.MenuLabel>Inbox</Sidebar.MenuLabel>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton tooltip={false}>
                  <Sidebar.MenuLabel>Muted</Sidebar.MenuLabel>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Content>
        </Sidebar>
      </Sidebar.Provider>,
    );

    /* The labelled row wires itself as a tooltip trigger; tooltip={false} opts out. */
    const [labelled, muted] = markup.split("</li>");
    expect(labelled).toContain("data-base-ui-tooltip-trigger");
    expect(muted).not.toContain("data-base-ui-tooltip-trigger");
  });

  test("expanded rows carry no tooltip trigger", () => {
    const markup = markupFor(
      <Sidebar collapsible="icon">
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <Sidebar.MenuLabel>Inbox</Sidebar.MenuLabel>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar>,
    );

    expect(markup).not.toContain("data-base-ui-tooltip-trigger");
  });

  test("nested rows speak the same label grammar as top-level rows", () => {
    const markup = markupFor(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuSub>
                <Sidebar.MenuSubItem>
                  <Sidebar.MenuSubButton>
                    <Sidebar.MenuLabel>Overview</Sidebar.MenuLabel>
                  </Sidebar.MenuSubButton>
                </Sidebar.MenuSubItem>
              </Sidebar.MenuSub>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar>,
    );

    const subButton = markup.slice(markup.indexOf("sidebar__menu-sub-button"));
    expect(subButton).toContain('class="sidebar__menu-label"');
  });

  test("menus project the guide-line mode for the styles to read", () => {
    const markup = markupFor(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Menu showGuideLines="hover">
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <Sidebar.MenuLabel>Inbox</Sidebar.MenuLabel>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <Sidebar.MenuLabel>Search</Sidebar.MenuLabel>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar>,
    );

    expect(markup).toContain('data-guide-lines="hover"');
    expect(markup).toContain('data-guide-lines="always"');
  });

  test("collapsible none renders a static panel without the fixed container", () => {
    const markup = markupFor(
      <Sidebar collapsible="none">
        <Sidebar.Header>Header</Sidebar.Header>
      </Sidebar>,
    );

    expect(markup).toContain("sidebar--static");
    expect(markup).not.toContain('data-slot="sidebar-container"');
  });
});
