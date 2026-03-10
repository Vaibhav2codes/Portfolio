import { motion } from "framer-motion";
import { Chip } from "@/components/chip";
import { SectionHeading } from "@/components/section-heading";
import { experienceItems } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-28 py-8">
      <SectionHeading
        eyebrow="Experience"
        title="Professional backend work across travel systems and enterprise data platforms."
        description="A concise view of product-facing backend responsibilities, distributed systems work and measurable delivery across roles."
      />

      <div className="relative mt-12 space-y-8 before:absolute before:left-4 before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-white/10 sm:before:left-1/2 sm:before:-translate-x-1/2">
        {experienceItems.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.role}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative grid gap-4 sm:grid-cols-2"
          >
            <div className={`${index % 2 === 0 ? "sm:pr-10" : "sm:order-2 sm:pl-10"} pl-12 sm:pl-0`}>
              <div className="absolute left-0 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-xs font-semibold text-primary sm:left-1/2 sm:-translate-x-1/2">
                {index + 1}
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-[var(--foreground)]">{item.company}</h3>
                    <p className="mt-2 text-base text-primary">{item.role}</p>
                  </div>
                  <div className="text-right text-sm text-[var(--muted)]">
                    <p>{item.duration}</p>
                    <p className="mt-1">{item.location}</p>
                  </div>
                </div>
                <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--muted)]">
                  {item.description.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
