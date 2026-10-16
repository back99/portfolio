import { NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <button
        className="skip-link"
        onClick={() => {
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </button>
      <header className="site-header">
        <p className="brand">Seung Bum Jung</p>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/experience">Experience</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        Built with React, Vite, and React Router. Deployed on GitHub Pages.
      </footer>
    </>
  );
}
