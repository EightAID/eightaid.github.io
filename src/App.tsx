import type { ReactNode } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { members } from './data/members'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell min-h-screen text-stone-100">
      <header className="sticky top-0 z-20 border-b border-red-300/20 bg-black/35 backdrop-blur-md">
        <div className="mx-auto flex w-[min(1100px,92%)] items-center justify-between py-4">
          <p className="text-sm font-semibold tracking-[0.2em] text-red-100">DAISHOU PROJECT</p>
          <nav className="flex items-center gap-2 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'border border-red-100/30 text-red-100 hover:bg-red-100/15'
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
                    ? 'bg-red-600 text-white'
                    : 'border border-red-100/30 text-red-100 hover:bg-red-100/15'
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
      <section className="hero-panel overflow-hidden rounded-[28px] border border-red-200/25 p-7 shadow-2xl md:p-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="inline-flex rounded-full border border-red-200/50 bg-red-100/10 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-red-100">
              INDIE GAME UNIT
            </p>
            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <h1 className="text-4xl font-bold leading-tight text-red-50 md:text-6xl">代償プロジェクト</h1>
              <img
                src="/assets/16_9.png"
                alt="代償プロジェクト ロゴ"
                className="h-auto w-full max-w-[360px] rounded-xl border border-red-200/30 object-cover md:w-[320px]"
              />
            </div>
            <p className="mt-4 max-w-xl text-base text-stone-200/90 md:text-lg">圧倒的な絶望感と選択</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-200/90 md:text-base">
              えいとえいどと紅芋けんぴによるインディーゲーム制作ユニット。2025年に「代償少女 unityroom版」を制作、
              2026年に「代償少女 Steam版」をリリース予定です。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://store.steampowered.com/app/3839720/_/?l=japanese"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                Steamページ
              </a>
              <a
                href="https://x.com/AIDunity"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-red-100/30 bg-red-100/10 px-5 py-2.5 text-sm font-semibold text-red-50 transition hover:bg-red-100/20"
              >
                X
              </a>
              <a
                href="https://www.youtube.com/watch?v=jGvsuUJM0E0"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-red-100/30 px-5 py-2.5 text-sm font-semibold text-red-50 transition hover:bg-red-100/20"
              >
                YouTube
              </a>
              <Link
                to="/members"
                className="rounded-full border border-red-100/30 px-5 py-2.5 text-sm font-semibold text-red-50 transition hover:bg-red-100/20"
              >
                メンバー紹介
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-red-100/25 bg-black/35 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-[0.18em] text-red-100/90">NOW DEVELOPING</p>
            <h2 className="mt-2 text-2xl font-semibold text-red-50">代償少女</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-200/90">カードバトルADV / 1人プレイ / Steam向け開発中</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-200/90">カードの代償は、少女"自身"。</p>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-red-200/20 bg-black/30 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-red-50 md:text-3xl">作品概要</h2>
        <p className="mt-4 text-sm leading-relaxed text-stone-200/90 md:text-base">
          数多のデッキから配られる4枚の手札を駆使して敵を倒しゴールを目指しましょう。デッキはプレイヤーが操作する
          「少女自身」でもあり、「視覚」「言語」「愛」「記憶」など、消費するカードに応じて少女には代償が発生します。
          代償はキャラのリアクションだけでなく、UI・BGM・ストーリーなどあらゆるゲーム要素にも影響します。
        </p>
      </section>

      <section id="gallery" className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-red-50 md:text-3xl">開発中スクリーンショット</h2>
          <p className="text-xs tracking-[0.14em] text-red-100/80">IN-GAME SHOTS</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: '/assets/screenshot-01.jpg', caption: 'Scene 01' },
            { src: '/assets/screenshot-02.jpg', caption: 'Scene 02' },
            { src: '/assets/screenshot-03.png', caption: 'Scene 03' },
          ].map((item) => (
            <figure key={item.src} className="overflow-hidden rounded-2xl border border-red-200/20 bg-black/30">
              <img src={item.src} alt="代償少女の開発中スクリーンショット" className="h-52 w-full object-cover" />
              <figcaption className="px-4 py-3 text-sm text-stone-200/90">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="movie" className="mt-12 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="overflow-hidden rounded-2xl border border-red-200/20 bg-black/30">
          <video controls className="aspect-video w-full" poster="/assets/screenshot-01.jpg">
            <source src="/assets/daisho-pv-jp.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="rounded-2xl border border-red-200/20 bg-black/30 p-6">
          <h2 className="text-2xl font-bold text-red-50">PV / プレイ動画</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-200/90">
            サイト内でPVを再生できます。YouTube版は下のボタンから視聴できます。
          </p>
          <a
            href="https://www.youtube.com/watch?v=jGvsuUJM0E0"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-full border border-red-100/30 px-4 py-2 text-sm font-semibold text-red-50 transition hover:bg-red-100/15"
          >
            YouTubeで見る
          </a>
        </div>
      </section>
    </Layout>
  )
}

function MembersPage() {
  return (
    <Layout>
      <section>
        <h1 className="text-3xl font-bold text-red-50 md:text-4xl">メンバー</h1>
        <p className="mt-3 text-stone-200/90">代償プロジェクトは2名で制作しています。</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {members.map((member) => (
            <article
              key={member.id}
              className="rounded-2xl border border-red-200/20 bg-black/35 p-6 shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <img
                  src={member.image}
                  alt={`${member.name}のプロフィール画像`}
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] text-red-100/90">{member.role}</p>
                  <h2 className="mt-1 text-2xl font-semibold text-red-50">{member.name}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-stone-200/90">{member.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-red-200/25 bg-red-100/10 px-3 py-1 text-xs font-semibold text-red-100"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              <a
                href={member.xUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block rounded-full border border-red-100/30 px-4 py-2 text-sm font-semibold text-red-50 transition hover:bg-red-100/15"
              >
                Xを見る
              </a>
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
        <p className="text-sm font-semibold tracking-[0.18em] text-red-100/90">404</p>
        <h1 className="text-3xl font-bold text-red-50">Page Not Found</h1>
        <Link
          to="/"
          className="inline-block rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
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
