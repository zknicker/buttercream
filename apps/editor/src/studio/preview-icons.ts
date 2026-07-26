import type { DesignSystem } from "@buttercream/theme-core";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon as bulkRoundedAdd,
  Cancel01Icon as bulkRoundedClose,
  Delete02Icon as bulkRoundedDelete,
  Mail01Icon as bulkRoundedMail,
  MoreHorizontalIcon as bulkRoundedMore,
  Search01Icon as bulkRoundedSearch,
  Settings02Icon as bulkRoundedSettings,
  Upload01Icon as bulkRoundedUpload,
  UserGroupIcon as bulkRoundedUsers,
} from "@hugeicons-pro/core-bulk-rounded";
import {
  Add01Icon as duotoneRoundedAdd,
  Cancel01Icon as duotoneRoundedClose,
  Delete02Icon as duotoneRoundedDelete,
  Mail01Icon as duotoneRoundedMail,
  MoreHorizontalIcon as duotoneRoundedMore,
  Search01Icon as duotoneRoundedSearch,
  Settings02Icon as duotoneRoundedSettings,
  Upload01Icon as duotoneRoundedUpload,
  UserGroupIcon as duotoneRoundedUsers,
} from "@hugeicons-pro/core-duotone-rounded";
import {
  Add01Icon as duotoneStandardAdd,
  Cancel01Icon as duotoneStandardClose,
  Delete02Icon as duotoneStandardDelete,
  Mail01Icon as duotoneStandardMail,
  MoreHorizontalIcon as duotoneStandardMore,
  Search01Icon as duotoneStandardSearch,
  Settings02Icon as duotoneStandardSettings,
  Upload01Icon as duotoneStandardUpload,
  UserGroupIcon as duotoneStandardUsers,
} from "@hugeicons-pro/core-duotone-standard";
import {
  Add01Icon as solidRoundedAdd,
  Cancel01Icon as solidRoundedClose,
  Delete02Icon as solidRoundedDelete,
  Mail01Icon as solidRoundedMail,
  MoreHorizontalIcon as solidRoundedMore,
  Search01Icon as solidRoundedSearch,
  Settings02Icon as solidRoundedSettings,
  Upload01Icon as solidRoundedUpload,
  UserGroupIcon as solidRoundedUsers,
} from "@hugeicons-pro/core-solid-rounded";
import {
  Add01Icon as solidSharpAdd,
  Cancel01Icon as solidSharpClose,
  Delete02Icon as solidSharpDelete,
  Mail01Icon as solidSharpMail,
  MoreHorizontalIcon as solidSharpMore,
  Search01Icon as solidSharpSearch,
  Settings02Icon as solidSharpSettings,
  Upload01Icon as solidSharpUpload,
  UserGroupIcon as solidSharpUsers,
} from "@hugeicons-pro/core-solid-sharp";
import {
  Add01Icon as solidStandardAdd,
  Cancel01Icon as solidStandardClose,
  Delete02Icon as solidStandardDelete,
  Mail01Icon as solidStandardMail,
  MoreHorizontalIcon as solidStandardMore,
  Search01Icon as solidStandardSearch,
  Settings02Icon as solidStandardSettings,
  Upload01Icon as solidStandardUpload,
  UserGroupIcon as solidStandardUsers,
} from "@hugeicons-pro/core-solid-standard";
import {
  Add01Icon as strokeRoundedAdd,
  Cancel01Icon as strokeRoundedClose,
  Delete02Icon as strokeRoundedDelete,
  Mail01Icon as strokeRoundedMail,
  MoreHorizontalIcon as strokeRoundedMore,
  Search01Icon as strokeRoundedSearch,
  Settings02Icon as strokeRoundedSettings,
  Upload01Icon as strokeRoundedUpload,
  UserGroupIcon as strokeRoundedUsers,
} from "@hugeicons-pro/core-stroke-rounded";
import {
  Add01Icon as strokeSharpAdd,
  Cancel01Icon as strokeSharpClose,
  Delete02Icon as strokeSharpDelete,
  Mail01Icon as strokeSharpMail,
  MoreHorizontalIcon as strokeSharpMore,
  Search01Icon as strokeSharpSearch,
  Settings02Icon as strokeSharpSettings,
  Upload01Icon as strokeSharpUpload,
  UserGroupIcon as strokeSharpUsers,
} from "@hugeicons-pro/core-stroke-sharp";
import {
  Add01Icon as strokeStandardAdd,
  Cancel01Icon as strokeStandardClose,
  Delete02Icon as strokeStandardDelete,
  Mail01Icon as strokeStandardMail,
  MoreHorizontalIcon as strokeStandardMore,
  Search01Icon as strokeStandardSearch,
  Settings02Icon as strokeStandardSettings,
  Upload01Icon as strokeStandardUpload,
  UserGroupIcon as strokeStandardUsers,
} from "@hugeicons-pro/core-stroke-standard";
import {
  Add01Icon as twotoneRoundedAdd,
  Cancel01Icon as twotoneRoundedClose,
  Delete02Icon as twotoneRoundedDelete,
  Mail01Icon as twotoneRoundedMail,
  MoreHorizontalIcon as twotoneRoundedMore,
  Search01Icon as twotoneRoundedSearch,
  Settings02Icon as twotoneRoundedSettings,
  Upload01Icon as twotoneRoundedUpload,
  UserGroupIcon as twotoneRoundedUsers,
} from "@hugeicons-pro/core-twotone-rounded";
import {
  Ellipsis,
  type LucideIcon,
  Mail,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import { type ComponentProps, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

type IconSettings = DesignSystem["icons"];
type HugeiconsSettings = Extract<IconSettings, { family: "hugeicons" }>;
type IconData = ComponentProps<typeof HugeiconsIcon>["icon"];

export type PreviewIconName =
  | "add"
  | "close"
  | "delete"
  | "mail"
  | "more"
  | "search"
  | "settings"
  | "upload"
  | "users";

export type PreviewIcons = Record<PreviewIconName, string>;

const previewIconNames: PreviewIconName[] = [
  "add",
  "close",
  "delete",
  "mail",
  "more",
  "search",
  "settings",
  "upload",
  "users",
];

const lucideIcons = {
  add: Plus,
  close: X,
  delete: Trash2,
  mail: Mail,
  more: Ellipsis,
  search: Search,
  settings: Settings,
  upload: Upload,
  users: Users,
} satisfies Record<PreviewIconName, LucideIcon>;

// Keep package specifiers static so Vite can tree-shake each treatment to this preview vocabulary.
const hugeiconsByTreatment = {
  "bulk-rounded": hugeicons(
    bulkRoundedAdd,
    bulkRoundedClose,
    bulkRoundedDelete,
    bulkRoundedMail,
    bulkRoundedMore,
    bulkRoundedSearch,
    bulkRoundedSettings,
    bulkRoundedUpload,
    bulkRoundedUsers,
  ),
  "duotone-rounded": hugeicons(
    duotoneRoundedAdd,
    duotoneRoundedClose,
    duotoneRoundedDelete,
    duotoneRoundedMail,
    duotoneRoundedMore,
    duotoneRoundedSearch,
    duotoneRoundedSettings,
    duotoneRoundedUpload,
    duotoneRoundedUsers,
  ),
  "duotone-standard": hugeicons(
    duotoneStandardAdd,
    duotoneStandardClose,
    duotoneStandardDelete,
    duotoneStandardMail,
    duotoneStandardMore,
    duotoneStandardSearch,
    duotoneStandardSettings,
    duotoneStandardUpload,
    duotoneStandardUsers,
  ),
  "solid-rounded": hugeicons(
    solidRoundedAdd,
    solidRoundedClose,
    solidRoundedDelete,
    solidRoundedMail,
    solidRoundedMore,
    solidRoundedSearch,
    solidRoundedSettings,
    solidRoundedUpload,
    solidRoundedUsers,
  ),
  "solid-sharp": hugeicons(
    solidSharpAdd,
    solidSharpClose,
    solidSharpDelete,
    solidSharpMail,
    solidSharpMore,
    solidSharpSearch,
    solidSharpSettings,
    solidSharpUpload,
    solidSharpUsers,
  ),
  "solid-standard": hugeicons(
    solidStandardAdd,
    solidStandardClose,
    solidStandardDelete,
    solidStandardMail,
    solidStandardMore,
    solidStandardSearch,
    solidStandardSettings,
    solidStandardUpload,
    solidStandardUsers,
  ),
  "stroke-rounded": hugeicons(
    strokeRoundedAdd,
    strokeRoundedClose,
    strokeRoundedDelete,
    strokeRoundedMail,
    strokeRoundedMore,
    strokeRoundedSearch,
    strokeRoundedSettings,
    strokeRoundedUpload,
    strokeRoundedUsers,
  ),
  "stroke-sharp": hugeicons(
    strokeSharpAdd,
    strokeSharpClose,
    strokeSharpDelete,
    strokeSharpMail,
    strokeSharpMore,
    strokeSharpSearch,
    strokeSharpSettings,
    strokeSharpUpload,
    strokeSharpUsers,
  ),
  "stroke-standard": hugeicons(
    strokeStandardAdd,
    strokeStandardClose,
    strokeStandardDelete,
    strokeStandardMail,
    strokeStandardMore,
    strokeStandardSearch,
    strokeStandardSettings,
    strokeStandardUpload,
    strokeStandardUsers,
  ),
  "twotone-rounded": hugeicons(
    twotoneRoundedAdd,
    twotoneRoundedClose,
    twotoneRoundedDelete,
    twotoneRoundedMail,
    twotoneRoundedMore,
    twotoneRoundedSearch,
    twotoneRoundedSettings,
    twotoneRoundedUpload,
    twotoneRoundedUsers,
  ),
} satisfies Record<HugeiconsSettings["treatment"], Record<PreviewIconName, IconData>>;

export function createPreviewIcons(settings: IconSettings): PreviewIcons {
  return Object.fromEntries(
    previewIconNames.map((name) => [name, renderPreviewIcon(name, settings)]),
  ) as PreviewIcons;
}

function renderPreviewIcon(name: PreviewIconName, settings: IconSettings): string {
  if (settings.family === "lucide") {
    return renderToStaticMarkup(
      createElement(lucideIcons[name], {
        "aria-hidden": true,
        className: "preview-icon",
        size: settings.size,
        strokeWidth: settings.strokeWidth,
      }),
    );
  }

  return renderToStaticMarkup(
    createElement(HugeiconsIcon, {
      "aria-hidden": true,
      className: "preview-icon",
      icon: hugeiconsByTreatment[settings.treatment][name],
      size: settings.size,
      strokeWidth: settings.strokeWidth,
    }),
  );
}

function hugeicons(
  add: IconData,
  close: IconData,
  deleteIcon: IconData,
  mail: IconData,
  more: IconData,
  search: IconData,
  settings: IconData,
  upload: IconData,
  users: IconData,
): Record<PreviewIconName, IconData> {
  return {
    add,
    close,
    delete: deleteIcon,
    mail,
    more,
    search,
    settings,
    upload,
    users,
  };
}
