import type { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { initIntegrationTestingModule } from '../test-utils'

describe('app module', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await initIntegrationTestingModule(app)
  })

  it('/hello (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/hello?name=world')

    expect(response.status).toBe(200)
    expect(response.text).toEqual('Hello world!')
  })
})
