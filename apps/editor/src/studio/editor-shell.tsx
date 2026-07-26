import type { DesignSystem } from "@buttercream/theme-core";
import { HugeiconsIcon } from "@hugeicons/react";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import CakeSliceIcon from "@hugeicons-pro/core-stroke-rounded/CakeSliceIcon";
import Moon02Icon from "@hugeicons-pro/core-stroke-rounded/Moon02Icon";
import Redo02Icon from "@hugeicons-pro/core-stroke-rounded/Redo02Icon";
import SidebarLeft01Icon from "@hugeicons-pro/core-stroke-rounded/SidebarLeft01Icon";
import Undo02Icon from "@hugeicons-pro/core-stroke-rounded/Undo02Icon";
import { useEffect, useMemo, useState } from "react";
import avatarCss from "../../../../packages/styles/src/components/avatar.css?raw";
import buttonCss from "../../../../packages/styles/src/components/button.css?raw";
import cardCss from "../../../../packages/styles/src/components/card.css?raw";
import checkboxCss from "../../../../packages/styles/src/components/checkbox.css?raw";
import inputCss from "../../../../packages/styles/src/components/input.css?raw";
import radioGroupCss from "../../../../packages/styles/src/components/radio-group.css?raw";
import sliderCss from "../../../../packages/styles/src/components/slider.css?raw";
import surfaceCss from "../../../../packages/styles/src/components/surface.css?raw";
import switchCss from "../../../../packages/styles/src/components/switch.css?raw";
import themeCss from "../../../../packages/styles/src/theme.css?raw";
import { createPreviewDocument } from "./preview-document.ts";
import { SaveConflictDialog } from "./save-conflict-dialog.tsx";
import { ThemeEditorPanel } from "./theme-editor-panel.tsx";
import { type SaveDesignSystem, useDesignSystemDraft } from "./use-design-system-draft.ts";

const sections = [
  "Guides",
  "Button",
  "Input",
  "Checkbox",
  "Radio Group",
  "Slider",
  "Switch",
  "Card",
  "Avatar",
] as const;
type Section = (typeof sections)[number];

const sectionGroups: readonly { label: string; items: readonly Section[] }[] = [
  { label: "Preview", items: ["Guides"] },
  {
    label: "Components",
    items: ["Button", "Input", "Checkbox", "Radio Group", "Slider", "Switch", "Card", "Avatar"],
  },
];

export function EditorShell({
  initialDesignSystem,
  initialVersion,
  designSystemId,
  onSave,
}: {
  designSystemId: string;
  initialDesignSystem: DesignSystem;
  initialVersion?: number;
  onSave?: SaveDesignSystem;
}) {
  const [controlsOpen, setControlsOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [section, setSection] = useState<Section>("Button");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
  const {
    conflictVersion,
    designSystem,
    overwriteConflict,
    replaceDesignSystem,
    saveState,
    updateDesignSystem,
  } = useDesignSystemDraft({
    initialDesignSystem,
    ...(initialVersion === undefined ? {} : { initialVersion }),
    ...(onSave ? { onSave } : {}),
  });

  useEffect(() => {
    const compactViewport = window.matchMedia("(max-width: 720px)");
    const syncControls = ({ matches }: MediaQueryListEvent | MediaQueryList) => {
      setControlsOpen(!matches);
    };

    syncControls(compactViewport);
    compactViewport.addEventListener("change", syncControls);
    return () => compactViewport.removeEventListener("change", syncControls);
  }, []);

  const preview = useMemo(
    () =>
      createPreviewDocument({
        componentCss: [
          themeCss,
          avatarCss,
          buttonCss,
          cardCss,
          checkboxCss,
          inputCss,
          radioGroupCss,
          sliderCss,
          surfaceCss,
          switchCss,
        ].join("\n"),
        designSystem,
        section,
        theme: previewTheme,
      }),
    [designSystem, previewTheme, section],
  );

  return (
    <div className="studio-editor" data-controls-open={controlsOpen}>
      <header className="studio-topbar">
        <a aria-label="Homepage" className="studio-editor__brand" href="/">
          <HugeiconsIcon
            aria-hidden="true"
            className="studio-editor__brand-icon"
            icon={CakeSliceIcon}
            size={20}
            strokeWidth={2}
          />
          <span>{designSystem.identity.name}</span>
          <HugeiconsIcon
            aria-hidden="true"
            className="studio-editor__brand-chevron"
            icon={ArrowDown01Icon}
            size={12}
            strokeWidth={2}
          />
        </a>
        <strong>{section}</strong>
        <div className="studio-topbar__actions">
          <button aria-label="Undo" className="studio-icon-button" disabled type="button">
            <HugeiconsIcon aria-hidden="true" icon={Undo02Icon} size={16} strokeWidth={2} />
          </button>
          <button aria-label="Redo" className="studio-icon-button" disabled type="button">
            <HugeiconsIcon aria-hidden="true" icon={Redo02Icon} size={16} strokeWidth={2} />
          </button>
          <span aria-hidden className="studio-topbar__divider" />
          <button
            aria-label="Toggle preview theme"
            className="studio-icon-button"
            onClick={() => setPreviewTheme((value) => (value === "light" ? "dark" : "light"))}
            type="button"
          >
            <HugeiconsIcon aria-hidden="true" icon={Moon02Icon} size={16} strokeWidth={2} />
          </button>
          <button
            aria-label="Open theme controls"
            className="studio-icon-button studio-controls-open"
            onClick={() => setControlsOpen(true)}
            type="button"
          >
            <HugeiconsIcon aria-hidden="true" icon={SidebarLeft01Icon} size={16} strokeWidth={2} />
          </button>
        </div>
      </header>

      <aside
        aria-label="Preview navigation"
        className="studio-nav"
        data-open={navOpen}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setNavOpen(false);
          }
        }}
        onFocusCapture={() => setNavOpen(true)}
        onPointerLeave={() => setNavOpen(false)}
      >
        <button
          aria-expanded={navOpen}
          aria-label="Preview sections"
          className="studio-nav__trigger"
          onClick={() => setNavOpen(true)}
          onPointerEnter={() => setNavOpen(true)}
          type="button"
        >
          {sectionGroups.map((group, groupIndex) => (
            <span className="studio-nav__tick-group" key={group.label}>
              {groupIndex > 0 ? <span aria-hidden className="studio-nav__spacer" /> : null}
              {group.items.map((item) => (
                <span
                  aria-hidden
                  className="studio-nav__bar"
                  data-active={section === item || undefined}
                  key={item}
                />
              ))}
            </span>
          ))}
        </button>
        <div className="studio-nav__content">
          {sectionGroups.map((group, groupIndex) => (
            <div className="studio-nav__group" key={group.label}>
              {groupIndex > 0 ? <hr /> : null}
              <p>{group.label}</p>
              {group.items.map((item) => (
                <button
                  aria-current={section === item ? "page" : undefined}
                  className="studio-nav__item"
                  key={item}
                  onClick={() => {
                    setSection(item);
                    setNavOpen(false);
                  }}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      <main className="studio-preview">
        <iframe
          className="studio-preview__frame"
          sandbox=""
          srcDoc={preview}
          title={`${section} preview`}
        />
      </main>

      <ThemeEditorPanel
        designSystem={designSystem}
        designSystemId={designSystemId}
        onClose={() => setControlsOpen(false)}
        onImport={replaceDesignSystem}
        onUpdate={updateDesignSystem}
        saveState={saveState}
        showSaveState={Boolean(onSave)}
      />
      <SaveConflictDialog
        onOverwrite={overwriteConflict}
        open={conflictVersion !== undefined}
        overwriteFailed={saveState === "error"}
        overwriting={saveState === "saving"}
      />
    </div>
  );
}
