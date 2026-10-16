import { Link } from "react-router";
import PixelIcon from "./PixelIcon.jsx";

export default function ProjectCard({ project }) {
  const hasVideo = project.media?.some((m) => m.type === "video");
  return (
    <article className="card">
      <div className="card-top">
        <PixelIcon name={project.category} />
        <p className="card-category">{project.category}</p>
      </div>
      <h2>
        <Link className="card-link" to={`/projects/${project.slug}`}>
          {project.title}
        </Link>
      </h2>
      <p>{project.summary}</p>
      <ul className="tags" aria-label="Technologies">
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {project.media?.length > 0 && (
        <p className="card-media">
          {hasVideo ? "▶ Demo video" : "▣ Result figures"}
        </p>
      )}
    </article>
  );
}
