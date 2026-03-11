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
        "surface-control inline-flex items-center rounded-full px-3 py-1 text-sm text-slate-600 dark:text-[var(--muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}
