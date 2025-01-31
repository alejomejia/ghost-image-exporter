import { GHOST_IMAGE_URL_PREFIX } from './const'
import type { Post } from '@/types/ghost'

/**
 * Extracts feature image URLs from Ghost CMS posts that are hosted on Ghost's server
 * @param {Post[]} posts - Array of Ghost blog posts
 * @returns {string[]} Array of feature image URLs that are hosted on Ghost
 */

function getGhostFeatureImageURLs(posts: Post[]) {
  return posts.map((post) => post.feature_image).filter((url) => url?.startsWith(GHOST_IMAGE_URL_PREFIX)) as string[]
}

/**
 * Extracts image URLs from the HTML content of Ghost CMS posts that are hosted on Ghost's server
 * @param {Post[]} posts - Array of Ghost blog posts
 * @returns {string[]} Array of image URLs found in HTML content that are hosted on Ghost
 */

function getGhostImagesURLsFromHTML(posts: Post[]) {
  const imgTagRegex = /<\s*img\b[^>]*>/gi
  const srcTagRegex = /src=["']([^"']+)["']/gi

  return posts
    .flatMap(({ html }) => html.match(imgTagRegex))
    .filter((img) => img?.includes(GHOST_IMAGE_URL_PREFIX))
    .flatMap((img) => img?.match(srcTagRegex))
    .map((src) => src?.split('"')[1]) as string[]
}

/**
 * Retrieves all unique image URLs from Ghost CMS posts, including both feature images
 * and images embedded in HTML content
 * @param {Post[]} posts - Array of Ghost blog posts
 * @returns {string[]} Array of unique image URLs that are hosted on Ghost
 */

export function getImagesURLs(posts: Post[]) {
  const featureImagesURLs = getGhostFeatureImageURLs(posts)
  const htmlImagesURLs = getGhostImagesURLsFromHTML(posts)

  const allImageURLs = [...featureImagesURLs, ...htmlImagesURLs]

  return [...new Set(allImageURLs)]
}
