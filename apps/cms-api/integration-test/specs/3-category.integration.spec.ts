import type { INestApplication } from '@nestjs/common'
import { getToken, initIntegrationTestingModule } from 'integration-test/test-utils'
import request from 'supertest'
import { categoryFixture } from 'src/category/category.fixture'
import type { CreateCategoryDto } from 'src/category/dto/create-category.dto'
import type { CategoryEntity } from 'src/category/entity/category.entity'
import { anyDateString } from '../../test-utils/expect.util'

describe('category module', () => {
  let app: INestApplication
  let token: string

  beforeAll(async () => {
    app = await initIntegrationTestingModule(app)
    token = await getToken(app)
  })

  const dto: CreateCategoryDto = {
    key: 'study-notes2',
    label: 'Study notes2',
    description: '<p>This is personal study notes2</p>',
  }

  describe('/category (POST)', () => {
    it('should return 201 when post a valid create category form', async () => {
      const response = await request(app.getHttpServer())
        .post('/category')
        .auth(token, { type: 'bearer' })
        .send(dto)

      expect(response.status, JSON.stringify(response.body)).toBe(201)
      expect(response.body).toEqual({
        id: 3,
        ...dto,
        createdAt: expect.stringMatching(anyDateString),
        updatedAt: expect.stringMatching(anyDateString),
      } satisfies CategoryEntity)
    })

    it('should return 422 when post an existed category key', async () => {
      const response = await request(app.getHttpServer())
        .post('/category')
        .auth(token, { type: 'bearer' })
        .send(categoryFixture.dto)

      expect(response.status).toBe(422)
      expect(response.body).toEqual({ key: ['isExist'] })
    })
  })

  describe.skip('/category (GET)', () => {
    it('should return all categories that without parent category', async () => {
      const response = await request(app.getHttpServer())
        .get('/category')

      expect(response.status).toBe(200)
    })
  })

  describe('/category/:id (GET)', () => {
    it('should return category given existed category id', async () => {
      const response = await request(app.getHttpServer())
        .get('/category/1')

      expect(response.status).toBe(200)
      expect(response.body).toMatchSnapshot()
    })

    it('should return 404 when category not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/category/999')

      expect(response.status).toBe(404)
    })
  })
})
