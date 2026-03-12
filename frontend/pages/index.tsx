import Head from "next/head";
import dynamic from "next/dynamic";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/data/portfolio";
import { useBackendWarmup } from "@/hooks/useBackendWarmup";
import { AboutSection } from "@/sections/about";
import { AchievementsSection } from "@/sections/achievements";
import { ContactSection } from "@/sections/contact";
import { ExperienceSection } from "@/sections/experience";
import { HeroSection } from "@/sections/hero";
import { ProjectsSection } from "@/sections/projects";
import { SkillsSection } from "@/sections/skills";

const GithubActivity = dynamic(
  () => import("@/components/github/GithubActivity").then((module) => module.GithubActivity),
  {
    ssr: false,
    loading: () => (
      <section id="github-activity" className="py-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="h-5 w-40 animate-pulse rounded-full bg-white/10" />
          <div className="mt-4 h-[360px] animate-pulse rounded-[1.5rem] bg-white/10" />
        </div>
      </section>
    )
  }
);

export default function HomePage() {
  useBackendWarmup();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const title = `${siteConfig.name} | ${siteConfig.title}`;
  const description = siteConfig.tagline;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="Vaibhav Singh, backend engineer, Java developer, Spring Boot, distributed systems, portfolio"
        />
        <meta name="author" content={siteConfig.name} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/og-cover.svg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}/og-cover.svg`} />
        <link rel="canonical" href={siteUrl} />
      </Head>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.12),transparent_22%),linear-gradient(180deg,var(--background),var(--background))]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-grid bg-[size:48px_48px] opacity-40 [mask-image:linear-gradient(180deg,rgba(255,255,255,0.6),transparent)]" />
        <Navbar />
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-10 sm:px-6 lg:px-8">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <AchievementsSection />
          <GithubActivity username="Vaibhav2codes" />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
