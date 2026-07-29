import { useClerk, useUser } from "@clerk/tanstack-react-start";
import { HugeiconsIcon } from "@hugeicons/react";
import AccountSetting01Icon from "@hugeicons-pro/core-stroke-rounded/AccountSetting01Icon";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import ComputerIcon from "@hugeicons-pro/core-stroke-rounded/ComputerIcon";
import Logout03Icon from "@hugeicons-pro/core-stroke-rounded/Logout03Icon";
import Moon02Icon from "@hugeicons-pro/core-stroke-rounded/Moon02Icon";
import Sun01Icon from "@hugeicons-pro/core-stroke-rounded/Sun01Icon";
import { type ReactElement, useCallback } from "react";
import { type ShellThemePreference, useShellTheme } from "../shell-theme.ts";
import { Menu } from "../ui/index.ts";

/*
 * Replaces Clerk's own UserButton so the trigger and menu are ours: a bordered pill
 * matching the rest of the topbar, and a menu that carries the appearance control
 * alongside the account links. Clerk still owns the profile dialog itself — that is a
 * lot of surface to rebuild for no gain — so "Manage account" opens its modal.
 */

const APPEARANCE: readonly {
  icon: typeof Sun01Icon;
  label: string;
  value: ShellThemePreference;
}[] = [
  { icon: Sun01Icon, label: "Light", value: "light" },
  { icon: Moon02Icon, label: "Dark", value: "dark" },
  { icon: ComputerIcon, label: "System", value: "system" },
];

export function AccountMenu(): ReactElement | null {
  const { openUserProfile, signOut } = useClerk();
  const { user } = useUser();
  const { preference, setPreference } = useShellTheme();

  const manageAccount = useCallback(() => openUserProfile(), [openUserProfile]);
  const logOut = useCallback(() => void signOut({ redirectUrl: "/" }), [signOut]);
  const changeAppearance = useCallback(
    (value: string) => setPreference(value as ShellThemePreference),
    [setPreference],
  );

  if (!user) {
    return null;
  }

  const displayName = user.fullName ?? user.firstName ?? "Account";
  const email = user.primaryEmailAddress?.emailAddress ?? "Signed-in account";

  return (
    <Menu>
      <Menu.Trigger
        aria-label={`Account menu for ${displayName}`}
        /* h-8.5 is the shell's md button height: the pill has to line up with whatever page
           action sits beside it, and it is the tallest thing in the topbar either way. */
        className="group flex h-8.5 shrink-0 items-center gap-1.5 rounded-full bg-raised py-0.5 pr-0.5 pl-2 ring-1 ring-line ring-inset transition-colors duration-150 hover:bg-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      >
        <HugeiconsIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted transition-transform duration-150 group-data-popup-open:rotate-180"
          icon={ArrowDown01Icon}
          size={16}
          strokeWidth={2}
        />
        <img
          alt=""
          className="size-7 shrink-0 rounded-full ring-1 ring-fg/10 ring-inset"
          draggable={false}
          height={28}
          src={user.imageUrl}
          width={28}
        />
      </Menu.Trigger>

      <Menu.Popup className="w-72">
        <div className="flex min-w-0 items-center gap-3 px-2.5 py-2">
          <img
            alt=""
            className="size-9 shrink-0 rounded-full ring-1 ring-fg/10 ring-inset"
            draggable={false}
            height={36}
            src={user.imageUrl}
            width={36}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-fg">{displayName}</p>
            <p className="truncate text-sm text-muted">{email}</p>
          </div>
        </div>

        <Menu.Item onClick={manageAccount}>
          <HugeiconsIcon
            aria-hidden="true"
            className="size-4 shrink-0"
            icon={AccountSetting01Icon}
            size={16}
            strokeWidth={2}
          />
          Manage account
        </Menu.Item>

        <Menu.Group>
          <Menu.GroupLabel>Appearance</Menu.GroupLabel>
          <Menu.RadioGroup onValueChange={changeAppearance} value={preference}>
            {APPEARANCE.map((option) => (
              <Menu.RadioItem key={option.value} value={option.value}>
                <HugeiconsIcon
                  aria-hidden="true"
                  className="size-4 shrink-0"
                  icon={option.icon}
                  size={16}
                  strokeWidth={2}
                />
                {option.label}
              </Menu.RadioItem>
            ))}
          </Menu.RadioGroup>
        </Menu.Group>

        <Menu.Separator />

        <Menu.Item onClick={logOut} variant="danger">
          <HugeiconsIcon
            aria-hidden="true"
            className="size-4 shrink-0"
            icon={Logout03Icon}
            size={16}
            strokeWidth={2}
          />
          Sign out
        </Menu.Item>
      </Menu.Popup>
    </Menu>
  );
}
