import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "../lib/cn";

/** App sidebar shell — a vertical navigation column. */
export function Sidebar({ className, ...props }: ComponentPropsWithRef<"aside">) {
  return (
    <aside
      className={cn(
        "flex h-full w-60 flex-col gap-1 border-r border-border bg-card p-3",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarSection({
  label,
  className,
  children,
}: {
  label?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1 py-2", className)}>
      {label && (
        <div className="px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

export interface SidebarItemProps extends ComponentPropsWithRef<"a"> {
  icon?: ReactNode;
  active?: boolean;
}

/** Sidebar nav link. Renders an anchor; wire `href` to your router. */
export function SidebarItem({
  icon,
  active,
  className,
  children,
  ...props
}: SidebarItemProps) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:size-4 [&>svg]:shrink-0",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {icon}
      <span className="truncate">{children}</span>
    </a>
  );
}

/* ---- NavRail (compact, icon-only) ---------------------------------------- */

export function NavRail({ className, ...props }: ComponentPropsWithRef<"nav">) {
  return (
    <nav
      aria-label="Primary"
      className={cn(
        "flex h-full w-14 flex-col items-center gap-1 border-r border-border bg-card py-3",
        className,
      )}
      {...props}
    />
  );
}

export interface NavRailItemProps extends ComponentPropsWithRef<"a"> {
  /** Required — icon-only rail items need an accessible name. */
  "aria-label": string;
  icon: ReactNode;
  active?: boolean;
}

export function NavRailItem({
  icon,
  active,
  className,
  "aria-label": ariaLabel,
  ...props
}: NavRailItemProps) {
  return (
    <a
      aria-label={ariaLabel}
      title={ariaLabel}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex size-10 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:size-5",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {icon}
    </a>
  );
}
