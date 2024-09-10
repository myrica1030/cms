/* eslint-disable regexp/match-any,unicorn/no-process-exit,ts/no-unsafe-member-access */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { config } from 'dotenv'
import type { ParsedSchema } from 'swagger-typescript-api'
import { generateApi } from 'swagger-typescript-api'

const __dirname = import.meta.dirname

config({
  path: [path.join(__dirname, '../../../.env')],
})

if (!process.env.CMS_API_URL && !process.env.CMS_API_PORT) {
  console.error('Please provide CMS_API_URL or CMS_API_PORT in .env')
  process.exit(1)
}

const url = `${process.env.CMS_API_URL ?? `http://localhost:${process.env.CMS_API_PORT}`}/docs.json`

async function testURL() {
  try {
    await fetch(url)
  }
  catch (error: any) {
    console.error(`Cannot fetch the OpenAPI document via the URL: ${url}`, `${error.cause.name} [${error.cause.code}]`)
    process.exit(1)
  }
}

const output = path.join(__dirname, '../src/client/cms')
const fileName = 'cms-api.ts'

function handleEnumSchema(parsedSchema: ParsedSchema<unknown>) {
  const { description } = parsedSchema
  const key = description?.match(/(?:\n|^)Enum name: (\S+) {2}\n/)?.at(1) || parsedSchema.name
  let values = (description?.match(/\nEnum values:\s+```\n([\S\s]+?)```(?:\n|$)/)?.at(1) ?? '').split(',').map(s => s.trim()).filter(Boolean)
  if (!values.length) {
    values = (parsedSchema.content as any[]).map(({ key, value }: { key: string, value: string }) => {
      return `${key} = ${value.replaceAll(/^"|"$/g, '')}`
    })
  }
  if (!values.length) {
    console.warn(`The enum "${parsedSchema.name}" should using "@ApiEnumProperty({ ${parsedSchema.name} })" decorator. Please update the dto/entity file in the cms-api`)
  }
  if (!key || !values) return
  parsedSchema.description = description
    ?.replace(/(?:\n|^)Enum name: \S+ {2}\n/, '')
    .replace(/Enum values:\s+```\n[\S\s]+?```(?:\n|$)/, '').trim()
  parsedSchema.name = key
  parsedSchema.content = values.map((value: string) => {
    const [k, v] = value.split(' = ')
    // @ts-expect-error keyType is exists
    return { key: k, value: parsedSchema.keyType === 'string' ? `"${v}"` : v, type: parsedSchema.keyType as string }
  })
}

await testURL()
await generateApi({
  name: fileName,
  output,
  url,
  templates: path.join(__dirname, './swagger-api-template'),
  httpClientType: 'fetch',
  moduleNameFirstTag: true,
  generateRouteTypes: false,
  generateResponses: true,
  extractRequestParams: false,
  extractRequestBody: true,
  extractResponseError: true,
  extractEnums: true,
  unwrapResponseData: false,
  cleanOutput: true,
  enumNamesAsValues: true,
  hooks: {
    onCreateComponent: component => {
      if (component.typeName === 'FormError') {
        if (component.rawTypeData) {
          delete component.rawTypeData.properties
          delete component.rawTypeData.required
          // @ts-expect-error rawTypeData is exists
          component.rawTypeData.additionalProperties = {
            type: 'array',
            items: {
              oneOf: [
                { $ref: '#/components/schemas/FormErrorCause' },
                { type: 'string' },
              ],
            },
          }
        }
      }
      return component
    },
    onCreateRequestParams: rawType => rawType,
    onCreateRoute: routeData => {
      if (routeData.raw.responses?.['422']) {
        if ('errorType' in routeData.response) routeData.response.errorType = 'FormError'
        const unprocessEntityError = routeData.raw.responsesTypes.find(type => type.status === 422)
        if (unprocessEntityError) {
          unprocessEntityError.type = 'FormError'
          unprocessEntityError.description = 'Form validation error'
        }
      }
      return routeData
    },
    onCreateRouteName: (routeNameInfo, _rawRouteInfo) => routeNameInfo,
    onFormatRouteName: (routeInfo, _templateRouteName) => {
      return routeInfo.operationId.split('_').at(1)
    },
    onFormatTypeName: (_typeName, _rawTypeName, _schemaType) => _typeName,
    onInit: _configuration => _configuration,
    onPreParseSchema: (_originalSchema, _typeName, _schemaType) => {},
    onParseSchema: (_originalSchema, _parsedSchema) => {
      const parsedSchema = _parsedSchema as ParsedSchema<unknown>
      const { schemaType } = parsedSchema
      if (schemaType === 'enum') {
        handleEnumSchema(parsedSchema)
      }
    },
  },
})

let data = fs.readFileSync(path.join(output, fileName), 'utf8')
// remove eslint-ignore comments
data = data.split('\n').slice(2).join('\n')
data = `/// <reference lib="dom" />\n${data}`
fs.writeFileSync(path.join(output, fileName), data)

process.exit(0)
