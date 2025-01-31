import { createFolders } from './create-folders'
import { GHOST_IMAGES_FOLDER_STRUCTURE } from './const'

/**
 * Creates folder structures based on image URLs from Ghost CMS.
 * Extracts year and month from URLs and creates corresponding directories
 * following Ghost CMS image folder structure.
 *
 * @param {string[]} urls - Array of Ghost CMS image URLs
 * Expected format: \__GHOST_URL__/content/images/{year}/{month}/{filename}.{extension}
 * @example
 * createImageFolders([
 *   '__GHOST_URL__/content/images/2024/12/my-awesome-image.png',
 *   '__GHOST_URL__/content/images/2025/01/happy-new-year.jpg'
 * ])
 */

export function createImageFolders(urls: string[]) {
  const paths = urls.map((url) => {
    const [, , , year, month] = url.split('/')
    return [...GHOST_IMAGES_FOLDER_STRUCTURE, year, month]
  })

  const folders = [...new Set(paths)]
  folders.forEach(createFolders)
}
