/* eslint-disable ts/no-unsafe-assignment */
import type { ApiParamOptions, ApiPropertyOptions } from '@nestjs/swagger'
import { ApiParam, ApiProperty } from '@nestjs/swagger'
import type { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type'
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString, Matches, Min } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

export function ApiPropertyNullable(options: { type: ApiPropertyOptions['type'] } & Omit<ApiPropertyOptions, 'type'>): PropertyDecorator {
  return function (target: NonNullable<unknown>, key: string | symbol) {
    ApiProperty({ nullable: true, ...options })(target, key)
  }
}

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

export function IsIdProperty(options?: ApiPropertyOptions & { validation?: boolean }): PropertyDecorator {
  const { validation, ...propertyOptions } = options || {}
  return function (target: NonNullable<unknown>, key: string | symbol) {
    if (validation ?? true) {
      IsInt()(target, key)
      Min(1)(target, key)
    }
    ApiProperty({
      title: 'The unique identifier',
      example: '123',
      type: Number,
      ...propertyOptions,
    })(target, key)
  }
}

export function IsKeyProperty(options?: ApiPropertyOptions & {
  each?: boolean
  validation?: boolean
}): PropertyDecorator {
  const { each, validation, ...propOptions } = options || {}
  const pattern = String.raw`^[\dA-Za-z\-]+$`
  return function (target: NonNullable<unknown>, key: string | symbol) {
    if (validation ?? true) {
      IsNotEmpty({ each })(target, key)
      // eslint-disable-next-line regexp/use-ignore-case
      Matches(new RegExp(pattern), {
        each,
        message: 'key must be a string with only letters (a-z, A-Z), numbers (0-9) and dashes (-)',
      })(target, key)
    }
    ApiProperty({
      title: 'The unique identifier',
      example: 'foo-bar',
      pattern,
      ...propOptions,
    })(target, key)
  }
}

export function IsRichTextProperty(options?: ApiPropertyOptions & { validation?: boolean }): PropertyDecorator {
  const { validation, ...propOptions } = options || {}
  return function (target: NonNullable<unknown>, key: string | symbol) {
    if (validation ?? true) {
      IsString()(target, key)
    }
    ApiProperty({
      title: 'HTML content',
      example: '<p>Hello <strong>Mutoe CMS</strong></p>',
      type: String,
      ...propOptions,
    })(target, key)
  }
}

export function IsDatetimeProperty(options: ApiPropertyOptions & { created?: boolean, updated?: boolean, validation?: boolean } = {}): PropertyDecorator {
  const { created, updated, validation, ...propOptions } = options
  return function (target: NonNullable<unknown>, key: string | symbol) {
    if (validation ?? true) {
      IsDate()(target, key)
    }
    ApiProperty({
      // eslint-disable-next-line unicorn/no-nested-ternary
      title: created ? 'The creation datetime' : updated ? 'The last update datetime' : undefined,
      example: '2020-08-16T00:04:59.343Z',
      format: 'date-time',
      ...propOptions,
    })(target, key)
  }
}
