import { useRef, useState } from "react";

import { Calendar } from "./Calendar";
import { cn } from "./cn";
import { useOutsideClick } from "./hooks";
import { CalendarIcon } from "./icons";

export interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

/** Date field: a button trigger that opens a Calendar popover. */
export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  className,
  id,
  ...aria
}: DatePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useOutsideClick(containerRef, () => setOpen(false), open);

  const label = value
    ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(value)
    : null;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
        className="flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3 text-left text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
        {...aria}
      >
        <CalendarIcon className="text-muted-foreground" />
        <span className={cn(!label && "text-muted-foreground")}>
          {label ?? placeholder}
        </span>
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Choose date"
          className="absolute z-50 mt-1 rounded-md border border-border bg-popover text-popover-foreground shadow-md"
        >
          <Calendar
            value={value}
            defaultMonth={value ?? undefined}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
