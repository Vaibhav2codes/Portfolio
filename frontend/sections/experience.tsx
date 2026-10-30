import { useId, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import { Chip } from "@/components/chip";
import { EASE_OUT, Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experienceItems } from "@/data/portfolio";
import { highlightMetrics } from "@/utils/highlight-metrics";

const VISIBLE_POINTS = 5;

function ImpactPoint({ point }: { point: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-[var(--faint)]" aria-hidden="true" />
      <p className="text-pretty">{highlightMetrics(point)}</p>
    </li>
  );
}

/** Shows the first few points; the rest stay in the DOM (for search) and expand on demand. */
function ImpactList({ points }: { points: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const moreId = useId();
  const visible = points.slice(0, VISIBLE_POINTS);
  const hidden = points.slice(VISIBLE_POINTS);
  const listClass = "space-y-3 text-[15px] leading-7 text-[var(--muted)]";

  return (
    <div className="mt-6">
      <ul className={listClass}>
        {visible.map((point) => (
          <ImpactPoint key={point} point={point} />
        ))}
      </ul>

      {hidden.length > 0 ? (
        <>
          <motion.div
            id={moreId}
            initial={false}
            animate={expanded ? "open" : "closed"}
            variants={{
              open: { height: "auto", opacity: 1, visibility: "visible" },
              closed: { height: 0, opacity: 0, transitionEnd: { visibility: "hidden" } }
            }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <ul className={`${listClass} pt-3`}>
              {hidden.map((point) => (
                <ImpactPoint key={point} point={point} />
              ))}
            </ul>
          </motion.div>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={moreId}
            className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-[var(--foreground)] transition hover:text-ink"
          >
            <FaPlus
              className={`text-[10px] text-ink transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}
            />
            {expanded ? "Show less" : `Show ${hidden.length} more`}
          </button>
        </>
      ) : null}
    </div>
  );
}

export function ExperienceSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const railProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24 py-14 sm:py-20">
      <SectionHeading index="02" title="Experience" id="experience-title" />

      <ol ref={listRef} className="relative">
        <span
          className="absolute bottom-2 left-[5px] top-2 w-px bg-[var(--line-strong)] md:left-[calc(13rem+5px)]"
          aria-hidden="true"
        />
        <motion.span
          style={{ scaleY: railProgress }}
          className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-primary via-primary to-primary/0 md:left-[calc(13rem+5px)]"
          aria-hidden="true"
        />

        {experienceItems.map((item, index) => {
          const isCurrent = index === 0;
          return (
            <Reveal
              as="li"
              key={`${item.company}-${item.role}`}
              delay={index * 0.05}
              className="group relative grid gap-4 pb-14 pl-8 last:pb-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-0 md:pl-0"
            >
              <span
                className="absolute left-0 top-2 flex h-[11px] w-[11px] md:left-[13rem]"
                aria-hidden="true"
              >
                {isCurrent ? (
                  <span className="animate-status-ping absolute inline-flex h-full w-full rounded-full bg-accent" />
                ) : null}
                <span
                  className={`relative inline-flex h-[11px] w-[11px] rounded-full border-2 border-[var(--background)] ${
                    isCurrent ? "bg-accent" : "bg-primary"
                  }`}
                />
              </span>

              <div className="font-mono text-xs uppercase leading-6 tracking-[0.1em] text-[var(--faint)] md:pr-8 md:pt-0.5 md:text-right">
                <p className={isCurrent ? "text-[var(--foreground)]" : undefined}>{item.duration}</p>
                <p>{item.location}</p>
              </div>

              <div className="md:pl-12">
                <div className="rounded-2xl border border-transparent transition-colors duration-500 md:-m-6 md:p-6 md:group-hover:border-line md:group-hover:bg-[var(--subtle-bg)]">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.025em] text-[var(--foreground)] sm:text-3xl">
                    {item.company}
                  </h3>
                  <p className="mt-1.5 text-base font-medium text-ink">{item.role}</p>

                  <ImpactList points={item.description} />

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
