# Workhint UI — React + Tailwind Dashboard

A responsive candidate tracking dashboard built with React, Vite, and Tailwind CSS. Fetches live data from a public API and includes dark mode and a mobile sidebar drawer.

## Features

- **Live data** — candidates fetched from [randomuser.me](https://randomuser.me) with avatar thumbnails
- **Search filtering** — filter by name, role, or location in real time
- **Dark mode** — class-based toggle, persists across all surfaces
- **Mobile sidebar drawer** — slides in with backdrop on small screens, always visible on desktop
- **Status badges** — Active, Interviewing, and Pending with light and dark variants
- **Loading skeleton** — animated placeholders while data loads
- **Responsive layout** — works on mobile, tablet, and desktop

## Tech stack

- [React 18](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS v3](https://tailwindcss.com)
- [randomuser.me API](https://randomuser.me)

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
