import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { contactLinks } from "@/data/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-28 py-8">
      <SectionHeading
        eyebrow="Contact"
        title="Open to backend engineering conversations, hiring discussions and platform problems worth solving."
        description="The contact form submits to the Java backend and surfaces clear success or error states for production use."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
        >
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">Reach out</p>
          <div className="mt-6 space-y-4">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/10 px-4 py-4 transition hover:border-primary/40"
              >
                <div>
                  <p className="text-sm text-[var(--muted)]">{item.label}</p>
                  <p className="mt-1 text-[var(--foreground)]">{item.value}</p>
                </div>
                <FaArrowUpRightFromSquare className="text-primary" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
