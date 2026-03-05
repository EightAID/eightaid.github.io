import type { ReactNode } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { members } from './data/members'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <p className="text-sm font-semibold tracking-[0.2em] text-slate-700">CIRCLE SITE</p>
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
              to="/members"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200/70'}`
              }
            >
              Members
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
      <section className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-start">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-emerald-400/80 bg-emerald-100 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-900">
            WELCOME
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">Creative Coding Circle</h1>
          <p className="max-w-xl text-slate-700">
            We are a student circle that builds web products, designs event visuals, and shares technical know-how through weekly sessions.
          </p>
          <div className="flex gap-3">
            <Link
              to="/members"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Meet Members
            </Link>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Weekly Activity</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>Mon: Study Session</li>
            <li>Wed: Team Development</li>
            <li>Sat: Design Review</li>
          </ul>
        </div>
      </section>
    </Layout>
  )
}

function MembersPage() {
  return (
    <Layout>
      <section>
        <h1 className="text-3xl font-bold md:text-4xl">Members</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {members.map((member) => (
            <Link
              to={`/members/${member.id}`}
              key={member.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">{member.name}</h2>
              <p className="mt-1 text-sm font-medium text-slate-600">{member.role}</p>
              <p className="mt-3 text-sm text-slate-700">{member.bio}</p>
              <p className="mt-4 text-xs font-semibold tracking-wide text-slate-500">{member.grade}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function MemberDetailPage() {
  const { id } = useParams()
  const member = members.find((item) => item.id === id)

  if (!member) {
    return <NotFoundPage />
  }

  return (
    <Layout>
      <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold tracking-[0.16em] text-slate-500">{member.grade}</p>
        <h1 className="mt-2 text-3xl font-bold">{member.name}</h1>
        <p className="mt-1 text-base font-medium text-slate-600">{member.role}</p>
        <p className="mt-5 text-slate-700">{member.bio}</p>
        <h2 className="mt-8 text-sm font-semibold tracking-wide text-slate-500">SKILLS</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {member.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {skill}
            </li>
          ))}
        </ul>
        <h2 className="mt-8 text-sm font-semibold tracking-wide text-slate-500">LINKS</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {member.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      </article>
    </Layout>
  )
}

function NotFoundPage() {
  return (
    <Layout>
      <section className="space-y-4 text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-slate-500">404</p>
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-slate-700">The page does not exist or has moved.</p>
        <Link
          to="/"
          className="inline-block rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Go Home
        </Link>
      </section>
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/members/:id" element={<MemberDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}