import { FaArrowUp } from "react-icons/fa6";
import { socialIcons } from "@/components/social-icons";
import { siteConfig, socialLinks } from "@/data/portfolio";

export function Footer() {
  const footerLinks = socialLinks.filter((link) => link.icon !== "resume");

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="text-sm text-[var(--muted)]">{siteConfig.footerText}</p>
        <div className="flex flex-wrap items-center gap-2">
          {footerLinks.map((link) => {
            const Icon = socialIcons[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--subtle-bg)] hover:text-[var(--foreground)]"
              >
                <Icon />
              </a>
            );
          })}
          <span className="mx-2 h-5 w-px bg-[var(--line-strong)]" aria-hidden="true" />
          <a
            href="#home"
            className="group inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-[13px] font-medium text-[var(--foreground)] transition hover:border-primary/50"
          >
            Back to top
            <FaArrowUp className="text-[10px] transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
