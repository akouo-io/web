import type { ComponentPropsWithRef, ElementType } from "react";

import { cn } from "../lib/cn";

export interface HeadingProps extends ComponentPropsWithRef<"h2"> {
  /** Semantic heading level (h1–h6). Default 2. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Visual size, independent of the semantic level. Defaults to the level. */
  size?: 1 | 2 | 3 | 4 | 5 | 6;
}

const sizeClass: Record<NonNullable<HeadingProps["size"]>, string> = {
  1: "text-3xl font-bold tracking-tight",
  2: "text-2xl font-semibold tracking-tight",
  3: "text-xl font-semibold",
  4: "text-lg font-semibold",
  5: "text-base font-semibold",
  6: "text-sm font-semibold",
};

/** Semantic heading with a visual size that can differ from its level. */
export function Heading({
  level = 2,
  size,
  className,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag
      className={cn("text-foreground", sizeClass[size ?? level], className)}
      {...props}
    />
  );
}
