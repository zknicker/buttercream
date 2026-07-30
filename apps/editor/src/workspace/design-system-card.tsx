import { themeCssVariables } from "@buttercream/theme-core";
import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactElement } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
/* The preview stylesheet the miniature is dressed by — the same one the studio pulls in. */
import "../styles/preview.css";
import type { DesignSystemCardData } from "../server/design-systems.ts";
import { useShellTheme } from "../shell-theme.ts";
import { PreviewSurface } from "../studio/preview-surface.tsx";
import { Card, DitherBand } from "../ui/index.ts";
import { DesignSystemMenu } from "./design-system-menu.tsx";
import { DesignSystemMiniature } from "./design-system-miniature.tsx";

/*
 * The stage the miniature is laid out at before it is scaled down. Fixed rather than fluid so
 * every card composes identically: the surface is a container query root, so laying out at the
 * card's real width would collapse each miniature into its narrow variant and, worse, would
 * make cards compose differently at different grid widths. Scaling a desktop-width layout keeps
 * the design system's rem-based radius and spacing proportional to the artwork.
 */
const STAGE_WIDTH = 1000;
const STAGE_HEIGHT = 625;
/* Only ever rendered by the server, which has no width to measure; the client corrects it before paint. */
const INITIAL_SCALE = 0.34;

/*
 * The measurement has to land before the browser paints, or the first frame shows the miniature at
 * the server's guess — cropped on a narrow viewport, floating in a gap on a wide one. A layout
 * effect does that; on the server there is nothing to measure and nothing to paint, so it falls
 * back to the passive effect purely to keep React from warning.
 */
const useMeasureBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function DesignSystemCard({
  designSystem,
}: {
  designSystem: DesignSystemCardData;
}): ReactElement {
  const { theme } = useShellTheme();
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(INITIAL_SCALE);

  useMeasureBeforePaint(() => {
    const element = frame.current;
    if (!element) {
      return;
    }

    setScale(element.getBoundingClientRect().width / STAGE_WIDTH);

    const observer = new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width;
      if (width) {
        setScale(width / STAGE_WIDTH);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const themeVariables = useMemo(
    () => themeCssVariables(designSystem.theme[theme]) as CSSProperties,
    [designSystem.theme, theme],
  );

  return (
    /*
     * `variant="transparent"` drops the Card's own inset ring. An inset ring is painted inside the
     * border box and therefore *underneath* children — and the preview is an opaque child covering
     * everything above the footer, so the default card ring only ever showed along the footer
     * strip. The ring is drawn as an overlay below instead, above every child, so the whole
     * perimeter responds.
     */
    <Card className="group relative flex flex-col overflow-hidden bg-raised" variant="transparent">
      {/*
       * Deliberately no `content-visibility: auto` here. It is the obvious optimisation for a
       * grid of live previews, and it does defer off-screen work — but the browser's
       * relevant-to-user heuristic misjudges a transform-scaled subtree, and cards that are
       * plainly on screen paint blank for a frame or more. Every card is laid out identically
       * either way, so the only thing it bought was a flash. At this card count the previews are
       * cheap enough (roughly eighteen mounts each, no charts, no animation) to just render.
       */}
      <div className="relative aspect-16/10 overflow-hidden border-b border-fg/10" ref={frame}>
        {/*
         * inert rather than aria-hidden plus pointer-events: it removes the subtree from the
         * accessibility tree, the tab order, and hit-testing in one, so the controls inside can
         * be rendered in a representative state without becoming fake interactive elements.
         */}
        <div
          className="miniature-stage absolute top-0 left-0 origin-top-left"
          inert
          style={{
            height: `${STAGE_HEIGHT}px`,
            transform: `scale(${scale})`,
            width: `${STAGE_WIDTH}px`,
          }}
        >
          <PreviewSurface customCss={designSystem.customCss} style={themeVariables} theme={theme}>
            <DesignSystemMiniature icons={designSystem.icons} />
          </PreviewSurface>
        </div>

        {/*
         * A scrim under the menu button, on the same hover as the button itself. Its job is not
         * the button's own contrast — that comes from its opaque surface — but the noise behind
         * it: the top of the miniature is where the specimen puts its own header and buttons, and
         * a control sitting on that reads as part of the picture. Blacking that band out gives
         * the chip a quiet field, and it works whichever way the user's theme runs because it
         * darkens a light preview and flattens a dark one.
         *
         * Ordered dither rather than a smooth gradient. A linear fade over somebody else's
         * interface reads as a rendering artefact — a smudge on their work. The Bayer band is a
         * texture instead: it is unmistakably deliberate, it is the brand's own motif, and it is
         * the one treatment on this page that could not be mistaken for part of the preview.
         * Chunky cells on purpose; at 2px the stipple dissolves into noise at card scale.
         *
         * Butter rather than a neutral. It stops being a scrim that hides the preview and becomes
         * a brand mark laid over it — and because it is the one hue no design system in the grid
         * can coincidentally match, it separates from a warm preview as cleanly as a cool one. The
         * menu button switches to the fixed ink/parchment pair to sit on it, per ADR 0009: those
         * tokens exist precisely for the case where the surface underneath is known.
         */}
        <DitherBand
          className="pointer-events-none absolute inset-x-0 top-0 z-1 text-butter opacity-0 group-hover:opacity-100 max-sm:opacity-100"
          height={132}
          pixel={4}
        />

        {/*
         * Over the preview rather than in the footer: it keeps the footer to one dense row of
         * name and timestamp, and it is where the reference puts it. z-2 clears the stretched
         * link's ::after, which paints above this subtree by DOM order.
         */}
        <div className="absolute top-2 right-2 z-2">
          <DesignSystemMenu designSystem={designSystem} />
        </div>
      </div>

      {/*
       * Outside the themed surface, not inside it: the card's own chrome is shell-token
       * territory, and nesting it under the preview would let a user's tokens repaint it
       * (invariant 4).
       */}
      <footer className="flex items-center justify-between gap-3 px-3 py-2.5">
        {/*
         * The link stretches over the whole card, so the name is the accessible name for the
         * entire tile and there is no second, competing hit target.
         */}
        <Link
          className="min-w-0 truncate text-base font-medium text-fg after:absolute after:inset-0 after:content-[''] focus-visible:outline-none sm:text-sm"
          params={{ id: designSystem.id }}
          to="/ds/$id"
        >
          {designSystem.name}
        </Link>
        {/* Relative to the reader's clock, so the server's render is necessarily stale. */}
        <time
          className="shrink-0 font-mono text-sm text-shell-muted tabular-nums sm:text-xs"
          dateTime={new Date(designSystem.updatedAt).toISOString()}
          suppressHydrationWarning
          title={`Updated ${formatUpdated(designSystem.updatedAt, "long")}`}
        >
          {/* `time` takes no ARIA label, so the two widths are swapped in the markup instead. */}
          <span aria-hidden="true">{formatUpdated(designSystem.updatedAt)}</span>
          <span className="sr-only">Updated {formatUpdated(designSystem.updatedAt, "long")}</span>
        </time>
      </footer>

      {/*
       * The card's edge and its hover state, drawn above every child so the preview cannot paint
       * over it. It doubles as the app-mockup edge treatment the preview would otherwise carry:
       * one ring around the whole tile reads as a frame, where two competing outlines read as a
       * seam.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-3 rounded-(--radius-shell) ring-1 ring-fg/10 ring-inset group-hover:ring-fg/30 group-focus-within:ring-fg/30"
      />
    </Card>
  );
}

const UNITS: readonly { limit: number; name: Intl.RelativeTimeFormatUnit; step: number }[] = [
  { limit: 60_000, name: "second", step: 1000 },
  { limit: 3_600_000, name: "minute", step: 60_000 },
  { limit: 86_400_000, name: "hour", step: 3_600_000 },
  { limit: 2_592_000_000, name: "day", step: 86_400_000 },
  { limit: 31_536_000_000, name: "month", step: 2_592_000_000 },
];

/*
 * Two widths of the same fact. The card shows the narrow form ("3h ago") because the footer is one
 * dense row and the name deserves the space; assistive tech and the tooltip get the long form,
 * which is the one that actually reads as a sentence.
 */
function formatUpdated(timestamp: number, style: "narrow" | "long" = "narrow"): string {
  const elapsed = Date.now() - timestamp;
  if (elapsed < 60_000) {
    return "just now";
  }

  const format = new Intl.RelativeTimeFormat(undefined, { numeric: "auto", style });
  const unit = UNITS.find(({ limit }) => elapsed < limit);
  return unit
    ? format.format(-Math.floor(elapsed / unit.step), unit.name)
    : format.format(-Math.floor(elapsed / 31_536_000_000), "year");
}
