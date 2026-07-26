import { useCallback, useEffect, useState } from "react";

/*
 * The shell's own light/dark state. Deliberately separate from the design system's
 * theme: this drives `data-shell-theme` on <html>, while the edited theme drives
 * `data-theme` inside the preview iframe. The studio toggle happens to move both,
 * but they remain two independent token sets.
 */

export type ShellTheme = "light" | "dark";

export const SHELL_THEME_STORAGE_KEY = "buttercream:shell-theme";

/**
 * Runs before first paint so the correct theme is on <html> by the time anything
 * renders. Inlined into the document head as a string — keep it dependency-free.
 */
export const SHELL_THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  SHELL_THEME_STORAGE_KEY,
)});var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.shellTheme=d?"dark":"light";}catch(e){}})();`;

function readShellTheme(): ShellTheme {
  return document.documentElement.dataset.shellTheme === "dark" ? "dark" : "light";
}

function applyShellTheme(theme: ShellTheme): void {
  document.documentElement.dataset.shellTheme = theme;
  try {
    localStorage.setItem(SHELL_THEME_STORAGE_KEY, theme);
  } catch {
    // Private browsing or a blocked store — the attribute still applies for this session.
  }
}

export function useShellTheme(): {
  setTheme: (theme: ShellTheme) => void;
  theme: ShellTheme;
  toggleTheme: () => void;
} {
  /*
   * Starts as "light" rather than reading the DOM, because the server has no idea
   * what the client resolved and a mismatch would trip hydration. The document is
   * already painted in the right theme by the init script; only this component's
   * icon settles on mount.
   */
  const [theme, setThemeState] = useState<ShellTheme>("light");

  useEffect(() => {
    setThemeState(readShellTheme());
  }, []);

  const setTheme = useCallback((next: ShellTheme) => {
    applyShellTheme(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next = current === "dark" ? "light" : "dark";
      applyShellTheme(next);
      return next;
    });
  }, []);

  return { setTheme, theme, toggleTheme };
}
