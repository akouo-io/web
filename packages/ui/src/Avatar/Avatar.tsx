import { Children, useState } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "../lib/cn";

export interface AvatarProps
  extends Omit<ComponentPropsWithRef<"span">, "children"> {
  src?: string;
  /** Used for the image alt text and to derive fallback initials. */
  name?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  /** Ring tinted with a diarization color (`--speaker-1..6`). */
  speaker?: 1 | 2 | 3 | 4 | 5 | 6;
  fallback?: ReactNode;
}

const sizes: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

// Full strings so Tailwind's scanner keeps them.
const speakerRing: Record<NonNullable<AvatarProps["speaker"]>, string> = {
  1: "ring-2 ring-offset-2 ring-offset-background ring-speaker-1",
  2: "ring-2 ring-offset-2 ring-offset-background ring-speaker-2",
  3: "ring-2 ring-offset-2 ring-offset-background ring-speaker-3",
  4: "ring-2 ring-offset-2 ring-offset-background ring-speaker-4",
  5: "ring-2 ring-offset-2 ring-offset-background ring-speaker-5",
  6: "ring-2 ring-offset-2 ring-offset-background ring-speaker-6",
};

function initials(name?: string): string {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** User avatar with image + initials fallback. */
export function Avatar({
  src,
  name,
  alt,
  size = "md",
  speaker,
  fallback,
  className,
  ...props
}: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-medium text-muted-foreground",
        sizes[size],
        speaker && speakerRing[speaker],
        className,
      )}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? ""}
          onError={() => setErrored(true)}
          className="size-full object-cover"
        />
      ) : (
        (fallback ?? initials(name) ?? null)
      )}
    </span>
  );
}

export interface AvatarGroupProps extends ComponentPropsWithRef<"div"> {
  /** Cap the number shown; the rest collapse into a "+N" chip. */
  max?: number;
}

/** Overlapping stack of avatars with an optional overflow count. */
export function AvatarGroup({
  max,
  className,
  children,
  ...props
}: AvatarGroupProps) {
  const items = Children.toArray(children);
  const shown = max ? items.slice(0, max) : items;
  const overflow = max ? items.length - shown.length : 0;

  return (
    <div
      className={cn(
        "flex -space-x-2 [&>*]:ring-2 [&>*]:ring-background",
        className,
      )}
      {...props}
    >
      {shown}
      {overflow > 0 && (
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground ring-2 ring-background">
          +{overflow}
        </span>
      )}
    </div>
  );
}
