import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";

export interface LinkProps extends ComponentPropsWithRef<"a"> {
  variant?: "default" | "muted" | "underline";
}

const variants: Record<NonNullable<LinkProps["variant"]>, string> = {
  default: "text-primary hover:underline",
  muted: "text-muted-foreground hover:text-foreground",
  underline: "text-foreground underline underline-offset-4 hover:text-primary",
};

/** Styled anchor. Pass `href`; framework routers can wrap or supply `as`. */
export function Link({ className, variant = "default", ...props }: LinkProps) {
  return (
    <a
      className={cn(
        "rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
