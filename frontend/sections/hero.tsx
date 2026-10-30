import { motion } from "framer-motion";
import { FaArrowDown, FaArrowRight, FaFileArrowDown } from "react-icons/fa6";
import { CodeWindow } from "@/components/code-window";
import { CountUp } from "@/components/count-up";
import { Magnetic } from "@/components/magnetic";
import { EASE_OUT } from "@/components/reveal";
import { experienceItems, siteConfig, stats } from "@/data/portfolio";
import { RESUME_PUBLIC_URL } from "@/utils/resume";

const currentRole = experienceItems[0];
const [currentCompany, currentCompanyGroup] = currentRole.company.split(/\s(?=\()/);

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE_OUT }
});

export function HeroSection() {
  const nameParts = siteConfig.name.split(" ");

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-center pb-10 pt-28 lg:pt-32">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-[var(--subtle-bg)] py-1.5 pl-3 pr-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] sm:text-xs"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-status-ping absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Currently at {currentCompany}
            {currentCompanyGroup ? <span className="hidden sm:inline">&nbsp;{currentCompanyGroup}</span> : null}
          </motion.p>

          <h1 className="mt-7 font-display text-[clamp(3.5rem,11vw,8rem)] font-semibold leading-[0.88] tracking-[-0.05em] text-[var(--foreground)]">
            <span className="sr-only">{siteConfig.name}</span>
            {nameParts.map((part, index) => (
              <span key={part} aria-hidden="true" className="-mb-[0.1em] block overflow-hidden pb-[0.16em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1 + index * 0.08, ease: EASE_OUT }}
                >
                  {part}
                  {index === nameParts.length - 1 ? <span className="text-ink">.</span> : null}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            {...fadeUp(0.3)}
            className="mt-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-ink sm:text-sm"
          >
            <span className="h-px w-8 bg-current" aria-hidden="true" />
            {siteConfig.title}
          </motion.p>

          <motion.p
            {...fadeUp(0.38)}
            className="text-pretty mt-5 max-w-xl text-xl leading-relaxed text-[var(--foreground)]/85 sm:text-2xl sm:leading-relaxed"
          >
            {siteConfig.shortSubtitle}
          </motion.p>
          <motion.p {...fadeUp(0.44)} className="text-pretty mt-4 max-w-xl text-[15px] leading-7 text-[var(--muted)]">
            {siteConfig.currentLine}
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.7)] transition hover:bg-blue-500"
              >
                View Projects
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a
                href={RESUME_PUBLIC_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-[var(--control-bg)] px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition hover:border-primary/50"
              >
                Download Resume
                <FaFileArrowDown className="text-xs text-[var(--muted)] transition-colors group-hover:text-ink" />
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-3 py-3.5 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                Contact Me
              </span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE_OUT }}
          className="relative"
        >
          <div
            className="pointer-events-none absolute -inset-y-10 inset-x-0 -z-10 rounded-full sm:-inset-x-10 bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl"
            aria-hidden="true"
          />
          <CodeWindow />
        </motion.div>
      </div>

      <dl className="mt-16 grid grid-cols-2 border-y border-line md:grid-cols-4 lg:mt-20">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            {...fadeUp(0.6 + index * 0.08)}
            className="flex flex-col-reverse justify-end gap-2 border-line py-6 pr-4 [&:nth-child(2n)]:border-l [&:nth-child(2n)]:pl-5 [&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-t-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-6"
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--faint)]">{stat.label}</dt>
            <dd className="font-display text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {/^\d/.test(stat.value) ? (
                <CountUp value={stat.value} />
              ) : (
                <span className="block text-xl leading-tight sm:text-2xl">{stat.value}</span>
              )}
            </dd>
          </motion.div>
        ))}
      </dl>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="mx-auto mt-10 hidden h-10 w-10 items-center justify-center rounded-full border border-line-strong text-[var(--muted)] transition hover:border-primary/50 hover:text-ink lg:inline-flex"
      >
        <FaArrowDown className="text-xs" />
      </a>
    </section>
  );
}
