import type { GhostExportRoot } from '@/types/ghost'

/**
 * Extracts posts from a Ghost CMS export data structure
 * @param {GhostExportRoot} data - The root object of a Ghost export
 * @returns {Array} An array of Ghost posts
 */

export function getPosts(data: GhostExportRoot) {
  return data.db[0].data.posts
}
