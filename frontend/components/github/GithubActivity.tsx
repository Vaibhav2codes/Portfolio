"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { FaArrowUpRightFromSquare, FaCodeBranch, FaStar } from "react-icons/fa6";
import { GithubApiError, type GithubActivitySummary, fetchGithubActivitySummary } from "@/utils/githubApi";

type GithubActivityProps = {
  username?: string;
};

const CALENDAR_THEME = {
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  light: ["#e2e8f0", "#bbf7d0", "#4ade80", "#22c55e", "#15803d"]
};

const PANEL_CLASS =
  "surface-card rounded-[2rem]";

const SUBTLE_PANEL_CLASS =
  "surface-subtle rounded-[1.5rem]";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  {
    ssr: false,
    loading: () => <HeatmapSkeleton />
  }
);

const numberFormatter = new Intl.NumberFormat("en-US");
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

export function GithubActivity({ username = "Vaibhav2codes" }: GithubActivityProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const [activity, setActivity] = useState<GithubActivitySummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadActivity() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const data = await fetchGithubActivitySummary(username);

        if (isMounted) {
          setActivity(data);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (error instanceof GithubApiError) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Unable to load GitHub activity right now.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadActivity();

    return () => {
      isMounted = false;
    };
  }, [username]);

  const stats = useMemo(
    () => [
      {
        label: "Total Repositories",
        sublabel: "Public repos",
        value: activity ? numberFormatter.format(activity.stats.totalRepositories) : "--"
      },
      {
        label: "Total Stars",
        sublabel: "Across active repos",
        value: activity ? numberFormatter.format(activity.stats.totalStars) : "--"
      },
      {
        label: "Total Commits",
        sublabel: "Last 365 days",
        value:
          activity && activity.stats.totalCommits !== null
            ? numberFormatter.format(activity.stats.totalCommits)
            : "--"
      },
      {
        label: "Followers",
        sublabel: "GitHub profile",
        value: activity ? numberFormatter.format(activity.stats.followers) : "--"
      },
      {
        label: "Following",
        sublabel: "GitHub profile",
        value: activity ? numberFormatter.format(activity.stats.following) : "--"
      }
    ],
    [activity]
  );

  const profileUrl = activity?.profile.profileUrl || `https://github.com/${username}`;

  const tooltipStyle = useMemo(
    () => ({
      backgroundColor: isDark ? "#0f172a" : "#ffffff",
      border: isDark ? "1px solid rgba(148, 163, 184, 0.2)" : "1px solid rgba(203, 213, 225, 0.9)",
      borderRadius: "16px",
      boxShadow: isDark ? "none" : "0 18px 45px rgba(148, 163, 184, 0.18)",
      color: isDark ? "#e5e7eb" : "#0f172a"
    }),
    [isDark]
  );

  return (
    <section id="github-activity" className="scroll-mt-28 py-8">
      <div className="mb-10">
        <p className="font-mono text-sm uppercase tracking-[0.32em] text-primary">GitHub Activity</p>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className={`${PANEL_CLASS} overflow-hidden p-6 sm:p-8`}
        >
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
            <div className="min-w-0">
              <div className="flex flex-col gap-5 border-b border-slate-200/80 pb-5 dark:border-white/10 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">
                    Contribution Heatmap
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <InfoPill label="Window" value="Last 365 days" />
                  <InfoPill
                    label="Commits"
                    value={
                      activity?.stats.totalCommits !== null && activity
                        ? numberFormatter.format(activity.stats.totalCommits)
                        : "--"
                    }
                  />
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:border-primary/60 hover:bg-primary/15"
                  >
                    View Profile
                    <FaArrowUpRightFromSquare className="text-xs" />
                  </motion.a>
                </div>
              </div>

              <div className="overflow-x-auto pt-5">
                <div className="min-w-[720px]">
                  <GitHubCalendar
                    username={username}
                    blockMargin={5}
                    blockRadius={4}
                    blockSize={14}
                    colorScheme={isDark ? "dark" : "light"}
                    errorMessage="Contribution data is temporarily unavailable."
                    fontSize={14}
                    labels={{
                      totalCount: "{{count}} public contributions in the last year"
                    }}
                    showWeekdayLabels
                    theme={CALENDAR_THEME}
                    transformData={(contributions) => contributions.slice(-365)}
                  />
                </div>
              </div>
            </div>

            <div className={`${SUBTLE_PANEL_CLASS} p-5`}>
              {activity ? <ProfileCard activity={activity} profileUrl={profileUrl} /> : <ProfileCardSkeleton />}
            </div>
          </div>
        </motion.div>

        {isLoading ? <GithubActivitySkeleton /> : null}

        {!isLoading && errorMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            className="rounded-[2rem] border border-amber-300/60 bg-amber-50 p-6 text-amber-900 dark:border-amber-400/25 dark:bg-amber-500/10 dark:text-amber-50/90"
          >
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-amber-600 dark:text-amber-300">
              Data Notice
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7">{errorMessage}</p>
          </motion.div>
        ) : null}

        {!isLoading && activity ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {stats.map((stat, index) => (
                <motion.article
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className={`${PANEL_CLASS} p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/25 dark:hover:border-primary/35`}
                >
                  <p className="text-sm text-[var(--muted)]">{stat.label}</p>
                  <p className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)]">{stat.value}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                    {stat.sublabel}
                  </p>
                </motion.article>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className={`${PANEL_CLASS} p-6`}
              >
                <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">
                  Top Languages
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  Language frequency is calculated from public non-fork repositories.
                </p>

                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(220px,280px)_1fr] lg:items-center">
                  {activity.topLanguages.length > 0 ? (
                    <>
                      <div className="relative h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={activity.topLanguages}
                              cx="50%"
                              cy="50%"
                              dataKey="value"
                              innerRadius={76}
                              outerRadius={110}
                              paddingAngle={3}
                              stroke={isDark ? "#0f172a" : "#f8fafc"}
                              strokeWidth={4}
                            >
                              {activity.topLanguages.map((language) => (
                                <Cell key={language.name} fill={language.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={tooltipStyle}
                              formatter={(value) => [`${String(value ?? 0)} repos`, "Frequency"]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <div className="surface-control rounded-full px-5 py-4 text-center dark:bg-slate-900/90">
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                              Languages
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
                              {activity.topLanguages.length}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        {activity.topLanguages.map((language) => (
                          <div
                            key={language.name}
                            className={`${SUBTLE_PANEL_CLASS} flex items-center justify-between px-4 py-3`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="h-3.5 w-3.5 rounded-full"
                                style={{ backgroundColor: language.color }}
                              />
                              <span className="font-medium text-[var(--foreground)]">{language.name}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-[var(--foreground)]">
                                {language.value}
                              </p>
                              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                                repos
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="surface-subtle flex h-[260px] items-center justify-center rounded-[1.5rem] border-dashed px-6 text-center text-sm text-[var(--muted)]">
                      No language breakdown is available for the current public repositories.
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className={`${PANEL_CLASS} p-6`}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">
                      Recent Repositories
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                      Latest public repositories ordered by most recent update.
                    </p>
                  </div>
                  <a
                    href={`${profileUrl}?tab=repositories`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
                  >
                    Browse all repositories
                  </a>
                </div>

                <div className="mt-6 grid gap-4">
                  {activity.recentRepositories.map((repository, index) => (
                    <motion.a
                      key={repository.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.3, delay: index * 0.06 }}
                      href={repository.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`${SUBTLE_PANEL_CLASS} group p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/25 dark:hover:border-primary/35`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--foreground)] transition group-hover:text-primary">
                            {repository.name}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                            {repository.description || "No description provided for this repository."}
                          </p>
                        </div>
                        <FaArrowUpRightFromSquare className="mt-1 shrink-0 text-sm text-[var(--muted)] transition group-hover:text-primary" />
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
                        <span className="surface-control rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-emerald-600 dark:text-accent">
                          {repository.language || "Unknown"}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <FaStar className="text-xs text-amber-500 dark:text-amber-300" />
                          {numberFormatter.format(repository.stars)}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <FaCodeBranch className="text-xs text-primary" />
                          {numberFormatter.format(repository.forks)}
                        </span>
                      </div>

                      <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                        Updated {dateFormatter.format(new Date(repository.updatedAt))}
                      </p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {activity.warnings.length > 0 ? (
              <div className="rounded-[1.75rem] border border-amber-300/60 bg-amber-50 p-5 text-sm leading-7 text-amber-900 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-50/90">
                {activity.warnings.join(" ")}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}

function ProfileCard({
  activity,
  profileUrl
}: {
  activity: GithubActivitySummary;
  profileUrl: string;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={activity.profile.avatarUrl}
          alt={activity.profile.displayName}
          width={64}
          height={64}
          className="h-16 w-16 rounded-2xl border border-slate-200 object-cover dark:border-white/10"
        />
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold text-[var(--foreground)]">
            {activity.profile.displayName}
          </p>
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition hover:text-primary"
          >
            @{activity.profile.username}
            <FaArrowUpRightFromSquare className="text-[10px]" />
          </a>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <MiniStat label="Repos" value={numberFormatter.format(activity.stats.totalRepositories)} />
        <MiniStat label="Followers" value={numberFormatter.format(activity.stats.followers)} />
        <MiniStat
          label="Commits"
          value={
            activity.stats.totalCommits !== null
              ? numberFormatter.format(activity.stats.totalCommits)
              : "--"
          }
        />
        <MiniStat label="Stars" value={numberFormatter.format(activity.stats.totalStars)} />
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-subtle rounded-2xl px-4 py-3 dark:bg-slate-950/50">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-600 dark:text-accent">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{value}</p>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-control rounded-full px-4 py-2 text-sm text-[var(--muted)] dark:bg-black/10">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-600 dark:text-accent">
        {label}
      </span>
      <span className="ml-2 text-[var(--foreground)]">{value}</span>
    </div>
  );
}

function ProfileCardSkeleton() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-200 dark:bg-white/10" />
        <div className="flex-1">
          <div className="h-5 w-36 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="mt-3 h-4 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="surface-subtle rounded-2xl px-4 py-3 dark:bg-slate-950/50"
          >
            <div className="h-3 w-14 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="mt-3 h-5 w-12 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

function GithubActivitySkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={`${PANEL_CLASS} p-5`}>
            <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="mt-5 h-9 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="mt-3 h-3 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div className={`${PANEL_CLASS} p-6`}>
          <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="mt-3 h-3 w-56 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="mt-8 h-[260px] animate-pulse rounded-[1.5rem] bg-slate-100 dark:bg-white/10" />
        </div>

        <div className={`${PANEL_CLASS} p-6`}>
          <div className="h-4 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="mt-3 h-3 w-48 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="mt-6 grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={`${SUBTLE_PANEL_CLASS} p-5`}>
                <div className="h-5 w-36 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
                <div className="mt-3 h-3 w-full animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
                <div className="mt-2 h-3 w-4/5 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
                <div className="mt-4 h-3 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeatmapSkeleton() {
  return (
    <div className="surface-subtle rounded-[1.5rem] p-4 dark:bg-black/10">
      <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-2 sm:grid-cols-[repeat(24,minmax(0,1fr))]">
        {Array.from({ length: 96 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square rounded-[4px] bg-slate-200 animate-pulse dark:bg-white/10"
          />
        ))}
      </div>
    </div>
  );
}
