# Workhint UI — React + Tailwind Dashboard

A responsive candidate tracking dashboard built with React, Vite, and Tailwind CSS. Fetches live data from a public API and includes dark mode, client-side navigation, a mobile sidebar drawer, and a full reports page with charts.

## Features

- **Client-side navigation** — Dashboard, Candidates, Jobs, Reports, and Settings pages with active state highlighting
- **Live candidate data** — fetched from [randomuser.me](https://randomuser.me) with avatar thumbnails
- **Live job listings** — fetched from [The Muse API](https://www.themuse.com/developers/api/v2) with company, location, level badges, and links to apply
- **Search filtering** — filter by name, role, or location in real time
- **Reports page** — 4 charts built with Recharts: hiring trend (area), candidate pipeline (bar), response rate (line), and time to hire (line)
- **Dark mode** — class-based toggle, persists across all surfaces and charts
- **Mobile sidebar drawer** — slides in with backdrop on small screens, always visible on desktop
- **Status badges** — Active, Interviewing, and Pending with light and dark variants
- **Loading skeleton** — animated placeholders while data loads
- **Responsive layout** — works on mobile, tablet, and desktop

## Tech stack

- [React 18](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS v3](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [randomuser.me API](https://randomuser.me)
- [The Muse API](https://www.themuse.com/developers/api/v2)

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
