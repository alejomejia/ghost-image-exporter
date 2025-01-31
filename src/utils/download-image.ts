import axios from 'axios'
import * as fs from 'node:fs'

import { env } from '@/config'

import { EnvironmentVariablesError } from './errors'
import { getLocalPathFromURL } from './get-local-path-from-url'
import { GHOST_IMAGE_URL_PREFIX } from './const'

const { GHOST_BASE_URL } = env

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
  } catch (error) {
    console.error(`Error downloading image from ${url}:`, error.message)
    return null
  }
}

export async function downloadImages(imageURLs: string[]) {
  console.log('Starting image downloads...')

  const downloadPromises = imageURLs.map(downloadImage)

  const results = await Promise.all(downloadPromises)

  console.log('Download process completed!')
  return results.filter((result) => result !== null)
}
