import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaBarsStaggered,
  FaCode,
  FaFileArrowDown,
  FaGithub,
  FaLinkedin,
  FaXmark
} from "react-icons/fa6";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigationLinks, socialLinks } from "@/data/portfolio";

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  leetcode: SiLeetcode,
  codeforces: SiCodeforces,
  resume: FaFileArrowDown
};

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => setOpen(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--background)]/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-[var(--foreground)]">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-glow">
            <FaCode />
          </span>
          VAIBHAV
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                download={link.icon === "resume" ? true : undefined}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                aria-label={link.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base text-[var(--muted)] transition hover:border-primary/50 hover:text-primary"
              >
                <Icon />
              </a>
            );
          })}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--foreground)]"
          >
            {open ? <FaXmark /> : <FaBarsStaggered />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-white/10 bg-[color:var(--background)]/95 px-4 py-4 lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--foreground)]"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-wrap gap-3 pt-2">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      download={link.icon === "resume" ? true : undefined}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      aria-label={link.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--muted)]"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
