import { motion } from "framer-motion";
import { Chip } from "@/components/chip";

const paragraphs = [
 "I am a backend software engineer with experience building scalable backend systems and distributed applications.",
"Currently working at Cleartrip in the Packages team building backend services for travel packages using Java and Spring Boot.",
"Previously I worked at ZL Technologies where I built high-throughput backend systems including API logging pipelines, ORC-based data processing systems and distributed aggregation services.",
"I enjoy solving complex engineering problems, optimizing performance and designing scalable backend architectures.",
"I have a strong interest in distributed systems, system design, and building reliable backend services that can handle high traffic and large-scale data.",
"I like writing clean, maintainable code and continuously improving systems through performance optimizations and better architecture.",
"Outside of engineering, I enjoy playing Valorant, watching esports tournaments and WWE, and following the competitive gaming scene.",
"In my free time, you’ll usually find me playing intense FIFA matches with the homies or exploring new games and tech."
];

const highlights = [
  "Scalable REST APIs",
  "Distributed backend services",
  "Performance optimization",
  "Cloud-aligned architecture"
];

const keyNotes = [
  {
    label: "Primary Stack",
    value: "Java / Spring Boot"
  },
  {
    label: "Current Domain",
    value: "Travel backend systems"
  },
  {
    label: "Focus",
    value: "Performance, reliability, observability"
  }
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 py-8">
      <div className="mb-10">
        <p className="font-mono text-sm uppercase tracking-[0.32em] text-primary">About</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] lg:items-stretch">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="surface-card rounded-[2rem] p-6 sm:p-8"
        >
          <div className="space-y-6 text-base leading-8 text-[var(--muted)] sm:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.article>

        <div className="grid gap-8 lg:grid-rows-[auto_1fr]">
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="surface-card rounded-[2rem] p-6"
          >
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">Key Notes</p>
            <div className="mt-6 space-y-6">
              {keyNotes.map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {item.label}
                  </p>
                  <p className="mt-2 text-base leading-7 text-[var(--foreground)]">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.aside>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="surface-card rounded-[2rem] bg-[linear-gradient(180deg,rgba(37,99,235,0.12),rgba(255,255,255,0.72))] p-6 dark:bg-[linear-gradient(180deg,rgba(37,99,235,0.12),rgba(17,24,39,0.2))]"
          >
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">Core Focus</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {highlights.map((highlight) => (
                <Chip key={highlight}>{highlight}</Chip>
              ))}
            </div>
            <div className="surface-subtle mt-8 rounded-[1.5rem] p-5">
              <p className="font-mono text-sm text-accent">
                system.out.println(&quot;Build for scale, then make it observable.&quot;);
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
