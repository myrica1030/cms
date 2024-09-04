import type { ApiParamOptions, ApiPropertyOptions } from '@nestjs/swagger'
import { ApiParam, ApiProperty } from '@nestjs/swagger'
import { createApiPropertyDecorator } from '@nestjs/swagger/dist/decorators/api-property.decorator'
import type { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type'

interface ApiEnumPropertyOptions extends ApiPropertyOptions {
  /**
   * @deprecated `description` in the enum property is not working, using `title` instead
   * @see https://github.com/nestjs/swagger/issues/2806
   */
  description?: string
}

export function ApiEnumProperty(enumType: Record<string, Record<string, unknown>>, options?: ApiEnumPropertyOptions): PropertyDecorator {
  const [enumName, enumObject] = Object.entries(enumType)[0] ?? []
  if (!enumName || !enumObject) {
    throw new SyntaxError('The first argument of the ApiEnumProperty must be an object with one key-value pair.')
  }
  const enumKeys = Object.keys(enumObject)
    .filter(key => Number.isNaN(Number(key)))
    .filter(key => {
      const value = enumObject[key]
      return typeof value === 'string' || typeof value === 'number'
    })
  const enumValues = enumKeys.map(key => enumObject[key])
  const enumValuesDescription = enumKeys
    .map(key => `${key} = ${String(enumObject[key])}`)
    .join(',\n  ')

  const description = `\nEnum name: ${enumName}  \nEnum values:  \n\`\`\`\n  ${enumValuesDescription},\n\`\`\``

  const apiPropertyOptions: ApiPropertyOptions = {
    ...options,
    enum: enumValues,
    enumName,
    description,
  }

  return ApiProperty(apiPropertyOptions)
}

export function ApiEnumPropertyOptional(enumType: Record<string, Record<string, unknown>>, options: ApiPropertyOptions = {}): PropertyDecorator {
  return function (target: NonNullable<unknown>, key: string | symbol) {
    ApiEnumProperty(enumType, {
      required: false,
      ...options,
    })(target, key)
  }
}

export function ApiEnumParam(name: string, enumType: Record<string, Record<string, unknown>>, options?: ApiParamOptions): MethodDecorator {
  const [enumName, enumObject] = Object.entries(enumType)[0] ?? []
  if (!enumName || !enumObject) {
    throw new SyntaxError('The first argument of the ApiEnumProperty must be an object with one key-value pair.')
  }
  const enumKeys = Object.keys(enumObject)
    .filter(key => Number.isNaN(Number(key)))
    .filter(key => {
      const value = enumObject[key]
      return typeof value === 'string' || typeof value === 'number'
    })
  const enumValues = enumKeys.map(key => enumObject[key]) as SwaggerEnumType
  const enumValuesDescription = enumKeys
    .map(key => `${key} = ${String(enumObject[key])}`)
    .join(',\n  ')

  const description = `\nEnum name: ${enumName}  \nEnum values:  \n\`\`\`\n  ${enumValuesDescription},\n\`\`\``

  const apiParamOptions: ApiParamOptions = {
    ...options,
    name,
    enum: enumValues,
    enumName,
    description,
  }

  return ApiParam(apiParamOptions)
}

export function ApiPropertyRichText(options?: ApiPropertyOptions): PropertyDecorator {
  return createApiPropertyDecorator({
    description: 'HTML content',
    example: '<p>Hello <strong>Mutoe CMS</strong></p>',
    ...options,
  })
}

export function ApiPropertyDatetime(options?: ApiPropertyOptions): PropertyDecorator {
  return createApiPropertyDecorator({
    example: '2020-08-16T00:04:59.343Z',
    format: 'date-time',
    ...options,
  })
}
