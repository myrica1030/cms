import type { ApiPropertyOptions } from '@nestjs/swagger'
import { ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import { createApiPropertyDecorator } from '@nestjs/swagger/dist/decorators/api-property.decorator'
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import type { FormExceptionBody } from 'src/exception'

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

export function ApiInvalidFormResponse(): MethodDecorator & ClassDecorator {
  const schema: SchemaObject = {
    title: 'UnprocessableEntityResponse',
    example: {
      username: ['isInvalid', 'isExist'],
      password: ['isNotEmpty'],
    } as FormExceptionBody,
  }

  return ApiUnprocessableEntityResponse({ schema })
}
