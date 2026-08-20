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

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

/** Modal dialog. Controlled via `open`, or uncontrolled via `defaultOpen`. */
export function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: DialogProps) {
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

export function DialogTrigger({
  onClick,
  ...props
}: ComponentPropsWithRef<"button">) {
  const { open, setOpen, triggerRef } = useOverlayContext("DialogTrigger");
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

export function DialogContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { open, setOpen, titleId, descriptionId, contentRef } =
    useOverlayContext("DialogContent");

  useOverlay(contentRef, { open, onClose: () => setOpen(false) });

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
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
          "relative w-full max-w-lg rounded-lg border border-border bg-popover text-popover-foreground shadow-lg focus:outline-none",
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export const DialogHeader = OverlayHeader;
export const DialogFooter = OverlayFooter;
export const DialogBody = OverlayBody;
export const DialogTitle = OverlayTitle;
export const DialogDescription = OverlayDescription;
export const DialogClose = OverlayClose;
