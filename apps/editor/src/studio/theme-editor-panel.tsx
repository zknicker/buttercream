import type { DesignSystem } from "@buttercream/theme-core";
import { HugeiconsIcon } from "@hugeicons/react";
import SidebarRight01Icon from "@hugeicons-pro/core-stroke-rounded/SidebarRight01Icon";
import { CodeDialog } from "./code-dialog.tsx";
import { ImportDialog } from "./import-dialog.tsx";
import { ColorControl, ControlSection, RangeControl } from "./theme-controls.tsx";
import type { SaveState } from "./use-design-system-draft.ts";

interface ThemeEditorPanelProps {
  designSystem: DesignSystem;
  designSystemId: string;
  onClose: () => void;
  onImport: (designSystem: DesignSystem) => void;
  onUpdate: (mutate: (designSystem: DesignSystem) => void) => void;
  saveState: SaveState;
  showSaveState: boolean;
}

export function ThemeEditorPanel({
  designSystem,
  designSystemId,
  onClose,
  onImport,
  onUpdate,
  saveState,
  showSaveState,
}: ThemeEditorPanelProps) {
  return (
    <aside className="studio-controls" aria-label="Theme controls">
      <header className="studio-controls__header">
        <button
          aria-label="Close theme controls"
          className="studio-icon-button"
          onClick={onClose}
          type="button"
        >
          <HugeiconsIcon aria-hidden="true" icon={SidebarRight01Icon} size={16} strokeWidth={2} />
        </button>
        <div className="studio-controls__actions">
          <ImportDialog current={designSystem} onImport={onImport} />
          {showSaveState ? <SaveStatus state={saveState} /> : null}
          <CodeDialog designSystem={designSystem} designSystemId={designSystemId} />
        </div>
      </header>
      <div className="studio-controls__body">
        <div className="studio-segmented" role="tablist">
          <button aria-selected="true" role="tab" type="button">
            Style
          </button>
          <button aria-selected="false" role="tab" type="button">
            Variables
          </button>
          <button aria-selected="false" role="tab" type="button">
            Agent
          </button>
        </div>
        <div className="studio-control-row">
          <strong>Theme</strong>
          <span>Custom</span>
        </div>
        {showSaveState ? (
          <ControlSection title="General">
            <label className="studio-control-row">
              <span>Name</span>
              <input
                aria-label="Design system name"
                className="studio-control-input"
                maxLength={80}
                onChange={(event) => {
                  const name = event.currentTarget.value;
                  onUpdate((next) => {
                    next.identity.name = name;
                  });
                }}
                value={designSystem.identity.name}
              />
            </label>
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
    <span className={`studio-autosave-state studio-autosave-state--${state}`} role="status">
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
