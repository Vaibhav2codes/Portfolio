import { motion } from "framer-motion";
import { Chip } from "@/components/chip";
import { SectionHeading } from "@/components/section-heading";
import { skillGroups } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-28 py-8">
      <SectionHeading
        eyebrow="Skills"
        title="A stack centered on Java backend development, data systems and practical tooling."
        description="Skills are grouped for fast scanning across languages, frameworks, data stores, distributed systems and developer tooling."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-xl font-semibold text-[var(--foreground)]">{group.title}</h3>
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
