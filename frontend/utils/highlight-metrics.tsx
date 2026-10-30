import type { ReactNode } from "react";

const METRIC_PATTERN = /(~?<?\d+(?:\s?(?:to|-)\s?\d+)?\s?(?:%|percent|ms\b)|\d+k?\+)/gi;

/** Wraps quantified impact ("~50%", "55 to 60 percent", "<150ms", "10k+") so it reads at a glance. */
export function highlightMetrics(text: string): ReactNode[] {
  return text.split(METRIC_PATTERN).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-[var(--foreground)]">
        {part}
      </strong>
    ) : (
      part
    )
  );
}
