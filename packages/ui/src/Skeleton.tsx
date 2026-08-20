import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";

export type SkeletonProps = ComponentPropsWithRef<"div">;

/** Placeholder shimmer for loading content. Size it with utility classes. */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}
