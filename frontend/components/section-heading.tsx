import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/components/reveal";

type SectionHeadingProps = {
  index: string;
  title: string;
  id?: string;
  aside?: ReactNode;
};

export function SectionHeading({ index, title, id, aside }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 border-t border-line pt-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-baseline gap-4 sm:gap-6">
        <span className="font-mono text-xs text-[var(--faint)] sm:text-sm" aria-hidden="true">
          {index}
        </span>
        <motion.h2
          id={id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="font-display text-4xl font-semibold tracking-[-0.035em] text-[var(--foreground)] sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h2>
      </div>
      {aside ? <div className="text-sm text-[var(--muted)]">{aside}</div> : null}
    </div>
  );
}
