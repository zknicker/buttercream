import {
  applyThemePreset,
  type DesignSystem,
  getThemePreset,
  type ThemePresetId,
  themePresets,
} from "@buttercream/theme-core";
import { HugeiconsIcon } from "@hugeicons/react";
import SidebarRight01Icon from "@hugeicons-pro/core-stroke-rounded/SidebarRight01Icon";
import { useMemo, useState } from "react";
import type { ShellTheme } from "../shell-theme.ts";
import { Button, classes, Segmented } from "../ui/index.ts";
import { CodeDialog } from "./code-dialog.tsx";
import { ImportDialog } from "./import-dialog.tsx";
import {
  ColorControl,
  ControlSection,
  FontControl,
  monoFontOptions,
  RangeControl,
  SelectControl,
  type SelectControlOption,
  TextControl,
  ToggleControl,
} from "./theme-controls.tsx";
import { ThemeIconControls } from "./theme-icon-controls.tsx";
import type { SaveState, UpdateDesignSystem } from "./use-design-system-draft.ts";
import { VariablesPanel } from "./variables-panel.tsx";

const TABS = ["Style", "Variables", "Agent"] as const;
type Tab = (typeof TABS)[number];

/*
 * The name lives in this panel, not in a dialog. The topbar's Rename entry opens the panel and
 * sends focus here rather than offering a second way to edit the same field.
 */
export const DESIGN_SYSTEM_NAME_FIELD_ID = "design-system-name";

interface ThemeEditorPanelProps {
  designSystem: DesignSystem;
  designSystemId: string;
  onClose: () => void;
  onImport: (designSystem: DesignSystem) => void;
  onUpdate: UpdateDesignSystem;
  open: boolean;
  saveState: SaveState;
  showSaveState: boolean;
  /** Which theme the shell is painting; the Variables tab inspects that one. */
  theme: ShellTheme;
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
  theme,
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

        {tab === "Style" ? (
          <StylePanel
            designSystem={designSystem}
            onUpdate={onUpdate}
            showSaveState={showSaveState}
          />
        ) : null}
        {tab === "Variables" ? (
          <VariablesPanel designSystem={designSystem} onUpdate={onUpdate} theme={theme} />
        ) : null}
        {/* The Agent tab has no panel yet; the Segmented option is a placeholder. */}
      </div>
    </aside>
  );
}

interface StylePanelProps {
  designSystem: DesignSystem;
  onUpdate: UpdateDesignSystem;
  showSaveState: boolean;
}

function StylePanel({ designSystem, onUpdate, showSaveState }: StylePanelProps) {
  const activePreset = useMemo(() => matchThemePreset(designSystem), [designSystem]);
  const presetOptions = useMemo<readonly SelectControlOption<string>[]>(() => {
    const options = themePresets.map((preset) => ({ label: preset.name, value: preset.id }));
    return activePreset ? options : [{ label: "Custom", value: "custom" }, ...options];
  }, [activePreset]);

  return (
    <>
      <div className="mt-3">
        <SelectControl
          label="Theme"
          onChange={(id) => {
            const preset = getThemePreset(id);
            if (!preset) {
              return;
            }
            onUpdate((next) => {
              next.theme = applyThemePreset(next, preset).theme;
            });
          }}
          options={presetOptions}
          value={activePreset ?? "custom"}
        />
      </div>

      {showSaveState ? (
        <ControlSection title="General">
          <TextControl
            id={DESIGN_SYSTEM_NAME_FIELD_ID}
            label="Name"
            maxLength={80}
            onChange={(name) =>
              onUpdate((next) => {
                next.identity.name = name;
              }, "identity.name")
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
            }, "colors.accent")
          }
          value={designSystem.theme.light.colors.accent}
        />
        {/*
         * Base anchors the generated neutral family (background, default, surface, overlay,
         * field background, foreground): each role sits at a fixed lightness offset from it,
         * at the accent's hue. There is no "Default" colour picker any more — the neutrals
         * derive from Base + Accent, and individual roles are pinned in the Variables tab.
         */}
        <RangeControl
          label="Base"
          max={1}
          min={0}
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.neutrals.base = value;
              });
            }, "neutrals.base")
          }
          step={0.01}
          value={designSystem.theme.light.neutrals.base}
        />
        <ColorControl
          label="Success"
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.colors.success = value;
              });
            }, "colors.success")
          }
          value={designSystem.theme.light.colors.success}
        />
        <ColorControl
          label="Warning"
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.colors.warning = value;
              });
            }, "colors.warning")
          }
          value={designSystem.theme.light.colors.warning}
        />
        <ColorControl
          label="Danger"
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.colors.danger = value;
              });
            }, "colors.danger")
          }
          value={designSystem.theme.light.colors.danger}
        />
        {/* On: the generated neutrals take a whisper of the accent's chroma. Off: pure grey. */}
        <ToggleControl
          label="Vibrant palette"
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.neutrals.vibrant = value;
              });
            })
          }
          value={designSystem.theme.light.neutrals.vibrant}
        />
      </ControlSection>

      <ControlSection title="Typography">
        <FontControl
          label="Heading Font"
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.typography.fontHeading = value;
              });
            })
          }
          value={designSystem.theme.light.typography.fontHeading}
        />
        <FontControl
          label="Body Font"
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.typography.fontSans = value;
              });
            })
          }
          value={designSystem.theme.light.typography.fontSans}
        />
        <FontControl
          label="Mono Font"
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.typography.fontMono = value;
              });
            })
          }
          options={monoFontOptions}
          value={designSystem.theme.light.typography.fontMono}
        />
        <RangeControl
          label="Line Height"
          max={2}
          min={1}
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.typography.lineHeight = value;
              });
            }, "typography.lineHeight")
          }
          step={0.05}
          value={designSystem.theme.light.typography.lineHeight}
        />
        <RangeControl
          label="Letter Spacing"
          max={0.1}
          min={-0.05}
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.typography.letterSpacing = `${value}em`;
              });
            }, "typography.letterSpacing")
          }
          step={0.01}
          value={Number.parseFloat(designSystem.theme.light.typography.letterSpacing)}
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
            }, "density.spacing")
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
            }, "density.fontSize")
          }
          step={0.05}
          value={designSystem.theme.light.density.fontSize}
        />
      </ControlSection>
      <ThemeIconControls
        icons={designSystem.icons}
        onChange={(icons, coalesceKey) =>
          onUpdate((next) => {
            next.icons = icons;
          }, coalesceKey)
        }
      />

      <ControlSection title="Corners">
        {/*
         * Two authored bases, in rem to match the exported tokens: General Radius drives
         * `--radius` (the xs-4xl steps derive from it in @buttercream/styles) and Forms
         * Radius drives `--field-radius` for inputs, checkboxes, and friends.
         */}
        <RangeControl
          label="General Radius"
          max={2}
          min={0}
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.corners.radius = `${value}rem`;
              });
            }, "corners.radius")
          }
          step={0.125}
          value={Number.parseFloat(designSystem.theme.light.corners.radius)}
        />
        <RangeControl
          label="Forms Radius"
          max={2}
          min={0}
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.corners.fieldRadius = `${value}rem`;
              });
            }, "corners.fieldRadius")
          }
          step={0.125}
          value={Number.parseFloat(designSystem.theme.light.corners.fieldRadius)}
        />
      </ControlSection>

      <ControlSection title="Effects">
        <RangeControl
          label="Border width"
          max={4}
          min={1}
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.effects.borderWidth = `${value}px`;
              });
            }, "effects.borderWidth")
          }
          step={1}
          value={Number.parseFloat(designSystem.theme.light.effects.borderWidth)}
        />
        {/* A focus ring offset lives in single-digit pixels; 0-8 covers hugging the edge through a visibly detached ring. */}
        <RangeControl
          label="Ring offset"
          max={8}
          min={0}
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.effects.ringOffsetWidth = `${value}px`;
              });
            }, "effects.ringOffsetWidth")
          }
          step={1}
          value={Number.parseFloat(designSystem.theme.light.effects.ringOffsetWidth)}
        />
        <RangeControl
          label="Disabled opacity"
          max={1}
          min={0.1}
          onChange={(value) =>
            onUpdate((next) => {
              updateBothThemes(next, (theme) => {
                theme.effects.disabledOpacity = value;
              });
            }, "effects.disabledOpacity")
          }
          step={0.05}
          value={designSystem.theme.light.effects.disabledOpacity}
        />
      </ControlSection>
    </>
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

/**
 * A preset reads as "active" only when the document's themes are exactly what applying it
 * would produce. There is no stored preset id — selection derives from the document, so any
 * hand-edited token drops the picker back to Custom.
 */
function matchThemePreset(designSystem: DesignSystem): ThemePresetId | undefined {
  return themePresets.find((preset) =>
    deepEqual(applyThemePreset(designSystem, preset).theme, designSystem.theme),
  )?.id;
}

/** Key-order-insensitive equality over the plain-JSON theme blocks. */
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return false;
  }
  const left = a as Record<string, unknown>;
  const right = b as Record<string, unknown>;
  const keys = Object.keys(left);
  return (
    keys.length === Object.keys(right).length &&
    keys.every((key) => deepEqual(left[key], right[key]))
  );
}

function updateBothThemes(
  designSystem: DesignSystem,
  mutate: (theme: DesignSystem["theme"]["light"]) => void,
) {
  mutate(designSystem.theme.light);
  mutate(designSystem.theme.dark);
}
