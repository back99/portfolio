import { Link, useParams } from "react-router";
import { projects } from "../data/projects.js";
import ProjectMedia from "../components/ProjectMedia.jsx";
import PixelIcon from "../components/PixelIcon.jsx";

const SECTIONS = [
  ["problem", "Problem"],
  ["role", "My contribution"],
  ["approach", "Implementation"],
  ["outcome", "Result or lesson"],
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section>
        <h1>Project not found</h1>
        <p>No project matches "{slug}".</p>
        <Link className="button-link" to="/projects">Browse all projects</Link>
      </section>
    );
  }

  const hasVideo = project.media?.some((m) => m.type === "video");

  return (
    <article className="detail">
      <div className="detail-head">
        <PixelIcon name={project.category} size={40} />
        <p className="card-category">{project.category}</p>
      </div>
      <h1>{project.title}</h1>
      <ul className="tags" aria-label="Technologies">
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      {SECTIONS.map(([key, label]) => (
        <section className="detail-block" key={key}>
          <h2>{label}</h2>
          <p>{project[key]}</p>
        </section>
      ))}

      {project.media?.length > 0 && (
        <>
          <h2>{hasVideo ? "Demo" : "Figures"}</h2>
          {project.media.map((item) => (
            <ProjectMedia key={item.src} item={item} />
          ))}
        </>
      )}

      <p className="detail-links">
        {project.link && (
          <a
            className="button-link"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.linkLabel ?? "View on GitHub"}
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        )}
        <Link className="button-link ghost" to="/projects">Back to projects</Link>
      </p>
    </article>
  );
}
