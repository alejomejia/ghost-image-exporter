import { GHOST_IMAGE_URL_PREFIX } from './const'
import type { Post } from '@/types/ghost'

/**
 * Only images hosted in Ghost are gonna be downloaded.
 * All other images point to external URLs so is not necessary to download them
 */

function getGhostFeatureImageURLs(posts: Post[]) {
  return posts.map((post) => post.feature_image).filter((url) => url?.startsWith(GHOST_IMAGE_URL_PREFIX)) as string[]
}

function getGhostImagesURLsFromHTML(posts: Post[]) {
  const imgTagRegex = /<\s*img\b[^>]*>/gi
  const srcTagRegex = /src=["']([^"']+)["']/gi

  return posts
    .flatMap(({ html }) => html.match(imgTagRegex))
    .filter((img) => img?.includes(GHOST_IMAGE_URL_PREFIX))
    .flatMap((img) => img?.match(srcTagRegex))
    .map((src) => src?.split('"')[1]) as string[]
}

export function getImagesURLs(posts: Post[]) {
  const featureImagesURLs = getGhostFeatureImageURLs(posts)
  const htmlImagesURLs = getGhostImagesURLsFromHTML(posts)

  const allImageURLs = [...featureImagesURLs, ...htmlImagesURLs]

  return [...new Set(allImageURLs)]
}
