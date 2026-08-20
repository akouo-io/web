import type { ComponentPropsWithRef } from "react";

import { cn } from "../lib/cn";

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  variant?: "default" | "secondary" | "outline" | "success" | "destructive";
  /** Render as a diarization chip tinted with `--speaker-1..6`. */
  speaker?: 1 | 2 | 3 | 4 | 5 | 6;
}

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-border text-foreground",
  success: "bg-success text-success-foreground",
  destructive: "bg-destructive text-destructive-foreground",
};

// Full class strings so Tailwind's scanner keeps them.
const speakerChip: Record<NonNullable<BadgeProps["speaker"]>, string> = {
  1: "bg-speaker-1/15 text-speaker-1",
  2: "bg-speaker-2/15 text-speaker-2",
  3: "bg-speaker-3/15 text-speaker-3",
  4: "bg-speaker-4/15 text-speaker-4",
  5: "bg-speaker-5/15 text-speaker-5",
  6: "bg-speaker-6/15 text-speaker-6",
};

const speakerDot: Record<NonNullable<BadgeProps["speaker"]>, string> = {
  1: "bg-speaker-1",
  2: "bg-speaker-2",
  3: "bg-speaker-3",
  4: "bg-speaker-4",
  5: "bg-speaker-5",
  6: "bg-speaker-6",
};

/** Compact status/label chip. Pass `speaker` for a diarization-colored chip. */
export function Badge({
  className,
  variant = "default",
  speaker,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        speaker ? speakerChip[speaker] : variants[variant],
        className,
      )}
      {...props}
    >
      {speaker && (
        <span
          aria-hidden="true"
          className={cn("size-1.5 rounded-full", speakerDot[speaker])}
        />
      )}
      {children}
    </span>
  );
}
