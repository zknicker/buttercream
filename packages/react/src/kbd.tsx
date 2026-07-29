"use client";

import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { classes } from "./classes.ts";

export type KbdKey =
  | "command"
  | "shift"
  | "ctrl"
  | "option"
  | "alt"
  | "win"
  | "enter"
  | "delete"
  | "escape"
  | "tab"
  | "capslock"
  | "up"
  | "right"
  | "down"
  | "left"
  | "pageup"
  | "pagedown"
  | "home"
  | "end"
  | "help"
  | "space"
  | "fn";

export type KbdVariant = "default" | "light";

/** Symbol rendered for each named key. */
const KBD_KEY_SYMBOLS: Record<KbdKey, string> = {
  command: "⌘",
  shift: "⇧",
  ctrl: "⌃",
  option: "⌥",
  alt: "⌥",
  win: "⌘",
  enter: "↵",
  delete: "⌫",
  escape: "⎋",
  tab: "⇥",
  capslock: "⇪",
  up: "↑",
  right: "→",
  down: "↓",
  left: "←",
  pageup: "⇞",
  pagedown: "⇟",
  home: "↖",
  end: "↘",
  help: "?",
  space: "␣",
  fn: "Fn",
};

/** Accessible name for each named key, used as the rendered symbol's title. */
const KBD_KEY_LABELS: Record<KbdKey, string> = {
  command: "Command",
  shift: "Shift",
  ctrl: "Control",
  option: "Option",
  alt: "Alt",
  win: "Win",
  enter: "Enter",
  delete: "Delete",
  escape: "Escape",
  tab: "Tab",
  capslock: "Caps Lock",
  up: "Up",
  right: "Right",
  down: "Down",
  left: "Left",
  pageup: "Page Up",
  pagedown: "Page Down",
  home: "Home",
  end: "End",
  help: "Help",
  space: "Space",
  fn: "Fn",
};

export interface KbdProps extends ComponentPropsWithoutRef<"kbd"> {
  /** Named modifier/special keys, rendered as symbols before `children`. Accepts one key or a chord. */
  keys?: KbdKey | KbdKey[];
  variant?: KbdVariant;
}

/** A keyboard key or chord. Renders a native `<kbd>`, which already carries the semantics. */
export function Kbd({
  children,
  className,
  keys,
  variant = "default",
  ...props
}: KbdProps): ReactElement {
  const keyList = keys == null ? [] : Array.isArray(keys) ? keys : [keys];

  return (
    <kbd
      className={classes("kbd", variant !== "default" && `kbd--${variant}`, className)}
      data-slot="kbd"
      {...props}
    >
      {keyList.map((key) => (
        <abbr key={key} className="kbd__abbr" title={KBD_KEY_LABELS[key]}>
          {KBD_KEY_SYMBOLS[key]}
        </abbr>
      ))}
      {children}
    </kbd>
  );
}
