import * as fs from 'node:fs'
import * as path from 'node:path'

import { FileSystemError } from './errors'

/**
 * Creates a folder at the specified path if it doesn't already exist
 *
 * @param {string} folderName - The name of the folder to create
 * @returns {void}
 * @throws {Error} If folder creation fails due to permissions or other filesystem errors
 * @example
 * // Creates a folder named 'uploads' in the current working directory
 * createFolder('uploads')
 */

function createFolder(folderName: string) {
  const folderPath = path.join(process.cwd(), folderName)

  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
      console.log(`Folder ${folderName} created!`)
    }
  } catch {
    throw new FileSystemError('Failed to create folder.', {
      folderName,
      folderPath
    })
  }
}

/**
 * Creates a nested folder structure from an array of path segments
 * inside the current working directory
 *
 * @param {string[]} paths - Array of path segments to create nested folders
 * @example
 * // Creates folders: uploads/images/avatars
 * createFolders(['uploads', 'images', 'avatars'])
 */

export function createFolders(paths: string[]) {
  const parsedPaths = paths.map((_, index) => {
    return path.join(...paths.slice(0, index + 1))
  })

  parsedPaths.forEach(createFolder)
}
