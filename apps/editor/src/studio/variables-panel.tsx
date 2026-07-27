import {
  type DesignSystem,
  type ShadowLevel,
  type SkeletonStyle,
  type ThemeTokens,
  themeCssVariables,
} from "@buttercream/theme-core";
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
import {
  type ColorFilter,
  type ColorToken,
  collectColorTokens,
  colorFilters,
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
  const [filter, setFilter] = useState<ColorFilter>("All");
  const [showAll, setShowAll] = useState(false);

  const themeKey = themeName === "Light" ? "light" : "dark";
  const theme = designSystem.theme[themeKey];

  const tokens = useMemo(() => collectColorTokens(theme), [theme]);
  const filtered = filter === "All" ? tokens : tokens.filter((token) => token.category === filter);
  const visible = showAll ? filtered : filtered.slice(0, COLLAPSED_ROWS);

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
        <FilterChips
          label="Colour categories"
          onChange={(next) => {
            setFilter(next);
            setShowAll(false);
          }}
          options={colorFilters}
          value={filter}
        />
        <div
          className="overflow-hidden rounded-(--radius-shell) bg-raised divide-y divide-fg/6"
          data-theme={themeKey}
          style={swatchVariables}
        >
          {visible.map((token) => (
            <ColorTokenRow
              key={token.name}
              name={token.name}
              value={token.value}
              {...(token.authored ? { onCommit: (value: string) => pinToken(token, value) } : {})}
            />
          ))}
        </div>
        {visible.length < filtered.length ? (
          <button
            className={classes(
              "mt-1 h-8 rounded-(--radius-shell) text-xs text-muted hover:text-fg",
              "focus-visible:outline-[1.5px] focus-visible:-outline-offset-1 focus-visible:outline-fg",
            )}
            onClick={() => setShowAll(true)}
            type="button"
          >
            Show all {filtered.length}
          </button>
        ) : null}
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
