import { createFolders } from './utils/create-folders'
import { GHOST_IMAGES_FOLDER_STRUCTURE } from './utils/const'

import { getPosts } from './utils/get-posts'
import type { GhostExportRoot } from './types/ghost'

import ghostData from '../data.json'
import { getImagesURLs } from './utils/get-images-urls'
import { createImageFolders } from './utils/create-image-folders'
import { getLocalPathFromURL } from './utils/get-local-path-from-url'
import { downloadImages } from './utils/download-image'

// Create Ghost images folder structure
createFolders(GHOST_IMAGES_FOLDER_STRUCTURE)

const posts = getPosts(ghostData as GhostExportRoot) // 325 posts
const imageURLs = getImagesURLs(posts)

// Create image folders
createImageFolders(imageURLs)

// Download images
downloadImages(imageURLs)
