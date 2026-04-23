import React, { useEffect, useMemo, useState } from 'react';

const ROLES = [
  'Frontend Developer',
  'UI Engineer',
  'Product Designer',
  'Full-Stack Developer',
  'Backend Engineer',
  'DevOps Engineer',
  'Mobile Developer',
  'QA Engineer',
];

const STATUSES = ['Active', 'Interviewing', 'Pending'];

const stats = [
  { label: 'Active jobs', value: '128', change: '+12%' },
  { label: 'New candidates', value: '2,430', change: '+8.4%' },
  { label: 'Response rate', value: '91%', change: '+2.1%' },
  { label: 'Avg. time to hire', value: '14d', change: '-3d' },
];

const tasks = [
  'Refine mobile navigation',
  'Connect candidate search API',
  'Improve card spacing on tablet',
  'Add form validation states',
];

const NAV_ITEMS = ['Dashboard', 'Candidates', 'Jobs', 'Reports', 'Settings'];

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

function PlaceholderPage({ title, description }) {
  return (
    <div className="flex flex-1 items-center justify-center py-32">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-900/40">
          <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
            {title[0]}
          </span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{title}</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function Sidebar({ isOpen, onClose, activePage, onNavigate }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-72 shrink-0 flex-col border-r border-slate-200 bg-slate-950 px-5 py-6 text-slate-100 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:flex`}
      >
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
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => { onNavigate(item); onClose(); }}
              className={`flex w-full items-center rounded-xl px-4 py-3 text-left transition
                ${activePage === item
                  ? 'bg-white/10 font-semibold text-white'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
            >
              {item}
            </button>
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

function DashboardPage({ query, setQuery, candidates, loading, error }) {
  const filteredCandidates = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return candidates;
    return candidates.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.role.toLowerCase().includes(term) ||
        c.location.toLowerCase().includes(term),
    );
  }, [query, candidates]);

  return (
    <>
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
                Live data from randomuser.me with filtering and status badges.
              </p>
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {loading ? '—' : `${filteredCandidates.length} results`}
            </span>
          </div>

          <div className="mt-5 overflow-x-auto">
            {error ? (
              <p className="py-8 text-center text-sm text-rose-500">{error}</p>
            ) : loading ? (
              <div className="space-y-3 py-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                      <div className="h-3 w-1/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
                  {filteredCandidates.map((c) => (
                    <tr key={c.name} className="border-b border-slate-100 last:border-0 dark:border-slate-700/60">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <img src={c.picture} alt={c.name} className="h-8 w-8 rounded-full object-cover" />
                          <span className="font-medium text-slate-900 dark:text-slate-100">{c.name}</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-slate-600 dark:text-slate-400">{c.role}</td>
                      <td className="py-4 pr-4 text-slate-600 dark:text-slate-400">{c.location}</td>
                      <td className="py-4 pr-4">
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
    </>
  );
}

function CandidatesPage({ candidates, loading, error }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return candidates;
    return candidates.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.role.toLowerCase().includes(term) ||
        c.location.toLowerCase().includes(term),
    );
  }, [query, candidates]);

  return (
    <div className="mt-6 card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">All candidates</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {loading ? 'Loading…' : `${filtered.length} results`}
          </p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 sm:w-64"
          placeholder="Search candidates..."
        />
      </div>

      <div className="mt-5 overflow-x-auto">
        {error ? (
          <p className="py-8 text-center text-sm text-rose-500">{error}</p>
        ) : loading ? (
          <div className="space-y-3 py-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-1/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
              {filtered.map((c) => (
                <tr key={c.name} className="border-b border-slate-100 last:border-0 dark:border-slate-700/60">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <img src={c.picture} alt={c.name} className="h-8 w-8 rounded-full object-cover" />
                      <span className="font-medium text-slate-900 dark:text-slate-100">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-slate-600 dark:text-slate-400">{c.role}</td>
                  <td className="py-4 pr-4 text-slate-600 dark:text-slate-400">{c.location}</td>
                  <td className="py-4 pr-4">
                    <StatusBadge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10&nat=us')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch candidates');
        return res.json();
      })
      .then((data) => {
        const mapped = data.results.map((user, i) => ({
          name: `${user.name.first} ${user.name.last}`,
          role: ROLES[i % ROLES.length],
          status: STATUSES[i % STATUSES.length],
          location: user.location.city,
          picture: user.picture.thumbnail,
        }));
        setCandidates(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function renderPage() {
    switch (activePage) {
      case 'Dashboard':
        return <DashboardPage query={query} setQuery={setQuery} candidates={candidates} loading={loading} error={error} />;
      case 'Candidates':
        return <CandidatesPage candidates={candidates} loading={loading} error={error} />;
      case 'Jobs':
        return <PlaceholderPage title="Jobs" description="Post and manage open roles. Coming soon." />;
      case 'Reports':
        return <PlaceholderPage title="Reports" description="Analytics and hiring metrics. Coming soon." />;
      case 'Settings':
        return <PlaceholderPage title="Settings" description="Account and workspace preferences. Coming soon." />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 md:flex">
      <Sidebar
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <header className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
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
                {activePage}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:w-96 sm:flex-row sm:items-center">
            {activePage === 'Dashboard' && (
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-brand-900/40"
                placeholder="Search candidates..."
              />
            )}

            <button
              onClick={() => setDark(!dark)}
              className="shrink-0 rounded-xl border border-slate-200 bg-white p-3 text-slate-500 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
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

        {renderPage()}
      </main>
    </div>
  );
}
