import { Link } from "react-router";
import ExperienceCard from "../components/ExperienceCard.jsx";
import { skills, education, experiences } from "../data/profile.js";

export function Home() {
  return (
    <section className="hero">
      <h1>Seung Bum Jung</h1>
      <p className="lead">
        Software Engineer with 4+ years of experience building distributed,
        cloud-native backend systems. M.S. in Computer Science student at Saint
        Louis University, graduating December 2026.
      </p>
      <p>
        At work I built video encoding pipelines on AWS EKS and event-driven
        token issuance with Lambda and Redis. In the SLU HPC Lab I work on
        fault-tolerant GPU jobs and a clinical LLM system with a safety layer.
      </p>
      <p>
        <strong>Looking for:</strong> Software Engineer II roles in distributed
        systems, cloud infrastructure, or healthcare AI, starting January 2027.
      </p>
      <p>
        <Link className="button-link" to="/projects">See my projects</Link>
      </p>
    </section>
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
          <div key={s.group}>
            <dt>{s.group}</dt>
            <dd>{s.items.join(", ")}</dd>
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
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link to="/">Return home</Link>
    </section>
  );
}
