import { HugeiconsIcon } from "@hugeicons/react";
import Add01Icon from "@hugeicons-pro/core-stroke-rounded/Add01Icon";
import { useNavigate } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { useState } from "react";
import { SiteHeader } from "../marketing/site-header.tsx";
import { createDesignSystemFn } from "../server/design-system-functions.ts";
import type { DesignSystemCardData } from "../server/design-systems.ts";
import { SectionHeading } from "../ui/index.ts";
import { DesignSystemCard } from "./design-system-card.tsx";

/*
 * The workspace index: every design system this account owns, each showing itself rather than a
 * name in a list. Picking one opens the editor at /ds/$id.
 *
 * This is a work surface, not a marketing surface. It carries no display-serif hero, no fading
 * dither bands, and no site footer — the brand voice on the rest of the site is deliberately absent
 * here for the same reason the studio chrome is quiet (ADR 0009): the user is looking at their own
 * design systems, and the page around them should not compete. What is left is a heading and a
 * grid, and the heading is the same pixel-mono-plus-dither-rule the controls rail uses.
 *
 * It holds the site measure all the same. Quiet is a matter of type and colour; width is a matter
 * of where the logo sits, and this page used to span the viewport while every other page was a
 * centred column — so arriving here from the homepage slid the wordmark forty pixels left and
 * threw the whole grid outward. The studio is the one surface that earns full bleed, because it is
 * the one surface whose content is the whole screen.
 */

export function DesignSystemsPage({
  designSystems,
}: {
  designSystems: DesignSystemCardData[];
}): ReactElement {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [failed, setFailed] = useState(false);

  /*
   * The failure this catches is a lapsed session: the loader rendered the page while signed in,
   * the session expired while it sat open, and the create rejects with "Sign in to continue".
   * Without the catch the rejection disappears into the void operator and the tile simply does
   * nothing when clicked, which is the worst of the available behaviours.
   */
  const create = async () => {
    setCreating(true);
    setFailed(false);
    try {
      const created = await createDesignSystemFn({ data: { name: "Untitled design system" } });
      await navigate({ params: { id: created.id }, to: "/ds/$id" });
    } catch {
      setFailed(true);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="isolate flex min-h-dvh flex-col">
      <SiteHeader current="designs" />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pt-6 pb-20 lg:px-10">
        <SectionHeading
          className="pb-1"
          level={1}
          title="Design systems"
          {...(designSystems.length === 0 ? {} : { count: designSystems.length })}
        />

        {failed ? (
          <p className="mt-4 text-base text-berry sm:text-sm">
            Could not create a design system. Your session may have expired —{" "}
            <button
              className="underline underline-offset-2 hover:no-underline"
              onClick={() => window.location.reload()}
              type="button"
            >
              reload the page
            </button>{" "}
            and try again.
          </p>
        ) : null}

        {/*
         * auto-fill rather than a breakpoint ladder: the track size is what should stay constant,
         * so one system reads as one card instead of stretching across a third of the page, and
         * the column count follows the container on its own.
         */}
        <ul
          className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(min(100%,19rem),1fr))] gap-4"
          role="list"
        >
          {designSystems.map((designSystem) => (
            <li key={designSystem.id}>
              <DesignSystemCard designSystem={designSystem} />
            </li>
          ))}
          <li>
            <CreateCard creating={creating} onCreate={() => void create()} />
          </li>
        </ul>
      </main>
    </div>
  );
}

/*
 * The only way to make a design system, and a permanent member of the grid rather than a state the
 * page falls into when empty.
 *
 * It replaced a button in the heading. A toolbar button and a placeholder tile were two controls
 * for one job, and the tile is the better of the two: it is card-shaped and card-sized, so the
 * grid always ends on the shape it is made of, and the target is the whole tile rather than a
 * thirty-four pixel strip. With nothing else in the grid it is the empty state, unchanged — which
 * is the point, because an empty workspace and a workspace with room for one more are the same
 * invitation.
 */
function CreateCard({
  creating,
  onCreate,
}: {
  creating: boolean;
  onCreate: () => void;
}): ReactElement {
  return (
    <button
      /*
       * Both `aspect-16/10` and `h-full`: alone in the grid there is no row to fill, so the aspect
       * gives it a card's shape; beside real cards the row is taller than that — a card is a
       * preview plus a footer — and `h-full` takes the rest so the row ends level.
       */
      className="flex aspect-16/10 h-full w-full flex-col items-center justify-center gap-3 rounded-(--radius-shell) border border-dashed border-fg/15 px-6 text-center hover:border-fg/30 hover:bg-fg/3 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-fg disabled:opacity-50"
      disabled={creating}
      onClick={onCreate}
      type="button"
    >
      {/*
       * Butter on the glyph alone. The tile is the page's primary action but it is not a filled
       * button, so the accent marks the one spot that says "this does something" without turning a
       * card-sized surface into a card-sized button.
       */}
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-butter text-ink">
        <HugeiconsIcon aria-hidden="true" icon={Add01Icon} size={22} strokeWidth={2} />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-base font-medium text-fg sm:text-sm">New design system</span>
        <span className="max-w-[32ch] text-base text-pretty text-muted sm:text-sm">
          Start from the Buttercream defaults and make it yours.
        </span>
      </span>
    </button>
  );
}
