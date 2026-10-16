import { Link } from "react-router";

export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <p className="card-category">{project.category}</p>
      <h2>
        <Link to={`/projects/${project.slug}`}>{project.title}</Link>
      </h2>
      <p>{project.summary}</p>
      <ul className="tags" aria-label="Technologies">
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </article>
  );
}
