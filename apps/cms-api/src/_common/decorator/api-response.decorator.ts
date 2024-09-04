import type {
  ApiResponseOptions,
} from '@nestjs/swagger'
import {
  ApiOkResponse,
  ApiQuery,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from '@nestjs/swagger'
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import type { ClassConstructor } from 'class-transformer'
import type { FormExceptionBody } from 'common/exception/form-exception.exception'
import { PaginatedEntity } from '../entity/paginated.entity'

export function ApiPaginatedOkResponse(itemType: ClassConstructor<unknown>, options: ApiResponseOptions = {}): MethodDecorator {
  return function (target: NonNullable<unknown>, key: string | symbol, descriptor: PropertyDescriptor) {
    ApiOkResponse({
      ...options,
      schema: {
        required: ['items'],
        allOf: [
          { $ref: getSchemaPath(PaginatedEntity) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(itemType) },
              },
            },
          },
        ],
      },
    })(target, key, descriptor)
  }
}

export function ApiListResponse(type: ClassConstructor<unknown>): MethodDecorator {
  const pageQueryDecorator = ApiQuery({ name: 'page', type: 'number', example: 1, required: false })
  const limitQueryDecorator = ApiQuery({ name: 'limit', type: 'number', example: 10, required: false })
  const okResponseDecorator = ApiPaginatedOkResponse(type)
  return (...args) => {
    pageQueryDecorator(...args)
    limitQueryDecorator(...args)
    okResponseDecorator(...args)
  }
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
