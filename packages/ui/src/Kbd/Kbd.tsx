import type { ComponentPropsWithRef } from "react";

import { cn } from "../lib/cn";

export type KbdProps = ComponentPropsWithRef<"kbd">;

/** Keyboard key hint, e.g. ⌘K. */
export function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
