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
    socialLinks: z.array(z.object({
      name: z.string(),
      label: z.string(),
      description: z.string(),
      url: linkSchema,
      image: z.string(),
      members: z.array(z.enum(['えいとえいど', '紅芋けんぴ'])).min(1),
    })),
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
    logoImage: z.string(),
    featuredProduct: z.string(),
    productsLead: z.string(),
    creatorsLead: z.string(),
    socialsLead: z.string(),
    articlesLead: z.string(),
    historyLead: z.string(),
  }),
})

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    eyebrow: z.string(),
    catchphrase: z.string(),
    lead: z.string(),
    summary: z.string(),
    genre: z.string(),
    platform: z.string(),
    status: z.string(),
    storyTitle: z.string(),
    story: z.string(),
    systemTitle: z.string(),
    system: z.string(),
    heroImage: z.string(),
    heroAlt: z.string(),
    cardImage: z.string(),
    socialImage: z.string(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })),
    features: z.array(z.object({ number: z.string(), title: z.string(), copy: z.string() })),
    screenshots: z.array(z.object({
      image: z.string(),
      alt: z.string(),
      title: z.string(),
      copy: z.string(),
    })),
    movie: z.object({
      youtubeId: z.string(),
      url: linkSchema,
      title: z.string(),
      lead: z.string(),
    }).optional(),
    links: z.array(z.object({ label: z.string(), url: linkSchema })),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
})

const members = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/members' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    imagePosition: z.string().optional(),
    xUrl: linkSchema,
    portfolioUrl: linkSchema.optional(),
    order: z.number(),
  }),
})

const articles = defineCollection({
  loader: glob({ pattern: 'all.md', base: './src/content/articles' }),
  schema: z.object({
    items: z.array(z.object({
      title: z.string(),
      source: z.string(),
      publishedAt: z.coerce.date(),
      url: linkSchema,
      category: z.string(),
      groups: z.array(z.enum(['代償プロジェクト', 'えいとえいど参加', '紅芋けんぴ参加'])).min(1),
      image: linkSchema,
      draft: z.boolean().default(false),
    })),
  }),
})

const history = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/history' }),
  schema: z.object({
    date: z.string(),
    title: z.string(),
    description: z.string().optional(),
    link: linkSchema.optional(),
    compact: z.boolean().default(false),
    yearMarker: z.boolean().default(false),
    order: z.number(),
  }),
})

const works = defineCollection({
  loader: glob({ pattern: 'all.json', base: './src/content/works' }),
  schema: z.object({
    items: z.array(z.object({
      title: z.string(),
      year: z.number(),
      publishedAt: z.coerce.date().optional(),
      link: linkSchema,
      image: z.string(),
      thumbnail: z.string().optional(),
      members: z.array(z.string()),
    })),
  }),
})

export const collections = { settings, home, products, members, works, articles, history }
