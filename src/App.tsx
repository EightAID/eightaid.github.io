import type { ReactNode } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { members } from './data/members'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell min-h-screen text-stone-100">
      <header className="sticky top-0 z-20 border-b border-amber-300/20 bg-black/35 backdrop-blur-md">
        <div className="mx-auto flex w-[min(1100px,92%)] items-center justify-between py-4">
          <p className="text-sm font-semibold tracking-[0.2em] text-amber-100">DAISHO PROJECT</p>
          <nav className="flex items-center gap-2 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-amber-300 text-stone-900'
                    : 'border border-amber-100/30 text-amber-100 hover:bg-amber-100/15'
                }`
              }
            >
              Top
            </NavLink>
            <NavLink
              to="/members"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-amber-300 text-stone-900'
                    : 'border border-amber-100/30 text-amber-100 hover:bg-amber-100/15'
                }`
              }
            >
              Members
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-[min(1100px,92%)] py-10 md:py-14">{children}</main>
    </div>
  )
}

function HomePage() {
  return (
    <Layout>
      <section className="hero-panel overflow-hidden rounded-[28px] border border-amber-200/25 p-7 shadow-2xl md:p-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="inline-flex rounded-full border border-amber-200/50 bg-amber-100/10 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-amber-100">
              INDIE GAME CIRCLE
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-amber-50 md:text-6xl">代償プロジェクト</h1>
            <p className="mt-4 max-w-xl text-base text-stone-200/90 md:text-lg">
              2人でゲームを制作している同人サークルです。世界観、シナリオ、実装まで一貫して開発し、
              作品の魅力をスクリーンショットと映像で発信しています。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#gallery"
                className="rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-stone-900 transition hover:bg-amber-200"
              >
                スクリーンショット
              </a>
              <a
                href="#movie"
                className="rounded-full border border-amber-100/30 bg-amber-100/10 px-5 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-amber-100/20"
              >
                動画を見る
              </a>
              <Link
                to="/members"
                className="rounded-full border border-amber-100/30 px-5 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-amber-100/20"
              >
                メンバー紹介
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-amber-100/25 bg-black/35 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-[0.18em] text-amber-100/90">NOW DEVELOPING</p>
            <h2 className="mt-2 text-2xl font-semibold text-amber-50">Project: 黒月ノ章</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-200/90">
              幻想と代償をテーマにした2DアクションADV。探索、戦闘、分岐シナリオを中心に制作中です。
            </p>
          </div>
        </div>
      </section>

      <section id="gallery" className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-amber-50 md:text-3xl">開発中スクリーンショット</h2>
          <p className="text-xs tracking-[0.14em] text-amber-100/80">IN-GAME SHOTS</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <figure key={index} className="overflow-hidden rounded-2xl border border-amber-200/20 bg-black/30">
              <img
                src={`/assets/shot-0${index}.svg`}
                alt={`開発中ゲームのスクリーンショット ${index}`}
                className="h-52 w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-sm text-stone-200/90">Scene {index}: 差し替え用画像</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="movie" className="mt-12 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="overflow-hidden rounded-2xl border border-amber-200/20 bg-black/30">
          <video controls className="aspect-video w-full" poster="/assets/video-poster.svg">
            <source src="/assets/gameplay.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="rounded-2xl border border-amber-200/20 bg-black/30 p-6">
          <h2 className="text-2xl font-bold text-amber-50">PV / プレイ動画</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-200/90">
            `public/assets/gameplay.mp4` を置くと、このセクションで再生できます。YouTubeにする場合は
            `video` 要素を `iframe` に差し替えるだけで対応可能です。
          </p>
        </div>
      </section>
    </Layout>
  )
}

function MembersPage() {
  return (
    <Layout>
      <section>
        <h1 className="text-3xl font-bold text-amber-50 md:text-4xl">メンバー</h1>
        <p className="mt-3 text-stone-200/90">代償プロジェクトは2名で制作しています。</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {members.map((member) => (
            <article
              key={member.id}
              className="rounded-2xl border border-amber-200/20 bg-black/35 p-6 shadow-lg backdrop-blur-sm"
            >
              <p className="text-xs font-semibold tracking-[0.15em] text-amber-100/90">{member.role}</p>
              <h2 className="mt-2 text-2xl font-semibold text-amber-50">{member.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-200/90">{member.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-amber-200/25 bg-amber-100/10 px-3 py-1 text-xs font-semibold text-amber-100"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function NotFoundPage() {
  return (
    <Layout>
      <section className="space-y-4 text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-amber-100/90">404</p>
        <h1 className="text-3xl font-bold text-amber-50">Page Not Found</h1>
        <Link
          to="/"
          className="inline-block rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-stone-900 transition hover:bg-amber-200"
        >
          Topへ戻る
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
