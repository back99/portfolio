export const skills = [
  { group: "Languages", items: ["Java", "Kotlin", "Python", "TypeScript", "JavaScript", "SQL", "Bash"] },
  { group: "Backend and Data", items: ["Spring Boot", "FastAPI", "REST APIs", "PostgreSQL", "MySQL", "Redis", "Kafka"] },
  { group: "Cloud and DevOps", items: ["AWS (EKS, Lambda, RDS, S3, CloudWatch)", "Kubernetes", "Docker", "GitHub Actions", "Linux"] },
  { group: "HPC and ML", items: ["SLURM", "Apptainer", "NVIDIA A100", "PyTorch", "GPyTorch"] },
  { group: "Media", items: ["FFmpeg", "WebRTC", "Video transcoding and packaging"] },
];

export const education = [
  {
    id: "slu",
    degree: "M.S. in Computer Science",
    school: "Saint Louis University, St. Louis, MO",
    dates: "Aug 2025 to Dec 2026 (expected)",
    detail: "GPA 3.67/4.0. Coursework: DevOps and Cloud Automation, Software Architecture, Cloud Computing, Web Technologies.",
  },
  {
    id: "ajou",
    degree: "B.S. in Computer Science",
    school: "Ajou University, Suwon, South Korea",
    dates: "Mar 2015 to Feb 2018",
    detail: "",
  },
];

export const experiences = [
  {
    id: "slu-hpc",
    role: "Graduate Research Assistant",
    org: "Saint Louis University, HPC Lab",
    dates: "Jan 2026 to Present",
    points: [
      "Built watchdog-based failure recovery and automatic SLURM resubmission for HPC-CARLA; 94% of collected results came from jobs that would otherwise have been lost.",
      "Built MCI Companion, a voice-first LLM system with a code-level safety layer that checks every message before the model runs.",
    ],
  },
  {
    id: "doverunner",
    role: "Software Engineer",
    org: "DoveRunner, Seoul",
    dates: "Apr 2023 to Aug 2025",
    points: [
      "Redesigned watermark token issuance with Lambda, Redis, and SNS: 30% lower latency, 5M+ tokens across three regions.",
      "Replaced Hybrik with a GOP-split encoding pipeline on EKS: 50% lower cost, 30% higher throughput.",
      "Migrated legacy Java APIs to modular Kotlin with domain-driven design.",
    ],
  },
  {
    id: "tmax",
    role: "Software Engineer",
    org: "Tmax Group, Seongnam",
    dates: "Aug 2021 to Apr 2023",
    points: [
      "Cut video conference room setup from 0.6s to 0.1s per user (6x) with async task processing.",
      "Replaced repeated Redis polling with Pub/Sub real-time notifications to reduce server load.",
      "Built a Kafka event service that captured about 80K video-session lifecycle events.",
    ],
  },
];
