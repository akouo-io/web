import { cn } from "../lib/cn";

export interface ProgressBarProps {
  /** 0..max. Omit (or set `indeterminate`) for an indeterminate bar. */
  value?: number;
  max?: number;
  indeterminate?: boolean;
  className?: string;
  "aria-label"?: string;
}

const KEYFRAMES = `@keyframes akouo-progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(340%); }
}`;

/** Progress indicator supporting determinate and indeterminate modes. */
export function ProgressBar({
  value,
  max = 100,
  indeterminate,
  className,
  "aria-label": ariaLabel = "Progress",
}: ProgressBarProps) {
  const isIndeterminate = indeterminate || value === undefined;
  const pct = isIndeterminate
    ? 0
    : Math.min(100, Math.max(0, (value! / max) * 100));

  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={isIndeterminate ? undefined : value}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className,
      )}
    >
      {isIndeterminate ? (
        <>
          <style>{KEYFRAMES}</style>
          <div
            className="absolute inset-y-0 w-1/3 rounded-full bg-primary"
            style={{
              animation: "akouo-progress-indeterminate 1.4s ease-in-out infinite",
            }}
          />
        </>
      ) : (
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      )}
    </div>
  );
}
