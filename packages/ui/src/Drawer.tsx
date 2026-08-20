import { useId, useMemo, useRef, useState } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { createPortal } from "react-dom";

import { cn } from "./cn";
import { useOverlay } from "./hooks";
import {
  OverlayContext,
  OverlayBody,
  OverlayClose,
  OverlayDescription,
  OverlayFooter,
  OverlayHeader,
  OverlayTitle,
  useOverlayContext,
} from "./overlay";

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

/** Edge-anchored sheet. Same modal semantics as Dialog, slides from a side. */
export function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: DrawerProps) {
  const [internal, setInternal] = useState(defaultOpen ?? false);
  const current = open ?? internal;
  const baseId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const ctx = useMemo(
    () => ({
      open: current,
      setOpen: (next: boolean) => {
        if (open === undefined) setInternal(next);
        onOpenChange?.(next);
      },
      titleId: `${baseId}-title`,
      descriptionId: `${baseId}-description`,
      contentRef,
      triggerRef,
    }),
    [current, open, onOpenChange, baseId],
  );

  return <OverlayContext.Provider value={ctx}>{children}</OverlayContext.Provider>;
}

export function DrawerTrigger({
  onClick,
  ...props
}: ComponentPropsWithRef<"button">) {
  const { open, setOpen, triggerRef } = useOverlayContext("DrawerTrigger");
  return (
    <button
      ref={triggerRef}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={(event) => {
        onClick?.(event);
        setOpen(true);
      }}
      {...props}
    />
  );
}

type Side = "left" | "right" | "top" | "bottom";

const sideClasses: Record<Side, string> = {
  left: "inset-y-0 left-0 h-full w-80 max-w-[90vw] border-r",
  right: "inset-y-0 right-0 h-full w-80 max-w-[90vw] border-l",
  top: "inset-x-0 top-0 w-full max-h-[90vh] border-b",
  bottom: "inset-x-0 bottom-0 w-full max-h-[90vh] border-t",
};

export function DrawerContent({
  className,
  children,
  side = "right",
}: {
  className?: string;
  children: ReactNode;
  side?: Side;
}) {
  const { open, setOpen, titleId, descriptionId, contentRef } =
    useOverlayContext("DrawerContent");

  useOverlay(contentRef, { open, onClose: () => setOpen(false) });

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/50"
      onClick={() => setOpen(false)}
    >
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "absolute flex flex-col border-border bg-popover text-popover-foreground shadow-lg focus:outline-none",
          sideClasses[side],
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export const DrawerHeader = OverlayHeader;
export const DrawerFooter = OverlayFooter;
export const DrawerBody = OverlayBody;
export const DrawerTitle = OverlayTitle;
export const DrawerDescription = OverlayDescription;
export const DrawerClose = OverlayClose;
