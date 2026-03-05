import type { ReactNode } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'

const projects = [
  {
    title: 'Landing Page Redesign',
    desc: 'UI refresh focused on conversion and mobile readability.',
    stack: 'React / TypeScript / Tailwind',
  },
  {
    title: 'Team Dashboard',
    desc: 'Admin dashboard with reusable chart and table components.',
    stack: 'React / Vite / Chart.js',
  },
  {
    title: 'Blog Template',
    desc: 'Fast static blog layout optimized for GitHub Pages.',
    stack: 'React / Markdown / CI',
  },
]

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <p className="text-sm font-semibold tracking-[0.2em] text-slate-700">MY PORTFOLIO</p>
          <nav className="flex gap-2 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200/70'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200/70'}`
              }
            >
              Projects
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-14">{children}</main>
    </div>
  )
}

function HomePage() {
  return (
    <Layout>
      <section className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-amber-400/80 bg-amber-100 px-3 py-1 text-xs font-semibold tracking-wider text-amber-900">
            OPEN TO WORK
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Reactでつくる、使いやすくて速いWeb体験
          </h1>
          <p className="max-w-xl text-slate-700">
            フロントエンド開発を中心に、設計とUI実装を担当しています。保守性と見た目のバランスを意識しながら、成果につながるページを作ります。
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Tech Stack</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>React / TypeScript</li>
            <li>Vite / GitHub Actions</li>
            <li>Tailwind CSS / Figma</li>
          </ul>
        </div>
      </section>
    </Layout>
  )
}

function ProjectsPage() {
  return (
    <Layout>
      <section>
        <h1 className="text-3xl font-bold md:text-4xl">Projects</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {projects.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-700">{item.desc}</p>
              <p className="mt-4 text-xs font-semibold tracking-wide text-slate-500">{item.stack}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
