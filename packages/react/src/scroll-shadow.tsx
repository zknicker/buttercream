"use client";

import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { classes } from "./classes.ts";

export type ScrollShadowOrientation = "horizontal" | "vertical";

/** Which edges still have content past them, and so carry the fade. */
type ScrollShadowEdges = "both" | "end" | "none" | "start";

export interface ScrollShadowProps extends ComponentPropsWithoutRef<"div"> {
  /** Hide the native scrollbar. Scrolling itself stays native. */
  hideScrollBar?: boolean;
  orientation?: ScrollShadowOrientation;
}

/*
 * A native scroll container that fades content out toward any edge it can still scroll past —
 * the reference's ScrollShadow. The fade is a CSS mask keyed off data-shadow; the JS only
 * decides which edges have more content. Purely presentational, which is why no Base UI
 * primitive is involved: scrolling stays native and the scrollbar is only ever hidden,
 * never rebuilt.
 */
export function ScrollShadow({
  children,
  className,
  hideScrollBar = false,
  onScroll,
  orientation = "vertical",
  ...props
}: ScrollShadowProps): ReactElement {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [edges, setEdges] = useState<ScrollShadowEdges>("none");

  const sync = useCallback(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }
    /* scrollLeft runs negative in RTL; the distance from the start edge is what matters. */
    const vertical = orientation === "vertical";
    const position = vertical ? element.scrollTop : Math.abs(element.scrollLeft);
    const overflow = vertical
      ? element.scrollHeight - element.clientHeight
      : element.scrollWidth - element.clientWidth;
    const start = position > 1;
    const end = overflow - position > 1;
    setEdges(start && end ? "both" : start ? "start" : end ? "end" : "none");
  }, [orientation]);

  /* Sizing changes move the edges without a scroll event — a collapsible opening inside a
     sidebar, the container resizing — so the children are observed along with the box. */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    for (const child of element.children) {
      observer.observe(child);
    }
    return () => observer.disconnect();
  }, [sync]);

  return (
    <div
      className={classes(
        "scroll-shadow",
        orientation === "horizontal" && "scroll-shadow--horizontal",
        hideScrollBar && "scroll-shadow--hide-scrollbar",
        className,
      )}
      data-shadow={edges === "none" ? undefined : edges}
      data-slot="scroll-shadow"
      onScroll={(event) => {
        onScroll?.(event);
        sync();
      }}
      ref={elementRef}
      {...props}
    >
      {children}
    </div>
  );
}
