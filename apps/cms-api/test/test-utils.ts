/* eslint-disable ts/no-unsafe-argument,ts/no-unsafe-member-access */
import type { INestApplication } from '@nestjs/common'
import request from 'supertest'

export async function getToken(app: INestApplication): Promise<string> {
  return new Promise((resolve, reject) => {
    request(app.getHttpServer()).post('/auth/register')
      .send({
        username: 'admin',
        email: 'admin@cms.mutoe.com',
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
