import axios from 'axios'
import * as fs from 'node:fs'

import { env } from '@/config'

import { EnvironmentVariablesError, FetchError } from './errors'
import { getLocalPathFromURL } from './get-local-path-from-url'
import { GHOST_IMAGE_URL_PREFIX } from './const'

const { GHOST_BASE_URL } = env

/**
 * Downloads a single image from a Ghost URL and saves it to the local filesystem
 * @param {string} url - The URL of the image to download
 * @returns {Promise<string>} The local file path if successful, undefined if local path cannot be determined
 * @throws {EnvironmentVariablesError} If GHOST_BASE_URL environment variable is not set
 * @throws {FetchError} If the image download fails
 */

async function downloadImage(url: string) {
  if (!GHOST_BASE_URL) {
    throw new EnvironmentVariablesError('GHOST_BASE_URL is not set', {
      GHOST_BASE_URL
    })
  }

  const parsedURL = url.replace(GHOST_IMAGE_URL_PREFIX, GHOST_BASE_URL)
  const localPath = getLocalPathFromURL(url)

  if (!localPath) return

  try {
    const response = await axios({
      url: parsedURL,
      method: 'GET',
      responseType: 'arraybuffer'
    })

    fs.writeFileSync(localPath, response.data)

    return localPath
  } catch {
    throw new FetchError('Failed to download image.', {
      parsedURL,
      localPath
    })
  }
}

/**
 * Downloads multiple images from Ghost CMS URLs in parallel and saves them to the local filesystem
 * @param {string[]} imageURLs - Array of image URLs to download
 * @returns {Promise<string[]>} Array of successful download paths, excluding any failed downloads
 * @throws {EnvironmentVariablesError} If GHOST_BASE_URL environment variable is not set
 * @throws {FetchError} If any image download fails
 */

export async function downloadImages(imageURLs: string[]) {
  console.log('Starting image downloads...')

  const downloadPromises = imageURLs.map(downloadImage)

  const results = await Promise.all(downloadPromises)

  console.log('Download process completed!')
  return results.filter((result) => result !== null)
}
