import { useEffect, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { heroKeywords } from "@/data/portfolio";
import { useSpotlight } from "@/hooks/useSpotlight";

const tabs = ["role.ts", "impact.log"] as const;
type Tab = (typeof tabs)[number];

const impactLines = [
  "0-to-1 backend for Cleartrip Holiday Packages: 10+ production REST APIs",
  "<150ms Elasticsearch search, filter and feed APIs",
  "-50% analytics storage, overnight batches -> 1-minute refreshes (Apache ORC)",
  "+30% pipeline throughput on millions of log events/day"
];

function RoleSource() {
  const focus = ["backend", "distributed systems", "cloud"];
  const lines = [
    <>
      <span className="text-violet-600 dark:text-violet-300">export const</span>{" "}
      <span className="text-[var(--foreground)]">engineer</span> = {"{"}
    </>,
    <>
      {"  "}
      <span className="text-sky-700 dark:text-sky-300">focus</span>: [
    </>,
    ...focus.map((item) => (
      <span key={item}>
        {"    "}
        <span className="text-emerald-700 dark:text-emerald-300">&quot;{item}&quot;</span>,
      </span>
    )),
    <>{"  "}],</>,
    <>{"};"}</>
  ];

  return (
    <ol className="space-y-1">
      {lines.map((line, index) => (
        <li key={index} className="flex gap-5">
          <span className="w-4 shrink-0 select-none text-right text-[var(--faint)]">{index + 1}</span>
          <span className="whitespace-pre text-[var(--muted)]">{line}</span>
        </li>
      ))}
    </ol>
  );
}

function ImpactLog() {
  return (
    <ul className="space-y-3">
      {impactLines.map((line) => (
        <li key={line} className="flex gap-3 leading-6">
          <span className="shrink-0 text-emerald-600 dark:text-accent">[ok]</span>
          <span className="text-[var(--muted)]">{line}</span>
        </li>
      ))}
    </ul>
  );
}

function useTypedKeyword(words: string[], animate: boolean) {
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];

    if (!animate) {
      const id = window.setTimeout(() => {
        setWordIndex((current) => (current + 1) % words.length);
        setLength(words[(wordIndex + 1) % words.length].length);
      }, 2200);
      return () => window.clearTimeout(id);
    }

    let delay = deleting ? 35 : 70;
    if (!deleting && length === word.length) delay = 1800;
    if (deleting && length === 0) delay = 250;

    const id = window.setTimeout(() => {
      if (!deleting && length === word.length) {
        setDeleting(true);
      } else if (deleting && length === 0) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
      } else {
        setLength((current) => current + (deleting ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(id);
  }, [animate, deleting, length, wordIndex, words]);

  return words[wordIndex].slice(0, length);
}

export function CodeWindow() {
  const [activeTab, setActiveTab] = useState<Tab>("role.ts");
  const prefersReducedMotion = useReducedMotion();
  const keyword = useTypedKeyword(heroKeywords, !prefersReducedMotion);
  const onPointerMove = useSpotlight<HTMLDivElement>();

  function handleTabKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }

    const next = tabs[(tabs.indexOf(activeTab) + 1) % tabs.length];
    setActiveTab(next);
    document.getElementById(`code-tab-${next}`)?.focus();
  }

  return (
    <div
      onPointerMove={onPointerMove}
      className="spotlight surface-card overflow-hidden rounded-2xl font-mono text-[13px] backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 border-b border-line px-4">
        <div className="flex gap-1.5 py-3.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line-strong)]" />
        </div>
        <div role="tablist" aria-label="Code samples" className="flex self-stretch" onKeyDown={handleTabKeys}>
          {tabs.map((tab) => {
            const selected = tab === activeTab;
            return (
              <button
                key={tab}
                id={`code-tab-${tab}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="code-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "relative px-3 text-xs transition-colors",
                  selected ? "text-[var(--foreground)]" : "text-[var(--faint)] hover:text-[var(--muted)]"
                )}
              >
                {tab}
                {selected ? (
                  <motion.span
                    layoutId="code-tab-underline"
                    className="absolute inset-x-2 -bottom-px h-px bg-ink"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="code-panel"
        role="tabpanel"
        aria-labelledby={`code-tab-${activeTab}`}
        className="relative min-h-[15.5rem] overflow-x-auto px-5 py-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "role.ts" ? <RoleSource /> : <ImpactLog />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 border-t border-line bg-[var(--subtle-bg)] px-5 py-3.5 text-xs">
        <span className="text-ink">$</span>
        <span className="text-[var(--muted)]">building with</span>
        <span className="text-[var(--foreground)]" aria-hidden="true">
          {keyword}
          <span className="animate-caret ml-px inline-block h-3.5 w-[7px] translate-y-[2px] bg-ink" />
        </span>
        <span className="sr-only">{heroKeywords.join(", ")}</span>
      </div>
    </div>
  );
}
