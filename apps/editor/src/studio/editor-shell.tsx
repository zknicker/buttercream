import { type DesignSystem, themeCssVariables } from "@buttercream/theme-core";
import { HugeiconsIcon } from "@hugeicons/react";
import Moon02Icon from "@hugeicons-pro/core-stroke-rounded/Moon02Icon";
import Redo02Icon from "@hugeicons-pro/core-stroke-rounded/Redo02Icon";
import SidebarLeft01Icon from "@hugeicons-pro/core-stroke-rounded/SidebarLeft01Icon";
import Sun01Icon from "@hugeicons-pro/core-stroke-rounded/Sun01Icon";
import Undo02Icon from "@hugeicons-pro/core-stroke-rounded/Undo02Icon";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import "../styles/preview.css";
import { useShellTheme } from "../shell-theme.ts";
import { Button, CupcakeMark, classes } from "../ui/index.ts";
import { DesignSystemFileMenu } from "../workspace/design-system-file-menu.tsx";
import { renderPreviewSection } from "./preview-sections.tsx";
import { PreviewSurface } from "./preview-surface.tsx";
import { SaveConflictDialog } from "./save-conflict-dialog.tsx";
import { DESIGN_SYSTEM_NAME_FIELD_ID, ThemeEditorPanel } from "./theme-editor-panel.tsx";
import { type SaveDesignSystem, useDesignSystemDraft } from "./use-design-system-draft.ts";

/* Keep the component names alphabetical — the nav renders them in this order. */
const sections = [
  "Guides",
  "Overview",
  "Dashboard",
  "Mail",
  "Chat",
  "Finances",
  "Accordion",
  "Alert",
  "Alert Dialog",
  "Autocomplete",
  "Avatar",
  "Badge",
  "Breadcrumbs",
  "Button",
  "Button Group",
  "Card",
  "Charts",
  "Checkbox",
  "Checkbox Group",
  "Chip",
  "Close Button",
  "Color Swatch",
  "Combobox",
  "Drawer",
  "Dropdown",
  "Error Message",
  "Fieldset",
  "Input",
  "Input OTP",
  "Kbd",
  "Link",
  "Meter",
  "Modal",
  "Number Field",
  "Pagination",
  "Popover",
  "Progress Bar",
  "Progress Circle",
  "Radio Group",
  "Search Field",
  "Segment",
  "Select",
  "Separator",
  "Skeleton",
  "Slider",
  "Spinner",
  "Switch",
  "Table",
  "Tabs",
  "Text Field",
  "Textarea",
  "Toggle Button",
  "Toolbar",
  "Tooltip",
  "Typography",
] as const;
type Section = (typeof sections)[number];

const sectionGroups: readonly { label: string; items: readonly Section[] }[] = [
  { label: "Preview", items: ["Guides", "Overview", "Dashboard", "Mail", "Chat", "Finances"] },
  {
    label: "Components",
    items: [
      "Accordion",
      "Alert",
      "Alert Dialog",
      "Autocomplete",
      "Avatar",
      "Badge",
      "Breadcrumbs",
      "Button",
      "Button Group",
      "Card",
      "Charts",
      "Checkbox",
      "Checkbox Group",
      "Chip",
      "Close Button",
      "Color Swatch",
      "Combobox",
      "Drawer",
      "Dropdown",
      "Error Message",
      "Fieldset",
      "Input",
      "Input OTP",
      "Kbd",
      "Link",
      "Meter",
      "Modal",
      "Number Field",
      "Pagination",
      "Popover",
      "Progress Bar",
      "Progress Circle",
      "Radio Group",
      "Search Field",
      "Segment",
      "Select",
      "Separator",
      "Skeleton",
      "Slider",
      "Spinner",
      "Switch",
      "Table",
      "Tabs",
      "Text Field",
      "Textarea",
      "Toggle Button",
      "Toolbar",
      "Tooltip",
      "Typography",
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

  const themeVariables = useMemo(
    () => themeCssVariables(designSystem.theme[theme]) as CSSProperties,
    [designSystem, theme],
  );

  /*
   * Rename has one home — the Name field in the controls panel. The topbar entry opens the
   * panel and hands focus over rather than duplicating the field in a dialog, which would edit
   * the saved document behind the draft's back.
   */
  const renameInPanel = () => {
    setControlsOpen(true);
    requestAnimationFrame(() => {
      const field = document.getElementById(DESIGN_SYSTEM_NAME_FIELD_ID);
      if (field instanceof HTMLInputElement) {
        field.focus();
        field.select();
      }
    });
  };

  return (
    <div
      className={classes(
        "isolate grid h-dvh min-w-0 overflow-hidden bg-sunken transition-[grid-template-columns] duration-150 ease-out",
        "max-[720px]:grid-cols-[minmax(0,1fr)] max-[720px]:grid-rows-[minmax(0,1fr)_52px]",
        "min-[721px]:grid-rows-[minmax(0,1fr)]",
        /* Preview first, then the section rail, then the controls. The rail sits between the
           artifact and the panel that edits it, so both things that act on the preview are on
           the same side of it and the eye travels one way. */
        controlsOpen
          ? "min-[721px]:grid-cols-[minmax(0,1fr)_3rem_17.25rem]"
          : "min-[721px]:grid-cols-[minmax(0,1fr)_3rem_0rem]",
      )}
    >
      <header
        className={classes(
          "pointer-events-none fixed top-2 left-2 z-4 grid h-9 grid-cols-[1fr_auto_1fr] items-center transition-[right] duration-150 ease-out",
          "*:pointer-events-auto",
          controlsOpen ? "right-2 min-[721px]:right-[17.25rem]" : "right-2",
        )}
      >
        {/*
         * Owners get the file menu; the public preview has no workspace to open, so its
         * identity stays a plain link home. `onSave` is the same signal the route already uses
         * to decide whether this document is editable at all.
         */}
        {onSave ? (
          <DesignSystemFileMenu
            designSystemId={designSystemId}
            name={designSystem.identity.name}
            onRename={renameInPanel}
          />
        ) : (
          <a
            aria-label="Homepage"
            className="flex min-w-0 max-w-40 items-center gap-1.5 rounded-(--radius-shell) px-2 text-fg focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-fg min-[721px]:max-w-60"
            href="/"
          >
            {/*
             * Optically aligned, not geometrically. The cupcake's mass sits in the lower
             * two thirds of its grid — stem and cherry occupy the top rows — so centring
             * the box leaves the ink sitting visibly low against the wordmark.
             */}
            <CupcakeMark className="-mt-0.5" size={16} />
            <span className="truncate text-sm font-medium">{designSystem.identity.name}</span>
          </a>
        )}

        {/*
         * Matches the wordmark's size and weight so the bar reads as three deliberate
         * parts. As tracked uppercase mono it looked like a stray token rather than a
         * "you are here".
         */}
        <strong className="truncate text-sm font-medium text-fg">{section}</strong>

        <div className="flex items-center justify-end gap-1">
          <Button aria-label="Undo" disabled iconOnly size="md" variant="ghost">
            <HugeiconsIcon aria-hidden="true" icon={Undo02Icon} size={16} strokeWidth={2} />
          </Button>
          <Button aria-label="Redo" disabled iconOnly size="md" variant="ghost">
            <HugeiconsIcon aria-hidden="true" icon={Redo02Icon} size={16} strokeWidth={2} />
          </Button>
          <span aria-hidden className="mx-1.5 h-6 w-px bg-fg/12" />
          <Button
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            iconOnly
            onClick={toggleTheme}
            size="md"
            variant="ghost"
          >
            <HugeiconsIcon
              aria-hidden="true"
              icon={theme === "dark" ? Sun01Icon : Moon02Icon}
              size={16}
              strokeWidth={2}
            />
          </Button>
          {controlsOpen ? null : (
            <Button
              aria-label="Open theme controls"
              iconOnly
              onClick={() => setControlsOpen(true)}
              size="md"
              variant="secondary"
            >
              <HugeiconsIcon
                aria-hidden="true"
                icon={SidebarLeft01Icon}
                size={16}
                strokeWidth={2}
              />
            </Button>
          )}
        </div>
      </header>

      {/*
       * The preview is a surface floating on the chrome, not a region bleeding into
       * it. The gutter and radius are what make the chrome read as a frame and the
       * preview as the artifact inside it; without them the two fight for the same
       * plane. The top gutter clears the floating topbar.
       */}
      <main className="min-h-0 min-w-0 bg-sunken px-3 pt-12 pb-3">
        {/*
         * No ring and no background of its own: the themed surface inside paints the whole
         * area, so anything drawn here would show as a seam around the artifact being
         * previewed. The reference frames its preview the same way — a radius and nothing else.
         */}
        {/*
         * The scroll lives here rather than on the preview inside it, and rather than on the column
         * outside it. Inside, the artifact was clipped by the frame's bottom edge while the page
         * still had room, so a page ended mid-component with a strip of chrome beneath it. Outside,
         * the gutter that clears the floating topbar scrolled away with everything else and the
         * preview slid under the header.
         *
         * Between the two, the gutters stay put and the frame grows with its content.
         */}
        <div className="h-full overflow-y-auto scrollbar-none">
          <div className="min-h-full w-full overflow-hidden rounded-(--radius-shell-frame)">
            <PreviewSurface
              customCss={designSystem.rules.customCss}
              style={themeVariables}
              theme={theme}
            >
              {renderPreviewSection(section, designSystem.icons)}
            </PreviewSurface>
          </div>
        </div>
      </main>

      <aside
        aria-label="Preview navigation"
        className={classes(
          /* Top-aligned on desktop: the rail is a list that happens to be short, and centring it
             left it floating with no relationship to the header it sits under. Still centred in
             the compact bottom bar, where it is a row rather than a list. */
          /* Clears the floating topbar by the same gutter the preview uses, so the rail starts
             level with the artifact instead of running up behind the header. */
          "relative z-2 flex min-h-0 justify-center px-2 pb-4",
          "max-[720px]:items-center max-[720px]:pt-4 min-[721px]:items-start min-[721px]:pt-12",
          "max-[720px]:order-last max-[720px]:border-t max-[720px]:border-fg/10 max-[720px]:bg-sunken",
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
          /*
           * Takes the height the column actually has rather than a fixed slice of the viewport. At
           * 60vh the rail ran out of room while most of its own column sat empty below, so it
           * scrolled a list that had somewhere to go. It still scrolls, but only once the ticks
           * genuinely outgrow the window.
           */
          className="flex max-h-full w-8 flex-col items-center gap-2 overflow-y-auto px-1 py-3 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-fg scrollbar-none max-[720px]:flex-row"
          onClick={() => setNavOpen(true)}
          onPointerEnter={() => setNavOpen(true)}
          type="button"
        >
          {sectionGroups.map((group, groupIndex) => (
            <span
              className="flex items-center gap-2 max-[720px]:flex-row min-[721px]:w-6 min-[721px]:flex-col min-[721px]:items-end"
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
            /* Scrolls rather than clips: the list outgrew 80vh, and overflow-hidden simply
               made everything past it unreachable. overscroll-contain stops the page from
               scrolling on behind it once the menu hits an end. */
            /* Opens toward the preview, away from the controls panel it sits against. */
            "absolute top-12 right-12 z-10 w-44 max-h-[80vh] overflow-y-auto overscroll-contain rounded-(--radius-shell) bg-raised p-1.5 shadow-xl shadow-ink/10 dark:shadow-none ring-1 ring-fg/10 transition-opacity",
            "max-[720px]:top-auto max-[720px]:right-auto max-[720px]:bottom-14 max-[720px]:left-2",
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
                    "focus-visible:outline-[1.5px] focus-visible:-outline-offset-1 focus-visible:outline-fg",
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

      <ThemeEditorPanel
        designSystem={designSystem}
        designSystemId={designSystemId}
        onClose={() => setControlsOpen(false)}
        onImport={replaceDesignSystem}
        onUpdate={updateDesignSystem}
        open={controlsOpen}
        saveState={saveState}
        showSaveState={Boolean(onSave)}
        theme={theme}
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
