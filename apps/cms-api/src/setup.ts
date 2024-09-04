import type { INestApplication } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PaginationQuery } from 'common/dto/pagination.query'
import { PaginatedEntity } from 'common/entity/paginated.entity'
import { FormError } from 'common/exception/form-exception.exception'
import { version } from 'package.json'
import { NEST_PORT } from 'src/config'

export function createSwagger(app: INestApplication): void {
  const logger = new Logger('Swagger')

  const options = new DocumentBuilder()
    .setTitle('CMS')
    .setVersion(version)
    .addBearerAuth()
    .addTag('App', 'Application')
    .addTag('Auth', 'Authorization')
    .addTag('User', 'User')
    .addTag('Article', 'Article')
    .addTag('Tag', 'Tag')
    .addTag('Category', 'Category')
    .build()

  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [
      PaginationQuery,
      PaginatedEntity,
      FormError,
    ],
  })
  SwaggerModule.setup('/docs', app, document)

  setTimeout(() => {
    logger.log(`Swagger is started at http://0.0.0.0:${NEST_PORT}/docs`)
  })
}
