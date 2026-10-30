import { Chip } from "@/components/chip";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const lead =
  "I am a backend software engineer with 2+ years of experience designing and building scalable, high-performance microservices and REST APIs.";

const paragraphs = [
  "Currently at Cleartrip (Flipkart Group), I own 0-to-1 backend development of the Holiday Packages platform, building Java and Spring Boot microservices for search, listing, pricing, filters and booking.",
  "Previously I worked at ZL Technologies where I built high-throughput backend systems including API logging pipelines, ORC-based data processing systems and distributed aggregation services.",
  "I enjoy solving complex engineering problems, optimizing performance and designing scalable backend architectures.",
  "I have a strong interest in distributed systems, system design, and building reliable backend services that can handle high traffic and large-scale data.",
  "I like writing clean, maintainable code and continuously improving systems through performance optimizations and better architecture."
];

const offDuty = [
  "Outside of engineering, I enjoy playing Valorant, watching esports tournaments and WWE, and following the competitive gaming scene.",
  "In my free time, you’ll usually find me playing intense FIFA matches with the homies or exploring new games and tech."
];

const highlights = [
  "Scalable REST APIs",
  "Distributed backend services",
  "Performance optimization",
  "System design (HLD/LLD)",
  "Event-driven architecture"
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
    label: "Education",
    value: "B.Tech ECE, NIT Kurukshetra (2020–2024) · CGPA 8.66/10"
  },
  {
    label: "Focus",
    value: "Performance, reliability, observability"
  }
];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 py-14 sm:py-20">
      <SectionHeading index="01" title="About" id="about-title" />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <dl className="divide-y divide-[var(--line)] border-y border-line">
              {keyNotes.map((item) => (
                <div key={item.label} className="grid grid-cols-[8.5rem_1fr] gap-4 py-4">
                  <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--faint)]">
                    {item.label}
                  </dt>
                  <dd className="text-[15px] text-[var(--foreground)]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <p className="eyebrow">Core Focus</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {highlights.map((highlight) => (
                <Chip key={highlight}>{highlight}</Chip>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-8">
            <p className="surface-subtle overflow-x-auto rounded-xl px-4 py-3.5 font-mono text-[13px] leading-6 text-emerald-700 dark:text-accent">
              <span className="text-[var(--faint)]">system.out.</span>println(&quot;Build for scale, then make it
              observable.&quot;);
            </p>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="text-balance font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-[var(--foreground)] sm:text-3xl sm:leading-snug">
              {lead}
            </p>
          </Reveal>

          <div className="mt-8 space-y-5 text-base leading-8 text-[var(--muted)] sm:text-[17px]">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.03}>
                <p className="text-pretty">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 border-t border-line pt-8">
            <p className="eyebrow">Off the clock</p>
            <div className="mt-4 space-y-4 text-base leading-8 text-[var(--muted)] sm:text-[17px]">
              {offDuty.map((paragraph) => (
                <p key={paragraph} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
