import * as fs from 'node:fs'
import * as path from 'node:path'

function createFolder(folderName: string) {
  const folderPath = path.join(process.cwd(), folderName)

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
    console.log(`:check: Folder ${folderName} created!`)
  }
}

export function createFolders(paths: string[]) {
  const parsedPaths = paths.map((_, index) => {
    return paths.slice(0, index + 1).join('/')
  })

  parsedPaths.forEach(createFolder)
}
