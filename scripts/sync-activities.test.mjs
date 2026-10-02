import test from 'node:test'
import assert from 'node:assert/strict'
import { normalize, parseFeed } from './sync-activities.mjs'

test('reads typed Atom titles and alternate links', () => {
  const items = parseFeed('<feed><entry><title type="html">A &amp;amp; B</title><updated>2026-10-01T00:00:00Z</updated><link rel="alternate" href="https://github.com/user/repo"/></entry></feed>')
  assert.equal(items[0].title, 'A & B')
  assert.equal(items[0].url, 'https://github.com/user/repo')
})

test('combines shared member links and sorts chronologically', () => {
  const item = { title: 'Test', url: 'https://example.com/post', publishedAt: '2026-01-01', members: ['えいとえいど'] }
  const result = normalize([item, { ...item, members: ['紅芋けんぴ'] }, { ...item, url: 'https://example.com/new', publishedAt: '2026-10-01' }])
  assert.equal(result.length, 2)
  assert.equal(result[0].url, 'https://example.com/new')
  assert.deepEqual(result[1].members, ['えいとえいど', '紅芋けんぴ'])
})
test('rejects invalid dates and unsafe links without inventing publication dates', () => {
  const item = { title: 'Test', url: 'https://example.com/post', publishedAt: '2026-01-01', members: ['えいとえいど'] }
  assert.equal(normalize([{ ...item, publishedAt: 'invalid' }, { ...item, url: 'javascript:alert(1)' }]).length, 0)
  assert.equal(normalize([{ ...item, image: 'javascript:alert(1)' }])[0].image, undefined)
})
