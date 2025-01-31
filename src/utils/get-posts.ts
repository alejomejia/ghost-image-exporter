import type { GhostExportRoot } from '@/types/ghost'

export function getPosts(data: GhostExportRoot) {
  return data.db[0].data.posts
}
