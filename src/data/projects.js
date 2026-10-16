export const projects = [
  {
    slug: "hpc-carla",
    title: "HPC-CARLA",
    category: "Distributed Systems",
    technologies: ["Python", "SLURM", "Apptainer", "CARLA", "NVIDIA A100"],
    summary:
      "Fault-tolerant closed-loop evaluation of autonomous-driving agents on 2 HPC nodes and 16 A100 GPUs.",
    problem:
      "Closed-loop CARLA evaluation runs for a long time, and simulator crashes or SLURM allocation timeouts killed jobs. Lost jobs meant lost routes and a lot of manual restarts.",
    role:
      "Graduate Research Assistant in the SLU HPC Lab, in collaboration with GIST AIGS. I co-developed the system and built the watchdog-based failure recovery and automatic SLURM job resubmission, and helped scale per-GPU CARLA servers and route-level checkpoint recovery. Second author on the paper.",
    approach:
      "Persistent CARLA servers run per GPU, with shared task coordination across nodes. A watchdog detects stalls and restarts the simulator, and job chains resubmit themselves to SLURM when the time allocation ends, so evaluations run overnight without a person watching. Each route is checkpointed so a restarted job continues from where it stopped.",
    outcome:
      "The framework evaluated six agents over 13,059 routes. 94% of collected results came from jobs that would otherwise have been lost after a failure. The paper was accepted at WORKS 2026 (SC26 workshop).",
    link: "https://github.com/back99/HPC-CARLA",
  },
  {
    slug: "mci-companion",
    title: "MCI Companion",
    category: "Healthcare AI",
    technologies: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Claude API", "AWS Transcribe", "AWS Polly"],
    summary:
      "iPad-based, voice-first LLM chatbot for older adults with mild cognitive impairment, built for a HIPAA clinical pilot.",
    problem:
      "Older adults with MCI need a companion that is easy to talk to, and a clinical team needs to trust that crisis messages are never handled only by the LLM.",
    role:
      "Graduate Research Assistant. I built the working prototype alone, end to end: device pairing, participant onboarding, AI-initiated conversation, hands-free voice, and a coordinator dashboard with CSV export. It is pilot work for a future NIH R01 grant proposal.",
    approach:
      "A code-level safety layer checks every user message before LLM inference. If it finds a crisis signal, it stops the normal conversation and starts a separate escalation workflow. Voice uses AWS Transcribe and Polly with silence detection, so the user never presses a button. Participants are tracked by de-identified labels, and storage keeps only de-identified metadata, not raw audio or conversation text.",
    outcome:
      "A deployed working prototype with 690+ automated tests. Lesson: in a clinical setting, safety rules belong in code that runs before the model, not only in the prompt. The code is private because of clinical constraints; an architecture overview is public.",
    link: "https://github.com/back99/mci-chatbot-showcase",
  },
  {
    slug: "watermark-token-issuance",
    title: "Watermark Token Issuance",
    category: "Cloud Backend",
    technologies: ["Kotlin", "AWS Lambda", "Redis", "SNS", "SQS", "CloudWatch"],
    summary:
      "Replaced a synchronous database-based token issuer with a serverless, event-driven design at DoveRunner.",
    problem:
      "Forensic watermark tokens were issued through a synchronous RDB-based flow with separate indexes per region. Latency rose under peak load.",
    role:
      "Software Engineer at DoveRunner. I designed the new issuance system and the move to one global index.",
    approach:
      "AWS Lambda and Redis serve tokens from a non-linear index generator, with one global WM_INDEX instead of regional indexes. SNS and CloudWatch trigger regeneration, and SQS handles persistence asynchronously.",
    outcome:
      "Issuance latency dropped by 30%, and the system provisioned 5M+ tokens across Seoul and Oregon, later Frankfurt.",
  },
  {
    slug: "eks-distributed-encoding",
    title: "Distributed Encoding on EKS",
    category: "Video Infrastructure",
    technologies: ["Kubernetes", "AWS EKS", "FFmpeg", "Redis", "Docker"],
    summary:
      "Replaced a third-party encoding service with a containerized pipeline that splits video by GOP.",
    problem:
      "Encoding with Hybrik was expensive, and long videos were processed as one job, which limited throughput.",
    role:
      "Software Engineer at DoveRunner. I owned segmentation, the transcoding workers, and segment merge.",
    approach:
      "Videos are split at GOP boundaries so segments can be transcoded in parallel on EKS workers. Redis tracks job state for each segment, and a merge step rebuilds the output. Packaging and media services were made into reusable modules.",
    outcome:
      "Encoding cost fell by 50% and throughput rose by 30%, with parallel job execution.",
  },
  {
    slug: "fl-simulation",
    title: "Parallel FL Simulation",
    category: "HPC",
    technologies: ["Python", "PyTorch", "NumPy", "ProcessPoolExecutor"],
    summary:
      "Parallelized federated learning client training and measured the real limit with Amdahl's law.",
    problem:
      "Most FL simulations train clients one after another, so run time grows with the number of clients.",
    role: "Sole developer. I built the parallel version and the benchmarks.",
    approach:
      "Client training runs in a ProcessPoolExecutor. Weights are sent between processes as NumPy arrays to avoid PyTorch tensor pickling deadlocks, and each worker is limited to one OpenMP/MKL thread to stop thread contention. Clients get non-IID MNIST data and FedAvg combines results.",
    outcome:
      "About 1.27x stable speedup with 8 workers. Amdahl analysis showed only about 24% of a round is parallel, which explains the plateau. More workers than cores added nothing. Next step: multi-node FL on the SLU Libra cluster and asynchronous FedAvg (FedAsync).",
    link: "https://github.com/back99/fl-simulation",
  },
  {
    slug: "dental-force-prediction",
    title: "Aligner Force Prediction",
    category: "Machine Learning",
    technologies: ["Python", "GPyTorch", "PyTorch", "XGBoost", "SLURM"],
    summary:
      "Predicts orthodontic aligner forces at thicknesses that were never measured, and from only early observations.",
    problem:
      "Measuring aligner forces for every thickness and every day is slow. The team wanted to know the forces at thicknesses outside the measured data, and how early a time trend can be predicted.",
    role:
      "I built the ML pipeline and shared a results report with the clinical collaborators.",
    approach:
      "Gaussian process regression (GPyTorch, Matern kernel) predicts forces at unseen thicknesses with an uncertainty band. An LSTM with leave-one-out cross-validation predicts the time course from partial observations. XGBoost was tested as a baseline. The pipeline runs on NVIDIA L40S GPUs with SLURM so results can be reproduced.",
    outcome:
      "Across 60 experiments, Fx MAE was about 0.08 N. Cutting the observation period from 14 days to 5 days barely changed the error, which supports a shorter measurement period. Lesson: tree models like XGBoost cannot predict outside the training range, so GPR was the right tool here.",
    link: "https://github.com/back99/dental-ml-force-prediction",
  },
];
