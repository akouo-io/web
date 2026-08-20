import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "../lib/cn";

export interface AlertProps extends ComponentPropsWithRef<"div"> {
  variant?: "default" | "info" | "success" | "destructive";
  icon?: ReactNode;
}

const variants: Record<NonNullable<AlertProps["variant"]>, string> = {
  default: "border-border bg-card text-card-foreground",
  info: "border-primary/30 bg-primary/5 text-foreground [&>svg]:text-primary",
  success: "border-success/30 bg-success/5 text-foreground [&>svg]:text-success",
  destructive:
    "border-destructive/30 bg-destructive/5 text-foreground [&>svg]:text-destructive",
};

/** Callout / alert box. Use with AlertTitle and AlertDescription. */
export function Alert({
  className,
  variant = "default",
  icon,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "relative flex gap-3 rounded-lg border p-4 text-sm [&>svg]:size-5 [&>svg]:shrink-0",
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon}
      <div className="flex-1 space-y-1">{children}</div>
    </div>
  );
}

export function AlertTitle({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div className={cn("font-medium text-foreground", className)} {...props} />
  );
}

export function AlertDescription({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div className={cn("text-muted-foreground", className)} {...props} />
  );
}
