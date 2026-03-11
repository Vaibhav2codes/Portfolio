import { motion } from "framer-motion";
import { Chip } from "@/components/chip";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-28 py-8">
      <SectionHeading
        eyebrow="Projects"
        title=""
        description=""
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="surface-card group rounded-[2rem] p-6 transition hover:-translate-y-1 hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">Project 0{index + 1}</p>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                Backend
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold text-[var(--foreground)]">{project.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
