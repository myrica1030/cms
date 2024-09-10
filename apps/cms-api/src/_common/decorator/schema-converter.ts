/* eslint-disable ts/no-unsafe-member-access,ts/no-unsafe-assignment,ts/no-unsafe-argument */
import type { OpenAPIObject } from '@nestjs/swagger'
import { IS_EMAIL, MetadataStorage, getFromContainer } from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import type { ISchemaConverters } from 'class-validator-jsonschema/build/defaultConverters'

export const additionalConverters: ISchemaConverters = {
  [IS_EMAIL]: {
    type: 'string',
    description: 'The email address',
    example: 'foo@example.com',
  },
}

export function mergeMetadata<T = any>(v: any, p: any): any {
  if (v === undefined || p === undefined) return v ?? p
  const result: any = structuredClone(p)
  for (const name of new Set([...Object.keys(p), ...Object.keys(v)])) {
    if (['OmitTypeClass', 'PickTypeClass', 'PartialTypeClass'].includes(name)) {
      delete result[name]
      continue
    }

    if (result[name]) {
      result[name] = {
        ...v[name],
        ...p[name],
        properties: {},
        required: [],
      }
      result[name].type = v[name]?.type || p[name]?.type
      result[name].properties = mergeMetadata(v[name]?.properties, p[name]?.properties)
      if (/(?:Entity|PaginatedMetadata)$/.test(name)) {
        result[name].required = p[name]?.required
      }
      else if (/(?:Dto|Query)$/.test(name)) {
        result[name].required = v[name]?.required
      }
    }
    else {
      result[name] = v[name]
    }
  }
  return result as T
}

export function mergeDocumentSchema(document: OpenAPIObject) {
  // @ts-expect-error read private property as expected
  const metadata = getFromContainer(MetadataStorage).validationMetadatas
  document.components!.schemas = mergeMetadata(
    validationMetadatasToSchemas({ ...metadata, additionalConverters }),
    document.components?.schemas || {},
  )
}
