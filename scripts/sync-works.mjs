import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { extname } from 'node:path'

const sourcePath = new URL('../src/content/works/sources.json', import.meta.url)
const outputPath = new URL('../src/content/works/all.json', import.meta.url)
const imageDirectory = new URL('../public/generated/works/', import.meta.url)

const sources = JSON.parse(await readFile(sourcePath, 'utf8')).items
const cachedItems = await readFile(outputPath, 'utf8')
  .then((text) => JSON.parse(text).items)
  .catch(() => [])
const cacheByUrl = new Map(cachedItems.map((item) => [item.link, item]))

const decodeHtml = (value = '') => value
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'")
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .trim()

const getAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, 'i'))
  return match ? decodeHtml(match[1]) : undefined
}

const getMeta = (html, key) => {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? []
  const tag = tags.find((item) => [getAttribute(item, 'property'), getAttribute(item, 'name')].includes(key))
  return tag ? getAttribute(tag, 'content') : undefined
}

const normalizeDate = (value) => {
  if (!value) return undefined
  const match = value.match(/(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/)
  if (!match) return undefined
  return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`
}

const extractMetadata = (html, url) => {
  const title = getMeta(html, 'og:title')
    ?? decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '')
  const image = getMeta(html, 'og:image') ?? getMeta(html, 'twitter:image')
  const unityroomDate = url.includes('unityroom.com/games/')
    ? html.match(/投稿日[\s\S]{0,1000}?(\d{4}\/\d{1,2}\/\d{1,2})/)?.[1]
    : undefined
  const publishedAt = normalizeDate(
    unityroomDate
      ?? getMeta(html, 'article:published_time')
      ?? html.match(/"datePublished"\s*:\s*"([^"]+)"/)?.[1],
  )
  return { title, image, publishedAt }
}

const extensionFor = (url, contentType) => {
  const byType = {
    'image/gif': '.gif',
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/webp': '.webp',
  }[contentType?.split(';')[0]?.toLowerCase()]
  if (byType) return byType
  const fromUrl = extname(new URL(url).pathname).toLowerCase()
  return ['.gif', '.png', '.jpg', '.jpeg', '.webp'].includes(fromUrl) ? fromUrl : '.jpg'
}

const downloadImage = async (url, id) => {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; DaishouProjectSite/1.0)',
      Referer: new URL(url).origin,
    },
  })
  if (!response.ok) throw new Error(`image HTTP ${response.status}`)
  const extension = extensionFor(url, response.headers.get('content-type'))
  const filename = `${id}${extension}`
  await mkdir(imageDirectory, { recursive: true })
  await writeFile(new URL(filename, imageDirectory), Buffer.from(await response.arrayBuffer()))
  return `/generated/works/${filename}`
}

const syncWork = async (source) => {
  const cached = cacheByUrl.get(source.url) ?? {}
  const fallback = source.fallback ?? {}
  let metadata = {}

  try {
    const response = await fetch(source.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DaishouProjectSite/1.0)' },
    })
    if (!response.ok) throw new Error(`page HTTP ${response.status}`)
    metadata = extractMetadata(await response.text(), source.url)
  } catch (error) {
    console.warn(`  metadata fallback: ${error.message}`)
  }

  const title = source.title ?? metadata.title ?? cached.title ?? fallback.title
  const publishedAt = normalizeDate(source.publishedAt ?? metadata.publishedAt ?? cached.publishedAt ?? fallback.publishedAt)
  const year = source.year ?? (publishedAt ? Number(publishedAt.slice(0, 4)) : undefined) ?? cached.year ?? fallback.year
  const remoteImage = source.image?.startsWith('http') ? source.image : metadata.image
  let image = source.image?.startsWith('/') ? source.image : undefined

  if (!image && remoteImage) {
    try {
      image = await downloadImage(remoteImage, source.id)
    } catch (error) {
      console.warn(`  image fallback: ${error.message}`)
    }
  }
  image ??= cached.image ?? fallback.image

  if (!title || !year || !image) {
    throw new Error(`Missing generated metadata for ${source.url} (title/year/image)`)
  }

  console.log(`✓ ${title}${publishedAt ? ` (${publishedAt})` : ''}`)
  return {
    title,
    year,
    ...(publishedAt ? { publishedAt } : {}),
    link: source.url,
    image,
    members: source.members,
  }
}

const items = []
for (const source of sources) items.push(await syncWork(source))

await writeFile(outputPath, `${JSON.stringify({ items }, null, 2)}\n`, 'utf8')
console.log(`\nSynced ${items.length} works.`)
