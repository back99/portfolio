import { Link, useParams } from "react-router";
import { projects } from "../data/projects.js";
import ProjectMedia from "../components/ProjectMedia.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section>
        <h1>Project not found</h1>
        <p>No project matches "{slug}".</p>
        <Link to="/projects">Browse all projects</Link>
      </section>
    );
  }

  return (
    <article className="detail">
      <p className="card-category">{project.category}</p>
      <h1>{project.title}</h1>
      <p>{project.technologies.join(", ")}</p>
      <h2>Problem</h2>
      <p>{project.problem}</p>
      <h2>My contribution</h2>
      <p>{project.role}</p>
      <h2>Implementation</h2>
      <p>{project.approach}</p>
      <h2>Result or lesson</h2>
      <p>{project.outcome}</p>
      {project.media?.length > 0 && (
        <>
          <h2>{project.media.some((m) => m.type === "video") ? "Demo" : "Figures"}</h2>
          {project.media.map((item) => (
            <ProjectMedia key={item.src} item={item} />
          ))}
        </>
      )}
      {project.link && (
        <p>
          <a href={project.link}>{project.linkLabel ?? "Repository on GitHub"}</a>
        </p>
      )}
      <Link to="/projects">Back to projects</Link>
    </article>
  );
}
