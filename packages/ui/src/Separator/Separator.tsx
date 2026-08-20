import type { ComponentPropsWithRef } from "react";

import { cn } from "../lib/cn";

export interface SeparatorProps extends ComponentPropsWithRef<"div"> {
  orientation?: "horizontal" | "vertical";
  /** Purely visual (removes it from the a11y tree). Default true. */
  decorative?: boolean;
}

/** Divider line between content. */
export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px self-stretch",
        className,
      )}
      {...props}
    />
  );
}
