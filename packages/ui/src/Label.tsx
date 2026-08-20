import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";

export interface LabelProps extends ComponentPropsWithRef<"label"> {
  /** Appends a muted asterisk to mark the field as required. */
  required?: boolean;
}

/** Form control label. Pair with a control via `htmlFor`. */
export function Label({ className, children, required, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-destructive">
          *
        </span>
      )}
    </label>
  );
}
