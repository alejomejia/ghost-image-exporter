import { createFolders } from './create-folders'
import { GHOST_IMAGES_FOLDER_STRUCTURE } from './const'

export function createImageFolders(urls: string[]) {
  const paths = urls.map((url) => {
    const [, , , year, month] = url.split('/')
    return [...GHOST_IMAGES_FOLDER_STRUCTURE, year, month]
  })

  const folders = [...new Set(paths)]
  folders.forEach(createFolders)
}
