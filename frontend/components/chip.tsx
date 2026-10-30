import type { ReactNode } from "react";
import clsx from "clsx";

type ChipProps = {
  children: ReactNode;
  className?: string;
};

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-line-strong px-2.5 py-1 text-xs font-medium text-[var(--muted)] transition-colors",
        className
      )}
    >
      {children}
    </span>
  );
}
