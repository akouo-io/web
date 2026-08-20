import { cn } from "./cn";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Accessible label. Defaults to "Loading". */
  label?: string;
}

const sizes: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

/** Indeterminate loading spinner. */
export function Spinner({ size = "md", className, label = "Loading" }: SpinnerProps) {
  return (
    <span role="status" aria-live="polite" className="inline-flex">
      <svg
        className={cn("animate-spin text-muted-foreground", sizes[size], className)}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
