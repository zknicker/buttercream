import { Avatar, Dropdown, Sidebar } from "@buttercream/react";
import type { ReactElement } from "react";
import type { PreviewIconElements } from "./preview-icons.ts";
import { Specimen } from "./preview-specimen.tsx";
import { usePreviewSurface } from "./preview-surface.tsx";

/*
 * Sidebar specimens, mirroring the reference's demo set. The static form carries the anatomy
 * and composition demos; the machinery demos — icon rail, offcanvas, floating, inset — run the
 * real collapsing panel inside a bounded frame, which works because the frame establishes size
 * containment and so becomes the containing block the fixed panel resolves against.
 */

export function SidebarPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  const surface = usePreviewSurface();

  return (
    <div className="specimens">
      <Specimen
        className="specimen--stack"
        label="Header, groups, badge, sub-menu, skeleton, footer"
      >
        <div className="sidebar-demo">
          <Sidebar.Provider className="sidebar-demo__provider">
            <Sidebar collapsible="none">
              <Sidebar.Header>
                <div className="sidebar-demo__identity">
                  <strong>Acme Inc.</strong>
                  <span>Workspace</span>
                </div>
              </Sidebar.Header>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton isActive>
                          <Sidebar.MenuIcon>{icons.mail}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Inbox</Sidebar.MenuLabel>
                          <Sidebar.MenuBadge>12</Sidebar.MenuBadge>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.search}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Search</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.users}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Members</Sidebar.MenuLabel>
                          <Sidebar.MenuBadge>3</Sidebar.MenuBadge>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuSub>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton isActive>
                              <span>Invitations</span>
                            </Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton>
                              <span>Roles</span>
                            </Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                        </Sidebar.MenuSub>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Separator />
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Loading</Sidebar.GroupLabel>
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
              <Sidebar.Footer>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <Sidebar.MenuIcon>{icons.settings}</Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>Settings</Sidebar.MenuLabel>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Footer>
            </Sidebar>
          </Sidebar.Provider>
        </div>
      </Specimen>

      <Specimen className="specimen--stack" label="States, truncation, and doc-style groups">
        <div className="sidebar-demo">
          <Sidebar.Provider className="sidebar-demo__provider">
            <Sidebar collapsible="none">
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>States</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton isActive>
                          <Sidebar.MenuIcon>{icons.check}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Active</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton disabled>
                          <Sidebar.MenuIcon>{icons.close}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Disabled</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.more}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>With action</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuAction aria-label="Item options">
                          {icons.more}
                        </Sidebar.MenuAction>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.globe}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>
                            A very long navigation label that truncates
                          </Sidebar.MenuLabel>
                          <Sidebar.MenuBadge>99+</Sidebar.MenuBadge>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Separator />
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Documentation</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuLabel>Getting started</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuSub>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton>
                              <span>Installation</span>
                            </Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton isActive>
                              <span>Theming</span>
                            </Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton>
                              <span>Exports</span>
                            </Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                        </Sidebar.MenuSub>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              </Sidebar.Content>
            </Sidebar>
          </Sidebar.Provider>
        </div>
      </Specimen>

      <MachineSpecimen
        collapsible="icon"
        icons={icons}
        label="Collapsible icon rail — toggle with the button or the edge rail"
        surface={surface}
      />
      <MachineSpecimen
        collapsible="offcanvas"
        icons={icons}
        label="Offcanvas — collapses fully away"
        surface={surface}
      />
      <MachineSpecimen
        collapsible="icon"
        icons={icons}
        label="Floating variant"
        surface={surface}
        variant="floating"
      />
      <MachineSpecimen
        collapsible="icon"
        icons={icons}
        label="Inset variant"
        surface={surface}
        variant="inset"
      />

      <Specimen className="specimen--stack" label="Footer user menu">
        <div className="sidebar-demo">
          <Sidebar.Provider className="sidebar-demo__provider">
            <Sidebar collapsible="none">
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Teamspaces</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.users}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Design</Sidebar.MenuLabel>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Sidebar.MenuIcon>{icons.globe}</Sidebar.MenuIcon>
                          <Sidebar.MenuLabel>Marketing</Sidebar.MenuLabel>
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
                      <Sidebar.MenuButton>
                        <Avatar shape="circle" size="sm">
                          <Avatar.Fallback>DH</Avatar.Fallback>
                        </Avatar>
                        <Sidebar.MenuLabel>Darnell Howe</Sidebar.MenuLabel>
                        {icons.chevronDown}
                      </Sidebar.MenuButton>
                    }
                  />
                  <Dropdown.Content container={surface}>
                    <Dropdown.Item>{icons.settings}Account settings</Dropdown.Item>
                    <Dropdown.Item>{icons.users}Switch workspace</Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item danger>{icons.close}Sign out</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              </Sidebar.Footer>
            </Sidebar>
          </Sidebar.Provider>
        </div>
      </Specimen>
    </div>
  );
}

/*
 * The real collapsing panel in a frame. The trigger, the rail, and mod+B all drive it; the
 * tooltip on each row appears only from the collapsed icon rail.
 */
function MachineSpecimen({
  collapsible,
  icons,
  label,
  surface,
  variant,
}: {
  collapsible: "icon" | "offcanvas";
  icons: PreviewIconElements;
  label: string;
  surface: HTMLElement | null;
  variant?: "floating" | "inset";
}): ReactElement {
  return (
    <Specimen className="specimen--stack" label={label}>
      <div className="sidebar-demo sidebar-demo--app">
        <Sidebar.Provider className="sidebar-demo__provider">
          <Sidebar
            collapsible={collapsible}
            portalContainer={surface}
            {...(variant === undefined ? {} : { variant })}
          >
            <Sidebar.Content>
              <Sidebar.Group>
                <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
                <Sidebar.GroupContent>
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton
                        isActive
                        tooltip={{ children: "Inbox", container: surface }}
                      >
                        <Sidebar.MenuIcon>{icons.mail}</Sidebar.MenuIcon>
                        <Sidebar.MenuLabel>Inbox</Sidebar.MenuLabel>
                        <Sidebar.MenuBadge>12</Sidebar.MenuBadge>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton tooltip={{ children: "Search", container: surface }}>
                        <Sidebar.MenuIcon>{icons.search}</Sidebar.MenuIcon>
                        <Sidebar.MenuLabel>Search</Sidebar.MenuLabel>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton tooltip={{ children: "Members", container: surface }}>
                        <Sidebar.MenuIcon>{icons.users}</Sidebar.MenuIcon>
                        <Sidebar.MenuLabel>Members</Sidebar.MenuLabel>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.GroupContent>
              </Sidebar.Group>
            </Sidebar.Content>
            <Sidebar.Rail />
          </Sidebar>
          <Sidebar.Inset>
            <div className="sidebar-demo__bar">
              <Sidebar.Trigger />
              <strong>Dashboard</strong>
            </div>
            <p className="sidebar-demo__body">
              The content area yields and reclaims space as the panel collapses.
            </p>
          </Sidebar.Inset>
        </Sidebar.Provider>
      </div>
    </Specimen>
  );
}
