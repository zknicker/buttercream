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
    /* Desktop structure: a gap holding the place in flow, and the fixed panel painting over it. */
    expect(markup).toContain('data-slot="sidebar-gap"');
    expect(markup).toContain('data-state="expanded"');
    expect(markup).toContain('data-variant="sidebar"');
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
