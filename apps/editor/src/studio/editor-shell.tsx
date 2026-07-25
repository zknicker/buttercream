import { createDefaultDesignSystem, type DesignSystem } from "@buttercream/theme-core";
import { useMemo, useState } from "react";
import avatarCss from "../../../../packages/styles/src/components/avatar.css?raw";
import buttonCss from "../../../../packages/styles/src/components/button.css?raw";
import cardCss from "../../../../packages/styles/src/components/card.css?raw";
import themeCss from "../../../../packages/styles/src/theme.css?raw";
import { createPreviewDocument } from "./preview-document.ts";

const sections = ["Guides", "Button", "Card", "Avatar"] as const;
type Section = (typeof sections)[number];

export function EditorShell({ id }: { id: string }) {
  const [designSystem, setDesignSystem] = useState(() =>
    createDefaultDesignSystem(id === "preview" ? "Buttercream" : "Untitled design system"),
  );
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
        <ControlSection title="Color">
          <ColorControl
            label="Accent"
            onChange={(value) =>
              updateBothThemes(setDesignSystem, (theme) => {
                theme.colors.accent = value;
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
              updateBothThemes(setDesignSystem, (theme) => {
                theme.density.spacing = value;
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
              updateBothThemes(setDesignSystem, (theme) => {
                theme.density.fontSize = value;
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
              updateBothThemes(setDesignSystem, (theme) => {
                theme.corners.radius = `${value}px`;
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
              updateBothThemes(setDesignSystem, (theme) => {
                theme.effects.hardShadowDepth = `${value}px`;
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

function ControlSection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="studio-control-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ColorControl({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="studio-control-row">
      <span>{label}</span>
      <span className="studio-color-value">
        {value}
        <input
          aria-label={label}
          onChange={(event) => onChange(event.currentTarget.value)}
          type="color"
          value={normalizeHex(value)}
        />
      </span>
    </label>
  );
}

function RangeControl({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  const progress = ((value - min) / (max - min)) * 100;
  return (
    <label
      className="studio-range"
      style={{ "--studio-progress": `${progress}%` } as React.CSSProperties}
    >
      <span>{label}</span>
      <output>{value.toFixed(step < 1 ? 2 : 0)}</output>
      <input
        aria-label={label}
        max={max}
        min={min}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

function updateBothThemes(
  setDesignSystem: React.Dispatch<React.SetStateAction<DesignSystem>>,
  mutate: (theme: DesignSystem["theme"]["light"]) => void,
) {
  setDesignSystem((current) => {
    const next = structuredClone(current);
    mutate(next.theme.light);
    mutate(next.theme.dark);
    return next;
  });
}

function normalizeHex(value: string): string {
  return /^#[\da-f]{6}$/iu.test(value) ? value : "#1b1b1b";
}
