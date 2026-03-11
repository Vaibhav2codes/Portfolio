import { motion } from "framer-motion";
import { Chip } from "@/components/chip";
import { experienceItems } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-28 py-8">
      <div className="mb-10">
        <p className="font-mono text-sm uppercase tracking-[0.32em] text-primary">Experience</p>
      </div>

      <div className="relative space-y-8 before:absolute before:bottom-6 before:left-5 before:top-4 before:w-px before:bg-gradient-to-b before:from-primary/40 before:via-white/10 before:to-transparent lg:before:left-10">
        {experienceItems.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.role}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative pl-14 lg:pl-24"
          >
            <div className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-[linear-gradient(180deg,rgba(37,99,235,0.22),rgba(37,99,235,0.08))] text-sm font-semibold text-primary shadow-glow lg:left-5">
              {index + 1}
            </div>

            <div className="surface-card relative overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,245,249,0.94))] p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/30 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(15,23,42,0.28))] dark:hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.34))]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(260px,0.7fr)] lg:items-start">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-[var(--foreground)] sm:text-[2rem]">
                        {item.company}
                      </h3>
                      <p className="mt-2 text-base text-primary sm:text-lg">{item.role}</p>
                    </div>
                    <span className="surface-control px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                      Role 0{index + 1}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 text-sm leading-7 text-[var(--muted)] sm:text-[15px]">
                    {item.description.map((point) => (
                      <div
                        key={point}
                        className="surface-subtle flex gap-3 rounded-2xl px-4 py-3"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary/80" />
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                  </div>
                </div>

                <aside className="surface-subtle rounded-[1.5rem] p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Timeline</p>
                  <div className="mt-5 space-y-5 text-sm text-[var(--muted)]">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Duration</p>
                      <p className="mt-2 text-base text-[var(--foreground)]">{item.duration}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Location</p>
                      <p className="mt-2 text-base text-[var(--foreground)]">{item.location}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Focus</p>
                      <p className="mt-2 leading-7">{item.technologies.slice(0, 3).join(" / ")}</p>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
