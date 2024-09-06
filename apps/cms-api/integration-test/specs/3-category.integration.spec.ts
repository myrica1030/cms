import type { INestApplication } from '@nestjs/common'
import { getToken, initIntegrationTestingModule, prettyResponse } from 'integration-test/test-utils'
import type { Response } from 'supertest'
import request from 'supertest'
import { anyDateString } from 'test-utils/expect.util'
import { beforeEach, onTestFailed } from 'vitest'
import { categoryFixture } from 'src/category/category.fixture'
import type { CreateCategoryDto } from 'src/category/dto/create-category.dto'
import type { CategoryEntity } from 'src/category/entity/category.entity'

describe('category module', () => {
  let app: INestApplication
  let token: string
  let response: Response

  beforeAll(async () => {
    app = await initIntegrationTestingModule(app)
    token = await getToken(app)
  })

  beforeEach(() => {
    response = undefined!
    // eslint-disable-next-line no-console
    return () => void onTestFailed(() => console.log(prettyResponse(response)))
  })

  const dto: CreateCategoryDto = {
    key: 'study-notes2',
    label: 'Study notes2',
    description: '<p>This is personal study notes2</p>',
  }

  describe('/category (POST)', () => {
    it('should return 201 when post a valid create category form', async () => {
      response = await request(app.getHttpServer())
        .post('/category')
        .auth(token, { type: 'bearer' })
        .send(dto)

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        id: 3,
        ...dto,
        createdAt: expect.stringMatching(anyDateString),
        updatedAt: expect.stringMatching(anyDateString),
      } satisfies CategoryEntity)
    })

    it('should return 422 given an invalid form', async () => {
      response = await request(app.getHttpServer())
        .post('/category')
        .auth(token, { type: 'bearer' })
        .send({})

      expect(response.status).toBe(422)
      expect(response.body).toMatchInlineSnapshot(`
        {
          "key": [
            "key should not be empty",
            "key must be shorter than or equal to 32 characters",
            "key must be a string",
          ],
          "label": [
            "label should not be empty",
            "label must be a string",
          ],
        }
      `)
    })

    it('should return 422 when post an existed category key', async () => {
      response = await request(app.getHttpServer())
        .post('/category')
        .auth(token, { type: 'bearer' })
        .send(categoryFixture.dto)

      expect(response.status).toBe(422)
      expect(response.body).toEqual({ key: ['isExist'] })
    })

    it('should return 422 when post a non-exist parent category', async () => {
      response = await request(app.getHttpServer())
        .post('/category')
        .auth(token, { type: 'bearer' })
        .send({ key: 'new-key', label: 'New Label', parentId: 999 })

      expect(response.status).toBe(422)
      expect(response.body).toEqual({ parentId: ['isNotExist'] })
    })
  })

  describe.skip('/category (GET)', () => {
    it('should return all categories that without parent category', async () => {
      response = await request(app.getHttpServer())
        .get('/category')

      expect(response.status).toBe(200)
    })
  })

  describe('/category/:id (GET)', () => {
    it('should return category given existed category id', async () => {
      response = await request(app.getHttpServer())
        .get('/category/1')

      expect(response.status).toBe(200)
      expect(response.body).toMatchSnapshot()
    })

    it('should return 404 when category not exist', async () => {
      response = await request(app.getHttpServer())
        .get('/category/999')

      expect(response.status).toBe(404)
    })
  })
})
