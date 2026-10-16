import carlaArchitecture from "../assets/projects/carla-architecture.png";
import mciDemo from "../assets/projects/mci-demo.mp4";
import mciDemoPoster from "../assets/projects/mci-demo-poster.jpg";
import flAmdahl from "../assets/projects/fl-amdahl.png";
import dentalGpr from "../assets/projects/dental-gpr.png";
import dentalLstm from "../assets/projects/dental-lstm.png";
import wmIssuanceFlow from "../assets/projects/wm-issuance-flow.png";
import wmRefillFlow from "../assets/projects/wm-refill-flow.png";
import eksArchitecture from "../assets/projects/eks-architecture.png";
import eksWorkerFlow from "../assets/projects/eks-worker-flow.png";

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
    media: [
      {
        type: "image",
        src: carlaArchitecture,
        alt: "Architecture diagram. SLURM allocates 2 nodes with 8 GPUs each. On each node a coordinator starts one worker per GPU; each worker drives an agent pipeline connected to a persistent CARLA server in Apptainer that restarts on crash. Both nodes claim jobs and write results through a shared filesystem with a lock, and per-route checkpoints let a harvester recover results from failed jobs.",
        caption: "System architecture: per-GPU persistent CARLA servers, a shared job queue across two nodes, and per-route checkpoints.",
      },
    ],
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
    linkLabel: "View on GitHub (code is private)",
    media: [
      {
        type: "video",
        src: mciDemo,
        poster: mciDemoPoster,
        alt: "Demo video of the iPad app: the AI greets a test participant first, then the user and AI take voice turns while the screen shows Listening and Companion is speaking, then the session closes.",
        caption: "Demo with a test participant (2:44): AI-initiated greeting, hands-free voice turns, and session close.",
      },
    ],
  },
  {
    slug: "watermark-token-issuance",
    title: "Watermark Token Issuance",
    category: "Cloud Backend",
    technologies: ["Kotlin", "AWS Lambda", "Redis", "SQS", "SNS", "CloudWatch", "RDB"],
    summary:
      "Replaced a synchronous database-based token issuer with a serverless, event-driven design at DoveRunner.",
    problem:
      "Forensic watermark tokens were issued through a synchronous RDB-based flow. Under many concurrent requests, TPS hit the RDB limit, and duplicate checks and locks added latency. Regional indexes were also managed separately.",
    role:
      "Software Engineer at DoveRunner. I designed the new issuance system and the move to one global index.",
    approach:
      "Tokens are generated ahead of time and kept in a Redis queue, so a request gets a token right away without touching the database. The issued-token record goes to SQS, and Lambda writes it to the RDB asynchronously. When Redis memory falls below 200MB, a CloudWatch alarm publishes to SNS, and one Lambda generates new tokens and refills the queue. Tokens come from a skew transform of a sequential index (one global WM_INDEX), so each index maps to a unique token without a database uniqueness check.",
    outcome:
      "Issuance latency dropped by 30%, and the system issued 5M+ tokens across Seoul and Oregon, later Frankfurt, with no duplicate tokens and no database check on the issuance path.",
    link: "https://github.com/back99/back99/tree/main/Watermark_session_token_ver2",
    media: [
      {
        type: "image",
        src: wmIssuanceFlow,
        alt: "Issuance flow diagram, labeled in Korean. 1: the client requests a token. 2: Redis returns a pre-generated token from its queue. 3: the client sends the token info to Amazon SQS. 4: SQS triggers Lambda. 5: Lambda saves the token info to the database.",
        caption: "Issuance path: Redis answers instantly; SQS and Lambda save the record in the background. (Diagram labels in Korean.)",
      },
      {
        type: "image",
        src: wmRefillFlow,
        alt: "Refill flow diagram, labeled in Korean. Oregon and Seoul Redis each hold a queue. When a queue drops below 200MB, a CloudWatch alarm calls a regional SNS topic, which invokes the Seoul Lambda. Lambda reads the last queued index and the region index from the database, generates new tokens, saves them with the index to Redis, and stores the increased index in the database.",
        caption: "Refill path: a 200MB memory alarm triggers SNS and Lambda to generate and store new tokens for Seoul and Oregon. (Diagram labels in Korean.)",
      },
    ],
  },
  {
    slug: "eks-distributed-encoding",
    title: "Distributed Encoding on EKS",
    category: "Video Infrastructure",
    technologies: ["AWS EKS", "Kubernetes", "Karpenter", "FFmpeg", "Redis", "Argo Workflows", "S3", "EFS"],
    summary:
      "Replaced a third-party encoding service with a self-hosted EKS pipeline that splits video by GOP and transcodes segments in parallel.",
    problem:
      "Large videos were transcoded through Hybrik, an external SaaS. It was expensive, did not scale well, and one large file on one server became a bottleneck.",
    role:
      "Software Engineer at DoveRunner. I owned GOP-aware segmentation (the distributor), the transcoding workers, and the merge of transcoded segments.",
    approach:
      "The distributor cuts each video on GOP boundaries, so every segment can be encoded on its own without artifacts at the seams, and pushes segment jobs to Redis. Workers run as EKS Jobs: each one pops a segment with BRPOP, builds a signed input URL and an FFmpeg command (with the forensic watermark filter when needed), transcodes, and loops until the queue is empty. Redis tracks the state of every segment. Karpenter scales nodes with load, and the packager merges the segments and writes the final output to the customer's S3.",
    outcome:
      "Encoding cost fell by 50% compared to Hybrik and throughput rose by 30%. The number of jobs now scales with video length and load.",
    link: "https://github.com/back99/back99/tree/main/Distributed_transcoding",
    media: [
      {
        type: "image",
        src: eksArchitecture,
        alt: "Architecture diagram. TNP-API with Amazon MSK sends requests to the EKS control plane in one AWS region. Karpenter manages three node groups: node-distribute running the distributor and packager, worker nodes running transcoding workers, and a monitoring node with Argo Workflows, kube-ops-view, and the Redis application. The distributor and workers share an EFS volume, and input and output go through the customer's S3 bucket.",
        caption: "System architecture on EKS: distributor, workers, and Redis on separate node groups, scaled by Karpenter.",
      },
      {
        type: "image",
        src: eksWorkerFlow,
        tall: true,
        alt: "Worker flowchart. The worker reads job, storage, and content URL info from Redis, then pops segment info with BRPOP. If no segment is left, it ends. For an audio track it creates a signed audio URL, builds an FFmpeg command, and transcodes. For video it checks the content URL, creates a signed video URL if needed, builds an FFmpeg command, adds the forensic watermark filter if FWM is on, transcodes the segment, and loops back to pop the next segment.",
        caption: "Transcoding worker loop: pop a segment from Redis, build the FFmpeg command, add the watermark filter if needed, repeat.",
      },
    ],
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
    media: [
      {
        type: "image",
        src: flAmdahl,
        alt: "Three charts for 50, 100, and 200 clients comparing actual speedup to the Amdahl's law curve. Actual speedup is below 1.0 with 2 workers, rises to about 1.27 at 8 workers, and stays flat or drops at 16 workers, matching the Amdahl curve with a parallel fraction near 0.24.",
        caption: "Measured speedup vs. Amdahl's law (parallel fraction about 0.24) for 50, 100, and 200 clients.",
      },
    ],
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
    media: [
      {
        type: "image",
        src: dentalLstm,
        alt: "Six charts, one per force and moment component. Gray lines show measured values for the first 5 days of one cohort; dashed colored lines show LSTM predictions for day 6, day 7, and day 14 next to the hidden actual values. Fx MAE is 0.0958 N in this run.",
        caption: "LSTM forecast for an unseen cohort: train on the first 5 days, predict days 6, 7, and 14.",
      },
      {
        type: "image",
        src: dentalGpr,
        alt: "Six charts of forces and moments over time. Solid lines are measured data at 0.25 mm and 0.5 mm; dashed and dotted lines are GPR predictions at 1.0 mm and 1.25 mm for several simulation weights, which stay separate from each other but flat over time.",
        caption: "GPR predictions at 1.0 mm and 1.25 mm, thicknesses not in the training data.",
      },
    ],
  },
];
