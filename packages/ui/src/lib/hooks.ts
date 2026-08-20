import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Calls `handler` when a pointer-down or focus lands outside `ref`, while
 * `enabled` (default true). Used to dismiss popovers, menus, and dropdowns.
 */
export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return;

    function onPointerDown(event: PointerEvent) {
      const el = ref.current;
      if (el && !el.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [ref, handler, enabled]);
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Modal overlay behavior for a portal panel: focus the panel on open, trap Tab
 * within it, close on Escape, lock body scroll, and restore focus on close.
 */
export function useOverlay(
  ref: RefObject<HTMLElement | null>,
  { open, onClose }: { open: boolean; onClose: () => void },
): void {
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const el = ref.current;

    const focusables = () =>
      el
        ? Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (node) => node.offsetParent !== null || node === el,
          )
        : [];

    (focusables()[0] ?? el)?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      } else if (event.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (!first || !last) {
          event.preventDefault();
          return;
        }
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose, ref]);
}
