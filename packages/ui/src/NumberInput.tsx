import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";
import { inputClass } from "./Input";

export type NumberInputProps = Omit<ComponentPropsWithRef<"input">, "type">;

/** Numeric field — a native `type="number"` variant of Input. */
export function NumberInput({ className, ...props }: NumberInputProps) {
  return (
    <input
      type="number"
      inputMode="decimal"
      className={cn(inputClass, className)}
      {...props}
    />
  );
}
