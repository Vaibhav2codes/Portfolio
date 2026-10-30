import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { FaArrowRight, FaBarsStaggered, FaCode, FaXmark } from "react-icons/fa6";
import { EASE_OUT } from "@/components/reveal";
import { socialIcons } from "@/components/social-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigationLinks, socialLinks } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { RESUME_PUBLIC_URL } from "@/utils/resume";

const sectionIds = navigationLinks.map((link) => link.href.slice(1));
const headerSocials = socialLinks.filter((link) => link.icon === "github" || link.icon === "linkedin");

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const onHashChange = () => setOpen(false);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const elevated = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <a
        href="#main"
        className="sr-only rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={clsx(
          "mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-500 sm:px-4",
          elevated
            ? "border-line-strong bg-[color:var(--background)]/80 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <a
          href="#home"
          className="group flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-[var(--foreground)]"
          aria-label="Vaibhav Singh, back to top"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-ink transition-transform duration-300 group-hover:rotate-[-8deg]">
            <FaCode />
          </span>
          VAIBHAV
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navigationLinks.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={clsx(
                    "relative isolate block rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
                    isActive ? "text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-[var(--subtle-bg)]"
                    />
                  ) : null}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {headerSocials.map((link) => {
            const Icon = socialIcons[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="hidden h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--subtle-bg)] hover:text-[var(--foreground)] xl:inline-flex"
              >
                <Icon />
              </a>
            );
          })}
          <a
            href={RESUME_PUBLIC_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-[13px] font-medium text-[var(--foreground)] transition hover:border-primary/50 hover:text-ink"
          >
            Resume
            <FaArrowRight className="-rotate-45 text-[10px] transition-transform duration-300 group-hover:rotate-0" />
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="surface-control inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--foreground)]"
          >
            {open ? <FaXmark /> : <FaBarsStaggered />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="mx-auto mt-2 max-h-[calc(100dvh-5.5rem)] max-w-7xl overflow-y-auto rounded-2xl border border-line-strong bg-[color:var(--background)]/95 p-5 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {navigationLinks.map((link, index) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.03 * index, ease: EASE_OUT }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className="flex items-baseline gap-4 border-b border-line py-3"
                    >
                      <span className="font-mono text-xs text-[var(--faint)]">0{index + 1}</span>
                      <span
                        className={clsx(
                          "font-display text-2xl font-semibold tracking-tight",
                          isActive ? "text-ink" : "text-[var(--foreground)]"
                        )}
                      >
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
            <div className="flex flex-wrap gap-2 pt-5">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    aria-label={link.label}
                    className="surface-control inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--muted)] transition hover:text-[var(--foreground)]"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
