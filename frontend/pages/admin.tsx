import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;

function formatLastUpdated(value: string | null) {
  if (!value) {
    return "Not uploaded yet";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export default function AdminResumePage() {
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    async function loadResumeInfo() {
      try {
        const response = await fetch("/api/resume/metadata");
        const payload = (await response.json()) as { lastUpdated?: string | null };
        setLastUpdated(payload.lastUpdated || null);
      } catch {
        setLastUpdated(null);
      }
    }

    void loadResumeInfo();
  }, []);

  const fileLabel = useMemo(() => {
    if (!selectedFile) {
      return "Choose a PDF or drag it here";
    }

    return `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`;
  }, [selectedFile]);

  function validateFile(file: File) {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return "Only PDF files are allowed";
    }

    if (file.size > MAX_RESUME_SIZE_BYTES) {
      return "Resume file must be 5MB or smaller.";
    }

    return "";
  }

  function updateSelectedFile(file: File | null) {
    if (!file) {
      setSelectedFile(null);
      return;
    }

    const validationMessage = validateFile(file);

    if (validationMessage) {
      setStatus("error");
      setFeedback(validationMessage);
      setSelectedFile(null);
      return;
    }

    setFeedback("");
    setStatus("idle");
    setSelectedFile(file);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFile) {
      setStatus("error");
      setFeedback("Please select a resume PDF file.");
      return;
    }

    const validationMessage = validateFile(selectedFile);

    if (validationMessage) {
      setStatus("error");
      setFeedback(validationMessage);
      return;
    }

    try {
      setStatus("loading");
      setFeedback("Upload in progress...");

      const formData = new FormData();
      formData.append("password", password);
      formData.append("resume", selectedFile);

      const response = await fetch("/api/resume/admin", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as { error?: string; lastUpdated?: string | null; message?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Upload failed");
      }

      setStatus("success");
      setFeedback(payload.message || "Resume updated successfully");
      setLastUpdated(payload.lastUpdated || null);
      setSelectedFile(null);
      setPassword("");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Upload failed");
    }
  }

  return (
    <>
      <Head>
        <title>Resume Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--foreground)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="surface-card rounded-[2rem] p-6 sm:p-8">
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">Resume Admin</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Update Resume</h1>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              Uploading a new PDF replaces the public file at <span className="font-mono text-primary">/resume.pdf</span>.
            </p>

            <div className="surface-subtle mt-6 rounded-[1.5rem] p-4 text-sm text-[var(--muted)]">
              <p>
                <span className="font-medium text-[var(--foreground)]">Last updated:</span>{" "}
                {formatLastUpdated(lastUpdated)}
              </p>
              <p className="mt-2">
                <span className="font-medium text-[var(--foreground)]">Rules:</span> PDF only, max 5MB.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <label className="block space-y-2 text-sm">
                <span className="text-[var(--muted)]">Password</span>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="surface-subtle w-full rounded-2xl px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-primary"
                  placeholder="Enter admin password"
                />
              </label>

              <div className="space-y-2 text-sm">
                <span className="text-[var(--muted)]">Upload Resume (PDF)</span>
                <label
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragActive(true);
                  }}
                  onDragLeave={() => setIsDragActive(false)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setIsDragActive(false);
                    updateSelectedFile(event.dataTransfer.files[0] || null);
                  }}
                  className={`surface-subtle flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] px-5 py-8 text-center transition ${
                    isDragActive ? "border-primary" : ""
                  }`}
                >
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    className="hidden"
                    onChange={(event) => updateSelectedFile(event.target.files?.[0] || null)}
                  />
                  <p className="font-medium text-[var(--foreground)]">{fileLabel}</p>
                  <p className="mt-2 text-[var(--muted)]">Drag and drop a PDF here or click to browse</p>
                </label>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Updating Resume..." : "Update Resume"}
              </button>

              {feedback ? (
                <p
                  className={`text-sm ${
                    status === "success"
                      ? "text-emerald-600 dark:text-accent"
                      : status === "loading"
                        ? "text-primary"
                        : "text-rose-500"
                  }`}
                >
                  {feedback}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
