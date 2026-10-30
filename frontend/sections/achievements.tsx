import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { achievements } from "@/data/portfolio";

export function AchievementsSection() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className="scroll-mt-24 py-14 sm:py-20">
      <SectionHeading index="05" title="Achievements" id="achievements-title" />

      <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-[var(--line)] lg:grid-cols-3">
        {achievements.map((achievement, index) => (
          <Reveal
            as="li"
            key={achievement.title}
            delay={index * 0.08}
            className="group relative flex flex-col gap-8 bg-[var(--background)] p-6 transition-colors duration-500 hover:bg-[var(--surface)] sm:p-8 md:flex-row md:items-start md:gap-12 lg:flex-col lg:gap-10"
          >
            <span className="font-display text-6xl font-semibold leading-none tracking-[-0.05em] text-[var(--line-strong)] transition-colors duration-500 group-hover:text-ink/40 md:w-24 md:shrink-0 lg:w-auto">
              0{index + 1}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-[var(--foreground)] sm:text-2xl">
                {achievement.title}
              </h3>
              <p className="text-pretty mt-3 text-[15px] leading-7 text-[var(--muted)]">{achievement.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
