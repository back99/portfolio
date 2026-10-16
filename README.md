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
    ProjectMedia.jsx       image or video with caption and alt text
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

Tested on the live site (https://back99.github.io/portfolio/) in Chrome on October 16, 2026.

| Check | Result |
| --- | --- |
| `npm run lint` passes | Pass (also runs in GitHub Actions) |
| `npm run build` passes | Pass (also runs in GitHub Actions) |
| Home, Experience, Projects, Contact load from the nav | Pass |
| Active nav link is highlighted | Pass ("Projects" is active on a project detail page) |
| Project card opens its detail page | Pass |
| Refresh on a detail page works on the live site | Pass (`#/projects/eks-distributed-encoding` reloads with images) |
| `#/no-such-page` shows Page not found | Pass ("404: Page not found") |
| `#/projects/no-such-project` shows Project not found | Pass |
| Typing in the filter does not apply it until Apply/Enter | Pass (status stays "No filter applied") |
| Filter: mixed case and surrounding spaces (`  ReDiS  `) | Pass (trimmed to `?q=ReDiS`, 2 projects) |
| Filter: no match shows a message | Pass (`?q=zzz`, "No projects match") |
| Filter: Clear removes `?q=` and shows all projects | Pass (6 projects) |
| Filter URL opened in a new tab keeps results | Pass (`#/projects?q=ReDiS`, 2 projects) |
| Back/Forward updates the applied filter | Pass (zzz -> ReDiS -> zzz) |
| Keyboard Tab shows a visible focus outline | Pass (3px solid outline) |
| Skip to content button works | Pass (focus moves to main) |
| GitHub links open in a new tab | Pass (`target="_blank"`, `rel="noopener noreferrer"`) |
| Mobile width (390px): no horizontal scroll | Pass |
| Demo video plays on the live site | Pass |
| Live site: JS, CSS, and fonts load with no 404 | Pass (all assets 200) |

## Media

Project images and the MCI demo video come from my own GitHub repositories
(HPC-CARLA, mci-chatbot-showcase, fl-simulation, dental-ml-force-prediction).
Images were resized and the video was re-encoded with FFmpeg to keep the site small.
The demo uses a test participant, not real patient data.

## Credits

- Route, filter, and deployment structure follow the course handout (CSCI 4360/5360, Prof. Flavio Esposito).
- Fonts (SIL Open Font License, bundled with @fontsource): Press Start 2P (CodeMan38), Silkscreen (Jason Kottke), IBM Plex Mono (IBM).
- Project images and the demo video are from my own GitHub repositories (see Media).
- AI use: I used Claude (Anthropic), an AI coding assistant, for much of the code, CSS, and README text. I chose the content, style, projects, and images, reviewed the output, and requested changes. This follows the course generative-AI policy.
