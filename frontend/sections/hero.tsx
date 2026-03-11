import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaEnvelope, FaFileArrowDown } from "react-icons/fa6";
import { Chip } from "@/components/chip";
import { heroKeywords, siteConfig, stats } from "@/data/portfolio";

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroKeywords.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative grid gap-12 py-12 lg:min-h-[42rem] lg:grid-cols-[1.25fr_0.75fr] lg:items-start lg:py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl"
      >
        <Chip className="mb-6 border-primary/20 bg-primary/10 text-primary">
          Software Development Engineer 1
        </Chip>
        <h1 className="text-5xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl">
          {siteConfig.name}
        </h1>
        <p className="mt-5 max-w-2xl text-xl text-[var(--foreground)]/90 sm:text-2xl">{siteConfig.title}</p>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{siteConfig.shortSubtitle}</p>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted)]">{siteConfig.currentLine}</p>

        <div className="surface-subtle mt-8 flex min-h-[4rem] items-center rounded-3xl px-5 py-4 font-mono text-sm text-accent dark:shadow-glow">
          <span className="mr-3 text-primary">$</span>
          Building with <span className="ml-2 text-[var(--foreground)]">{heroKeywords[index]}</span>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            View Projects
            <FaArrowRight className="text-xs" />
          </a>
          <a
            href="/resume.pdf"
            download
            className="surface-control inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-primary/50 hover:text-primary"
          >
            Download Resume
            <FaFileArrowDown className="text-xs" />
          </a>
          <a
            href="#contact"
            className="surface-control inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-primary/50 hover:text-primary"
          >
            Contact Me
            <FaEnvelope className="text-xs" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative"
      >
        <div className="rounded-[2rem] border border-slate-300/80 bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(226,232,240,0.94))] p-6 shadow-[0_24px_80px_rgba(148,163,184,0.32)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(17,24,39,0.7))] dark:shadow-glow">
          <div className="flex items-center gap-2 pb-5">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-accent" />
          </div>
          <div className="space-y-5 font-mono text-sm">
            <div>
              <p className="text-blue-600 dark:text-primary">role.ts</p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                export const engineer = &#123; focus: [&quot;backend&quot;, &quot;distributed systems&quot;, &quot;cloud&quot;] &#125;;
              </p>
            </div>
            <div>
              <p className="text-blue-600 dark:text-primary">impact.log</p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
Built high-throughput logging pipeline (Log4j + ORC + async ingestion) improving enterprise API observability and debugging
</p>
              <p className="text-slate-600 dark:text-slate-300">-50% logging latency using async ingestion workflows</p>
              <p className="text-slate-600 dark:text-slate-300">Travel package backend APIs at Cleartrip</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {stats.map((stat, position) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + position * 0.08 }}
              className="surface-card rounded-[1.5rem] p-5"
            >
              <p className="text-2xl font-semibold text-[var(--foreground)]">{stat.value}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
