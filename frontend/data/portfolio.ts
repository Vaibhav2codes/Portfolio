import { RESUME_PUBLIC_URL } from "@/utils/resume";

export const siteConfig = {
  name: "Vaibhav Singh",
  title: "Software Development Engineer",
  tagline:
    "Backend Engineer building scalable, high-performance microservices and REST APIs using Java and Spring Boot.",
  shortSubtitle:
    "Backend Engineer building scalable, high-performance microservices and REST APIs with Java and Spring Boot.",
  currentLine:
    "Currently SDE-1 at Cleartrip (Flipkart Group), owning 0-to-1 backend development of the Holiday Packages platform. Previously Software Developer at ZL Technologies.",
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
  "Microservices",
  "Elasticsearch",
  "Kafka",
  "Aerospike"
];

export const stats = [
  { label: "Years Experience", value: "2+" },
  { label: "DSA Problems Solved", value: "700+" },
  { label: "CodeChef Rating", value: "1705" },
  { label: "Education", value: "B.Tech NIT Kurukshetra" }
];

export const experienceItems = [
  {
    company: "Cleartrip (Flipkart Group)",
    role: "Software Development Engineer I (Backend)",
    duration: "Feb 2026 - Present",
    location: "Bangalore, India",
    description: [
      "Owned 0-to-1 backend development of Cleartrip’s Holiday Packages platform, building 10+ production REST APIs in Java and Spring Boot microservices for search, listing, pricing, filters and booking.",
      "Designed HLD and LLD for the packages platform, defining service boundaries, API contracts and data flow across microservices.",
      "Engineered Elasticsearch-based search, filter and homepage feed APIs using optimized queries and aggregations, enabling fast package discovery with low-latency (<150ms) responses.",
      "Reduced repeated database reads for high-traffic user APIs by implementing Aerospike caching with cache eviction on data updates.",
      "Integrated third-party supplier APIs for live pricing with circuit breakers, timeouts and fallbacks, ensuring high availability and fault tolerance when external services slow down.",
      "Developed an event-driven lead management service that processes real-time user activity webhooks with lead scoring, de-duplication and Salesforce integration for the sales team.",
      "Improved observability and production debugging by introducing Kafka and Avro API event logging across all package microservices.",
      "Eliminated a production startup crash across 4 microservices by tracing an Aerospike client timeout issue and making it configurable.",
      "Enabled business teams to publish 30+ packages without deployment by migrating package content to a database-backed, auto-refreshing catalog.",
      "Partnered with frontend, QA, product and infra teams to drive end-to-end API integration, resolve reported bugs, and manage deployments and service access across environments."
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Microservices",
      "REST APIs",
      "Elasticsearch",
      "Aerospike",
      "Apache Kafka",
      "Avro",
      "Google Cloud"
    ]
  },
  {
    company: "ZL Technologies",
    role: "Software Developer",
    duration: "Sep 2024 - Jan 2026",
    location: "Hyderabad, India",
    description: [
      "Redesigned I/O-bound data pipelines processing millions of log events/day — optimized batching and resource pooling — lifting end-to-end production throughput by 30%.",
      "Resolved lock contention in multithreaded aggregation pipelines by migrating to lock-free concurrent data structures, reducing enterprise dashboard staleness from batch-level delays to under 1 minute.",
      "Delivered 3 consecutive sprint milestones without scope slippage while concurrently code-reviewing and task-scoping work for 2 junior engineers across critical production modules.",
      "Collaborated with cross-functional teams (product, frontend, QA) in an Agile/Scrum environment to deliver features efficiently."
    ],
    technologies: ["Java", "Multithreading", "Concurrency", "Log4j2", "Apache ORC", "SQL"]
  }
];

export const projects = [
  {
    title: "API Logging & Metrics Aggregation System",
    summary:
      "Built a high-throughput API transaction monitoring system at ZL Technologies to track internal and external service traffic.",
    highlights: [
      "Cut analytics storage by 50% and converted overnight batch runs into 1-minute rolling refreshes by migrating high-volume API logs from raw files to Apache ORC — giving dashboards near-real-time production data.",
      "Architected a zero-downtime Graph API interception layer that processed 10k+ requests/hour at <5 ms added latency, increasing observability coverage by 40% across enterprise services.",
      "Implemented SQL aggregations for latency percentiles, TPS, and error rate across millions of daily events — giving engineering teams real-time, production-grade visibility into service health KPIs."
    ],
    // `remaining` is the post-optimization share of the original value, used for the before/after bar.
    impact: { value: "50%", label: "less analytics storage", remaining: 0.5 },
    stack: ["Java", "Log4j2", "Apache ORC", "SQL"]
  },
  {
    title: "User Synchronization Performance Optimization",
    summary:
      "Implemented distributed services synchronizing enterprise user data across Active Directory and Microsoft 365.",
    highlights: [
      "Redesigned synchronization workflows using parallel processing and thread pooling, reducing synchronization latency by approximately 55 to 60 percent."
    ],
    impact: { value: "55–60%", label: "lower synchronization latency", remaining: 0.425 },
    stack: ["Java", "Multithreading", "Distributed Systems", "Active Directory", "Microsoft 365"]
  }
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["Java", "SQL", "JavaScript", "C++"]
  },
  {
    title: "Backend",
    items: [
      "Spring Boot",
      "REST APIs",
      "Microservices",
      "Distributed Systems",
      "System Design (HLD/LLD)",
      "Event-Driven Architecture",
      "Multithreading",
      "Concurrency",
      "OOP",
      "Design Patterns",
      "Caching",
      "Circuit Breakers",
      "Fault Tolerance",
      "Scalability",
      "Observability",
      "Unit Testing"
    ]
  },
  {
    title: "Databases, Search & Messaging",
    items: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Cassandra",
      "MS SQL Server",
      "Aerospike",
      "Elasticsearch",
      "Apache Kafka",
      "Avro",
      "Apache Spark",
      "Apache ORC",
      "Query Optimization",
      "Indexing"
    ]
  },
  {
    title: "Cloud, DevOps & Tools",
    items: [
      "GCP (Cloud Run, GCS)",
      "Docker",
      "CI/CD",
      "Gradle",
      "Maven",
      "Git",
      "IntelliJ IDEA",
      "Postman",
      "Cursor",
      "Claude Code",
      "Agile/Scrum"
    ]
  },
  {
    title: "Core CS",
    items: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks"]
  }
];

export const achievements = [
  {
    title: "CodeChef 4-Star",
    description: "Reached a maximum CodeChef rating of 1705 through competitive programming."
  },
  {
    title: "Department Rank Holder, NIT Kurukshetra",
    description: "Department rank holder in Semester 1, Electronics and Communication Engineering."
  },
  {
    title: "700+ DSA Problems Solved",
    description:
      "Solved 700+ problems across LeetCode, CodeChef and Codeforces, covering graphs, DP and advanced data structures."
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
