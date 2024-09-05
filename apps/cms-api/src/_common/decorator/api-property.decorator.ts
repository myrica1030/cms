/* eslint-disable ts/no-unsafe-assignment */
import type { ApiParamOptions, ApiPropertyOptions } from '@nestjs/swagger'
import { ApiParam, ApiProperty } from '@nestjs/swagger'
import type { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type'
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString, Matches, Min } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

interface ApiEnumPropertyOptions extends ApiPropertyOptions {
  /**
   * @deprecated `description` in the enum property is not working, using `title` instead
   * @see https://github.com/nestjs/swagger/issues/2806
   */
  description?: string
}

export function IsEnumProperty(enumType: Record<string, Record<string, unknown>>, options: ApiEnumPropertyOptions = {}): PropertyDecorator {
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

  return function (target: NonNullable<unknown>, key: string | symbol) {
    if (options.default !== undefined) {
      JSONSchema({ default: options.default })(target, key as string)
    }
    IsEnum(enumObject)(target, key)
    ApiProperty(apiPropertyOptions)(target, key)
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

export function IsIdProperty(options?: ApiPropertyOptions): PropertyDecorator {
  return function (target: NonNullable<unknown>, key: string | symbol) {
    IsInt()(target, key)
    Min(1)(target, key)
    ApiProperty({
      title: 'The unique identifier',
      example: '123',
      ...options,
    })(target, key)
  }
}

export function IsKeyProperty(options?: ApiPropertyOptions): PropertyDecorator {
  return function (target: NonNullable<unknown>, key: string | symbol) {
    IsString()(target, key)
    IsNotEmpty()(target, key)
    Matches(/^\w+$/)(target, key)
    ApiProperty({
      title: 'The unique identifier',
      example: 'foo-bar',
      ...options,
    })(target, key)
  }
}

export function IsRichTextProperty(options?: ApiPropertyOptions): PropertyDecorator {
  return function (target: NonNullable<unknown>, key: string | symbol) {
    IsString()(target, key)
    ApiProperty({
      title: 'HTML content',
      example: '<p>Hello <strong>Mutoe CMS</strong></p>',
      ...options,
    })(target, key)
  }
}

export function IsDatetimeProperty(options: ApiPropertyOptions & { created?: boolean, updated?: boolean } = {}): PropertyDecorator {
  return function (target: NonNullable<unknown>, key: string | symbol) {
    IsDate()(target, key)
    ApiProperty({
      // eslint-disable-next-line unicorn/no-nested-ternary
      title: options?.created ? 'The creation datetime' : options?.updated ? 'The last update datetime' : undefined,
      example: '2020-08-16T00:04:59.343Z',
      ...options,
    })(target, key)
  }
}
