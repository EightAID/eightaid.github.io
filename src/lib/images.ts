import type { ImageMetadata } from 'astro'

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{png,jpg,jpeg,webp,gif}',
  { eager: true },
)

export function getSiteImage(path: string): ImageMetadata {
  const key = `/src/assets/images/${path}`
  const image = imageModules[key]?.default

  if (!image) {
    throw new Error(`Image not found: ${path}`)
  }

  return image
}
