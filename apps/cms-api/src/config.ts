import * as process from 'node:process'
import { config } from 'dotenv-flow'

config()

const parseBool = (value: string | undefined): boolean | undefined => ['true', 'false'].includes(value as string) ? value === 'true' : undefined
const parseInt = (value: string | undefined): number | undefined => value ? Number.parseInt(value ?? '') : undefined

export const DEV = process.env.NODE_ENV === 'development'
export const PROD = process.env.NODE_ENV === 'production'
export const APP_SECRET = process.env.APP_SECRET || ''
export const NEST_PORT = parseInt(process.env.CMS_API_PORT) || 10_300
export const SWAGGER_ENABLE = !PROD || parseBool(process.env.SWAGGER_ENABLE)
export const DATABASE_URL = process.env.DATABASE_URL || ''

if (!APP_SECRET) {
  throw new Error('APP_SECRET is required, please check your `.env` file')
}
