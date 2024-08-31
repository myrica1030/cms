import type { INestApplication } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppController } from 'src/app/app.controller'

describe('app module', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/hello (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/hello?name=world')

    expect(response.status).toBe(200)
    expect(response.text).toEqual('Hello world!')
  })
})
