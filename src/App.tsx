import { useState, type ReactNode } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { members, type PastWork } from './data/members'

const screenshots = [
  {
    src: '/assets/screenshot-03.png',
    title: '場面 1',
    copy: 'カード演出と物語演出が交差する、ゲームプレイ中の画面です。',
  },
  {
    src: '/assets/screenshot-02.jpg',
    title: '場面 2',
    copy: '静かな画面構成で、不穏さと余韻を引き立てるカットです。',
  },
  {
    src: '/assets/screenshot-01.jpg',
    title: '場面 3',
    copy: '少女たちの会話劇と、選択の緊張感が同居する場面です。',
  },
]

const youtubeWatchUrl =
  import.meta.env.VITE_YOUTUBE_URL ?? 'https://www.youtube.com/watch?v=jGvsuUJM0E0'

const coverToneStyles: Record<NonNullable<PastWork['coverTone']>, string> = {
  crimson: 'from-red-700 via-red-500 to-orange-300',
  amber: 'from-amber-700 via-amber-500 to-yellow-200',
  violet: 'from-violet-800 via-fuchsia-600 to-rose-300',
  emerald: 'from-emerald-800 via-emerald-500 to-lime-200',
  sky: 'from-sky-800 via-cyan-500 to-blue-200',
  rose: 'from-rose-800 via-pink-500 to-orange-200',
}

function toYouTubeEmbedUrl(url: string) {
  if (!url) {
    return ''
  }

  if (url.includes('/embed/')) {
    return url
  }

  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.replace('/', '')
      return `https://www.youtube.com/embed/${videoId}`
    }

    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }
  } catch {
    return ''
  }

  return ''
}

const youtubeEmbedUrl = toYouTubeEmbedUrl(youtubeWatchUrl)

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell min-h-screen text-stone-100">
      <header className="sticky top-0 z-30 border-b border-red-300/20 bg-black/35 backdrop-blur-md">
        <div className="mx-auto flex w-[min(1160px,92%)] items-center justify-between gap-4 py-4">
          <Link to="/" className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-red-100/80">
              インディーゲームサークル
            </p>
            <p className="truncate text-lg font-bold tracking-[0.12em] text-red-50">
              代償プロジェクト
            </p>
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-2 text-sm font-medium">
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
              トップ
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
              メンバー
            </NavLink>
            <NavLink
              to="/special"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'border border-red-100/30 text-red-100 hover:bg-red-100/15'
                }`
              }
            >
              特設ページ
            </NavLink>
            <a
              href="mailto:eightaidgames@gmail.com"
              className="rounded-full border border-red-100/30 px-4 py-2 text-red-100 transition hover:bg-red-100/15"
            >
              お問い合わせ
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-[min(1160px,92%)] py-10 md:py-14">{children}</main>
      <footer className="border-t border-red-300/20 bg-black/25">
        <div className="mx-auto flex w-[min(1160px,92%)] flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-red-100/70">お問い合わせ</p>
            <h2 className="mt-2 text-2xl font-semibold text-red-50">制作や掲載のご相談はこちらから。</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-300">
              インディーゲーム制作、取材、イベント出展のお問い合わせは、メールまたはXのダイレクトメッセージで受け付けています。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:eightaidgames@gmail.com"
              className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              eightaidgames@gmail.com
            </a>
            <a
              href="https://x.com/AIDunity"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-red-100/30 px-5 py-3 text-sm font-semibold text-red-50 transition hover:bg-red-100/15"
            >
              Xで連絡する
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ScreenshotCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentShot = screenshots[currentIndex]

  return (
    <div className="overflow-hidden rounded-[28px] border border-red-200/20 bg-black/35 shadow-2xl backdrop-blur-sm">
      <div className="relative">
        <img
          src={currentShot.src}
          alt="代償少女のゲームスクリーンショット"
          className="aspect-[16/9] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 md:p-7">
          <p className="text-xs font-semibold tracking-[0.2em] text-red-100/80">{currentShot.title}</p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone-100 md:text-base">
            {currentShot.copy}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="flex gap-2">
          {screenshots.map((shot, index) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition ${
                index === currentIndex ? 'w-10 bg-red-500' : 'w-2.5 bg-red-100/35 hover:bg-red-100/60'
              }`}
              aria-label={`${shot.title}を表示`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((currentIndex - 1 + screenshots.length) % screenshots.length)
            }
            className="rounded-full border border-red-100/30 px-4 py-2 text-sm font-semibold text-red-50 transition hover:bg-red-100/15"
          >
            前へ
          </button>
          <button
            type="button"
            onClick={() => setCurrentIndex((currentIndex + 1) % screenshots.length)}
            className="rounded-full border border-red-100/30 px-4 py-2 text-sm font-semibold text-red-50 transition hover:bg-red-100/15"
          >
            次へ
          </button>
        </div>
      </div>
    </div>
  )
}

function WorkCard({ work }: { work: PastWork }) {
  const tone = coverToneStyles[work.coverTone ?? 'crimson']

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-red-200/15 bg-white/5">
      <div className={`relative aspect-[1/1] max-h-[240px] bg-gradient-to-br ${tone}`}>
        {work.image ? (
          <img src={work.image} alt={`${work.title}のサムネイル`} className="h-full w-full object-cover" />
        ) : null}
        <div
          className={`absolute inset-0 ${
            work.image
              ? 'pointer-events-none bg-gradient-to-t from-black/75 via-black/25 to-black/10'
              : 'pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.3),transparent_28%),radial-gradient(circle_at_85%_25%,rgba(255,255,255,0.18),transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.45))]'
          }`}
        />
        <div className="pointer-events-none relative flex h-full items-end p-4">
          <div className="min-h-[4.75rem] w-full">
            <p className="text-xs font-medium text-white/80">{work.year}</p>
            <h3 className="mt-1.5 max-w-full text-lg font-black leading-snug text-white md:text-xl [overflow-wrap:anywhere]">
              {work.title}
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-auto p-4">
        {work.link ? (
          <a
            href={work.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border border-red-100/30 px-4 py-2.5 text-sm font-semibold text-red-50 transition hover:bg-red-100/15"
          >
            作品に飛ぶ
          </a>
        ) : null}
      </div>
    </article>
  )
}

function HomePage() {
  return (
    <Layout>
      <section className="grid gap-10 pb-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
        <div className="hero-copy">
          <p className="inline-flex rounded-full border border-red-200/50 bg-red-100/10 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-red-100">
            インディーゲームサークル
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight text-red-50 md:text-6xl">
            代償プロジェクト
          </h1>
          <p className="mt-4 max-w-xl text-base text-stone-100/90 md:text-lg">
            大切なものを賭けて選択する、物語志向のゲームを制作しています。
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-200/90 md:text-base">
            えいとえいどと紅芋けんぴによる制作サークルです。2025年に『代償少女』の
            unityroom版を公開し、2026年にSteam版のリリースを予定しています。選択の重みと物語体験が一緒に残る作品づくりを進めています。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
              href={youtubeWatchUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-red-100/30 px-5 py-2.5 text-sm font-semibold text-red-50 transition hover:bg-red-100/20"
            >
              YouTube
            </a>
          </div>
        </div>

        <Link
          to="/special"
          className="special-banner group block overflow-hidden rounded-[28px] border border-red-200/20 p-6 shadow-2xl transition hover:-translate-y-1 hover:border-red-100/40 md:p-7"
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-red-100/80">新作バナー</p>
          <h2 className="mt-3 text-3xl font-bold text-red-50">ただいま制作中</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-200/90">
            新作『代償少女』の特設ページへ。世界観、制作状況、最新情報をまとめて見られる入口です。
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red-50">
            特設ページを見る
            <span className="transition group-hover:translate-x-1">{'->'}</span>
          </p>
        </Link>
      </section>

      <section className="mt-2 grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[24px] border border-red-200/20 bg-black/28 p-6 backdrop-blur-sm">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-red-100/80">メンバー</p>
              <h2 className="mt-2 text-2xl font-bold text-red-50">参加メンバー</h2>
            </div>
            <Link
              to="/members"
              className="rounded-full border border-red-100/30 px-4 py-2 text-sm font-semibold text-red-50 transition hover:bg-red-100/15"
            >
              一覧を見る
            </Link>
          </div>
          <div className="mt-5 space-y-4">
            {members.map((member) => (
              <Link
                key={member.id}
                to={`/members/${member.id}`}
                className="flex items-center gap-4 rounded-2xl border border-red-200/15 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <img
                  src={member.image}
                  alt={`${member.name}のプロフィール画像`}
                  className="h-14 w-14 rounded-xl object-cover"
                  style={{ objectPosition: member.imagePosition }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-red-50">{member.name}</h3>
                  <p className="text-sm text-red-100/85">{member.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-red-200/20 bg-black/28 p-6 backdrop-blur-sm md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-red-100/80">作品紹介</p>
          <h2 className="mt-2 text-2xl font-bold text-red-50 md:text-3xl">代償少女について</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-200/90 md:text-base">
            数種類のデッキから選ばれる4枚のカードを駆使して進む、カードバトルADVです。デッキはプレイヤーが操作する“代償少女”そのものであり、使うカードに応じて攻略の感触や物語の受け取り方が変わります。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-stone-200/90 md:text-base">
            UI、BGM、文章、ビジュアルを一体で設計し、選択の結果が画面全体の空気として残る体験を目指しています。
          </p>
        </div>
      </section>

      <section id="gallery" className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-red-100/80">画面写真</p>
            <h2 className="mt-2 text-2xl font-bold text-red-50 md:text-3xl">スクリーンショット</h2>
          </div>
          <p className="text-sm text-stone-300">1枚ずつ大きく見せる表示です。</p>
        </div>
        <ScreenshotCarousel />
      </section>

      <section id="movie" className="mt-12 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="overflow-hidden rounded-[28px] border border-red-200/20 bg-black/30 shadow-2xl">
          {youtubeEmbedUrl ? (
            <iframe
              className="aspect-video w-full"
              src={youtubeEmbedUrl}
              title="代償少女の紹介映像"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="flex aspect-video items-center justify-center px-6 text-center text-sm text-stone-300">
              YouTubeのURLが未設定のため、映像を表示できません。
            </div>
          )}
        </div>
        <div className="rounded-[24px] border border-red-200/20 bg-black/30 p-6 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-[0.18em] text-red-100/80">紹介映像</p>
          <h2 className="mt-2 text-2xl font-bold text-red-50">PV</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-200/90">
            PVは環境変数で切り替え可能なYouTubeのURLを利用しています。公開先や確認用のリンクを運用しやすい構成です。
          </p>
          <a
            href={youtubeWatchUrl}
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
        <p className="text-xs font-semibold tracking-[0.18em] text-red-100/80">メンバー</p>
        <h1 className="mt-2 text-3xl font-bold text-red-50 md:text-4xl">メンバー一覧</h1>
        <p className="mt-3 max-w-2xl text-stone-200/90">
          代償プロジェクトを支える2名のメンバーです。各ページでは担当領域や過去作も確認できます。
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {members.map((member) => (
            <article
              key={member.id}
              className="rounded-[24px] border border-red-200/20 bg-black/35 p-6 shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <img
                  src={member.image}
                  alt={`${member.name}のプロフィール画像`}
                  className="h-16 w-16 rounded-xl object-cover"
                  style={{ objectPosition: member.imagePosition }}
                />
                <div>
                  <h2 className="text-2xl font-semibold text-red-50">{member.name}</h2>
                  <p className="mt-1 text-sm font-medium text-red-100/85">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-stone-200/90">{member.bio}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to={`/members/${member.id}`}
                  className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  詳細を見る
                </Link>
                <a
                  href={member.xUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-red-100/30 px-4 py-2 text-sm font-semibold text-red-50 transition hover:bg-red-100/15"
                >
                  Xを見る
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function MemberDetailPage() {
  const { memberId } = useParams()
  const member = members.find((item) => item.id === memberId)

  if (!member) {
    return <Navigate to="/members" replace />
  }

  return (
    <Layout>
      <section className="space-y-6">
        <article className="rounded-[28px] border border-red-200/20 bg-black/35 p-7 shadow-2xl backdrop-blur-sm">
          <img
            src={member.image}
            alt={`${member.name}のプロフィール画像`}
            className="h-24 w-24 rounded-2xl object-cover"
            style={{ objectPosition: member.imagePosition }}
          />
          <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-red-100/80">メンバープロフィール</p>
          <h1 className="mt-2 text-3xl font-bold text-red-50 md:text-4xl">{member.name}</h1>
          <p className="mt-2 text-base font-medium text-red-100/85">{member.role}</p>
          <p className="mt-5 text-sm leading-relaxed text-stone-200/90">{member.profile}</p>
          <div className="mt-6 rounded-2xl border border-red-200/15 bg-white/5 p-5">
            <p className="text-xs font-semibold tracking-[0.15em] text-red-100/75">現在注力していること</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-200/90">{member.currentFocus}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={member.xUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Xを見る
            </a>
            {member.portfolioUrl ? (
              <a
                href={member.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-red-100/30 px-5 py-2.5 text-sm font-semibold text-red-50 transition hover:bg-red-100/15"
              >
                unityroomを見る
              </a>
            ) : null}
            <Link
              to="/members"
              className="rounded-full border border-red-100/30 px-5 py-2.5 text-sm font-semibold text-red-50 transition hover:bg-red-100/15"
            >
              メンバー一覧へ戻る
            </Link>
          </div>
        </article>

        <section className="rounded-[28px] border border-red-200/20 bg-black/28 p-7 backdrop-blur-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-red-100/80">これまでの制作</p>
              <h2 className="mt-2 text-2xl font-bold text-red-50">作品一覧</h2>
            </div>
            <p className="text-sm text-stone-300">
              {member.portfolioUrl ? '公開ページへの導線付きで一覧化しています。' : '過去作を見やすく整理しています。'}
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {member.pastWorks.map((work) => (
              <WorkCard key={`${member.id}-${work.title}`} work={work} />
            ))}
          </div>
        </section>
      </section>
    </Layout>
  )
}

function SpecialPage() {
  return (
    <Layout>
      <section className="overflow-hidden rounded-[32px] border border-red-200/20 bg-black/30 p-7 shadow-2xl backdrop-blur-sm md:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-red-100/80">特設ページ</p>
        <h1 className="mt-3 text-4xl font-black text-red-50 md:text-6xl">代償少女</h1>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-200/90 md:text-base">
          新作バナーから遷移する特設ページです。トップでは入口として見せ、詳細情報はここに集約する構成にしています。今後は最新のお知らせ、キービジュアル、ストア情報、イベント出展情報などを追加できます。
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-red-200/15 bg-white/5 p-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-red-100/75">ジャンル</p>
            <p className="mt-2 text-lg font-semibold text-red-50">カードバトルADV</p>
          </div>
          <div className="rounded-2xl border border-red-200/15 bg-white/5 p-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-red-100/75">対応予定</p>
            <p className="mt-2 text-lg font-semibold text-red-50">Steam</p>
          </div>
          <div className="rounded-2xl border border-red-200/15 bg-white/5 p-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-red-100/75">開発状況</p>
            <p className="mt-2 text-lg font-semibold text-red-50">制作中</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://store.steampowered.com/app/3839720/_/?l=japanese"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            Steamページ
          </a>
          <a
            href={youtubeWatchUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-red-100/30 px-5 py-2.5 text-sm font-semibold text-red-50 transition hover:bg-red-100/20"
          >
            YouTubeでPVを見る
          </a>
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
        <h1 className="text-3xl font-bold text-red-50">ページが見つかりません</h1>
        <Link
          to="/"
          className="inline-block rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
        >
          トップへ戻る
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
      <Route path="/members/:memberId" element={<MemberDetailPage />} />
      <Route path="/special" element={<SpecialPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
