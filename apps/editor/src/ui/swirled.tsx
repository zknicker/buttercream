import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

/**
 * Hand-piped frosting swirl under an emphasis word. One per page, maximum — it stops
 * reading as a signature the moment it repeats.
 */
export function Swirled({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactElement {
  return (
    <span className={classes("relative inline-block", className)}>
      {children}
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-[0.18em] h-[0.22em] w-full text-butter"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 120 12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 8C18 2 34 11 50 6c16-5 32 4 48-1 6-2 12-1 20 3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={4}
        />
      </svg>
    </span>
  );
}
