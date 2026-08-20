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
  MouseEvent,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "./cn";
import { useOutsideClick } from "./hooks";

interface Position {
  x: number;
  y: number;
}

interface ContextMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: Position;
  openAt: (position: Position) => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

function useContextMenu(component: string): ContextMenuContextValue {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) throw new Error(`${component} must be used within <ContextMenu>`);
  return ctx;
}

/** Right-click (context) menu anchored at the pointer. */
export function ContextMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  return (
    <ContextMenuContext.Provider
      value={{
        open,
        setOpen,
        position,
        openAt: (p) => {
          setPosition(p);
          setOpen(true);
        },
      }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
}

export function ContextMenuTrigger({
  onContextMenu,
  ...props
}: ComponentPropsWithRef<"div">) {
  const { openAt } = useContextMenu("ContextMenuTrigger");
  return (
    <div
      onContextMenu={(event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        openAt({ x: event.clientX, y: event.clientY });
        onContextMenu?.(event);
      }}
      {...props}
    />
  );
}

export function ContextMenuContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { open, setOpen, position } = useContextMenu("ContextMenuContent");
  const contentRef = useRef<HTMLDivElement>(null);

  useOutsideClick(contentRef, () => setOpen(false), open);

  useEffect(() => {
    if (!open) return;
    const first = contentRef.current?.querySelector<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])',
    );
    first?.focus();
  }, [open]);

  if (!open || typeof document === "undefined") return null;

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
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return createPortal(
    <div
      ref={contentRef}
      role="menu"
      onKeyDown={handleKeyDown}
      style={{ top: position.y, left: position.x }}
      className={cn(
        "fixed z-[100] min-w-40 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
        className,
      )}
    >
      {children}
    </div>,
    document.body,
  );
}

export function ContextMenuItem({
  className,
  onSelect,
  disabled,
  onClick,
  ...props
}: Omit<ComponentPropsWithRef<"button">, "onSelect"> & {
  onSelect?: () => void;
  disabled?: boolean;
}) {
  const { setOpen } = useContextMenu("ContextMenuItem");
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
      }}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm text-popover-foreground outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function ContextMenuLabel({
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

export function ContextMenuSeparator({
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
