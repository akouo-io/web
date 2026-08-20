import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";

export type RadioProps = Omit<ComponentPropsWithRef<"input">, "type">;

/**
 * Native radio tinted with the primary token. Group radios by sharing a `name`.
 */
export function Radio({ className, ...props }: RadioProps) {
  return (
    <input
      type="radio"
      className={cn(
        "size-4 shrink-0 cursor-pointer border border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
