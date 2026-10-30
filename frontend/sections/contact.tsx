import { FaArrowRight } from "react-icons/fa6";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { socialIcons } from "@/components/social-icons";
import { contactLinks, socialLinks } from "@/data/portfolio";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 py-14 sm:py-20">
      <SectionHeading index="07" title="Contact" id="contact-title" />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Reach out</p>
          <ul className="mt-4 border-t border-line">
            {contactLinks.map((item) => {
              const external = item.href.startsWith("http");
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 border-b border-line py-5"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--faint)]">
                        {item.label}
                      </p>
                      <p className="mt-1.5 truncate text-[15px] text-[var(--foreground)] transition-colors group-hover:text-ink">
                        {item.value}
                      </p>
                    </div>
                    <FaArrowRight className="shrink-0 -rotate-45 text-xs text-[var(--faint)] transition-all duration-300 group-hover:rotate-0 group-hover:text-ink" />
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--faint)]">Elsewhere</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[13px] text-[var(--muted)] transition hover:border-primary/50 hover:text-[var(--foreground)]"
                >
                  <Icon className="text-sm" aria-hidden="true" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
