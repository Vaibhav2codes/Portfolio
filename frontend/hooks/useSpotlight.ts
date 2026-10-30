import { useCallback, type PointerEvent } from "react";

/** Feeds pointer position into the `.spotlight` CSS variables. */
export function useSpotlight<T extends HTMLElement>() {
  return useCallback((event: PointerEvent<T>) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }, []);
}
