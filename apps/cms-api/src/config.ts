import * as process from 'node:process'
import { config } from 'dotenv-flow'
import type { LoggerOptions } from 'typeorm/logger/LoggerOptions'

config()

// eslint-disable-next-line no-eval
const parseBool = (value: string | undefined): boolean | undefined => ['true', 'false'].includes(value as string) ? eval(value as string) : undefined
const parseInt = (value: string | undefined): number | undefined => value ? Number.parseInt(value ?? '') : undefined

export const DEV = process.env.NODE_ENV === 'development'
export const PROD = process.env.NODE_ENV === 'production'
export const NEST_SECRET = process.env.NEST_SECRET ?? 'secret'
export const NEST_PORT = parseInt(process.env.API_PORT) || 8080
export const SWAGGER_ENABLE = !PROD || parseBool(process.env.SWAGGER_ENABLE)

export const TYPEORM_DRIVER: string = process.env.TYPEORM_DRIVER || 'postgres'
export const TYPEORM_HOST: string = process.env.TYPEORM_HOST || 'localhost'
export const TYPEORM_SCHEMA: string = process.env.TYPEORM_SCHEMA || 'public'
export const TYPEORM_USERNAME: string = process.env.TYPEORM_USERNAME || 'postgres'
export const TYPEORM_PASSWORD: string = process.env.TYPEORM_PASSWORD || 'postgres'
export const TYPEORM_DATABASE: string = process.env.TYPEORM_DATABASE || 'cms_api'
export const TYPEORM_PORT = parseInt(process.env.TYPEORM_PORT) || 5432
export const TYPEORM_SYNCHRONIZE = parseBool(process.env.TYPEORM_SYNCHRONIZE)
export const TYPEORM_LOGGING: LoggerOptions = parseBool(process.env.TYPEORM_LOGGING) ?? (process.env.TYPEORM_LOGGING as LoggerOptions || true)
export const TYPEORM_DROP_SCHEMA = parseBool(process.env.TYPEORM_DROP_SCHEMA)
export const TYPEORM_MIGRATION_TABLE = process.env.TYPEORM_MIGRATION_TABLE || '_migrations'
