import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to send your message right now.");
      }

      setStatus("success");
      setFeedback(payload.message || "Message sent successfully.");
      setForm(initialState);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setStatus("error");
      setFeedback(message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card space-y-5 rounded-3xl p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--faint)]">Name</span>
          <input
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="surface-subtle w-full rounded-xl px-4 py-3 text-[15px] text-[var(--foreground)] outline-none transition placeholder:text-[var(--faint)] focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
            placeholder="Your name"
          />
        </label>
        <label className="block space-y-2 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--faint)]">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="surface-subtle w-full rounded-xl px-4 py-3 text-[15px] text-[var(--foreground)] outline-none transition placeholder:text-[var(--faint)] focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="block space-y-2 text-sm">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--faint)]">Subject</span>
        <input
          required
          value={form.subject}
          onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
          className="surface-subtle w-full rounded-xl px-4 py-3 text-[15px] text-[var(--foreground)] outline-none transition placeholder:text-[var(--faint)] focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
          placeholder="Message subject or title"
        />
      </label>
      <label className="block space-y-2 text-sm">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--faint)]">Message</span>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          className="surface-subtle w-full rounded-xl px-4 py-3 text-[15px] text-[var(--foreground)] outline-none transition placeholder:text-[var(--faint)] focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
          placeholder="Tell me about the role, team or problem space."
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.7)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        {feedback ? (
          <p role="status" className={`text-sm ${status === "success" ? "text-emerald-600 dark:text-accent" : "text-rose-500 dark:text-rose-400"}`}>{feedback}</p>
        ) : null}
      </div>
    </form>
  );
}
