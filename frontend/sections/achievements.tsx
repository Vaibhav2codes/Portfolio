import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { achievements } from "@/data/portfolio";

export function AchievementsSection() {
  return (
    <section id="achievements" className="scroll-mt-28 py-8">
      <SectionHeading
        eyebrow="Achievements"
        title=""
        description=""
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {achievements.map((achievement, index) => (
          <motion.article
            key={achievement.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="surface-card rounded-[2rem] bg-[linear-gradient(180deg,rgba(37,99,235,0.08),rgba(255,255,255,0.72))] p-6 dark:bg-[linear-gradient(180deg,rgba(37,99,235,0.08),rgba(255,255,255,0.03))]"
          >
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">Achievement</p>
            <h3 className="mt-4 text-xl font-semibold text-[var(--foreground)]">{achievement.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{achievement.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
