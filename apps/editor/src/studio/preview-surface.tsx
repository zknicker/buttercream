import type { CSSProperties, ReactElement, ReactNode } from "react";
import { createContext, useContext, useState } from "react";

const PreviewSurfaceContext = createContext<HTMLElement | null>(null);

/**
 * The themed wrapper element the preview renders into. Base UI portals default to
 * document.body, which sits outside the themed subtree — an overlay portalled there would
 * render unthemed. Specimens that open overlays pass this element as the portal container
 * instead. Null only until the surface mounts, which Base UI treats as "use the default".
 */
export function usePreviewSurface(): HTMLElement | null {
  return useContext(PreviewSurfaceContext);
}

interface PreviewSurfaceProps {
  children: ReactNode;
  /** User-authored CSS; scoped so it can restyle specimens but never the editor chrome. */
  customCss: string;
  /** Theme tokens as custom properties, inline so control drags repaint without a stylesheet re-parse. */
  style: CSSProperties;
  theme: "light" | "dark";
}

export function PreviewSurface({
  children,
  customCss,
  style,
  theme,
}: PreviewSurfaceProps): ReactElement {
  /*
   * State rather than a ref: the element does not exist on first render, and overlay
   * specimens need a re-render once it does so their portals pick up the container.
   */
  const [surface, setSurface] = useState<HTMLElement | null>(null);
  const scopedCss = customCss.trim();

  return (
    <div className="preview-surface" data-theme={theme} ref={setSurface} style={style}>
      {scopedCss ? (
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: @scope confines the user's own CSS to the surface; the sandbox iframe it replaces offered the same containment.
          dangerouslySetInnerHTML={{
            __html: `@scope (.preview-surface) {\n${scopedCss}\n}`,
          }}
        />
      ) : null}
      <PreviewSurfaceContext.Provider value={surface}>{children}</PreviewSurfaceContext.Provider>
    </div>
  );
}
