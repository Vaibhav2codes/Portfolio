import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experienceItems, projects, skillGroups } from "@/data/portfolio";

// Skill names that are spelled differently in the experience/project data.
const aliases: Record<string, string> = {
  "GCP (Cloud Run, GCS)": "Google Cloud"
};

const usedAtWork = new Set<string>([
  ...experienceItems.flatMap((item) => item.technologies),
  ...projects.flatMap((project) => project.stack)
]);

function isUsedAtWork(skill: string) {
  return usedAtWork.has(skill) || usedAtWork.has(aliases[skill] ?? "");
}

export function SkillsSection() {
  const totalSkills = skillGroups.reduce((count, group) => count + group.items.length, 0);

  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24 py-14 sm:py-20">
      <SectionHeading
        index="04"
        title="Skills"
        id="skills-title"
        aside={
          <p className="flex items-center gap-2.5 font-mono text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Used in professional work · {totalSkills} total
          </p>
        }
      />

      <div>
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.title}
            delay={index * 0.04}
            y={12}
            className="group grid gap-4 border-t border-line py-6 transition-colors duration-300 first:border-t-0 md:grid-cols-[16rem_minmax(0,1fr)] md:items-baseline md:gap-8 md:py-7"
          >
            <h3 className="flex items-baseline gap-3 text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--foreground)]">
              <span className="font-mono text-[11px] text-[var(--faint)]">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-sm font-medium uppercase tracking-[0.14em]">
                {group.title}
                <span className="ml-2 font-mono text-[11px] tracking-normal text-[var(--faint)]">
                  ({group.items.length})
                </span>
              </span>
            </h3>
            <ul className="flex flex-wrap gap-x-2 gap-y-3">
              {group.items.map((item) => {
                const used = isUsedAtWork(item);
                return (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 font-display text-base font-medium tracking-[-0.01em] text-[var(--foreground)] transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5 sm:text-lg"
                  >
                    {used ? (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                        <span className="sr-only">Used in professional work: </span>
                      </>
                    ) : null}
                    {item}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
