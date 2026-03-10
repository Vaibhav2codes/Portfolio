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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

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
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-[var(--muted)]">Name</span>
          <input
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-primary"
            placeholder="Your name"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-[var(--muted)]">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-primary"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="space-y-2 text-sm">
        <span className="text-[var(--muted)]">Subject</span>
        <input
          required
          value={form.subject}
          onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
          className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-primary"
          placeholder="Hiring discussion"
        />
      </label>
      <label className="space-y-2 text-sm">
        <span className="text-[var(--muted)]">Message</span>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-primary"
          placeholder="Tell me about the role, team or problem space."
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        {feedback ? (
          <p className={`text-sm ${status === "success" ? "text-accent" : "text-rose-400"}`}>{feedback}</p>
        ) : null}
      </div>
    </form>
  );
}
