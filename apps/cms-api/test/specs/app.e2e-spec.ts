import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { AppController } from 'src/app/app.controller'

describe('App Module Integration', () => {
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
