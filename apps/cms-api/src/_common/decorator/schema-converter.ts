/* eslint-disable ts/no-unsafe-member-access,ts/no-unsafe-assignment,ts/no-unsafe-argument */
import type { OpenAPIObject } from '@nestjs/swagger'
import { IS_EMAIL, IS_STRONG_PASSWORD, MetadataStorage, getFromContainer } from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import type { ISchemaConverters } from 'class-validator-jsonschema/build/defaultConverters'
import type { SchemaConverter } from 'class-validator-jsonschema/src/defaultConverters'

export const additionalConverters: ISchemaConverters = {
  [IS_EMAIL]: {
    type: 'string',
    description: 'The email address',
    example: 'foo@example.com',
  },
  [IS_STRONG_PASSWORD]: meta => {
    const schema: ReturnType<SchemaConverter> = {
      format: 'password',
      type: 'string',
    }
    for (const constraint of meta.constraints) {
      if (constraint.minLength) schema.minLength = constraint.minLength
    }
    return schema
  },
}

export function mergeMetadata<T = any>(v: any, p: any): any {
  if (v === undefined || p === undefined) return v ?? p
  const result: any = structuredClone(p)
  for (const name of new Set([...Object.keys(p), ...Object.keys(v)])) {
    if (result[name]) {
      result[name] = {
        ...v[name],
        ...p[name],
        properties: {},
        required: [],
      }
      result[name].properties = mergeMetadata(v[name]?.properties, p[name]?.properties)
      v[name]?.required && (result[name].required = v[name]?.required)
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
