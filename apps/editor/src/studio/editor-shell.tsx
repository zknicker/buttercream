import type { DesignSystem } from "@buttercream/theme-core";
import { useMemo, useState } from "react";
import avatarCss from "../../../../packages/styles/src/components/avatar.css?raw";
import buttonCss from "../../../../packages/styles/src/components/button.css?raw";
import cardCss from "../../../../packages/styles/src/components/card.css?raw";
import themeCss from "../../../../packages/styles/src/theme.css?raw";
import { createPreviewDocument } from "./preview-document.ts";
import { ColorControl, ControlSection, RangeControl } from "./theme-controls.tsx";

const sections = ["Guides", "Button", "Card", "Avatar"] as const;
type Section = (typeof sections)[number];

type SaveState = "clean" | "conflict" | "dirty" | "error" | "saving";

export function EditorShell({
  initialDesignSystem,
  initialVersion,
  onSave,
}: {
  initialDesignSystem: DesignSystem;
  initialVersion?: number;
  onSave?: (
    designSystem: DesignSystem,
    version: number,
  ) => Promise<
    | { status: "conflict"; version: number }
    | { status: "not-found" }
    | { status: "saved"; version: number }
  >;
}) {
  const [designSystem, setDesignSystem] = useState(initialDesignSystem);
  const [version, setVersion] = useState(initialVersion);
  const [saveState, setSaveState] = useState<SaveState>("clean");
  const [section, setSection] = useState<Section>("Button");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");

  const preview = useMemo(
    () =>
      createPreviewDocument({
        componentCss: [themeCss, avatarCss, buttonCss, cardCss].join("\n"),
        designSystem,
        section,
        theme: previewTheme,
      }),
    [designSystem, previewTheme, section],
  );

  const updateDesignSystem = (mutate: (next: DesignSystem) => void) => {
    setDesignSystem((current) => {
      const next = structuredClone(current);
      mutate(next);
      return next;
    });
    if (onSave) {
      setSaveState("dirty");
    }
  };

  const save = async () => {
    if (!(onSave && version)) {
      return;
    }
    setSaveState("saving");
    try {
      const result = await onSave(designSystem, version);
      if (result.status === "saved") {
        setVersion(result.version);
        setSaveState("clean");
        return;
      }
      setSaveState(result.status === "conflict" ? "conflict" : "error");
    } catch {
      setSaveState("error");
    }
  };

  return (
    <div className="studio-editor">
      <header className="studio-topbar">
        <a className="studio-wordmark" href="/">
          Buttercream
        </a>
        <strong>{section}</strong>
        <div className="studio-topbar__actions">
          <button className="studio-icon-button" type="button">
            ↶<span className="studio-sr-only">Undo</span>
          </button>
          <button className="studio-icon-button" type="button">
            ↷<span className="studio-sr-only">Redo</span>
          </button>
          <button
            className="studio-icon-button"
            onClick={() => setPreviewTheme((value) => (value === "light" ? "dark" : "light"))}
            type="button"
          >
            {previewTheme === "light" ? "◐" : "◑"}
            <span className="studio-sr-only">Toggle preview theme</span>
          </button>
          <button className="studio-button studio-button--quiet" type="button">
            Import
          </button>
          {onSave ? (
            <button
              className="studio-button studio-button--save"
              disabled={saveState === "clean" || saveState === "saving"}
              onClick={() => void save()}
              type="button"
            >
              {saveState === "saving" ? "Saving…" : "Save"}
            </button>
          ) : null}
          <button className="studio-button" type="button">
            Code
          </button>
        </div>
      </header>

      <aside className="studio-nav" aria-label="Components">
        {sections.map((item) => (
          <button
            aria-current={section === item ? "page" : undefined}
            className="studio-nav__item"
            key={item}
            onClick={() => setSection(item)}
            type="button"
          >
            <span aria-hidden />
            {item}
          </button>
        ))}
      </aside>

      <main className="studio-preview">
        <iframe
          className="studio-preview__frame"
          sandbox=""
          srcDoc={preview}
          title={`${section} preview`}
        />
      </main>

      <aside className="studio-controls" aria-label="Theme controls">
        {onSave && saveState !== "clean" ? (
          <div className={`studio-save-state studio-save-state--${saveState}`} role="status">
            {saveState === "dirty" ? "Unsaved changes" : null}
            {saveState === "saving" ? "Saving changes…" : null}
            {saveState === "conflict" ? (
              <>
                This design system changed elsewhere.
                <button onClick={() => window.location.reload()} type="button">
                  Reload latest
                </button>
              </>
            ) : null}
            {saveState === "error" ? "Could not save. Try again." : null}
          </div>
        ) : null}
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
        {onSave ? (
          <ControlSection title="General">
            <label className="studio-control-row">
              <span>Name</span>
              <input
                aria-label="Design system name"
                className="studio-control-input"
                maxLength={80}
                onChange={(event) => {
                  const name = event.currentTarget.value;
                  updateDesignSystem((next) => {
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
              updateDesignSystem((next) => {
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
              updateDesignSystem((next) => {
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
              updateDesignSystem((next) => {
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
              updateDesignSystem((next) => {
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
              updateDesignSystem((next) => {
                updateBothThemes(next, (theme) => {
                  theme.effects.hardShadowDepth = `${value}px`;
                });
              })
            }
            step={1}
            value={Number.parseFloat(designSystem.theme.light.effects.hardShadowDepth)}
          />
        </ControlSection>
      </aside>
    </div>
  );
}

function updateBothThemes(
  designSystem: DesignSystem,
  mutate: (theme: DesignSystem["theme"]["light"]) => void,
) {
  mutate(designSystem.theme.light);
  mutate(designSystem.theme.dark);
}
