import {
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import type { ComponentPropsWithRef, KeyboardEvent, ReactNode } from "react";

import { cn } from "./cn";
import { useOutsideClick } from "./hooks";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopover(component: string): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error(`${component} must be used within <Popover>`);
  return ctx;
}

/** Anchored, non-modal floating panel. */
export function Popover({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(containerRef, () => setOpen(false), open);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({
  onClick,
  ...props
}: ComponentPropsWithRef<"button">) {
  const { open, setOpen } = usePopover("PopoverTrigger");
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={(event) => {
        onClick?.(event);
        setOpen(!open);
      }}
      {...props}
    />
  );
}

export function PopoverContent({
  className,
  children,
  align = "start",
}: {
  className?: string;
  children: ReactNode;
  align?: "start" | "end" | "center";
}) {
  const { open, setOpen } = usePopover("PopoverContent");
  if (!open) return null;

  const alignClass =
    align === "end"
      ? "right-0"
      : align === "center"
        ? "left-1/2 -translate-x-1/2"
        : "left-0";

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") setOpen(false);
  }

  return (
    <div
      role="dialog"
      onKeyDown={handleKeyDown}
      className={cn(
        "absolute z-50 mt-1 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md focus:outline-none",
        alignClass,
        className,
      )}
    >
      {children}
    </div>
  );
}
