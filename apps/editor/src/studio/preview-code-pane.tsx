import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/index.ts";

/*
 * The Code view of a preview page: the same file the bundler renders, as text. Chrome, not
 * artifact — the reader is inspecting how the preview is built, so it keeps the shell's own
 * type and colours rather than the theme being edited.
 */
export function PreviewCodePane({ source }: { source: string }): ReactElement {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copy = () => {
    void navigator.clipboard.writeText(source).then(() => {
      setCopied(true);
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="relative min-h-full bg-raised">
      {/* Wrapped because the shell Button positions itself relative for its own spinner. */}
      <span className="absolute top-3 right-3">
        <Button onClick={copy} size="sm" variant="secondary">
          {copied ? "Copied" : "Copy"}
        </Button>
      </span>
      <pre className="overflow-x-auto p-6 font-mono text-xs leading-6 text-fg">
        <code>{source}</code>
      </pre>
    </div>
  );
}
