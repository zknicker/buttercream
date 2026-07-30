import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";
import { DitherBand } from "./dither-band.tsx";

/*
 * The shell's category header: a pixel-mono label, then the dither rule running out to the edge.
 *
 * Header and divider share one line, so the band starts where the title ends and reads as a rule
 * the heading sits in rather than a stripe stacked above it. Three details make the band work, and
 * they are worth stating because every one of them was arrived at by getting it wrong first:
 *
 * Even, not fading. A dissolving band carries its weight at the solid end, so it can never look
 * vertically centred beside a word. A flat field can.
 *
 * Two rows, not four. Three-pixel cells over six pixels lands on exactly an alternating checker and
 * stays a rule; at four rows the field starts reading as a band of texture with its own presence.
 *
 * Masked at both ends. This is the detail that reads as craft: the field fades in after the heading
 * and out before the edge, so it never butts hard against either.
 *
 * Neutral, not butter. At full strength the band competed with the values it exists to separate;
 * the muted tone lets the pattern carry the brand instead of the hue.
 *
 * It lives in the kit rather than beside the controls rail because the rail is no longer its only
 * caller — the workspace index heads its grid the same way. Two copies had already drifted apart
 * once; a third would have been the one that stayed wrong.
 */
export function SectionHeading({
  children,
  className,
  count,
  level = 2,
  title,
}: {
  /** Trailing slot, after the rule — a control, a badge, anything the section acts on. */
  children?: ReactNode;
  className?: string;
  count?: number;
  /** A page's own heading is an h1; a section inside a panel is an h2. */
  level?: 1 | 2;
  title: string;
}): ReactElement {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className={classes("flex items-center gap-3", className)}>
      {/*
       * The pixel mono the wordmark uses, at a size it can actually be read at. An earlier note
       * argued for small sans on the grounds that a section header should recede — but receding
       * and being characterless are not the same thing, and at eleven pixels it was doing the
       * second. Departure Mono carries the brand at the one point where a label is the only thing
       * on the line.
       */}
      <Heading className="shrink-0 font-mono text-[13px] tracking-tight text-shell-muted">
        {title}
      </Heading>
      <DitherBand
        aria-hidden
        className="min-w-0 flex-1 text-fg/25 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        density={0.5}
        height={6}
        pixel={3}
      />
      {count === undefined ? null : (
        <span className="shrink-0 font-mono text-[11px] tabular-nums text-shell-muted">
          {count}
        </span>
      )}
      {children}
    </div>
  );
}
