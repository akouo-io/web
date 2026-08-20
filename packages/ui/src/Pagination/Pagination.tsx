import { cn } from "../lib/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "../lib/icons";

export interface PaginationProps {
  /** Current page, 1-based. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Pages shown either side of the current page. Default 1. */
  siblingCount?: number;
  className?: string;
}

type Item = number | "ellipsis";

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildItems(
  page: number,
  pageCount: number,
  siblingCount: number,
): Item[] {
  const totalShown = siblingCount * 2 + 5; // first, last, current, 2 ellipses
  if (pageCount <= totalShown) return range(1, pageCount);

  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, pageCount);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < pageCount - 1;

  const items: Item[] = [1];
  if (showLeftEllipsis) items.push("ellipsis");
  items.push(...range(showLeftEllipsis ? left : 2, showRightEllipsis ? right : pageCount - 1));
  if (showRightEllipsis) items.push("ellipsis");
  items.push(pageCount);
  return items;
}

const cellBase =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

/** Page navigation with prev/next and truncated page numbers. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const items = buildItems(page, pageCount, siblingCount);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={cn(cellBase, "hover:bg-accent hover:text-accent-foreground")}
      >
        <ChevronLeftIcon />
      </button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="inline-flex h-9 min-w-9 items-center justify-center text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
            className={cn(
              cellBase,
              item === page
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        className={cn(cellBase, "hover:bg-accent hover:text-accent-foreground")}
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
}
