import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

/*
 * A preview page that reports the theme has to read the theme back out of the DOM. A hardcoded
 * hex would keep saying #1B1B1B after the accent moved, and a page that lies about the system is
 * worse than no page.
 *
 * Both the Guides sheet and the Brand summary need this, which is why it lives here rather than
 * beside either of them.
 */
export function useResolvedTokens(names: readonly string[]): {
  ref: RefObject<HTMLDivElement | null>;
  value: (name: string) => string;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const host = ref.current;
    if (host === null) {
      return;
    }

    /*
     * Reading the custom property back gives whatever was declared, which for a generated
     * neutral is the generator expression rather than a colour. Painting each token onto a
     * probe and reading `color` back makes the browser resolve it, so the page reports the
     * colour you actually get.
     */
    const read = (): void => {
      const styles = getComputedStyle(host);
      const probe = document.createElement("span");
      probe.style.display = "none";
      host.appendChild(probe);

      const resolve = (name: string): string => {
        const declared = styles.getPropertyValue(name).trim();
        if (!declared.startsWith("oklch(from") && !declared.startsWith("color-mix(")) {
          return declared;
        }
        probe.style.color = `var(${name})`;
        return getComputedStyle(probe).color || declared;
      };

      setValues(Object.fromEntries(names.map((name) => [name, resolve(name)])));
      probe.remove();
    };

    read();

    /* The Style panel writes tokens as an inline style on an ancestor, so watch for that. */
    const surface = host.closest(".preview-surface");
    if (surface === null) {
      return;
    }

    const observer = new MutationObserver(read);
    observer.observe(surface, { attributeFilter: ["style", "data-theme"] });
    return () => observer.disconnect();
  }, [names]);

  return { ref, value: (name) => values[name] ?? "" };
}
