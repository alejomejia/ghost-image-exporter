import * as path from 'node:path'

import { TEMP_FOLDER_NAME, GHOST_IMAGE_URL_PREFIX } from './const'

/**
 * Converts a Ghost CMS image URL to a local file system path
 * @param url - The Ghost CMS image URL to convert
 * @returns The local file system path where the image should be stored
 */

export function getLocalPathFromURL(url: string) {
  const urlWithoutPrefix = url.replace(GHOST_IMAGE_URL_PREFIX, '')
  return path.join(process.cwd(), TEMP_FOLDER_NAME, urlWithoutPrefix)
}
