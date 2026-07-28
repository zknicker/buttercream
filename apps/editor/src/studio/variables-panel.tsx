import {
  type DesignSystem,
  type ShadowLevel,
  type SkeletonStyle,
  type ThemeTokens,
  themeCssVariables,
} from "@buttercream/theme-core";
import { HugeiconsIcon } from "@hugeicons/react";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import Search01Icon from "@hugeicons-pro/core-stroke-rounded/Search01Icon";
import type { CSSProperties, ReactElement } from "react";
import { useMemo, useState } from "react";
import { classes, Segmented } from "../ui/index.ts";
import {
  ColorTokenRow,
  FilterChips,
  LevelRow,
  RangeRow,
  SelectRow,
  ToggleRow,
  VariablesSection,
} from "./variables-rows.tsx";
import type { ColorTokenCategory } from "./variables-tokens.ts";
import {
  type ColorFilter,
  type ColorToken,
  collectColorTokens,
  colorTokenCategories,
} from "./variables-tokens.ts";

/*
 * Variables tab: the token inspector. Colours list every token — authored ones editable,
 * derived ones read-only with their formula — then shadows pick a level per kind, and the
 * misc effects round out the theme. heroui.pro also shows an "Animations" section here;
 * its contents were never captured, so it is deliberately absent rather than invented.
 */

const THEMES = ["Light", "Dark"] as const;
type ThemeName = (typeof THEMES)[number];

/** Rows shown before the list collapses behind "Show all N". */
const COLLAPSED_ROWS = 12;

const SHADOW_LEVELS = [
  { label: "None", value: "none" },
  { label: "Subtle", value: "subtle" },
  { label: "Medium", value: "medium" },
  { label: "Strong", value: "strong" },
] as const satisfies readonly { label: string; value: ShadowLevel }[];

const SKELETON_STYLES = [
  { label: "Shimmer", value: "shimmer" },
  { label: "Pulse", value: "pulse" },
  { label: "None", value: "none" },
] as const satisfies readonly { label: string; value: SkeletonStyle }[];

export function VariablesPanel({
  designSystem,
  onUpdate,
}: {
  designSystem: DesignSystem;
  onUpdate: (mutate: (designSystem: DesignSystem) => void) => void;
}): ReactElement {
  /*
   * Tokens are inspected one theme at a time — unlike the Style tab's brand controls,
   * pinning a neutral or picking a shadow level is a per-theme decision (the defaults
   * already differ: dark ships overlay shadows at "none").
   */
  const [themeName, setThemeName] = useState<ThemeName>("Light");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<ReadonlySet<ColorTokenCategory>>(new Set());

  const toggleGroup = (category: ColorTokenCategory) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (!next.delete(category)) {
        next.add(category);
      }
      return next;
    });

  const themeKey = themeName === "Light" ? "light" : "dark";
  const theme = designSystem.theme[themeKey];

  const tokens = useMemo(() => collectColorTokens(theme), [theme]);

  /*
   * Matches the name and the value, so a derived token can be found by what it is built from —
   * searching "accent" turns up `accent-hover` and every formula that mixes the accent in.
   */
  const searching = query.trim().length > 0;
  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matched = needle
      ? tokens.filter(
          (token) =>
            token.name.toLowerCase().includes(needle) || token.value.toLowerCase().includes(needle),
        )
      : tokens;

    return colorTokenCategories
      .map((category) => ({
        category,
        tokens: matched.filter((token) => token.category === category),
      }))
      .filter((group) => group.tokens.length > 0);
  }, [query, tokens]);

  /*
   * Swatch scope, same trick as PreviewSurface: authored values arrive inline, and the
   * data-theme attribute re-declares the derived formulas from @buttercream/styles at this
   * scope, so a swatch painting `var(--token)` resolves against the edited theme instead
   * of the shell chrome. `display: contents` keeps the rows direct flex children.
   */
  const swatchVariables = useMemo(() => themeCssVariables(theme) as CSSProperties, [theme]);

  const updateTheme = (mutate: (tokens: ThemeTokens) => void) =>
    onUpdate((next) => {
      mutate(next.theme[themeKey]);
    });

  /** Writes a literal over the token's default expression, opting it out of generation. */
  const pinToken = (token: ColorToken, value: string) => {
    const authored = token.authored;
    if (!authored) {
      return;
    }
    updateTheme((tokens) => {
      (tokens[authored.section] as Record<string, string>)[authored.key] = value;
    });
  };

  return (
    <div>
      <div className="mt-3">
        <Segmented
          label="Variables theme"
          onChange={setThemeName}
          options={THEMES}
          value={themeName}
        />
      </div>

      <VariablesSection count={tokens.length} title="Colors">
        {/*
         * Search first, because the panel's real job is "find one token among ninety". The
         * category chips it replaces wrapped to three lines at this rail width and could only
         * answer "show me a family", never "where is --field-border-hover".
         */}
        <label className="relative mb-2 block">
          <HugeiconsIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted"
            icon={Search01Icon}
            size={14}
            strokeWidth={2}
          />
          <input
            aria-label="Search colour tokens"
            className={classes(
              "h-8 w-full rounded-(--radius-shell) bg-raised pr-2 pl-8",
              "font-mono text-xs text-fg placeholder:text-muted",
              "outline-0 focus-visible:outline-[1.5px] focus-visible:-outline-offset-1 focus-visible:outline-fg",
            )}
            name="variables-search"
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search tokens"
            type="search"
            value={query}
          />
        </label>

        {groups.length === 0 ? (
          <p className="px-1 py-6 text-center text-xs text-muted">
            No token matches &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="flex flex-col gap-1" data-theme={themeKey} style={swatchVariables}>
            {groups.map((group) => {
              const open = searching || expanded.has(group.category);
              return (
                <div key={group.category}>
                  {/*
                   * Collapsed by default, so the first thing the panel shows is a ten-line index
                   * of what exists rather than the first twelve rows of ninety. While a search is
                   * running the groups force open — a hit you have to click to see is not a hit.
                   */}
                  <button
                    aria-expanded={open}
                    className={classes(
                      "flex h-8 w-full items-center gap-2 rounded-(--radius-shell) px-2 text-left",
                      "text-[13px] text-fg hover:bg-fg/5",
                      "focus-visible:outline-[1.5px] focus-visible:-outline-offset-1 focus-visible:outline-fg",
                    )}
                    onClick={() => toggleGroup(group.category)}
                    type="button"
                  >
                    <HugeiconsIcon
                      aria-hidden="true"
                      className={classes(
                        "shrink-0 text-muted transition-transform duration-100",
                        open ? "rotate-0" : "-rotate-90",
                      )}
                      icon={ArrowDown01Icon}
                      size={14}
                      strokeWidth={2}
                    />
                    <span className="min-w-0 flex-1 truncate">{group.category}</span>
                    <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted">
                      {group.tokens.length}
                    </span>
                  </button>
                  {open ? (
                    <div className="mt-0.5 overflow-hidden rounded-(--radius-shell) bg-raised divide-y divide-fg/6">
                      {group.tokens.map((token) => (
                        <ColorTokenRow
                          key={token.name}
                          name={token.name}
                          value={token.value}
                          {...(token.authored
                            ? { onCommit: (value: string) => pinToken(token, value) }
                            : {})}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </VariablesSection>

      <VariablesSection title="Shadows">
        <div className="overflow-hidden rounded-(--radius-shell) bg-raised divide-y divide-fg/6">
          <LevelRow
            label="Surface"
            onChange={(value) =>
              updateTheme((tokens) => {
                tokens.effects.shadowSurface = value;
              })
            }
            options={SHADOW_LEVELS}
            value={theme.effects.shadowSurface}
          />
          <LevelRow
            label="Overlay"
            onChange={(value) =>
              updateTheme((tokens) => {
                tokens.effects.shadowOverlay = value;
              })
            }
            options={SHADOW_LEVELS}
            value={theme.effects.shadowOverlay}
          />
          <LevelRow
            label="Field"
            onChange={(value) =>
              updateTheme((tokens) => {
                tokens.effects.shadowField = value;
              })
            }
            options={SHADOW_LEVELS}
            value={theme.effects.shadowField}
          />
        </div>
      </VariablesSection>

      <VariablesSection title="Misc">
        <RangeRow
          format={(value) => `${value}px`}
          label="Field border"
          max={4}
          min={0}
          onChange={(value) =>
            updateTheme((tokens) => {
              tokens.effects.fieldBorderWidth = `${value}px`;
            })
          }
          step={1}
          value={Number.parseFloat(theme.effects.fieldBorderWidth)}
        />
        <RangeRow
          label="Disabled opacity"
          max={1}
          min={0}
          onChange={(value) =>
            updateTheme((tokens) => {
              tokens.effects.disabledOpacity = value;
            })
          }
          step={0.05}
          value={theme.effects.disabledOpacity}
        />
        <ToggleRow
          label="Cursor pointer"
          onChange={(value) =>
            updateTheme((tokens) => {
              tokens.effects.cursorPointer = value;
            })
          }
          value={theme.effects.cursorPointer}
        />
        <SelectRow
          label="Skeleton"
          onChange={(value) =>
            updateTheme((tokens) => {
              tokens.effects.skeleton = value;
            })
          }
          options={SKELETON_STYLES}
          value={theme.effects.skeleton}
        />
      </VariablesSection>
    </div>
  );
}
