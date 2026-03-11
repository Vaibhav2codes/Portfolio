import { motion } from "framer-motion";
import { Chip } from "@/components/chip";
import { skillGroups } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-28 py-8">
      <div className="mb-10">
        <p className="font-mono text-sm uppercase tracking-[0.32em] text-primary">Skills</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="surface-card rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/20 dark:hover:border-primary/35"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">{group.title}</h3>
              <span className="surface-subtle rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                {group.items.length} items
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
