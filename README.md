# Workhint UI — React + Tailwind Dashboard

A fully interactive hiring dashboard built from scratch with React 18, Vite, and Tailwind CSS. No UI component library — every element is hand-crafted with Tailwind utility classes.

## What's built

### Pages
- **Dashboard** — stat cards, live candidate table with search filtering, hiring trend area chart, and candidate pipeline bar chart
- **Candidates** — full candidate list with dedicated search input and status badges
- **Jobs** — live job listings fetched from The Muse API, filterable by level and keyword, with links to apply
- **Reports** — 4 Recharts data visualizations: hiring trend (area), candidate pipeline (bar), response rate (line), time to hire (line)
- **Settings** — placeholder, ready to extend

### Features
- Live candidate data from [randomuser.me](https://randomuser.me) with avatar thumbnails
- Live job listings from [The Muse API](https://www.themuse.com/developers/api/v2) — no API key required
- Add candidate modal with form validation and initials avatar fallback
- Dark mode — class-based toggle that persists across every surface and chart
- Mobile sidebar drawer — slides in with backdrop and close button, always visible on desktop
- Animated loading skeletons while API data loads
- Client-side navigation with active page highlighting
- Responsive layout across mobile, tablet, and desktop

## Tech stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev) | UI and state management |
| [Vite](https://vitejs.dev) | Build tool and dev server |
| [Tailwind CSS v3](https://tailwindcss.com) | Styling |
| [Recharts](https://recharts.org) | Data visualization |
| [randomuser.me](https://randomuser.me) | Mock candidate data |
| [The Muse API](https://www.themuse.com/developers/api/v2) | Live job listings |

## Getting started

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```
