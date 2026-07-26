import type { DesignSystem } from "@buttercream/theme-core";
import { HugeiconsIcon } from "@hugeicons/react";
import SidebarRight01Icon from "@hugeicons-pro/core-stroke-rounded/SidebarRight01Icon";
import { useState } from "react";
import { Button, classes, Segmented } from "../ui/index.ts";
import { CodeDialog } from "./code-dialog.tsx";
import { ImportDialog } from "./import-dialog.tsx";
import {
  ColorControl,
  ControlRow,
  ControlSection,
  RangeControl,
  TextControl,
} from "./theme-controls.tsx";
import { ThemeIconControls } from "./theme-icon-controls.tsx";
import type { SaveState } from "./use-design-system-draft.ts";

const TABS = ["Style", "Variables", "Agent"] as const;
type Tab = (typeof TABS)[number];

interface ThemeEditorPanelProps {
  designSystem: DesignSystem;
  designSystemId: string;
  onClose: () => void;
  onImport: (designSystem: DesignSystem) => void;
  onUpdate: (mutate: (designSystem: DesignSystem) => void) => void;
  open: boolean;
  saveState: SaveState;
  showSaveState: boolean;
}

export function ThemeEditorPanel({
  designSystem,
  designSystemId,
  onClose,
  onImport,
  onUpdate,
  open,
  saveState,
  showSaveState,
}: ThemeEditorPanelProps) {
  const [tab, setTab] = useState<Tab>("Style");

  return (
    <aside
      aria-label="Theme controls"
      className={classes(
        "z-5 flex min-h-0 w-69 flex-col overflow-hidden bg-sunken transition-transform duration-150 ease-out",
        "max-[720px]:fixed max-[720px]:inset-y-0 max-[720px]:right-0 max-[720px]:w-[min(17.25rem,calc(100vw-1.5rem))] max-[720px]:shadow-2xl max-[720px]:shadow-ink/15 dark:max-[720px]:shadow-none",
        open ? "translate-x-0" : "translate-x-full",
      )}
    >
      <header className="flex h-13 flex-none items-center justify-between gap-2 px-3">
        <Button
          aria-label="Close theme controls"
          iconOnly
          onClick={onClose}
          size="md"
          variant="ghost"
        >
          <HugeiconsIcon aria-hidden="true" icon={SidebarRight01Icon} size={16} strokeWidth={2} />
        </Button>
        <div className="flex min-w-0 items-center justify-end gap-1.5">
          <ImportDialog current={designSystem} onImport={onImport} />
          {showSaveState ? <SaveStatus state={saveState} /> : null}
          <CodeDialog designSystem={designSystem} designSystemId={designSystemId} />
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-6 scrollbar-none">
        <Segmented label="Editor mode" onChange={setTab} options={TABS} value={tab} />

        <div className="mt-3">
          <ControlRow>
            <span className="truncate font-medium text-fg">Theme</span>
            <span className="shrink-0 font-mono text-xs text-muted">Custom</span>
          </ControlRow>
        </div>

        {showSaveState ? (
          <ControlSection title="General">
            <TextControl
              label="Name"
              maxLength={80}
              onChange={(name) =>
                onUpdate((next) => {
                  next.identity.name = name;
                })
              }
              value={designSystem.identity.name}
            />
          </ControlSection>
        ) : null}

        <ControlSection title="Color">
          <ColorControl
            label="Accent"
            onChange={(value) =>
              onUpdate((next) => {
                updateBothThemes(next, (theme) => {
                  theme.colors.accent = value;
                });
              })
            }
            value={designSystem.theme.light.colors.accent}
          />
        </ControlSection>

        <ControlSection title="Density">
          <RangeControl
            label="Spacing"
            max={1.3}
            min={0.7}
            onChange={(value) =>
              onUpdate((next) => {
                updateBothThemes(next, (theme) => {
                  theme.density.spacing = value;
                });
              })
            }
            step={0.05}
            value={designSystem.theme.light.density.spacing}
          />
          <RangeControl
            label="Font size"
            max={1.25}
            min={0.8}
            onChange={(value) =>
              onUpdate((next) => {
                updateBothThemes(next, (theme) => {
                  theme.density.fontSize = value;
                });
              })
            }
            step={0.05}
            value={designSystem.theme.light.density.fontSize}
          />
        </ControlSection>
        <ThemeIconControls
          icons={designSystem.icons}
          onChange={(icons) =>
            onUpdate((next) => {
              next.icons = icons;
            })
          }
        />

        <ControlSection title="Corners">
          <RangeControl
            label="General radius"
            max={24}
            min={0}
            onChange={(value) =>
              onUpdate((next) => {
                updateBothThemes(next, (theme) => {
                  theme.corners.radius = `${value}px`;
                });
              })
            }
            step={1}
            value={Number.parseFloat(designSystem.theme.light.corners.radius)}
          />
        </ControlSection>

        <ControlSection title="Effects">
          <RangeControl
            label="Hard shadow"
            max={8}
            min={0}
            onChange={(value) =>
              onUpdate((next) => {
                updateBothThemes(next, (theme) => {
                  theme.effects.hardShadowDepth = `${value}px`;
                });
              })
            }
            step={1}
            value={Number.parseFloat(designSystem.theme.light.effects.hardShadowDepth)}
          />
        </ControlSection>
      </div>
    </aside>
  );
}

function SaveStatus({ state }: { state: SaveState }) {
  if (state === "clean") {
    return null;
  }

  const labels: Record<SaveState, string> = {
    clean: "Saved",
    conflict: "Conflict",
    dirty: "Unsaved",
    error: "Not saved",
    saving: "Saving…",
  };

  return (
    <span
      className={classes(
        "min-w-0 truncate px-1 font-mono text-xs",
        state === "conflict" || state === "error" ? "text-berry" : "text-muted",
      )}
      role="status"
    >
      {labels[state]}
    </span>
  );
}

function updateBothThemes(
  designSystem: DesignSystem,
  mutate: (theme: DesignSystem["theme"]["light"]) => void,
) {
  mutate(designSystem.theme.light);
  mutate(designSystem.theme.dark);
}
