import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises'
import { load } from 'cheerio'
import { XMLParser } from 'fast-xml-parser'
import { parse } from 'yaml'

const catalogPath = 'src/content/activities/all.json'
const cachePath = '.cache/activity-feed.json'
const array = (value) => value == null ? [] : Array.isArray(value) ? value : [value]
const xml = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@' })
const clean = (value) => load(String((typeof value === 'object' ? value?.['#text'] : value) ?? '')).text().replace(/\s+/g, ' ').trim()
const safeUrl = (value) => { try { return /^https?:$/.test(new URL(value).protocol) } catch { return false } }
async function request(url, json = false, headers = {}) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'DaishouProject-ActivityFeed/1.0', ...headers } })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return json ? response.json() : response.text()
}
export function normalize(items) {
  const merged = new Map()
  for (const item of items) {
    if (!item.title || !safeUrl(item.url) || !Number.isFinite(Date.parse(item.publishedAt)) || !item.members?.length) continue
    const url = new URL(item.url); url.hash = ''
    const key = url.href
    const previous = merged.get(key)
    merged.set(key, { ...item, url: key, publishedAt: new Date(item.publishedAt).toISOString(),
      image: safeUrl(item.image) ? item.image : undefined,
      members: [...new Set([...(previous?.members ?? []), ...item.members])] })
  }
  return [...merged.values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
}
async function feed(url) {
  return parseFeed(await request(url))
}
export function parseFeed(text) {
  const data = xml.parse(text)
  if (data.rss) return array(data.rss.channel.item).map(item => ({ title: clean(item.title), url: item.link, publishedAt: item.pubDate, image: item['media:thumbnail'] }))
  if (!data.feed) throw new Error('RSS/Atom feed not found')
  return array(data.feed.entry).map(item => ({ title: clean(item.title),
    url: array(item.link).find(link => link['@rel'] === 'alternate')?.['@href'] ?? array(item.link)[0]?.['@href'],
    publishedAt: item.published ?? item.updated,
    image: item['media:group']?.['media:thumbnail']?.['@url'] }))
}
async function pageItems(profile, kind) {
  const $ = load(await request(profile))
  const selector = kind === 'gamewith' ? 'a[href*="/devlog/"]' : kind === 'unityroom' ? 'a.bl_gameTile_title' : 'a[href*="/items/"]'
  const urls = [...new Set($(selector).toArray().map(el => new URL($(el).attr('href'), profile).href))].slice(0, 20)
  const results = []
  // Keep requests sequential to avoid burdening the source service.
  for (const url of urls) {
    try {
      const detail = load(await request(url))
      const title = detail('h1').first().text().trim() || detail('meta[property="og:title"]').attr('content')
      let publishedAt = detail('time[datetime]').first().attr('datetime')
      if (kind === 'unityroom') {
        const date = detail('body').text().match(/投稿日\s*(\d{4})\/(\d{2})\/(\d{2})/)
        publishedAt = date ? `${date[1]}-${date[2]}-${date[3]}T00:00:00+09:00` : undefined
      }
      if (!publishedAt) {
        for (const el of detail('script[type="application/ld+json"]').toArray()) {
          try { const data = JSON.parse(detail(el).text()); publishedAt = data.datePublished ?? data.dateCreated ?? publishedAt } catch {}
        }
      }
      if (publishedAt) results.push({ title, url, publishedAt, image: detail('meta[property="og:image"]').attr('content') })
    } catch (error) { console.warn(`${url}: ${error.message}`) }
  }
  if (!results.length) throw new Error('No dated public entries found')
  return results
}
async function getItems(link) {
  const url = new URL(link.url)
  if (url.hostname === 'note.com') return feed(`${link.url.replace(/\/$/, '')}/rss`)
  if (url.hostname === 'github.com') return feed(`${link.url.replace(/\/$/, '')}.atom`)
  if (url.hostname === 'www.youtube.com') {
    const $ = load(await request(link.url))
    const rss = $('link[type="application/rss+xml"]').attr('href')
    if (!rss || new URL(rss).hostname !== 'www.youtube.com') throw new Error('YouTube RSS not found')
    return feed(rss)
  }
  if (url.hostname === 'indie.gamewith.jp') return pageItems(link.url, 'gamewith')
  if (url.hostname === 'unityroom.com') return pageItems(link.url, 'unityroom')
  if (url.hostname.endsWith('.booth.pm')) return pageItems(link.url, 'booth')
  if (url.hostname === 'x.com') {
    if (!process.env.X_BEARER_TOKEN) throw new Error('X_BEARER_TOKEN is not configured')
    const headers = { Authorization: `Bearer ${process.env.X_BEARER_TOKEN}` }
    const username = url.pathname.split('/').filter(Boolean)[0]
    const user = await request(`https://api.x.com/2/users/by/username/${username}`, true, headers)
    if (!user.data?.id) throw new Error('X user not found')
    const posts = await request(`https://api.x.com/2/users/${user.data.id}/tweets?max_results=20&exclude=replies,retweets&tweet.fields=created_at`, true, headers)
    if (posts.errors) throw new Error('X API returned errors')
    return (posts.data ?? []).map(post => ({ title: clean(post.text), url: `https://x.com/${username}/status/${post.id}`, publishedAt: post.created_at }))
  }
  throw new Error('No supported public feed')
}
export async function sync() {
  const previous = JSON.parse(await readFile(catalogPath, 'utf8'))
  let cached = []
  try { cached = JSON.parse(await readFile(cachePath, 'utf8')).items ?? [] } catch {}
  const collected = [...previous.items, ...cached]
  const statuses = []
  for (const file of await readdir('src/content/members')) {
    if (!file.endsWith('.md')) continue
    const text = await readFile(`src/content/members/${file}`, 'utf8')
    const member = parse(text.split('---')[1])
    for (const link of member.socialLinks) {
      try {
        const items = await getItems(link)
        collected.push(...items.map(item => ({ ...item, source: link.name, members: [member.name], draft: false })))
        statuses.push({ member: member.name, source: link.name, count: items.length, status: 'ok' })
      } catch (error) {
        statuses.push({ member: member.name, source: link.name, status: 'unavailable', reason: error.message })
      }
    }
  }
  const items = normalize(collected).slice(0, 200)
  if (!items.length) throw new Error('No activities or usable cache')
  const output = JSON.stringify({ items }, null, 2) + '\n'
  await mkdir('.cache', { recursive: true })
  await writeFile(cachePath, output)
  await writeFile(catalogPath, output)
  await writeFile('.cache/activity-status.json', JSON.stringify({ updatedAt: new Date().toISOString(), sources: statuses }, null, 2))
  console.table(statuses)
  console.log(`Saved ${items.length} activities; the site shows the latest 20.`)
}
if (process.argv[1]?.replaceAll('\\', '/').endsWith('/sync-activities.mjs')) await sync()
