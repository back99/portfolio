import { Link } from "react-router";
import ExperienceCard from "../components/ExperienceCard.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { skills, education, experiences } from "../data/profile.js";
import { projects } from "../data/projects.js";

const STATS = [
  { value: "4+", label: "Years in production" },
  { value: "30%", label: "Lower token latency" },
  { value: "50%", label: "Lower encoding cost" },
  { value: "13,059", label: "CARLA route evals" },
];

export function Home() {
  const featured = projects.slice(0, 3);
  return (
    <>
      <section className="hero">
        <p className="prompt" aria-hidden="true">
          &gt; whoami<span className="cursor" />
        </p>
        <h1 className="hero-name">Seung Bum Jung</h1>
        <p className="hero-role">Software Engineer</p>
        <p className="lead">
          4+ years building distributed, cloud-native backend systems. M.S. in
          Computer Science student at Saint Louis University (HPC Lab),
          graduating December 2026.
        </p>
        <p>
          At work I built video encoding pipelines on AWS EKS and event-driven
          token issuance with Lambda and Redis. In the lab I work on
          fault-tolerant GPU jobs and a clinical LLM system with a safety layer.
        </p>
        <div className="quest">
          <p className="quest-label">Looking for</p>
          <p>
            Software Engineer II roles in distributed systems, cloud
            infrastructure, or healthcare AI. Available January 2027.
          </p>
        </div>
        <p className="hero-actions">
          <Link className="button-link" to="/projects">See projects</Link>
          <Link className="button-link ghost" to="/experience">Experience</Link>
        </p>
      </section>

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading">Stats</h2>
        <ul className="stats">
          {STATS.map((s) => (
            <li key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="featured-heading">
        <h2 id="featured-heading">Featured projects</h2>
        <div className="grid">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}

export function Experience() {
  return (
    <section>
      <h1>Experience</h1>

      <h2>Work and research</h2>
      {experiences.map((exp) => (
        <ExperienceCard key={exp.id} experience={exp} />
      ))}

      <h2>Education</h2>
      {education.map((edu) => (
        <article className="entry" key={edu.id}>
          <div className="entry-head">
            <h3>
              {edu.degree}, <span className="org">{edu.school}</span>
            </h3>
            <p className="dates">{edu.dates}</p>
          </div>
          {edu.detail && <p>{edu.detail}</p>}
        </article>
      ))}

      <h2>Skills</h2>
      <dl className="skills">
        {skills.map((s) => (
          <div className="skill-group" key={s.group}>
            <dt>{s.group}</dt>
            <dd>
              <ul className="tags">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Contact() {
  return (
    <section>
      <h1>Contact</h1>
      <p>The best way to learn more about my work:</p>
      <ul className="contact-list">
        <li>
          GitHub: <a href="https://github.com/back99">github.com/back99</a>
        </li>
        <li>
          LinkedIn:{" "}
          <a href="https://www.linkedin.com/in/seungbum-jung-6a105317a/">
            linkedin.com/in/seungbum-jung-6a105317a
          </a>
        </li>
        <li>
          Email: <a href="mailto:seungbum.jung@slu.edu">seungbum.jung@slu.edu</a>
        </li>
      </ul>
    </section>
  );
}

export function NotFound() {
  return (
    <section>
      <h1>404: Page not found</h1>
      <p>This page does not exist.</p>
      <Link className="button-link" to="/">Return home</Link>
    </section>
  );
}
