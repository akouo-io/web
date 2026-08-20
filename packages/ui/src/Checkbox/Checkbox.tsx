import type { ComponentPropsWithRef } from "react";

import { cn } from "../lib/cn";

export type CheckboxProps = Omit<ComponentPropsWithRef<"input">, "type">;

/** Native checkbox tinted with the primary token via `accent-color`. */
export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn(
        "size-4 shrink-0 cursor-pointer rounded-sm border border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
