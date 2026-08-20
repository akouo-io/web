import type { ComponentPropsWithRef, ElementType } from "react";

import { cn } from "../lib/cn";

export interface ListProps extends ComponentPropsWithRef<"ul"> {
  /** Render an ordered list. */
  ordered?: boolean;
  variant?: "disc" | "decimal" | "none";
}

const variants: Record<NonNullable<ListProps["variant"]>, string> = {
  disc: "list-disc pl-6",
  decimal: "list-decimal pl-6",
  none: "list-none",
};

/** Styled list. Defaults to a bulleted <ul>; set `ordered` for <ol>. */
export function List({
  ordered,
  variant,
  className,
  ...props
}: ListProps) {
  const Tag = (ordered ? "ol" : "ul") as ElementType;
  const resolved = variant ?? (ordered ? "decimal" : "disc");
  return (
    <Tag
      className={cn(
        "space-y-1 text-sm text-foreground marker:text-muted-foreground",
        variants[resolved],
        className,
      )}
      {...props}
    />
  );
}

export type ListItemProps = ComponentPropsWithRef<"li">;

export function ListItem({ className, ...props }: ListItemProps) {
  return <li className={cn("leading-6", className)} {...props} />;
}
