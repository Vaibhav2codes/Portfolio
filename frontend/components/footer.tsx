import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { SiCodechef, SiCodeforces, SiLeetcode } from "react-icons/si";
import { siteConfig, socialLinks } from "@/data/portfolio";

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  leetcode: SiLeetcode,
  codeforces: SiCodeforces,
  codechef: SiCodechef,
  instagram: FaInstagram
};

export function Footer() {
  const footerLinks = socialLinks.filter((link) => link.icon !== "resume");

  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--subtle-bg)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="text-sm text-[var(--muted)]">{siteConfig.footerText}</p>
        <div className="flex items-center gap-3">
          {footerLinks.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="surface-control inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--muted)] transition hover:border-primary/50 hover:text-primary"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
