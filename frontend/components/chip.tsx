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
        "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-[var(--muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}
