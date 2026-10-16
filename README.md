# Seung Bum Jung Portfolio

Personal portfolio for CSCI 5360 Web Technologies (Fall 2026).
Built with React, Vite, and React Router 7. Deployed to GitHub Pages with GitHub Actions.

- Live site: https://back99.github.io/portfolio/
- Repository: https://github.com/back99/portfolio

## Run locally

```
npm install
npm run dev       # development server with hot reload
npm run lint
npm run build     # production build into dist/
npm run preview   # check the build at http://localhost:4173/portfolio/
```

## Structure

```
src/
  main.jsx                 mounts React inside HashRouter
  App.jsx                  routes (shared layout, index, detail, wildcard)
  components/
    Layout.jsx             header, NavLink navigation, Outlet, skip button
    ProjectCard.jsx        one project card (props)
    ExperienceCard.jsx     one experience entry (props)
  pages/
    BasicPages.jsx         Home, Experience, Contact, NotFound
    Projects.jsx           filter form and card grid
    ProjectDetail.jsx      /projects/:slug with useParams
  data/
    projects.js            project array (slug is the list key)
    profile.js             skills, education, experiences
```

## Routing

- HashRouter, so GitHub Pages always serves the same `index.html` and route refresh works.
- `base: "/portfolio/"` in `vite.config.js` fixes asset paths for a project site.
- Unknown URL (`#/no-such-page`) matches the `*` route and shows "Page not found".
- Unknown slug (`#/projects/no-such-project`) matches the detail route, finds no data, and shows "Project not found".

## Extension: A. Bookmarkable project filters

The filter uses `useSearchParams`. The text in the input is a draft in local state (`useState`).
When the user clicks Apply, the trimmed text is written to the URL as `?q=`.
The applied filter is read from the URL, so the page shows "Applied filter: ..." separately from the draft.

Example: `https://back99.github.io/portfolio/#/projects?q=redis`

Tested: copying this URL into a new tab shows the same results, and Back/Forward changes the applied filter.

## Verification checklist

| Check | Result |
| --- | --- |
| `npm run lint` passes | |
| `npm run build` passes | |
| Home, Experience, Projects, Contact load from the nav | |
| Active nav link is bold and underlined | |
| Project card opens its detail page | |
| Refresh on a detail page works on the live site | |
| `#/no-such-page` shows Page not found | |
| `#/projects/no-such-project` shows Project not found | |
| Filter: mixed case (`ReDiS`) works | |
| Filter: surrounding spaces are ignored | |
| Filter: no match shows a message | |
| Filter: empty filter shows all projects | |
| Filter URL copied to a new tab keeps results | |
| Back/Forward updates the applied filter | |
| Keyboard Tab shows a visible focus outline | |
| Skip to content button works | |
| Mobile width (390px): no horizontal scroll | |
| Live site in a private window: no 404 for assets | |

## Credits

Route, filter, and deployment structure follow the course handout (CSCI 4360/5360, Prof. Flavio Esposito).
Generative AI use follows the course policy.
