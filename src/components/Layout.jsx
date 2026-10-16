import { Link, NavLink, Outlet } from "react-router";

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
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="Seung Bum Jung, home">
            <span className="brand-mark" aria-hidden="true">SB</span>
            <span className="brand-name">Seung Bum Jung</span>
          </Link>
          <nav aria-label="Main navigation">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/experience">Experience</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Built with React, Vite, and React Router. Deployed on GitHub Pages.</p>
      </footer>
    </>
  );
}
