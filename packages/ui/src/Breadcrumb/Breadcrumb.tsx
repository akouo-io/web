import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "../lib/cn";
import { ChevronRightIcon } from "../lib/icons";

/** Breadcrumb navigation. Compose: Breadcrumb > List > Item/Separator. */
export function Breadcrumb(props: ComponentPropsWithRef<"nav">) {
  return <nav aria-label="Breadcrumb" {...props} />;
}

export function BreadcrumbList({
  className,
  ...props
}: ComponentPropsWithRef<"ol">) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbItem({
  className,
  ...props
}: ComponentPropsWithRef<"li">) {
  return (
    <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  );
}

export function BreadcrumbLink({
  className,
  ...props
}: ComponentPropsWithRef<"a">) {
  return (
    <a
      className={cn(
        "rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbPage({
  className,
  ...props
}: ComponentPropsWithRef<"span">) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"li"> & { children?: ReactNode }) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon width="14" height="14" />}
    </li>
  );
}
