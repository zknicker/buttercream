import { useCallback, useEffect, useState } from "react";

/*
 * The shell's own light/dark state. Deliberately separate from the design system's
 * theme: this drives `data-shell-theme` on <html>, while the edited theme drives
 * `data-theme` inside the preview iframe. The studio toggle happens to move both,
 * but they remain two independent token sets.
 *
 * Two related values, kept distinct on purpose:
 *   preference — what the user chose: light, dark, or follow the OS
 *   theme      — what is actually painted: light or dark
 * "System" is a real stored state, not the absence of a choice, so selecting it has to
 * resume tracking the OS rather than freezing on whatever was resolved last.
 */

export type ShellTheme = "light" | "dark";
export type ShellThemePreference = ShellTheme | "system";

export const SHELL_THEME_STORAGE_KEY = "buttercream:shell-theme";

/**
 * Runs before first paint so the correct theme is on <html> by the time anything
 * renders. Inlined into the document head as a string — keep it dependency-free.
 */
export const SHELL_THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  SHELL_THEME_STORAGE_KEY,
)});var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.shellTheme=d?"dark":"light";}catch(e){}})();`;

const DARK_QUERY = "(prefers-color-scheme: dark)";

function readPreference(): ShellThemePreference {
  try {
    const stored = localStorage.getItem(SHELL_THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // Blocked store — fall through to following the OS.
  }
  return "system";
}

function resolve(preference: ShellThemePreference): ShellTheme {
  if (preference === "system") {
    return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
  }
  return preference;
}

function apply(theme: ShellTheme): void {
  document.documentElement.dataset.shellTheme = theme;
}

function persist(preference: ShellThemePreference): void {
  try {
    if (preference === "system") {
      // Absence of a stored value is what the init script reads as "follow the OS".
      localStorage.removeItem(SHELL_THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(SHELL_THEME_STORAGE_KEY, preference);
    }
  } catch {
    // Private browsing — the attribute still applies for this session.
  }
}

export function useShellTheme(): {
  preference: ShellThemePreference;
  setPreference: (preference: ShellThemePreference) => void;
  theme: ShellTheme;
  toggleTheme: () => void;
} {
  /*
   * Both start at their SSR-safe defaults rather than reading the DOM, because the
   * server cannot know what the client resolved and a mismatch would trip hydration.
   * The document is already painted correctly by the init script; only this hook's
   * own view of it settles on mount.
   */
  const [preference, setPreferenceState] = useState<ShellThemePreference>("system");
  const [theme, setThemeState] = useState<ShellTheme>("light");

  useEffect(() => {
    const stored = readPreference();
    setPreferenceState(stored);
    setThemeState(resolve(stored));
  }, []);

  // An OS change only means something while the preference is to follow it.
  useEffect(() => {
    if (preference !== "system") {
      return;
    }
    const media = window.matchMedia(DARK_QUERY);
    const sync = () => {
      const next: ShellTheme = media.matches ? "dark" : "light";
      apply(next);
      setThemeState(next);
    };
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [preference]);

  const setPreference = useCallback((next: ShellThemePreference) => {
    persist(next);
    setPreferenceState(next);
    const resolved = resolve(next);
    apply(resolved);
    setThemeState(resolved);
  }, []);

  /** Flips whatever is painted now, pinning the result explicitly. */
  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next: ShellTheme = current === "dark" ? "light" : "dark";
      persist(next);
      setPreferenceState(next);
      apply(next);
      return next;
    });
  }, []);

  return { preference, setPreference, theme, toggleTheme };
}
