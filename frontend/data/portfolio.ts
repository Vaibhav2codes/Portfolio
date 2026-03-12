import { RESUME_PUBLIC_URL } from "@/utils/resume";

export const siteConfig = {
  name: "Vaibhav Singh",
  title: "Software Development Engineer",
  tagline:
    "Backend Engineer building scalable distributed systems using Java, Spring Boot and Cloud technologies.",
  shortSubtitle:
    "Backend Engineer building scalable distributed systems with Java, Spring Boot and Cloud technologies.",
  currentLine:
    "Currently SDE-1 at Cleartrip working on travel packages backend systems. Previously Software Developer at ZL Technologies.",
  location: "India",
  phone: "+91-8239307242",
  email: "vaibhav2112001@gmail.com",
  footerText: "© 2026 Vaibhav Singh. Built with Next.js, Tailwind CSS and Spring Boot."
};

export const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" }
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Vaibhav2codes",
    icon: "github",
    external: true
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vaibhav-singh-2b259b237",
    icon: "linkedin",
    external: true
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/vaibhavcodes02/",
    icon: "leetcode",
    external: true
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/vaibhav02codes",
    icon: "codeforces",
    external: true
  },
  {
    label: "CodeChef",
    href: "https://www.codechef.com/users/vaibhavcodes02",
    icon: "codechef",
    external: true
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/vaibhav_02.11/",
    icon: "instagram",
    external: true
  },
  {
    label: "Resume",
    href: RESUME_PUBLIC_URL,
    icon: "resume",
    external: true
  }
] as const;

export const heroKeywords = [
  "Java",
  "Spring Boot",
  "Distributed Systems",
  "Cloud Systems",
  "Elasticsearch"
];

export const stats = [
  { label: "Years Experience", value: "1.5+" },
  { label: "DSA Problems Solved", value: "700+" },
  { label: "CodeChef Rating", value: "1705" },
  { label: "Education", value: "B.Tech NIT Kurukshetra" }
];

export const experienceItems = [
  {
    company: "Cleartrip (Flipkart Group)",
    role: "Software Development Engineer 1",
    duration: "Feb 2026 - Present",
    location: "Bangalore, India",
    description: [
      "Working in the Packages team building backend services that power travel package systems.",
      "Developing scalable REST APIs using Spring Boot with layered architecture.",
      "Working with cloud infrastructure and distributed backend services.",
      "Contributing to backend systems supporting travel package discovery and configuration."
    ],
    technologies: ["Java", "Spring Boot", "REST APIs", "Google Cloud", "Elasticsearch"]
  },
  {
    company: "ZL Technologies",
    role: "Software Developer",
    duration: "Sep 2024 - Jan 2026",
    location: "Hyderabad, India",
    description: [
      "Designed and developed scalable backend services for enterprise data platforms.",
      "Built high-throughput API logging and monitoring systems.",
      "Improved system throughput by around 30 percent through optimized data pipelines.",
      "Refactored multithreaded aggregation pipelines supporting real-time monitoring dashboards.",
      "Mentored two junior engineers and reviewed backend code changes."
    ],
    technologies: ["Java", "Multithreading", "Log4j2", "ORC", "SQL", "Distributed Systems"]
  }
];

export const projects = [
  {
    title: "API Logging and Metrics Aggregation System",
    description:
      "Built a high-throughput API transaction monitoring system to track internal and external service traffic. Implemented custom Log4j2 appenders with an ORC-based logging pipeline for efficient structured storage. Introduced asynchronous log ingestion, reducing logging latency by ~50% and minimizing impact on application performance. Developed SQL aggregation pipelines to compute latency percentiles, throughput, and error rates. Enabled real-time observability and performance monitoring for large-scale backend services.",
    stack: ["Java", "Log4j2", "ORC", "SQL", "MongoDB"]
  },
  {
    title: "User Synchronization Performance Optimization",
    description:
      "Implemented distributed services synchronizing enterprise user data across Active Directory and Microsoft 365. Redesigned synchronization workflows using parallel processing and thread pooling, reducing synchronization latency by approximately 55 to 60 percent.",
    stack: ["Java", "Multithreading", "Distributed Systems", "Active Directory", "Microsoft 365"]
  }
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["Java", "C++", "JavaScript", "SQL"]
  },
  {
    title: "Backend",
    items: ["Spring Boot", "REST APIs", "Multithreading", "Concurrency", "Log4j2"]
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "MS SQL Server"]
  },
  {
    title: "Distributed Systems",
    items: ["ORC", "Apache Spark", "Cassandra"]
  },
  {
    title: "Tools",
    items: ["Git", "Docker", "Maven", "IntelliJ IDEA", "VS Code", "Postman"]
  },
  {
    title: "Cloud / Search",
    items: ["Google Cloud Platform", "Elasticsearch"]
  }
];

export const achievements = [
  {
    title: "CodeChef 4 Star",
    description: "Reached a maximum CodeChef rating of 1705 through competitive programming."
  },
  {
    title: "Department Ranker, NIT Kurukshetra",
    description: "Achieved department rank based on consistent academic excellence."
  },
  {
    title: "700+ DSA Problems Solved",
    description: "Solved data structures and algorithms problems across LeetCode, CodeChef and Codeforces."
  }
];

export const contactLinks = [
  {
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`
  },
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/vaibhav-singh-2b259b237",
    href: "https://www.linkedin.com/in/vaibhav-singh-2b259b237"
  }
];
