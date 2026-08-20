import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";

export type SliderProps = Omit<ComponentPropsWithRef<"input">, "type">;

/** Native range input tinted with the primary token via `accent-color`. */
export function Slider({ className, ...props }: SliderProps) {
  return (
    <input
      type="range"
      className={cn(
        "h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
