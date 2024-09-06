import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { HttpExceptionFilter } from 'common/filter/http-exception.filter'
import { validationPipe } from 'common/pipe/pipes'
import { AppModule } from 'src/app/app.module'
import { NEST_PORT, PROD, SWAGGER_ENABLE } from 'src/config'
import { createSwagger } from 'src/setup'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: !PROD,
  })

  app.setGlobalPrefix('/api')
  app.useGlobalPipes(validationPipe)
  app.useGlobalFilters(new HttpExceptionFilter())

  if (SWAGGER_ENABLE) createSwagger(app)

  await app.listen(NEST_PORT)
  new Logger('NestApplication').log(`Listening http://0.0.0.0:${NEST_PORT}`)
}

bootstrap().catch(error => console.error(error))
