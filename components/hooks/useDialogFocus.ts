"use client";

import { useEffect, type RefObject } from "react";

const focusable =
  'button:not(:disabled), select:not(:disabled), input:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])';

export function useDialogFocus(
  ref: RefObject<HTMLElement | null>,
  onClose: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;
    const trigger = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.querySelector<HTMLElement>(focusable)?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const items = [...dialog.querySelectorAll<HTMLElement>(focusable)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [enabled, onClose, ref]);
}
