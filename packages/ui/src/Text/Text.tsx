import type { ComponentPropsWithRef, ElementType } from "react";

import { cn } from "../lib/cn";

export interface TextProps extends ComponentPropsWithRef<"p"> {
  as?: ElementType;
  variant?: "default" | "muted" | "subtle";
  size?: "xs" | "sm" | "base" | "lg";
  weight?: "normal" | "medium" | "semibold";
}

const variants: Record<NonNullable<TextProps["variant"]>, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  subtle: "text-muted-foreground/70",
};

const sizes: Record<NonNullable<TextProps["size"]>, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

const weights: Record<NonNullable<TextProps["weight"]>, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
};

/** Body text. Renders a <p> by default; use `as` for span/div. */
export function Text({
  as,
  variant = "default",
  size = "base",
  weight = "normal",
  className,
  ...props
}: TextProps) {
  const Tag = as ?? "p";
  return (
    <Tag
      className={cn(variants[variant], sizes[size], weights[weight], className)}
      {...props}
    />
  );
}
