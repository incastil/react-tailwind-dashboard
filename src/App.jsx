import React, { useEffect, useMemo, useState } from 'react';

const stats = [
  { label: 'Active jobs', value: '128', change: '+12%' },
  { label: 'New candidates', value: '2,430', change: '+8.4%' },
  { label: 'Response rate', value: '91%', change: '+2.1%' },
  { label: 'Avg. time to hire', value: '14d', change: '-3d' },
];

const users = [
  { name: 'Ava Johnson', role: 'Frontend Developer', status: 'Active', location: 'Houston' },
  { name: 'Noah Perez', role: 'UI Engineer', status: 'Interviewing', location: 'Austin' },
  { name: 'Mia Chen', role: 'Product Designer', status: 'Pending', location: 'Remote' },
  { name: 'Liam Brooks', role: 'Full-Stack Developer', status: 'Active', location: 'Dallas' },
];

const tasks = [
  'Refine mobile navigation',
  'Connect candidate search API',
  'Improve card spacing on tablet',
  'Add form validation states',
];

function StatusBadge({ status }) {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-700/50',
    Interviewing: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-700/50',
    Pending: 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:ring-slate-600/50',
  };

  return <span className={`chip ring-1 ${styles[status] ?? styles.Pending}`}>{status}</span>;
}

function StatCard({ label, value, change }) {
  const positive = change.startsWith('+') || change === '91%';
  const tone = positive ? 'text-emerald-600' : 'text-rose-600';

  return (
    <div className="card p-5">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="text-3xl font-semibold tracking-tight dark:text-white">{value}</p>
        <p className={`text-sm font-semibold ${tone}`}>{change}</p>
      </div>
    </div>
  );
}

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-72 shrink-0 flex-col border-r border-slate-200 bg-slate-950 px-5 py-6 text-slate-100 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:flex`}
      >
        {/* Close button (mobile only) */}
        <button
          className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white md:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 font-bold shadow-lg shadow-brand-600/30">
            W
          </div>
          <h1 className="mt-4 text-xl font-semibold">Workhint UI</h1>
          <p className="mt-1 text-sm text-slate-400">React + Tailwind dashboard starter</p>
        </div>

        <nav className="mt-10 space-y-2 text-sm">
          {['Dashboard', 'Candidates', 'Jobs', 'Reports', 'Settings'].map((item) => (
            <a
              key={item}
              href="#"
              className="flex items-center rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl bg-white/5 p-4 text-sm text-slate-300 ring-1 ring-white/10">
          <p className="font-semibold text-white">Portfolio tip</p>
          <p className="mt-2 leading-6">
            Swap the mock data for your own API, add dark mode, and push the project to GitHub.
          </p>
        </div>
      </aside>
    </>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const filteredUsers = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term) ||
        user.location.toLowerCase().includes(term),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 md:flex">
      <Sidebar isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <header className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile only) */}
            <button
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 md:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <p className="text-sm font-medium text-brand-600">Front-end project</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Responsive candidate dashboard
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:w-96 sm:flex-row sm:items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-brand-900/40"
              placeholder="Search candidates..."
            />

            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="shrink-0 rounded-xl border border-slate-200 bg-white p-3 text-slate-500 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                /* Sun icon */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                /* Moon icon */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>

            <button className="shrink-0 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-brand-600 dark:hover:bg-brand-700">
              Add candidate
            </button>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold dark:text-white">Recent candidates</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Responsive table with filtering and status badges.
                </p>
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">{filteredUsers.length} results</span>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="py-3 pr-4 font-semibold">Name</th>
                    <th className="py-3 pr-4 font-semibold">Role</th>
                    <th className="py-3 pr-4 font-semibold">Location</th>
                    <th className="py-3 pr-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.name} className="border-b border-slate-100 last:border-0 dark:border-slate-700/60">
                      <td className="py-4 pr-4 font-medium text-slate-900 dark:text-slate-100">{user.name}</td>
                      <td className="py-4 pr-4 text-slate-600 dark:text-slate-400">{user.role}</td>
                      <td className="py-4 pr-4 text-slate-600 dark:text-slate-400">{user.location}</td>
                      <td className="py-4 pr-4">
                        <StatusBadge status={user.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-5">
              <h3 className="text-lg font-semibold dark:text-white">Today's priorities</h3>
              <ul className="mt-4 space-y-3">
                {tasks.map((task, index) => (
                  <li key={task} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-400">
                      {index + 1}
                    </span>
                    <p className="text-sm text-slate-700 dark:text-slate-400">{task}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-5">
              <h3 className="text-lg font-semibold dark:text-white">What makes it resume-ready</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                This project demonstrates responsive design, reusable UI, state management, table
                filtering, and polished Tailwind styling. It also gives you a clean base to add a
                real API, charts, dark mode, or CMS content later.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
