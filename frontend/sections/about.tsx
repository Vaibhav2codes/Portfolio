import { motion } from "framer-motion";
import { Chip } from "@/components/chip";
import { SectionHeading } from "@/components/section-heading";

const paragraphs = [
  "I am a backend software engineer with experience building scalable backend systems and distributed applications.",
  "Currently working at Cleartrip in the Packages team building backend services for travel packages using Java and Spring Boot.",
  "Previously I worked at ZL Technologies where I built high-throughput backend systems including API logging pipelines, ORC-based data processing systems and distributed aggregation services.",
  "I enjoy solving complex engineering problems, optimizing performance and designing scalable backend architectures."
];

const highlights = [
  "Scalable REST APIs",
  "Distributed backend services",
  "Performance optimization",
  "Cloud-aligned architecture"
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 py-8">
      <SectionHeading
        eyebrow="About"
        title="Backend engineering with throughput, reliability and product context in mind."
        description="The portfolio is designed for recruiters and engineers who want quick signal on systems work, stack depth and measurable impact."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
        >
          <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(37,99,235,0.12),rgba(17,24,39,0.2))] p-6"
        >
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">Core Focus</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {highlights.map((highlight) => (
              <Chip key={highlight}>{highlight}</Chip>
            ))}
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
            <p className="font-mono text-sm text-accent">system.out.println(&quot;Build for scale, then make it observable.&quot;);</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
