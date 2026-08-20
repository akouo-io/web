import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";

export interface IconButtonProps extends ComponentPropsWithRef<"button"> {
  /** Required — icon-only buttons must have an accessible name. */
  "aria-label": string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md";
}

const variants: Record<NonNullable<IconButtonProps["variant"]>, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
  outline:
    "border border-input text-foreground hover:bg-accent hover:text-accent-foreground",
};

const sizes: Record<NonNullable<IconButtonProps["size"]>, string> = {
  sm: "size-8",
  md: "size-10",
};

/** Square, icon-only button. `aria-label` is required for accessibility. */
export function IconButton({
  className,
  variant = "ghost",
  size = "md",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
