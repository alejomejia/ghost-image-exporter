import * as fs from 'node:fs'
import * as path from 'node:path'

export function createFolder(folderName: string) {
  const folderPath = path.join(process.cwd(), folderName)

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
    console.log(`:check: Folder ${folderName} created!`)
  }
}
