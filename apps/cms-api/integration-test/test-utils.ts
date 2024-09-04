/* eslint-disable ts/no-unsafe-argument,ts/no-unsafe-member-access */
import type { INestApplication } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { validationPipe } from 'common/pipe/pipes'
import request from 'supertest'
import { AppModule } from 'src/app/app.module'

export async function getToken(app: INestApplication): Promise<string> {
  return new Promise((resolve, reject) => {
    request(app.getHttpServer()).post('/auth/login')
      .send({
        username: 'admin',
        password: '123456',
      })
      .then(response => {
        resolve(response.body.token)
      }, reject)
  })
}

export function mockDate(date: Date | string | number): () => void {
  const { Date } = globalThis

  class MockDate extends Date {
    constructor() {
      super(date) // add whatever date you'll expect to get
    }
  }

  globalThis.Date = MockDate as DateConstructor

  return () => {
    globalThis.Date = Date
  }
}

export async function initIntegrationTestingModule(app: INestApplication): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  app = moduleFixture.createNestApplication()
  app.useGlobalPipes(validationPipe)

  await app.init()
  return app
}
