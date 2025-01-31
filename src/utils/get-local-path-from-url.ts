import * as path from 'node:path'

import { TEMP_FOLDER_NAME, GHOST_IMAGE_URL_PREFIX } from './const'

export function getLocalPathFromURL(url: string) {
  const urlWithoutPrefix = url.replace(GHOST_IMAGE_URL_PREFIX, '')
  return path.join(process.cwd(), TEMP_FOLDER_NAME, urlWithoutPrefix)
}
