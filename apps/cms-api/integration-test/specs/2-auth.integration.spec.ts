import type { INestApplication } from '@nestjs/common'
import type { Response } from 'supertest'
import request from 'supertest'
import { beforeEach, expect, onTestFailed } from 'vitest'
import type { LoginDto } from 'src/auth/dto/login.dto'
import type { RegisterDto } from 'src/auth/dto/register.dto'
import { userFixture } from 'src/user/user.fixture'
import { initIntegrationTestingModule, prettyResponse } from '../test-utils'

describe('auth module', () => {
  let app: INestApplication
  let response: Response

  beforeAll(async () => {
    app = await initIntegrationTestingModule(app)
  })

  beforeEach(() => {
    response = undefined!
    // eslint-disable-next-line no-console
    return () => onTestFailed(() => console.info(prettyResponse(response)))
  })

  describe('/auth/register (POST)', () => {
    it('should return 201', async () => {
      const requestBody: RegisterDto = {
        username: 'user1',
        email: 'user1@cms.mutoe.com',
        password: '123456',
      }
      response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(requestBody)

      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining({
        id: 3,
        username: 'user1',
        email: 'user1@cms.mutoe.com',
        token: expect.any(String),
      }))
      expect(response.body).not.toHaveProperty('password')
    })

    it('should return 422 given exist username', async () => {
      const requestBody: RegisterDto = {
        username: userFixture.entity.username,
        email: 'admin2@cms.mutoe.com',
        password: '123456',
      }
      response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('username', ['isExist'])
    })

    it('should return 422 given exist email', async () => {
      const requestBody: RegisterDto = {
        username: 'admin2',
        email: userFixture.entity.email,
        password: '123456',
      }
      response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('email', ['isExist'])
    })
  })

  describe('/auth/login (POST)', () => {
    it('should return 200 when login given correct user name and password', async () => {
      const requestBody: LoginDto = {
        username: 'admin',
        password: '123456',
      }
      response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.objectContaining({
        id: 1,
        username: 'admin',
        email: 'admin@cms.mutoe.com',
        token: expect.any(String),
      }))
      expect(response.body).not.toHaveProperty('password')
    })

    it('should return 422 given an invalid form', async () => {
      const requestBody = {} as LoginDto
      response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)

      expect(response.status).toEqual(422)
      expect(response.body).toMatchInlineSnapshot(`
        {
          "password": [
            "password is not strong enough",
            "password must be shorter than or equal to 32 characters",
          ],
          "username": [
            "username must be a string",
            "username should not be empty",
          ],
        }
      `)
    })

    it('should return 422 when login given incorrect user name', async () => {
      const requestBody: LoginDto = {
        username: 'foo',
        password: '12345678',
      }
      response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('username', ['isNotExist'])
    })

    it('should return 422 when login given incorrect password', async () => {
      const requestBody: LoginDto = {
        username: 'admin',
        password: 'invalid',
      }
      response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('password', ['isInvalid'])
    })
  })
})
