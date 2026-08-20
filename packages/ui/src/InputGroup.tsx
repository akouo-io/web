import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "./cn";

export interface InputGroupProps
  extends Omit<ComponentPropsWithRef<"input">, "prefix"> {
  /** Node rendered before the input (icon, unit, …). */
  leading?: ReactNode;
  /** Node rendered after the input. */
  trailing?: ReactNode;
  /** Class applied to the bordered wrapper. */
  containerClassName?: string;
}

/**
 * Text field with leading/trailing addons. The wrapper owns the border and
 * focus ring so addons sit flush inside a single control.
 */
export function InputGroup({
  leading,
  trailing,
  className,
  containerClassName,
  ...props
}: InputGroupProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center rounded-md border border-input bg-background text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        containerClassName,
      )}
    >
      {leading && (
        <span className="flex items-center pl-3 text-muted-foreground">
          {leading}
        </span>
      )}
      <input
        className={cn(
          "h-full w-full bg-transparent px-3 text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      {trailing && (
        <span className="flex items-center pr-3 text-muted-foreground">
          {trailing}
        </span>
      )}
    </div>
  );
}
