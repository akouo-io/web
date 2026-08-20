import { cn } from "@akouo/ui";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-base font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      <span className="flex items-center gap-0.5" aria-hidden="true">
        <span className="size-2 rounded-full bg-speaker-1" />
        <span className="size-2 rounded-full bg-speaker-3" />
        <span className="size-2 rounded-full bg-speaker-5" />
      </span>
      akouo
    </span>
  );
}
