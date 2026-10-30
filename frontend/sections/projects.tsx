import { useId, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import { Chip } from "@/components/chip";
import { EASE_OUT, Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/data/portfolio";
import { useSpotlight } from "@/hooks/useSpotlight";
import { highlightMetrics } from "@/utils/highlight-metrics";

type Project = (typeof projects)[number];

function ImpactMeter({ impact }: { impact: Project["impact"] }) {
  return (
    <div className="flex h-full flex-col justify-between gap-8 rounded-xl border border-line bg-[var(--subtle-bg)] p-5 sm:p-6">
      <div>
        <p className="font-display text-5xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-6xl">
          {impact.value}
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">{impact.label}</p>
      </div>

      <div className="space-y-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--faint)]" aria-hidden="true">
        <div>
          <p className="mb-1.5">Before</p>
          <div className="h-1.5 rounded-full bg-[var(--line-strong)]" />
        </div>
        <div>
          <p className="mb-1.5">After</p>
          <div className="h-1.5 rounded-full bg-[var(--line)]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: impact.remaining }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const onPointerMove = useSpotlight<HTMLElement>();

  return (
    <Reveal as="article" delay={index * 0.06}>
      <div
        onPointerMove={onPointerMove}
        className="spotlight surface-card group rounded-3xl p-5 transition-colors duration-500 hover:border-primary/30 sm:p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.75fr)] lg:gap-12">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
                Project / 0{index + 1}
              </p>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-accent">
                Backend
              </span>
            </div>

            <h3 className="text-balance mt-5 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-[var(--foreground)] sm:text-[2rem]">
              {project.title}
            </h3>
            <p className="text-pretty mt-4 text-base leading-7 text-[var(--muted)] sm:text-[17px] sm:leading-8">
              {project.summary}
            </p>

            {/* Kept in the DOM (for search and no-JS) and only visually collapsed. */}
            <motion.div
              id={detailsId}
              initial={false}
              animate={expanded ? "open" : "closed"}
              variants={{
                open: { height: "auto", opacity: 1, visibility: "visible" },
                closed: { height: 0, opacity: 0, transitionEnd: { visibility: "hidden" } }
              }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <ul className="space-y-3 pt-5 text-[15px] leading-7 text-[var(--muted)]">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-ink" aria-hidden="true" />
                    <span className="text-pretty">{highlightMetrics(highlight)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="mt-auto flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
                aria-controls={detailsId}
                className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full border border-line-strong px-4 py-2 text-[13px] font-medium text-[var(--foreground)] transition hover:border-primary/50 sm:self-auto"
              >
                {expanded ? "Hide details" : "Engineering details"}
                <FaPlus
                  className={`text-[10px] text-ink transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}
                />
              </button>
            </div>
          </div>

          <ImpactMeter impact={project.impact} />
        </div>
      </div>
    </Reveal>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-24 py-14 sm:py-20">
      <SectionHeading index="03" title="Projects" id="projects-title" />

      <div className="grid gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
