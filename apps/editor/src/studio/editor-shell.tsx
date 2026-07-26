import type { DesignSystem } from "@buttercream/theme-core";
import { HugeiconsIcon } from "@hugeicons/react";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import Moon02Icon from "@hugeicons-pro/core-stroke-rounded/Moon02Icon";
import Redo02Icon from "@hugeicons-pro/core-stroke-rounded/Redo02Icon";
import SidebarLeft01Icon from "@hugeicons-pro/core-stroke-rounded/SidebarLeft01Icon";
import Sun01Icon from "@hugeicons-pro/core-stroke-rounded/Sun01Icon";
import Undo02Icon from "@hugeicons-pro/core-stroke-rounded/Undo02Icon";
import { useEffect, useMemo, useState } from "react";
import avatarCss from "../../../../packages/styles/src/components/avatar.css?raw";
import buttonCss from "../../../../packages/styles/src/components/button.css?raw";
import cardCss from "../../../../packages/styles/src/components/card.css?raw";
import checkboxCss from "../../../../packages/styles/src/components/checkbox.css?raw";
import inputCss from "../../../../packages/styles/src/components/input.css?raw";
import popoverCss from "../../../../packages/styles/src/components/popover.css?raw";
import radioGroupCss from "../../../../packages/styles/src/components/radio-group.css?raw";
import selectCss from "../../../../packages/styles/src/components/select.css?raw";
import sliderCss from "../../../../packages/styles/src/components/slider.css?raw";
import surfaceCss from "../../../../packages/styles/src/components/surface.css?raw";
import switchCss from "../../../../packages/styles/src/components/switch.css?raw";
import tabsCss from "../../../../packages/styles/src/components/tabs.css?raw";
import tooltipCss from "../../../../packages/styles/src/components/tooltip.css?raw";
import themeCss from "../../../../packages/styles/src/theme.css?raw";
import { useShellTheme } from "../shell-theme.ts";
import { Button, CupcakeMark, classes } from "../ui/index.ts";
import { createPreviewDocument } from "./preview-document.ts";
import { SaveConflictDialog } from "./save-conflict-dialog.tsx";
import { ThemeEditorPanel } from "./theme-editor-panel.tsx";
import { type SaveDesignSystem, useDesignSystemDraft } from "./use-design-system-draft.ts";

const sections = [
  "Guides",
  "Button",
  "Input",
  "Popover",
  "Checkbox",
  "Radio Group",
  "Select",
  "Slider",
  "Switch",
  "Tabs",
  "Tooltip",
  "Card",
  "Avatar",
] as const;
type Section = (typeof sections)[number];

const sectionGroups: readonly { label: string; items: readonly Section[] }[] = [
  { label: "Preview", items: ["Guides"] },
  {
    label: "Components",
    items: [
      "Button",
      "Input",
      "Popover",
      "Checkbox",
      "Radio Group",
      "Select",
      "Slider",
      "Switch",
      "Tabs",
      "Tooltip",
      "Card",
      "Avatar",
    ],
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
  /*
   * One switch moves the chrome and the preview together, but through two separate
   * token sets: the shell's own dark palette, and the design system's dark theme.
   */
  const { theme, toggleTheme } = useShellTheme();
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
          popoverCss,
          radioGroupCss,
          selectCss,
          sliderCss,
          surfaceCss,
          switchCss,
          tabsCss,
          tooltipCss,
        ].join("\n"),
        designSystem,
        section,
        theme,
      }),
    [designSystem, section, theme],
  );

  return (
    <div
      className={classes(
        "isolate grid h-dvh min-w-0 overflow-hidden bg-canvas transition-[grid-template-columns] duration-150 ease-out",
        "max-[720px]:grid-cols-[minmax(0,1fr)] max-[720px]:grid-rows-[minmax(0,1fr)_52px]",
        "min-[721px]:grid-rows-[minmax(0,1fr)]",
        controlsOpen
          ? "min-[721px]:grid-cols-[3rem_minmax(0,1fr)_17.25rem]"
          : "min-[721px]:grid-cols-[3rem_minmax(0,1fr)_0rem]",
      )}
    >
      <header
        className={classes(
          "pointer-events-none fixed top-2 left-2 z-4 grid h-9 grid-cols-[1fr_auto_1fr] items-center transition-[right] duration-150 ease-out",
          "*:pointer-events-auto",
          controlsOpen ? "right-2 min-[721px]:right-[17.25rem]" : "right-2",
        )}
      >
        <a
          aria-label="Homepage"
          className="flex min-w-0 max-w-40 items-center gap-1.5 rounded-(--radius-shell) px-2 text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg min-[721px]:max-w-60"
          href="/"
        >
          <CupcakeMark size={18} />
          <span className="truncate text-sm">{designSystem.identity.name}</span>
          <HugeiconsIcon
            aria-hidden="true"
            className="shrink-0 text-muted"
            icon={ArrowDown01Icon}
            size={14}
            strokeWidth={2}
          />
        </a>

        <strong className="font-mono text-xs font-normal tracking-wide text-muted uppercase">
          {section}
        </strong>

        <div className="flex items-center justify-end gap-1">
          <Button aria-label="Undo" disabled iconOnly size="sm" variant="ghost">
            <HugeiconsIcon aria-hidden="true" icon={Undo02Icon} size={18} strokeWidth={2} />
          </Button>
          <Button aria-label="Redo" disabled iconOnly size="sm" variant="ghost">
            <HugeiconsIcon aria-hidden="true" icon={Redo02Icon} size={18} strokeWidth={2} />
          </Button>
          <span aria-hidden className="mx-1.5 h-6 w-px bg-fg/12" />
          <Button
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            iconOnly
            onClick={toggleTheme}
            size="sm"
            variant="ghost"
          >
            <HugeiconsIcon
              aria-hidden="true"
              icon={theme === "dark" ? Sun01Icon : Moon02Icon}
              size={18}
              strokeWidth={2}
            />
          </Button>
          {controlsOpen ? null : (
            <Button
              aria-label="Open theme controls"
              iconOnly
              onClick={() => setControlsOpen(true)}
              size="sm"
              variant="secondary"
            >
              <HugeiconsIcon
                aria-hidden="true"
                icon={SidebarLeft01Icon}
                size={18}
                strokeWidth={2}
              />
            </Button>
          )}
        </div>
      </header>

      <aside
        aria-label="Preview navigation"
        className={classes(
          "relative z-2 flex items-center justify-center px-2 py-4",
          "max-[720px]:order-last max-[720px]:border-t max-[720px]:border-fg/10 max-[720px]:bg-canvas",
        )}
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
          className="flex max-h-[60vh] w-8 flex-col items-center gap-3 overflow-y-auto px-1 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg scrollbar-none max-[720px]:flex-row"
          onClick={() => setNavOpen(true)}
          onPointerEnter={() => setNavOpen(true)}
          type="button"
        >
          {sectionGroups.map((group, groupIndex) => (
            <span
              className="flex items-center gap-3 max-[720px]:flex-row min-[721px]:w-6 min-[721px]:flex-col min-[721px]:items-start"
              key={group.label}
            >
              {/* Gap between tick groups, oriented with the rail. */}
              {groupIndex > 0 ? (
                <span
                  aria-hidden
                  className="shrink-0 max-[720px]:h-6 max-[720px]:w-2 min-[721px]:h-2 min-[721px]:w-6"
                />
              ) : null}
              {group.items.map((item) => (
                <span
                  aria-hidden
                  className={classes(
                    "block shrink-0 rounded-full max-[720px]:w-0.5 min-[721px]:h-0.5",
                    section === item
                      ? "bg-butter max-[720px]:h-6 min-[721px]:w-6"
                      : "bg-fg/20 max-[720px]:h-4 min-[721px]:w-4",
                  )}
                  key={item}
                />
              ))}
            </span>
          ))}
        </button>

        <div
          className={classes(
            "absolute top-1/2 left-12 z-10 w-44 max-h-[80vh] -translate-y-1/2 overflow-hidden rounded-xl bg-raised p-1.5 shadow-xl shadow-ink/10 dark:shadow-none ring-1 ring-fg/10 transition-opacity",
            "max-[720px]:top-auto max-[720px]:bottom-14 max-[720px]:left-2 max-[720px]:translate-y-0",
            navOpen ? "visible opacity-100" : "invisible opacity-0",
          )}
        >
          {sectionGroups.map((group, groupIndex) => (
            <div key={group.label}>
              {groupIndex > 0 ? <hr className="my-2 h-px border-0 bg-fg/10" /> : null}
              <p className="px-3 py-1 font-mono text-xs tracking-wide text-muted uppercase">
                {group.label}
              </p>
              {group.items.map((item) => (
                <button
                  aria-current={section === item ? "page" : undefined}
                  className={classes(
                    "block h-8 w-full rounded-(--radius-shell) px-3 text-left text-sm",
                    "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-fg",
                    section === item ? "bg-sunken text-fg" : "text-muted hover:bg-fg/5",
                  )}
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

      <main className="min-h-0 min-w-0 bg-canvas pt-12">
        <iframe
          className="block h-full w-full border-0 bg-canvas"
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
        open={controlsOpen}
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
