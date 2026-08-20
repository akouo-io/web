import type { ComponentPropsWithRef } from "react";

import { cn } from "../lib/cn";

export type CodeProps = ComponentPropsWithRef<"code">;

/** Inline code span. */
export function Code({ className, ...props }: CodeProps) {
  return (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export type CodeBlockProps = ComponentPropsWithRef<"pre">;

/** Preformatted, scrollable code block. */
export function CodeBlock({ className, children, ...props }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-md border border-border bg-muted p-4 font-mono text-sm text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  );
}
