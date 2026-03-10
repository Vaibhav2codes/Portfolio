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
      className="relative grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl"
      >
        <Chip className="mb-6 border-primary/20 bg-primary/10 text-primary">
          Software Development Engineer 1 • Cleartrip Packages Team
        </Chip>
        <h1 className="text-5xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl">
          {siteConfig.name}
        </h1>
        <p className="mt-5 max-w-2xl text-xl text-[var(--foreground)]/90 sm:text-2xl">{siteConfig.title}</p>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{siteConfig.shortSubtitle}</p>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted)]">{siteConfig.currentLine}</p>

        <div className="mt-8 flex min-h-[4rem] items-center rounded-3xl border border-white/10 bg-black/20 px-5 py-4 font-mono text-sm text-accent shadow-glow">
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
            href="/Vaibhav_Singh_Resume.txt"
            download
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-primary/50 hover:text-primary"
          >
            Download Resume
            <FaFileArrowDown className="text-xs" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-primary/50 hover:text-primary"
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
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(17,24,39,0.7))] p-6 shadow-glow">
          <div className="flex items-center gap-2 pb-5">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-accent" />
          </div>
          <div className="space-y-5 font-mono text-sm">
            <div>
              <p className="text-primary">role.ts</p>
              <p className="mt-2 text-[var(--muted)]">
                export const engineer = &#123; focus: [&quot;backend&quot;, &quot;distributed systems&quot;, &quot;cloud&quot;] &#125;;
              </p>
            </div>
            <div>
              <p className="text-primary">impact.log</p>
              <p className="mt-2 text-[var(--muted)]">+30% throughput improvement in enterprise data pipelines</p>
              <p className="text-[var(--muted)]">-50% logging latency using async ingestion workflows</p>
              <p className="text-[var(--muted)]">Travel package backend APIs at Cleartrip</p>
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
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
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
