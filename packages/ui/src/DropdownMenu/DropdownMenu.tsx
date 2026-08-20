import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  ComponentPropsWithRef,
  KeyboardEvent,
  ReactNode,
  RefObject,
} from "react";

import { cn } from "../lib/cn";
import { useOutsideClick } from "../lib/hooks";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenu(component: string): DropdownMenuContextValue {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error(`${component} must be used within <DropdownMenu>`);
  return ctx;
}

/** Button-triggered menu popover with roving keyboard navigation. */
export function DropdownMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => setOpen(false), open);

  return (
    <DropdownMenuContext.Provider
      value={{ open, setOpen, triggerRef, contentRef }}
    >
      <div ref={containerRef} className="relative inline-block">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  className,
  onClick,
  ...props
}: ComponentPropsWithRef<"button">) {
  const { open, setOpen, triggerRef } = useDropdownMenu("DropdownMenuTrigger");
  return (
    <button
      ref={triggerRef}
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={(event) => {
        setOpen(!open);
        onClick?.(event);
      }}
      className={className}
      {...props}
    />
  );
}

export function DropdownMenuContent({
  className,
  children,
  align = "start",
}: {
  className?: string;
  children: ReactNode;
  align?: "start" | "end";
}) {
  const { open, setOpen, triggerRef, contentRef } =
    useDropdownMenu("DropdownMenuContent");

  useEffect(() => {
    if (!open) return;
    const first = contentRef.current?.querySelector<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])',
    );
    first?.focus();
  }, [open, contentRef]);

  if (!open) return null;

  function items(): HTMLElement[] {
    return Array.from(
      contentRef.current?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])',
      ) ?? [],
    );
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const list = items();
    const index = list.indexOf(document.activeElement as HTMLElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      list[(index + 1) % list.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      list[(index - 1 + list.length) % list.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      list[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      list[list.length - 1]?.focus();
    } else if (event.key === "Escape" || event.key === "Tab") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <div
      ref={contentRef}
      role="menu"
      onKeyDown={handleKeyDown}
      className={cn(
        "absolute z-50 mt-1 min-w-40 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
        align === "end" ? "right-0" : "left-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  className,
  onSelect,
  disabled,
  onClick,
  ...props
}: Omit<ComponentPropsWithRef<"button">, "onSelect"> & {
  onSelect?: () => void;
  disabled?: boolean;
}) {
  const { setOpen, triggerRef } = useDropdownMenu("DropdownMenuItem");
  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        onSelect?.();
        setOpen(false);
        triggerRef.current?.focus();
      }}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm text-popover-foreground outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuLabel({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      role="separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}
