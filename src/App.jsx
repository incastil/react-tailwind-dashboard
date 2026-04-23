import React, { useEffect, useMemo, useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const ROLES = [
  'Frontend Developer', 'UI Engineer', 'Product Designer',
  'Full-Stack Developer', 'Backend Engineer', 'DevOps Engineer',
  'Mobile Developer', 'QA Engineer',
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

const hiringTrend = [
  { month: 'Nov', jobs: 89,  candidates: 1740 },
  { month: 'Dec', jobs: 97,  candidates: 1950 },
  { month: 'Jan', jobs: 103, candidates: 2080 },
  { month: 'Feb', jobs: 110, candidates: 2210 },
  { month: 'Mar', jobs: 114, candidates: 2241 },
  { month: 'Apr', jobs: 128, candidates: 2430 },
];

const pipelineData = [
  { month: 'Nov', Active: 38, Interviewing: 29, Pending: 22 },
  { month: 'Dec', Active: 42, Interviewing: 31, Pending: 24 },
  { month: 'Jan', Active: 47, Interviewing: 34, Pending: 22 },
  { month: 'Feb', Active: 51, Interviewing: 36, Pending: 23 },
  { month: 'Mar', Active: 55, Interviewing: 38, Pending: 21 },
  { month: 'Apr', Active: 61, Interviewing: 42, Pending: 25 },
];

const responseRateTrend = [
  { month: 'Nov', rate: 84 },
  { month: 'Dec', rate: 86 },
  { month: 'Jan', rate: 87 },
  { month: 'Feb', rate: 88 },
  { month: 'Mar', rate: 89 },
  { month: 'Apr', rate: 91 },
];

const timeToHireTrend = [
  { month: 'Nov', days: 21 },
  { month: 'Dec', days: 19 },
  { month: 'Jan', days: 18 },
  { month: 'Feb', days: 17 },
  { month: 'Mar', days: 17 },
  { month: 'Apr', days: 14 },
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

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-soft text-xs dark:border-slate-700 dark:bg-slate-800">
      <p className="mb-1 font-semibold text-slate-700 dark:text-slate-200">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value.toLocaleString()}{p.name === 'Response rate' ? '%' : p.name === 'Time to hire' ? 'd' : ''}
        </p>
      ))}
    </div>
  );
}

function ChartCard({ title, description, children }) {
  return (
    <div className="card p-5">
      <h3 className="text-base font-semibold dark:text-white">{title}</h3>
      <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      <div className="mt-4 h-52">{children}</div>
    </div>
  );
}

function PlaceholderPage({ title, description }) {
  return (
    <div className="flex flex-1 items-center justify-center py-32">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-900/40">
          <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">{title[0]}</span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{title}</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}

const LEVEL_LABELS = {
  internship: 'Internship',
  entry: 'Entry Level',
  mid: 'Mid Level',
  senior: 'Senior Level',
  management: 'Management',
};

const LEVEL_STYLES = {
  internship: 'bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-700/50',
  entry: 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:ring-sky-700/50',
  mid: 'bg-brand-50 text-brand-700 ring-brand-200 dark:bg-brand-900/30 dark:text-brand-400 dark:ring-brand-700/50',
  senior: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-700/50',
  management: 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:ring-rose-700/50',
};

function LevelBadge({ level }) {
  const key = level?.short_name ?? 'mid';
  return (
    <span className={`chip ring-1 ${LEVEL_STYLES[key] ?? LEVEL_STYLES.mid}`}>
      {LEVEL_LABELS[key] ?? level?.name ?? 'Unknown'}
    </span>
  );
}

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  useEffect(() => {
    fetch('https://www.themuse.com/api/public/jobs?page=1&category=Software%20Engineering&descending=true')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch jobs');
        return res.json();
      })
      .then((data) => setJobs(data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const levels = useMemo(() => {
    const seen = new Set();
    jobs.forEach((j) => j.levels.forEach((l) => seen.add(l.short_name)));
    return [...seen];
  }, [jobs]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchesQuery =
        !term ||
        j.name.toLowerCase().includes(term) ||
        j.company.name.toLowerCase().includes(term) ||
        j.locations.some((l) => l.name.toLowerCase().includes(term));
      const matchesLevel =
        levelFilter === 'all' || j.levels.some((l) => l.short_name === levelFilter);
      return matchesQuery && matchesLevel;
    });
  }, [jobs, query, levelFilter]);

  return (
    <div className="mt-6 card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">Software Engineering Jobs</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {loading ? 'Loading…' : `${filtered.length} listings from The Muse`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 sm:w-56"
            placeholder="Search jobs..."
          />
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
          >
            <option value="all">All levels</option>
            {levels.map((l) => (
              <option key={l} value={l}>{LEVEL_LABELS[l] ?? l}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        {error ? (
          <p className="py-8 text-center text-sm text-rose-500">{error}</p>
        ) : loading ? (
          <div className="space-y-3 py-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 pr-4 font-semibold">Job title</th>
                <th className="py-3 pr-4 font-semibold">Company</th>
                <th className="py-3 pr-4 font-semibold">Location</th>
                <th className="py-3 pr-4 font-semibold">Level</th>
                <th className="py-3 pr-4 font-semibold">Link</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr key={job.id} className="border-b border-slate-100 last:border-0 dark:border-slate-700/60">
                  <td className="py-4 pr-4 font-medium text-slate-900 dark:text-slate-100">{job.name}</td>
                  <td className="py-4 pr-4 text-slate-600 dark:text-slate-400">{job.company.name}</td>
                  <td className="py-4 pr-4 text-slate-600 dark:text-slate-400">
                    {job.locations.map((l) => l.name).join(', ') || 'Remote'}
                  </td>
                  <td className="py-4 pr-4">
                    {job.levels[0] ? <LevelBadge level={job.levels[0]} /> : '—'}
                  </td>
                  <td className="py-4 pr-4">
                    <a
                      href={job.refs.landing_page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 hover:underline dark:text-brand-400"
                    >
                      View →
                    </a>
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
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 font-bold shadow-lg shadow-brand-600/30">W</div>
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
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl bg-white/5 p-4 text-sm text-slate-300 ring-1 ring-white/10">
          <p className="font-semibold text-white">Portfolio tip</p>
          <p className="mt-2 leading-6">Swap the mock data for your own API, add dark mode, and push the project to GitHub.</p>
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
        {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
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
                      <td className="py-4 pr-4"><StatusBadge status={c.status} /></td>
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
                  <td className="py-4 pr-4"><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function ReportsPage({ dark }) {
  const gridColor = dark ? '#334155' : '#e2e8f0';
  const tickColor = dark ? '#94a3b8' : '#64748b';

  return (
    <div className="mt-6 space-y-6">
      {/* Row 1 */}
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Hiring trend" description="Active jobs & new candidates over 6 months">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hiringTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="jobsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="candidatesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Area type="monotone" dataKey="jobs" name="Active jobs" stroke="#6366f1" strokeWidth={2} fill="url(#jobsGrad)" dot={false} />
              <Area type="monotone" dataKey="candidates" name="Candidates" stroke="#10b981" strokeWidth={2} fill="url(#candidatesGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Candidate pipeline" description="Status breakdown over 6 months">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pipelineData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Bar dataKey="Active" name="Active" fill="#6366f1" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Interviewing" name="Interviewing" fill="#f59e0b" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Pending" name="Pending" fill="#94a3b8" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2 */}
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Response rate" description="Candidate response rate trending toward 91%">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={responseRateTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 95]} tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Line type="monotone" dataKey="rate" name="Response rate" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Time to hire" description="Average days to hire dropping toward 14 days">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeToHireTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <YAxis domain={[10, 25]} tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Line type="monotone" dataKey="days" name="Time to hire" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
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
        return <JobsPage />;
      case 'Reports':
        return <ReportsPage dark={dark} />;
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
