import ghostData from '../data.json'

import { createFolders } from './utils/create-folders'
import { GHOST_IMAGES_FOLDER_STRUCTURE } from './utils/const'
import { getPosts } from './utils/get-posts'
import { getImagesURLs } from './utils/get-images-urls'
import { createImageFolders } from './utils/create-image-folders'
import { downloadImages } from './utils/download-image'

import type { GhostExportRoot } from './types/ghost'

async function main() {
  try {
    // Create Ghost images folder structure
    createFolders(GHOST_IMAGES_FOLDER_STRUCTURE)

    const posts = getPosts(ghostData as GhostExportRoot) // 325 posts
    const imageURLs = getImagesURLs(posts)

    // Create image folders
    createImageFolders(imageURLs)

    // Download images and wait for completion
    await downloadImages(imageURLs)

    process.exit(0)
  } catch {
    process.exit(1)
  }
}

main()
