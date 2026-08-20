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
