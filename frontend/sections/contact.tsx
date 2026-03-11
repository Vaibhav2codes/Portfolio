import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { ContactForm } from "@/components/contact-form";
import { contactLinks } from "@/data/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-28 py-8">
      <div className="mb-10">
        <p className="font-mono text-sm uppercase tracking-[0.32em] text-primary">Contact</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="surface-card rounded-[2rem] p-6 sm:p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">Reach out</p>
            <div className="mt-6 space-y-4">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="surface-subtle flex items-center justify-between rounded-[1.5rem] px-4 py-4 transition hover:border-primary/40"
                >
                  <div>
                    <p className="text-sm text-[var(--muted)]">{item.label}</p>
                    <p className="mt-1 text-[var(--foreground)]">{item.value}</p>
                  </div>
                  <FaArrowUpRightFromSquare className="text-primary" />
                </a>
              ))}
            </div>
          </div>

          <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
