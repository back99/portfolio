import { useState } from "react";
import { useSearchParams } from "react-router";
import { projects } from "../data/projects.js";
import ProjectCard from "../components/ProjectCard.jsx";

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Draft text lives in local state; the applied filter lives in the URL (?q=).
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const applied = searchParams.get("q") ?? "";
  const normalized = applied.trim().toLowerCase();

  const visible = projects.filter((p) =>
    `${p.title} ${p.category} ${p.technologies.join(" ")}`
      .toLowerCase()
      .includes(normalized)
  );

  function handleSubmit(event) {
    event.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (query.trim()) next.set("q", query.trim());
    else next.delete("q");
    setSearchParams(next);
  }

  function handleClear() {
    setQuery("");
    const next = new URLSearchParams(searchParams);
    next.delete("q");
    setSearchParams(next);
  }

  return (
    <section>
      <h1>Projects</h1>
      <form className="filter" onSubmit={handleSubmit}>
        <label htmlFor="project-search">Filter by title, category, or skill</label>
        <div className="filter-row">
          <input
            id="project-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Apply</button>
          {applied && (
            <button type="button" className="ghost" onClick={handleClear}>
              Clear
            </button>
          )}
        </div>
      </form>
      <p className="status-line" role="status">
        {applied ? `Applied filter: "${applied}". ` : "No filter applied. "}
        {visible.length} project(s) found.
      </p>
      {visible.length ? (
        <div className="grid">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <p className="notice" style={{ padding: "1rem" }}>No projects match. Try another search.</p>
      )}
    </section>
  );
}
