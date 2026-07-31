import {
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  Dropdown,
  Kbd,
  Segment,
  Sidebar,
} from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import type { PreviewIconElements } from "./preview-icons.ts";
import { Specimen } from "./preview-specimen.tsx";

/*
 * Sidebar specimens, mirroring the reference's demo set one for one. Every demo is an app frame —
 * sidebar against the left edge, content surface beside it — because a navigation column centred
 * in a box reads as a misplaced list.
 *
 * Each frame is its demo's viewport: it establishes the containing block for fixed elements, so
 * portalling a demo's drawers, tooltips, and dropdowns into its own frame makes them position,
 * flip, and clip against the frame the way a real app's would against the browser window —
 * a footer menu opens upward because the frame ends below it, not because anyone said "top".
 */

export function SidebarPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  const [defaultFrame, setDefaultFrame] = useState<HTMLDivElement | null>(null);
  const [statesFrame, setStatesFrame] = useState<HTMLDivElement | null>(null);
  const [complexFrame, setComplexFrame] = useState<HTMLDivElement | null>(null);
  const [meetingFrame, setMeetingFrame] = useState<HTMLDivElement | null>(null);
  const [agentFrame, setAgentFrame] = useState<HTMLDivElement | null>(null);
  const [docsFrame, setDocsFrame] = useState<HTMLDivElement | null>(null);
  const [railFrame, setRailFrame] = useState<HTMLDivElement | null>(null);
  const [rightFrame, setRightFrame] = useState<HTMLDivElement | null>(null);
  const [iconFrame, setIconFrame] = useState<HTMLDivElement | null>(null);

  return (
    <div className="specimens">
      <Specimen
        className="specimen--stack specimen--wide"
        label="Default — submenus, a badge, and footer actions"
      >
        <div className="sidebar-demo sidebar-demo--app" ref={setDefaultFrame}>
          <Sidebar.Provider className="sidebar-demo__provider">
            <Sidebar collapsible="icon" portalContainer={defaultFrame}>
              <Sidebar.Header>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>
                        <span className="flex size-6 flex-none items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
                          B
                        </span>
                      </Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Buttercream</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Header>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton isActive>
                          <Sidebar.MenuIcon>{icons.home}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Dashboard</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuCollapsible defaultOpen>
                        <Sidebar.MenuCollapsibleTrigger>
                          <Sidebar.MenuIcon>{icons.chart}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Analytics</Sidebar.MenuLabel>
                          <Sidebar.MenuChevron>{icons.chevronDown}</Sidebar.MenuChevron>
                        </Sidebar.MenuCollapsibleTrigger>
                        <Sidebar.MenuCollapsibleContent>
                          <Sidebar.MenuSub>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Overview</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Dropdown>
                                <Dropdown.Trigger
                                  render={
                                    <Sidebar.MenuAction
                                      aria-label="More actions for Overview"
                                      showOnHover
                                    >
                                      {icons.moreVertical}
                                    </Sidebar.MenuAction>
                                  }
                                />
                                <Dropdown.Content container={defaultFrame}>
                                  <Dropdown.Item>{icons.folderOpen}Open</Dropdown.Item>
                                  <Dropdown.Item>{icons.copy}Duplicate</Dropdown.Item>
                                  <Dropdown.Item danger>{icons.delete}Delete</Dropdown.Item>
                                </Dropdown.Content>
                              </Dropdown>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Reports</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Dropdown>
                                <Dropdown.Trigger
                                  render={
                                    <Sidebar.MenuAction
                                      aria-label="More actions for Reports"
                                      showOnHover
                                    >
                                      {icons.moreVertical}
                                    </Sidebar.MenuAction>
                                  }
                                />
                                <Dropdown.Content container={defaultFrame}>
                                  <Dropdown.Item>{icons.folderOpen}Open</Dropdown.Item>
                                  <Dropdown.Item>{icons.copy}Duplicate</Dropdown.Item>
                                  <Dropdown.Item danger>{icons.delete}Delete</Dropdown.Item>
                                </Dropdown.Content>
                              </Dropdown>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Conversions</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Dropdown>
                                <Dropdown.Trigger
                                  render={
                                    <Sidebar.MenuAction
                                      aria-label="More actions for Conversions"
                                      showOnHover
                                    >
                                      {icons.moreVertical}
                                    </Sidebar.MenuAction>
                                  }
                                />
                                <Dropdown.Content container={defaultFrame}>
                                  <Dropdown.Item>{icons.folderOpen}Open</Dropdown.Item>
                                  <Dropdown.Item>{icons.copy}Duplicate</Dropdown.Item>
                                  <Dropdown.Item danger>{icons.delete}Delete</Dropdown.Item>
                                </Dropdown.Content>
                              </Dropdown>
                            </Sidebar.MenuSubItem>
                          </Sidebar.MenuSub>
                        </Sidebar.MenuCollapsibleContent>
                      </Sidebar.MenuCollapsible>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.list}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Tracker</Sidebar.MenuLabel>
                          <Sidebar.MenuBadge color="success">New</Sidebar.MenuBadge>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuCollapsible>
                        <Sidebar.MenuCollapsibleTrigger>
                          <Sidebar.MenuIcon>{icons.settings}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Settings</Sidebar.MenuLabel>
                          <Sidebar.MenuChevron>{icons.chevronDown}</Sidebar.MenuChevron>
                        </Sidebar.MenuCollapsibleTrigger>
                        <Sidebar.MenuCollapsibleContent>
                          <Sidebar.MenuSub>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>General</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Members</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                            </Sidebar.MenuSubItem>
                          </Sidebar.MenuSub>
                        </Sidebar.MenuCollapsibleContent>
                      </Sidebar.MenuCollapsible>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              </Sidebar.Content>
              <Sidebar.Footer>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>{icons.help}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Help &amp; Information</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>{icons.logout}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Log out</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Footer>
              <Sidebar.Rail />
            </Sidebar>
            <Sidebar.Inset>
              <div className="flex min-h-16 items-center gap-3 p-4 text-base">
                <Sidebar.Trigger />
                <span className="flex">{icons.home}</span>
                <span className="truncate font-medium">Dashboard</span>
              </div>
              <p className="p-6 text-base text-muted">
                Main content area. Collapse the panel with the trigger button or the edge rail.
              </p>
            </Sidebar.Inset>
          </Sidebar.Provider>
        </div>
      </Specimen>

      <Specimen
        className="specimen--stack specimen--wide"
        label="Mail — states, a hover action menu, badges, and loading"
      >
        <div className="sidebar-demo sidebar-demo--app" ref={setStatesFrame}>
          <Sidebar.Provider className="sidebar-demo__provider">
            <Sidebar collapsible="icon" portalContainer={statesFrame}>
              <Sidebar.Header>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>
                        <span className="flex size-6 flex-none items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
                          M
                        </span>
                      </Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Acme Mail</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Header>
              {/* Section-level, so it runs the sidebar's full width; inside Content it would
                  pick up the content padding instead. */}
              <Sidebar.Separator />
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Mailboxes</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton isActive>
                          <Sidebar.MenuIcon>{icons.mail}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Inbox</Sidebar.MenuLabel>
                          <Sidebar.MenuBadge>24</Sidebar.MenuBadge>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.file}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Drafts</Sidebar.MenuLabel>
                          <Sidebar.MenuBadge>3</Sidebar.MenuBadge>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.archive}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Archive</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Dropdown>
                          <Dropdown.Trigger
                            render={
                              <Sidebar.MenuAction aria-label="Archive options" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            }
                          />
                          <Dropdown.Content container={statesFrame}>
                            <Dropdown.Item>{icons.folderOpen}Open</Dropdown.Item>
                            <Dropdown.Item>{icons.check}Mark all read</Dropdown.Item>
                            <Dropdown.Item danger>{icons.delete}Empty archive</Dropdown.Item>
                          </Dropdown.Content>
                        </Dropdown>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton disabled>
                          <Sidebar.MenuIcon>{icons.warning}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Spam</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.tag}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>
                            Quarterly planning and strategy updates
                          </Sidebar.MenuLabel>
                          <Sidebar.MenuBadge>99+</Sidebar.MenuBadge>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Spaces</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.palette}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Design system</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuSub>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton>
                              <Sidebar.MenuLabel>Tokens</Sidebar.MenuLabel>
                            </Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton>
                              <Sidebar.MenuLabel>Components</Sidebar.MenuLabel>
                            </Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton>
                              <Sidebar.MenuLabel>Guides</Sidebar.MenuLabel>
                            </Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                        </Sidebar.MenuSub>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Shared inboxes</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuSkeleton showIcon />
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuSkeleton showIcon />
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              </Sidebar.Content>
              <Sidebar.Rail />
            </Sidebar>
            <Sidebar.Inset>
              <div className="flex min-h-16 items-center gap-3 p-4 text-base">
                <Sidebar.Trigger />
                <span className="flex">{icons.mail}</span>
                <span className="truncate font-medium">Inbox</span>
              </div>
              <p className="p-6 text-base text-muted">
                Row states in one column — an active mailbox, a disabled one, a hover action menu,
                an overflowing badge, and a section that is still loading.
              </p>
            </Sidebar.Inset>
          </Sidebar.Provider>
        </div>
      </Specimen>

      <Specimen
        className="specimen--stack specimen--wide"
        label="Complex — compact workspace with a segment header and utility footer"
      >
        <div className="sidebar-demo sidebar-demo--app" ref={setComplexFrame}>
          <Sidebar.Provider className="sidebar-demo__provider">
            {/* The density override compacts the panel alone, as the reference's does: the main
                area keeps the app's scale, and portalled popups escape the override with it. */}
            <Sidebar
              className="[--spacing-scale:0.8]"
              collapsible="icon"
              portalContainer={complexFrame}
            >
              <Sidebar.Header>
                {/* Collapsed, the rail keeps only the avatar — name, compose, and the
                    segment fold away with the state, as the reference's do. */}
                <div className="flex items-center gap-2 p-1 in-data-[state=collapsed]:justify-center in-data-[state=collapsed]:p-0">
                  <Avatar color="warning" shape="rounded" size="sm" variant="soft">
                    <Avatar.Fallback>A</Avatar.Fallback>
                  </Avatar>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium in-data-[state=collapsed]:hidden">
                    Acme Labs
                  </span>
                  <Dropdown>
                    <Dropdown.Trigger
                      render={
                        <button
                          aria-label="Compose"
                          className="flex items-center gap-0.5 rounded-md p-1 hover:bg-default in-data-[state=collapsed]:hidden [&_svg]:size-4"
                          type="button"
                        >
                          {icons.edit}
                          {icons.chevronDown}
                        </button>
                      }
                    />
                    <Dropdown.Content container={complexFrame}>
                      <Dropdown.Item>{icons.file}New page</Dropdown.Item>
                      <Dropdown.Item>{icons.calendar}New meeting</Dropdown.Item>
                      <Dropdown.Item>{icons.sparkle}New chat</Dropdown.Item>
                    </Dropdown.Content>
                  </Dropdown>
                </div>
                {/* The reference's icon-expand segment: the selected view carries its label,
                    the rest wait as icons. */}
                <Segment
                  className="in-data-[state=collapsed]:hidden"
                  defaultValue="home"
                  showLabels="selected"
                  size="sm"
                  variant="ghost"
                >
                  <Segment.Item value="home">
                    {icons.home}
                    <span>Home</span>
                  </Segment.Item>
                  <Segment.Item aria-label="Meetings" value="meetings">
                    {icons.calendar}
                    <span>Meetings</span>
                  </Segment.Item>
                  <Segment.Item aria-label="Acme AI" value="ai">
                    {icons.sparkle}
                    <span>Acme AI</span>
                  </Segment.Item>
                  <Segment.Item aria-label="Inbox" value="inbox">
                    {icons.mail}
                    <span>Inbox</span>
                  </Segment.Item>
                </Segment>
              </Sidebar.Header>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Recents</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.file}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>User Settings</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.file}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Onboarding Flow</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.file}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>API Gateway</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.file}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Theme Builder</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.file}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Navigation</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Favorites</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.book}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Tutorials</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.task}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>My Tasks</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>
                    Agents
                    <Chip className="ms-1.5" size="sm">
                      Beta
                    </Chip>
                  </Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.user}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Personal</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.add}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Add new</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Teamspaces</Sidebar.GroupLabel>
                  <Dropdown>
                    <Dropdown.Trigger
                      render={
                        <Sidebar.GroupAction aria-label="Teamspaces section actions">
                          {icons.more}
                        </Sidebar.GroupAction>
                      }
                    />
                    <Dropdown.Content container={complexFrame}>
                      <Dropdown.Item>{icons.add}New teamspace</Dropdown.Item>
                      <Dropdown.Item>{icons.users}Manage members</Dropdown.Item>
                      <Dropdown.Item>{icons.settings}Teamspace settings</Dropdown.Item>
                    </Dropdown.Content>
                  </Dropdown>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuCollapsible defaultOpen>
                        <Sidebar.MenuCollapsibleTrigger>
                          <Sidebar.MenuIcon>{icons.home}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Acme HQ</Sidebar.MenuLabel>
                          <Sidebar.MenuChevron>{icons.chevronDown}</Sidebar.MenuChevron>
                        </Sidebar.MenuCollapsibleTrigger>
                        <Sidebar.MenuCollapsibleContent>
                          <Sidebar.MenuSub>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.home}
                                <Sidebar.MenuLabel>Home</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction aria-label="More actions for Home" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.task}
                                <Sidebar.MenuLabel>My Tasks</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction
                                aria-label="More actions for My Tasks"
                                showOnHover
                              >
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.target}
                                <Sidebar.MenuLabel>Projects</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction
                                aria-label="More actions for Projects"
                                showOnHover
                              >
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.rocket}
                                <Sidebar.MenuLabel>Epics</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction aria-label="More actions for Epics" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton isActive>
                                {icons.chart}
                                <Sidebar.MenuLabel>Roadmap</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction aria-label="More actions for Roadmap" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.sparkle}
                                <Sidebar.MenuLabel>Sprint Board</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction
                                aria-label="More actions for Sprint Board"
                                showOnHover
                              >
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.code}
                                <Sidebar.MenuLabel>Eng Board</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction
                                aria-label="More actions for Eng Board"
                                showOnHover
                              >
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.palette}
                                <Sidebar.MenuLabel>Design Board</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction
                                aria-label="More actions for Design Board"
                                showOnHover
                              >
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.refresh}
                                <Sidebar.MenuLabel>Sprints</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction aria-label="More actions for Sprints" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.star}
                                <Sidebar.MenuLabel>Initiatives</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction
                                aria-label="More actions for Initiatives"
                                showOnHover
                              >
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.lock}
                                <Sidebar.MenuLabel>Vault</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction aria-label="More actions for Vault" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.archive}
                                <Sidebar.MenuLabel>Archive</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction aria-label="More actions for Archive" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.book}
                                <Sidebar.MenuLabel>Wiki</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction aria-label="More actions for Wiki" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.sparkle}
                                <Sidebar.MenuLabel>Brainstorm</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction
                                aria-label="More actions for Brainstorm"
                                showOnHover
                              >
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.users}
                                <Sidebar.MenuLabel>Standup</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction aria-label="More actions for Standup" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.rocket}
                                <Sidebar.MenuLabel>Launch v3</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction
                                aria-label="More actions for Launch v3"
                                showOnHover
                              >
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                          </Sidebar.MenuSub>
                        </Sidebar.MenuCollapsibleContent>
                      </Sidebar.MenuCollapsible>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.settings}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Engineering</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="More actions for Engineering" showOnHover>
                          {icons.moreVertical}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.chart}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Metrics</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="More actions for Metrics" showOnHover>
                          {icons.moreVertical}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.target}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Tracker</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="More actions for Tracker" showOnHover>
                          {icons.moreVertical}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.receipt}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Reports</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="More actions for Reports" showOnHover>
                          {icons.moreVertical}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Shared</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.refresh}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Sprints</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Apps</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.mail}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Acme Mail</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.calendar}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Acme Calendar</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              </Sidebar.Content>
              {/* Section-level, so it spans the sidebar's full width. */}
              <Sidebar.Separator />
              <Sidebar.Footer>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>{icons.library}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Library</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>{icons.task}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>My Tasks</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>{icons.tag}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Marketplace</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>{icons.help}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Help</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>{icons.delete}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Trash</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
                <div className="flex items-center justify-center gap-2 px-2 py-2">
                  <Button className="flex-1" variant="tertiary">
                    {icons.sparkle} New chat
                    <Kbd keys="command">N</Kbd>
                  </Button>
                  <Button aria-label="Quick note" iconOnly variant="tertiary">
                    {icons.edit}
                  </Button>
                </div>
              </Sidebar.Footer>
            </Sidebar>
            <Sidebar.Inset>
              <div className="flex min-h-16 items-center gap-3 p-4 text-base">
                <Sidebar.Trigger />
                <span className="flex">{icons.chart}</span>
                <span className="truncate font-medium">Roadmap</span>
              </div>
              <p className="p-6 text-base text-muted">
                Complex sidebar with compact spacing — recents, favorites, a beta-flagged group, and
                a collapsible teamspace in one dense column.
              </p>
            </Sidebar.Inset>
          </Sidebar.Provider>
        </div>
      </Specimen>

      <Specimen
        className="specimen--stack specimen--wide"
        label="Meeting notes — offcanvas with search, spaces, and a workspace switcher"
      >
        <div className="sidebar-demo sidebar-demo--app" ref={setMeetingFrame}>
          <Sidebar.Provider className="sidebar-demo__provider">
            <Sidebar collapsible="offcanvas" portalContainer={meetingFrame}>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupContent>
                    <Button className="mt-3 mb-2 justify-start" fullWidth variant="outline">
                      {icons.search}
                      Search
                      <Kbd className="ms-auto" keys="command" variant="light">
                        K
                      </Kbd>
                    </Button>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton isActive>
                          <Sidebar.MenuIcon>{icons.home}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Home</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.users}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Shared with me</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuCollapsible defaultOpen>
                        <Sidebar.MenuCollapsibleTrigger>
                          <Sidebar.MenuIcon>{icons.message}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Chat</Sidebar.MenuLabel>
                          <Sidebar.MenuChevron>{icons.chevronDown}</Sidebar.MenuChevron>
                        </Sidebar.MenuCollapsibleTrigger>
                        <Sidebar.MenuCollapsibleContent>
                          <Sidebar.MenuSub>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Call Prep Notes for Upco...</Sidebar.MenuLabel>
                                <span className="flex-none text-xs font-normal text-muted tabular-nums">
                                  4m
                                </span>
                              </Sidebar.MenuSubButton>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Q2 Marketing Strategy</Sidebar.MenuLabel>
                                <span className="flex-none text-xs font-normal text-muted tabular-nums">
                                  12m
                                </span>
                              </Sidebar.MenuSubButton>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Design System Migration</Sidebar.MenuLabel>
                                <span className="flex-none text-xs font-normal text-muted tabular-nums">
                                  1h
                                </span>
                              </Sidebar.MenuSubButton>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Sprint Retro Action Items</Sidebar.MenuLabel>
                                <span className="flex-none text-xs font-normal text-muted tabular-nums">
                                  3h
                                </span>
                              </Sidebar.MenuSubButton>
                            </Sidebar.MenuSubItem>
                          </Sidebar.MenuSub>
                        </Sidebar.MenuCollapsibleContent>
                      </Sidebar.MenuCollapsible>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Spaces</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuCollapsible defaultOpen>
                        <Sidebar.MenuCollapsibleTrigger>
                          <Sidebar.MenuIcon>{icons.lock}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>My notes</Sidebar.MenuLabel>
                          <Sidebar.MenuChevron>{icons.chevronDown}</Sidebar.MenuChevron>
                        </Sidebar.MenuCollapsibleTrigger>
                        <Sidebar.MenuCollapsibleContent>
                          <Sidebar.MenuSub>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                {icons.file}
                                <Sidebar.MenuLabel>Personal</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                            </Sidebar.MenuSubItem>
                          </Sidebar.MenuSub>
                        </Sidebar.MenuCollapsibleContent>
                      </Sidebar.MenuCollapsible>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="flex size-5 flex-none items-center justify-center rounded-sm bg-accent text-accent-foreground [&>svg]:size-3">
                              {icons.users}
                            </span>
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Design team</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.folderAdd}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Add folder</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              </Sidebar.Content>
              <Sidebar.Footer>
                <div className="flex items-center gap-1">
                  <Button aria-label="Notes" iconOnly size="sm" variant="ghost">
                    {icons.file}
                  </Button>
                  <Button aria-label="People" iconOnly size="sm" variant="ghost">
                    {icons.user}
                  </Button>
                  <Button aria-label="Teams" iconOnly size="sm" variant="ghost">
                    {icons.users}
                  </Button>
                </div>
                <Sidebar.Separator />
                <Dropdown>
                  <Dropdown.Trigger
                    render={
                      <button
                        className="flex w-full items-center gap-2.5 rounded-xl px-1.5 py-1.5 text-left hover:bg-default"
                        type="button"
                      >
                        <span className="flex size-6 flex-none items-center justify-center rounded-lg bg-foreground text-background [&>svg]:size-3.5">
                          {icons.code}
                        </span>
                        <span className="text-sm font-medium">Sarah</span>
                        <span className="flex text-muted [&>svg]:size-3.5">{icons.unfold}</span>
                      </button>
                    }
                  />
                  <Dropdown.Content container={meetingFrame}>
                    <div className="flex items-center gap-2.5 px-2 py-1.5">
                      <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-foreground text-background [&>svg]:size-4">
                        {icons.code}
                      </span>
                      <span className="grid gap-0.5">
                        <span className="text-sm font-medium">Sarah</span>
                        <span className="text-xs text-muted">1 member</span>
                      </span>
                    </div>
                    <div className="px-2 pb-1.5">
                      <Button className="w-full" size="sm" variant="tertiary">
                        {icons.users}
                        Invite teammates
                      </Button>
                    </div>
                    <Dropdown.Item>
                      sarah@acme.com
                      <span className="ms-auto flex [&>svg]:size-3.5">{icons.refresh}</span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <span className="flex size-5 flex-none items-center justify-center rounded bg-foreground text-background [&>svg]:size-3">
                        {icons.code}
                      </span>
                      Sarah
                      <span className="ms-auto flex [&>svg]:size-4">{icons.checkmark}</span>
                    </Dropdown.Item>
                    <Dropdown.Item>{icons.add}Add workspace</Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item>{icons.grid}Manage templates</Dropdown.Item>
                    <Dropdown.Item>{icons.phone}Get app for iPhone</Dropdown.Item>
                    <Dropdown.Item>{icons.help}Help Center</Dropdown.Item>
                    <Dropdown.Item>
                      {icons.settings}
                      Settings
                      <Kbd className="ms-auto" keys="command" variant="light">
                        ,
                      </Kbd>
                    </Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              </Sidebar.Footer>
            </Sidebar>
            <Sidebar.Inset>
              <div className="flex min-h-16 items-center gap-3 p-4 text-base">
                <Sidebar.Trigger />
                <span className="flex">{icons.home}</span>
                <span className="truncate font-medium">Home</span>
              </div>
              <p className="p-6 text-base text-muted">
                Meeting notes sidebar with search, spaces, and a workspace switcher. Offcanvas mode
                collapses the panel fully away, so the trigger is the only way back in.
              </p>
            </Sidebar.Inset>
          </Sidebar.Provider>
        </div>
      </Specimen>

      <Specimen
        className="specimen--stack specimen--wide"
        label="Agent workspace — tasks grouped by repository, status icons, and a profile menu"
      >
        <div className="sidebar-demo sidebar-demo--app" ref={setAgentFrame}>
          <Sidebar.Provider className="sidebar-demo__provider">
            <Sidebar
              className="[--spacing-scale:0.8]"
              collapsible="offcanvas"
              portalContainer={agentFrame}
            >
              <Sidebar.Header>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>{icons.terminal}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>New Agent</Sidebar.MenuLabel>
                      <Kbd className="ms-auto" keys="command" variant="light">
                        N
                      </Kbd>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton isActive>
                      <Sidebar.MenuIcon>{icons.grid}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Marketplace</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Header>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>acme/platform</Sidebar.GroupLabel>
                  <Sidebar.GroupAction aria-label="New task in acme/platform">
                    {icons.add}
                  </Sidebar.GroupAction>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="flex text-accent">{icons.workflow}</span>
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>User naming preference refactor</Sidebar.MenuLabel>
                          <Sidebar.MenuChip>now</Sidebar.MenuChip>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="size-1.5 rounded-full bg-muted" />
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Agents sidebar keyboard experience</Sidebar.MenuLabel>
                          <Sidebar.MenuChip>12m</Sidebar.MenuChip>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="size-1.5 rounded-full bg-muted" />
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Glass sidebar group by none option</Sidebar.MenuLabel>
                          <Sidebar.MenuChip>33m</Sidebar.MenuChip>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="flex text-purple-500">{icons.bot}</span>
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Cloud agent error message retry</Sidebar.MenuLabel>
                          <Sidebar.MenuChip>1h</Sidebar.MenuChip>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="flex text-accent">{icons.workflow}</span>
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>UseApplicationProperty migration</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="size-1.5 rounded-full bg-muted" />
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Glass test timing stabilization</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="size-1.5 rounded-full bg-muted" />
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Flaky tests root cause</Sidebar.MenuLabel>
                          <Sidebar.MenuChip>10h</Sidebar.MenuChip>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>acme/landing</Sidebar.GroupLabel>
                  <Sidebar.GroupAction aria-label="New task in acme/landing">
                    {icons.add}
                  </Sidebar.GroupAction>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="flex text-purple-500">{icons.bot}</span>
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Marketing pages responsiveness</Sidebar.MenuLabel>
                          <Sidebar.MenuChip>2h</Sidebar.MenuChip>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="flex text-purple-500">{icons.bot}</span>
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>
                            Git &amp; checkpoints automatic commits
                          </Sidebar.MenuLabel>
                          <Sidebar.MenuChip>3h</Sidebar.MenuChip>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="size-1.5 rounded-full bg-muted" />
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Local server update process</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="size-1.5 rounded-full bg-muted" />
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>
                            Performance audit for redesigned pages
                          </Sidebar.MenuLabel>
                          <Sidebar.MenuChip>1d</Sidebar.MenuChip>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="size-1.5 rounded-full bg-muted" />
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Localized page SEO</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>acme/backoffice</Sidebar.GroupLabel>
                  <Sidebar.GroupAction aria-label="New task in acme/backoffice">
                    {icons.add}
                  </Sidebar.GroupAction>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="flex text-accent">{icons.workflow}</span>
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>
                            New page for natural language filters
                          </Sidebar.MenuLabel>
                          <Sidebar.MenuChip>5h</Sidebar.MenuChip>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="size-1.5 rounded-full bg-muted" />
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Background worker retry handling</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="size-1.5 rounded-full bg-muted" />
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>
                            Admin-only metric strip for incoming orders
                          </Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>tools/plugins</Sidebar.GroupLabel>
                  <Sidebar.GroupAction aria-label="New task in tools/plugins">
                    {icons.add}
                  </Sidebar.GroupAction>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="size-1.5 rounded-full bg-muted" />
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Plugin schema verification</Sidebar.MenuLabel>
                          <Sidebar.MenuChip>2d</Sidebar.MenuChip>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>compass</Sidebar.GroupLabel>
                  <Sidebar.GroupAction aria-label="New task in compass">
                    {icons.add}
                  </Sidebar.GroupAction>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="size-1.5 rounded-full bg-muted" />
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Light mode settings</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>
                            <span className="size-1.5 rounded-full bg-muted" />
                          </Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>MCP server setup</Sidebar.MenuLabel>
                          <Sidebar.MenuChip>4h</Sidebar.MenuChip>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Archive task" showOnHover>
                          {icons.archive}
                        </Sidebar.MenuAction>
                        <Sidebar.MenuAction aria-label="Delete task" showOnHover>
                          {icons.delete}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.more}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>More</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.externalLink}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Open Workspace</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              </Sidebar.Content>
              <Sidebar.Footer>
                <Dropdown>
                  <Dropdown.Trigger
                    render={
                      <button
                        className="flex w-full items-center gap-2 rounded-xl p-1.5 text-left hover:bg-default"
                        type="button"
                      >
                        <Avatar color="accent" shape="circle" size="sm" variant="soft">
                          <Avatar.Fallback>AC</Avatar.Fallback>
                        </Avatar>
                        <span className="grid min-w-0 gap-0.5">
                          <span className="truncate text-sm font-medium leading-none">
                            Alex Chen
                          </span>
                          <span className="truncate text-xs leading-none text-muted">
                            Acme Labs
                          </span>
                        </span>
                        <span className="ms-auto flex size-6 items-center justify-center text-muted [&>svg]:size-4">
                          {icons.settings}
                        </span>
                      </button>
                    }
                  />
                  <Dropdown.Content container={agentFrame}>
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <Avatar color="accent" shape="circle" size="sm" variant="soft">
                        <Avatar.Fallback>AC</Avatar.Fallback>
                      </Avatar>
                      <span className="grid gap-0.5">
                        <span className="text-sm font-medium">Alex Chen</span>
                        <span className="text-xs text-muted">alex@acme.com</span>
                      </span>
                    </div>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>
                      Settings
                      <span className="ms-auto flex text-muted [&>svg]:size-3.5">
                        {icons.settings}
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      Create Team
                      <span className="ms-auto flex text-muted [&>svg]:size-3.5">
                        {icons.users}
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item danger>
                      Log Out
                      <span className="ms-auto flex [&>svg]:size-3.5">{icons.logout}</span>
                    </Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              </Sidebar.Footer>
            </Sidebar>
            <Sidebar.Inset>
              <div className="flex min-h-16 items-center gap-3 p-4 text-base">
                <Sidebar.Trigger />
                <Breadcrumbs>
                  <Breadcrumbs.Item current href="#acme-platform">
                    {icons.code}
                    acme/platform
                  </Breadcrumbs.Item>
                </Breadcrumbs>
              </div>
              <p className="p-6 text-base text-muted">
                Workspace sidebar with agent tasks grouped by repository. Mirrors the pattern used
                by AI coding tools.
              </p>
            </Sidebar.Inset>
          </Sidebar.Provider>
        </div>
      </Specimen>

      <Specimen
        className="specimen--stack specimen--wide"
        label="Inset variant — card content area with a breadcrumb bar"
      >
        <div className="sidebar-demo sidebar-demo--app">
          <Sidebar.Provider className="sidebar-demo__provider">
            <Sidebar collapsible="offcanvas" variant="inset">
              <Sidebar.Header>
                <div className="flex items-center gap-2 overflow-hidden p-1">
                  <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background">
                    {icons.scan}
                  </span>
                  <span className="grid min-w-0 flex-1 gap-0.5 text-left">
                    <span className="truncate text-sm font-semibold">Acme Inc.</span>
                    <span className="truncate text-xs font-normal text-muted">Enterprise</span>
                  </span>
                </div>
              </Sidebar.Header>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.code}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Playground</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.box}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Models</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.book}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Documentation</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.settings}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Settings</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Separator />
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.list}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Design Engineering</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.globe}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Sales &amp; Marketing</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.home}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Travel</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              </Sidebar.Content>
            </Sidebar>
            <Sidebar.Inset>
              <div className="flex min-h-16 items-center gap-3 p-4 text-base">
                <Sidebar.Trigger />
                <Breadcrumbs>
                  <Breadcrumbs.Item href="#build">
                    {icons.scan}
                    Build Your Application
                  </Breadcrumbs.Item>
                  <Breadcrumbs.Item current href="#data-fetching">
                    Data Fetching
                  </Breadcrumbs.Item>
                </Breadcrumbs>
              </div>
              <div className="grid grid-cols-3 gap-4 px-4">
                <div className="h-18 rounded-lg border border-border" />
                <div className="h-18 rounded-lg border border-border" />
                <div className="h-18 rounded-lg border border-border" />
              </div>
              <div className="m-4 flex-1 rounded-lg border border-border" />
            </Sidebar.Inset>
          </Sidebar.Provider>
        </div>
      </Specimen>

      <Specimen
        className="specimen--stack specimen--wide"
        label="Collapsible groups — documentation tree with a current-page menu"
      >
        <div className="sidebar-demo sidebar-demo--app" ref={setDocsFrame}>
          <Sidebar.Provider className="sidebar-demo__provider">
            <Sidebar collapsible="offcanvas" portalContainer={docsFrame}>
              <Sidebar.Header>
                <div className="flex items-center gap-2 overflow-hidden p-1">
                  <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background">
                    D
                  </span>
                  <span className="grid min-w-0 flex-1 gap-0.5 text-left">
                    <span className="truncate text-sm font-semibold">Documentation</span>
                    <span className="truncate text-xs font-normal text-muted">v1.0.0</span>
                  </span>
                </div>
              </Sidebar.Header>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuCollapsible>
                        <Sidebar.MenuCollapsibleTrigger>
                          <Sidebar.MenuLabel>Getting Started</Sidebar.MenuLabel>
                          <Sidebar.MenuChevron>{icons.chevronDown}</Sidebar.MenuChevron>
                        </Sidebar.MenuCollapsibleTrigger>
                        <Sidebar.MenuCollapsibleContent>
                          <Sidebar.MenuSub>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Installation</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Project Structure</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                            </Sidebar.MenuSubItem>
                          </Sidebar.MenuSub>
                        </Sidebar.MenuCollapsibleContent>
                      </Sidebar.MenuCollapsible>
                      <Sidebar.MenuCollapsible defaultOpen>
                        <Sidebar.MenuCollapsibleTrigger>
                          <Sidebar.MenuLabel>Build Your Application</Sidebar.MenuLabel>
                          <Sidebar.MenuChevron>{icons.chevronDown}</Sidebar.MenuChevron>
                        </Sidebar.MenuCollapsibleTrigger>
                        <Sidebar.MenuCollapsibleContent>
                          <Sidebar.MenuSub>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Routing</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction aria-label="More actions for Routing" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton isActive>
                                <Sidebar.MenuLabel>Data Fetching</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Dropdown>
                                <Dropdown.Trigger
                                  render={
                                    <Sidebar.MenuAction
                                      aria-label="More actions for Data Fetching"
                                      showOnHover
                                    >
                                      {icons.moreVertical}
                                    </Sidebar.MenuAction>
                                  }
                                />
                                <Dropdown.Content container={docsFrame}>
                                  <Dropdown.Item>{icons.copy}Copy link</Dropdown.Item>
                                  <Dropdown.Item>{icons.code}Open in playground</Dropdown.Item>
                                  <Dropdown.Separator />
                                  <Dropdown.Item>{icons.close}Hide page</Dropdown.Item>
                                </Dropdown.Content>
                              </Dropdown>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Rendering</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction
                                aria-label="More actions for Rendering"
                                showOnHover
                              >
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Caching</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction aria-label="More actions for Caching" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Styling</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction aria-label="More actions for Styling" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Testing</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Sidebar.MenuAction aria-label="More actions for Testing" showOnHover>
                                {icons.moreVertical}
                              </Sidebar.MenuAction>
                            </Sidebar.MenuSubItem>
                          </Sidebar.MenuSub>
                        </Sidebar.MenuCollapsibleContent>
                      </Sidebar.MenuCollapsible>
                      <Sidebar.MenuCollapsible>
                        <Sidebar.MenuCollapsibleTrigger>
                          <Sidebar.MenuLabel>API Reference</Sidebar.MenuLabel>
                          <Sidebar.MenuChevron>{icons.chevronDown}</Sidebar.MenuChevron>
                        </Sidebar.MenuCollapsibleTrigger>
                        <Sidebar.MenuCollapsibleContent>
                          <Sidebar.MenuSub>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Components</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Functions</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                            </Sidebar.MenuSubItem>
                          </Sidebar.MenuSub>
                        </Sidebar.MenuCollapsibleContent>
                      </Sidebar.MenuCollapsible>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              </Sidebar.Content>
            </Sidebar>
            <Sidebar.Inset>
              <div className="flex min-h-16 items-center gap-3 p-4 text-base">
                <Sidebar.Trigger />
                <Breadcrumbs>
                  <Breadcrumbs.Item href="#build">Build Your Application</Breadcrumbs.Item>
                  <Breadcrumbs.Item current href="#data-fetching">
                    Data Fetching
                  </Breadcrumbs.Item>
                </Breadcrumbs>
              </div>
              <p className="p-6 text-base text-muted">
                Documentation content area. Toggle the sidebar with the trigger button.
              </p>
            </Sidebar.Inset>
          </Sidebar.Provider>
        </div>
      </Specimen>

      <Specimen
        className="specimen--stack specimen--wide"
        label="Collapsible icon rail — collapse with the trigger button or the edge rail"
      >
        <div className="sidebar-demo sidebar-demo--app" ref={setRailFrame}>
          <Sidebar.Provider className="sidebar-demo__provider">
            <Sidebar collapsible="icon" portalContainer={railFrame}>
              <Sidebar.Header>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>
                        <span className="flex size-6 flex-none items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
                          B
                        </span>
                      </Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Buttercream</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Header>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton isActive>
                          <Sidebar.MenuIcon>{icons.home}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Dashboard</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.receipt}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Orders</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.list}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Tracker</Sidebar.MenuLabel>
                          <Sidebar.MenuBadge color="success">New</Sidebar.MenuBadge>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.chart}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Analytics</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.users}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Team</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.settings}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Settings</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              </Sidebar.Content>
              <Sidebar.Rail />
            </Sidebar>
            <Sidebar.Inset>
              <div className="flex min-h-16 items-center gap-3 p-4 text-base">
                <Sidebar.Trigger />
                <span className="flex">{icons.home}</span>
                <span className="truncate font-medium">Dashboard</span>
              </div>
              <p className="p-6 text-base text-muted">
                Click the rail edge or the trigger button to collapse. The collapsed rail carries
                the labels as tooltips.
              </p>
            </Sidebar.Inset>
          </Sidebar.Provider>
        </div>
      </Specimen>

      <Specimen
        className="specimen--stack specimen--wide"
        label="Right side — the panel and its gap swap edges"
      >
        <div className="sidebar-demo sidebar-demo--app" ref={setRightFrame}>
          <Sidebar.Provider className="sidebar-demo__provider">
            <Sidebar collapsible="icon" portalContainer={rightFrame} side="right">
              <Sidebar.Header>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>
                        <span className="flex size-6 flex-none items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
                          B
                        </span>
                      </Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Buttercream</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Header>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton isActive>
                          <Sidebar.MenuIcon>{icons.home}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Dashboard</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuCollapsible defaultOpen>
                        <Sidebar.MenuCollapsibleTrigger>
                          <Sidebar.MenuIcon>{icons.chart}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Analytics</Sidebar.MenuLabel>
                          <Sidebar.MenuChevron>{icons.chevronDown}</Sidebar.MenuChevron>
                        </Sidebar.MenuCollapsibleTrigger>
                        <Sidebar.MenuCollapsibleContent>
                          <Sidebar.MenuSub>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Overview</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Dropdown>
                                <Dropdown.Trigger
                                  render={
                                    <Sidebar.MenuAction
                                      aria-label="More actions for Overview"
                                      showOnHover
                                    >
                                      {icons.moreVertical}
                                    </Sidebar.MenuAction>
                                  }
                                />
                                <Dropdown.Content container={rightFrame}>
                                  <Dropdown.Item>{icons.folderOpen}Open</Dropdown.Item>
                                  <Dropdown.Item>{icons.copy}Duplicate</Dropdown.Item>
                                  <Dropdown.Item danger>{icons.delete}Delete</Dropdown.Item>
                                </Dropdown.Content>
                              </Dropdown>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Reports</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Dropdown>
                                <Dropdown.Trigger
                                  render={
                                    <Sidebar.MenuAction
                                      aria-label="More actions for Reports"
                                      showOnHover
                                    >
                                      {icons.moreVertical}
                                    </Sidebar.MenuAction>
                                  }
                                />
                                <Dropdown.Content container={rightFrame}>
                                  <Dropdown.Item>{icons.folderOpen}Open</Dropdown.Item>
                                  <Dropdown.Item>{icons.copy}Duplicate</Dropdown.Item>
                                  <Dropdown.Item danger>{icons.delete}Delete</Dropdown.Item>
                                </Dropdown.Content>
                              </Dropdown>
                            </Sidebar.MenuSubItem>
                            <Sidebar.MenuSubItem>
                              <Sidebar.MenuSubButton>
                                <Sidebar.MenuLabel>Conversions</Sidebar.MenuLabel>
                              </Sidebar.MenuSubButton>
                              <Dropdown>
                                <Dropdown.Trigger
                                  render={
                                    <Sidebar.MenuAction
                                      aria-label="More actions for Conversions"
                                      showOnHover
                                    >
                                      {icons.moreVertical}
                                    </Sidebar.MenuAction>
                                  }
                                />
                                <Dropdown.Content container={rightFrame}>
                                  <Dropdown.Item>{icons.folderOpen}Open</Dropdown.Item>
                                  <Dropdown.Item>{icons.copy}Duplicate</Dropdown.Item>
                                  <Dropdown.Item danger>{icons.delete}Delete</Dropdown.Item>
                                </Dropdown.Content>
                              </Dropdown>
                            </Sidebar.MenuSubItem>
                          </Sidebar.MenuSub>
                        </Sidebar.MenuCollapsibleContent>
                      </Sidebar.MenuCollapsible>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.list}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Tracker</Sidebar.MenuLabel>
                          <Sidebar.MenuBadge color="success">New</Sidebar.MenuBadge>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.settings}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Settings</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              </Sidebar.Content>
              {/* Section-level, so it spans the sidebar's full width. */}
              <Sidebar.Separator />
              <Sidebar.Footer>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>{icons.help}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Help &amp; Information</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>{icons.logout}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Log out</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Footer>
              <Sidebar.Rail />
            </Sidebar>
            <Sidebar.Inset>
              <div className="flex min-h-16 items-center gap-3 p-4 text-base">
                <span className="flex">{icons.home}</span>
                <span className="truncate font-medium">Dashboard</span>
                <Sidebar.Trigger className="ms-auto" />
              </div>
              <p className="p-6 text-base text-muted">
                Main content area with the sidebar attached to the right.
              </p>
            </Sidebar.Inset>
          </Sidebar.Provider>
        </div>
      </Specimen>

      <Specimen
        className="specimen--stack specimen--wide"
        label="Icon only — permanently collapsed, tooltips carry the labels"
      >
        <div className="sidebar-demo sidebar-demo--app" ref={setIconFrame}>
          <Sidebar.Provider className="sidebar-demo__provider" defaultOpen={false}>
            <Sidebar collapsible="icon" portalContainer={iconFrame}>
              <Sidebar.Header className="items-center">
                <Avatar color="accent" shape="circle" size="sm" variant="soft">
                  <Avatar.Fallback>KM</Avatar.Fallback>
                </Avatar>
              </Sidebar.Header>
              <Sidebar.Content className="justify-center">
                <Sidebar.Group>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.home}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Dashboard</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.receipt}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Orders</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.list}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Tracker</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.chart}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Analytics</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.users}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Team</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.settings}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Settings</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              </Sidebar.Content>
              <Sidebar.Footer>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>{icons.help}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Help &amp; Support</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Footer>
            </Sidebar>
            <Sidebar.Inset>
              <div className="p-6">
                <p className="text-base font-medium">Dashboard</p>
                <p className="mt-1 text-base text-muted">
                  Icon-only sidebar that is always collapsed.
                </p>
              </div>
            </Sidebar.Inset>
          </Sidebar.Provider>
        </div>
      </Specimen>
    </div>
  );
}
