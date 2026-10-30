import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const NUMERIC_VALUE = /^(\d+(?:\.\d+)?)(.*)$/;

/** Counts numeric stats ("700+", "1.5+") up from zero once visible; other values render as-is. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const match = value.match(NUMERIC_VALUE);

  useEffect(() => {
    if (!match || !inView || prefersReducedMotion || !ref.current) {
      return;
    }

    const node = ref.current;
    const target = Number(match[1]);
    const decimals = match[1].split(".")[1]?.length ?? 0;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${latest.toFixed(decimals)}${match[2]}`;
      }
    });

    return () => controls.stop();
    // `match` is derived from `value`; re-running on its identity would restart the count.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, prefersReducedMotion, value]);

  return <span ref={ref}>{value}</span>;
}
