import type { INestApplication } from '@nestjs/common'
import request from 'supertest'
import type { LoginDto } from 'src/auth/dto/login.dto'
import type { RegisterDto } from 'src/auth/dto/register.dto'
import { initIntegrationTestingModule } from '../test-utils'

describe('auth module', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await initIntegrationTestingModule(app)
  })

  describe('/auth/register (POST)', () => {
    it('should return 201', async () => {
      const requestBody: RegisterDto = {
        username: 'user1',
        email: 'user1@cms.mutoe.com',
        password: '123456',
      }
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(requestBody)

      expect(response.status, JSON.stringify(response.body)).toBe(201)
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
        username: 'admin',
        email: 'admin2@cms.mutoe.com',
        password: '123456',
      }
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('username', ['isExist'])
    })

    it('should return 422 given exist email', async () => {
      const requestBody: RegisterDto = {
        username: 'admin2',
        email: 'admin@cms.mutoe.com',
        password: '123456',
      }
      const response = await request(app.getHttpServer())
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
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)

      expect(response.status, JSON.stringify(response.body)).toBe(200)
      expect(response.body).toEqual(expect.objectContaining({
        id: 1,
        username: 'admin',
        email: 'admin@cms.mutoe.com',
        token: expect.any(String),
      }))
      expect(response.body).not.toHaveProperty('password')
    })

    it('should return 422 when login given incorrect user name', async () => {
      const requestBody: LoginDto = {
        username: 'foo',
        password: '12345678',
      }
      const response = await request(app.getHttpServer())
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
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('password', ['isInvalid'])
    })
  })
})
