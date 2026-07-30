import { HugeiconsIcon } from "@hugeicons/react";
import Add01Icon from "@hugeicons-pro/core-stroke-rounded/Add01Icon";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import Copy01Icon from "@hugeicons-pro/core-stroke-rounded/Copy01Icon";
import GridViewIcon from "@hugeicons-pro/core-stroke-rounded/GridViewIcon";
import PencilEdit02Icon from "@hugeicons-pro/core-stroke-rounded/PencilEdit02Icon";
import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { useState } from "react";
import {
  createDesignSystemFn,
  duplicateDesignSystemFn,
  listDesignSystemCardsFn,
} from "../server/design-system-functions.ts";
import type { DesignSystemCardData } from "../server/design-systems.ts";
import { CupcakeMark, Menu } from "../ui/index.ts";

/*
 * The editor topbar's identity control. It reads as a label, but it is the way back out: to the
 * workspace, to a sibling system, or to a new one. Without it the editor is a room with no door,
 * and the chevron beside the name promised one long before there was anything behind it.
 *
 * The sibling list is fetched when the menu first opens, never in the route loader — the editor
 * should not pay for a list of things it is not showing.
 */
export function DesignSystemFileMenu({
  designSystemId,
  name,
  onRename,
}: {
  designSystemId: string;
  name: string;
  onRename: () => void;
}): ReactElement {
  const navigate = useNavigate();
  const [siblings, setSiblings] = useState<DesignSystemCardData[] | null>(null);
  const [busy, setBusy] = useState(false);

  const loadSiblings = async () => {
    if (siblings) {
      return;
    }
    const result = await listDesignSystemCardsFn();
    setSiblings(result.designSystems);
  };

  const create = async () => {
    setBusy(true);
    try {
      const created = await createDesignSystemFn({ data: { name: "Untitled design system" } });
      await navigate({ params: { id: created.id }, to: "/ds/$id" });
    } finally {
      setBusy(false);
    }
  };

  const duplicate = async () => {
    setBusy(true);
    try {
      const result = await duplicateDesignSystemFn({ data: designSystemId });
      if (result.status === "duplicated") {
        await navigate({ params: { id: result.id }, to: "/ds/$id" });
      }
    } finally {
      setBusy(false);
    }
  };

  const others = (siblings ?? []).filter((system) => system.id !== designSystemId);

  return (
    <Menu onOpenChange={(open) => open && void loadSiblings()}>
      <Menu.Trigger
        aria-label={`${name} — design system menu`}
        className="flex min-w-0 max-w-40 items-center gap-1.5 rounded-(--radius-shell) px-2 py-1 text-fg hover:bg-fg/6 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-fg min-[721px]:max-w-60"
      >
        {/*
         * Optically aligned, not geometrically. The cupcake's mass sits in the lower two thirds
         * of its grid — stem and cherry occupy the top rows — so centring the box leaves the ink
         * sitting visibly low against the wordmark.
         */}
        <CupcakeMark className="-mt-0.5" size={16} />
        <span className="truncate text-sm font-medium">{name}</span>
        <HugeiconsIcon
          aria-hidden="true"
          className="shrink-0 text-shell-muted transition-transform duration-150 group-data-popup-open:rotate-180"
          icon={ArrowDown01Icon}
          size={14}
          strokeWidth={2}
        />
      </Menu.Trigger>

      <Menu.Popup align="start" className="w-64">
        <Menu.Item nativeButton={false} render={<Link to="/systems" />}>
          <HugeiconsIcon
            aria-hidden="true"
            className="size-4 shrink-0"
            icon={GridViewIcon}
            size={16}
            strokeWidth={2}
          />
          All design systems
        </Menu.Item>

        {others.length ? (
          <Menu.Group>
            <Menu.GroupLabel>Switch to</Menu.GroupLabel>
            {others.slice(0, 6).map((system) => (
              <Menu.Item
                key={system.id}
                nativeButton={false}
                render={<Link params={{ id: system.id }} to="/ds/$id" />}
              >
                <span
                  aria-hidden="true"
                  className="size-3 shrink-0 rounded-full ring-1 ring-fg/15 ring-inset"
                  style={{ background: system.theme.light.colors.accent }}
                />
                <span className="truncate">{system.name}</span>
              </Menu.Item>
            ))}
          </Menu.Group>
        ) : null}

        <Menu.Separator />

        <Menu.Item disabled={busy} onClick={() => void create()}>
          <HugeiconsIcon
            aria-hidden="true"
            className="size-4 shrink-0"
            icon={Add01Icon}
            size={16}
            strokeWidth={2}
          />
          New design system
        </Menu.Item>
        <Menu.Item disabled={busy} onClick={() => void duplicate()}>
          <HugeiconsIcon
            aria-hidden="true"
            className="size-4 shrink-0"
            icon={Copy01Icon}
            size={16}
            strokeWidth={2}
          />
          Duplicate
        </Menu.Item>
        <Menu.Item onClick={onRename}>
          <HugeiconsIcon
            aria-hidden="true"
            className="size-4 shrink-0"
            icon={PencilEdit02Icon}
            size={16}
            strokeWidth={2}
          />
          Rename
        </Menu.Item>
      </Menu.Popup>
    </Menu>
  );
}
