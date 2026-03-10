import Head from "next/head";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/data/portfolio";
import { AboutSection } from "@/sections/about";
import { AchievementsSection } from "@/sections/achievements";
import { ContactSection } from "@/sections/contact";
import { ExperienceSection } from "@/sections/experience";
import { HeroSection } from "@/sections/hero";
import { ProjectsSection } from "@/sections/projects";
import { SkillsSection } from "@/sections/skills";

export default function HomePage() {
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
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
