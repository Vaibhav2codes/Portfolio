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
      <section id="github-activity" className="py-14 sm:py-20">
        <div className="surface-card rounded-3xl p-6">
          <div className="h-5 w-40 animate-pulse rounded-full bg-[var(--line-strong)]" />
          <div className="mt-4 h-[360px] animate-pulse rounded-2xl bg-[var(--subtle-bg)]" />
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
          content="Vaibhav Singh, backend engineer, Java developer, Spring Boot, microservices, distributed systems, Elasticsearch, Kafka, portfolio"
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
      <div className="relative isolate min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[110svh] overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-[size:56px_56px] opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_30%,transparent_75%)]" />
          <div className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.18),transparent)] blur-2xl" />
          <div className="absolute right-[-10rem] top-40 h-[24rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.08),transparent)] blur-2xl" />
        </div>
        <Navbar />
        <main id="main" className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-10 sm:px-6 lg:px-8">
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
