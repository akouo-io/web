import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { cn } from "./cn";
import { XIcon } from "./icons";

export interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  variant?: "default" | "success" | "destructive";
  /** Auto-dismiss delay in ms. Pass Infinity to persist. Default 5000. */
  duration?: number;
}

interface ToastRecord extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** Access `toast()` / `dismiss()`. Must be under a <ToastProvider>. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a <ToastProvider>");
  return ctx;
}

const variants: Record<NonNullable<ToastOptions["variant"]>, string> = {
  default: "border-border bg-popover text-popover-foreground",
  success: "border-success/30 bg-popover text-popover-foreground",
  destructive: "border-destructive/40 bg-popover text-popover-foreground",
};

let counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    const id = `toast-${++counter}`;
    setToasts((prev) => [...prev, { id, ...options }]);
    return id;
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <Toaster toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function Toaster({
  toasts,
  onDismiss,
}: {
  toasts: ToastRecord[];
  onDismiss: (id: string) => void;
}) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <div className="pointer-events-none fixed bottom-0 right-0 z-[100] flex w-full max-w-sm flex-col gap-2 p-4">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body,
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastRecord;
  onDismiss: (id: string) => void;
}) {
  const duration = toast.duration ?? 5000;

  useEffect(() => {
    if (duration === Infinity) return;
    const timer = setTimeout(() => onDismiss(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onDismiss]);

  return (
    <div
      role="status"
      aria-live={toast.variant === "destructive" ? "assertive" : "polite"}
      className={cn(
        "pointer-events-auto flex items-start gap-3 rounded-md border p-4 shadow-md",
        variants[toast.variant ?? "default"],
      )}
    >
      <div className="flex-1 space-y-1">
        {toast.title && (
          <div className="text-sm font-medium text-foreground">{toast.title}</div>
        )}
        {toast.description && (
          <div className="text-sm text-muted-foreground">{toast.description}</div>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => onDismiss(toast.id)}
        className="text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
      >
        <XIcon width="16" height="16" />
      </button>
    </div>
  );
}
