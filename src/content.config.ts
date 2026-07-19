import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const linkSchema = z.string().url()

const settings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/settings' }),
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    description: z.string(),
    email: z.string().email(),
    navigation: z.array(z.object({ label: z.string(), href: z.string() })),
    links: z.object({
      steam: linkSchema,
      x: linkSchema,
      youtube: linkSchema,
      unityroom: linkSchema,
    }),
    footerLead: z.string(),
    copyright: z.string(),
  }),
})

const home = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home' }),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    catchphrase: z.string(),
    introduction: z.string(),
    heroImage: z.string(),
    heroAlt: z.string(),
    releaseLabel: z.string(),
    gameTitle: z.string(),
    gameSummary: z.string(),
    galleryLead: z.string(),
    screenshots: z.array(z.object({
      image: z.string(),
      alt: z.string(),
      title: z.string(),
      copy: z.string(),
    })),
    movieLead: z.string(),
  }),
})

const special = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/special' }),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    catchphrase: z.string(),
    lead: z.string(),
    storyTitle: z.string(),
    story: z.string(),
    systemTitle: z.string(),
    system: z.string(),
    heroImage: z.string(),
    heroAlt: z.string(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })),
    features: z.array(z.object({ number: z.string(), title: z.string(), copy: z.string() })),
  }),
})

const members = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/members' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    profile: z.string(),
    currentFocus: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    imagePosition: z.string().optional(),
    xUrl: linkSchema,
    portfolioUrl: linkSchema.optional(),
    order: z.number(),
  }),
})

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    link: linkSchema,
    image: z.string(),
    imageAlt: z.string(),
    members: z.array(z.string()),
    order: z.number(),
  }),
})

export const collections = { settings, home, special, members, works }
