/* eslint-disable ts/no-unsafe-argument,ts/no-unsafe-member-access */
import type { INestApplication } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { HttpExceptionFilter } from 'common/filter/http-exception.filter'
import { validationPipe } from 'common/pipe/pipes'
import type { Response } from 'supertest'
import request from 'supertest'
import { AppModule } from 'src/app/app.module'

export async function getToken(app: INestApplication): Promise<string> {
  return await new Promise((resolve, reject) => {
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
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.init()
  return app
}

export function prettyResponse(response: Response) {
  return Object.fromEntries(Object.entries(response.body).map(([k, v]) => {
    if (typeof v === 'string' && v.includes('\n')) return [k, v.split('\n')]
    return [k, v]
  }))
}
