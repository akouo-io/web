import type { ComponentPropsWithRef } from "react";

import { cn } from "../lib/cn";

export type InputProps = ComponentPropsWithRef<"input">;

const inputClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

/** Single-line text field, styled on `@akouo/theme` tokens. */
export function Input({ className, type = "text", ...props }: InputProps) {
  return <input type={type} className={cn(inputClass, className)} {...props} />;
}

export { inputClass };
