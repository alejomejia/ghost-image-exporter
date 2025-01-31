import * as dotenv from 'dotenv'
dotenv.config()

export const env = {
  GHOST_BASE_URL: process.env.GHOST_BASE_URL
}
