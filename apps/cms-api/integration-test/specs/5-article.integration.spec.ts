import type { INestApplication } from '@nestjs/common'
import type { PaginatedMetadata } from 'common/entity/paginated.entity'
import { getToken, initIntegrationTestingModule, mockDate } from 'integration-test/test-utils'
import request from 'supertest'
import type { CreateArticleDto } from 'src/article/dto/create-article.dto'
import type { ArticleEntity } from 'src/article/entity/article-entity'
import { anyDateString } from '../../test-utils/expect.util'

describe('article module', () => {
  let app: INestApplication
  let token: string

  beforeAll(async () => {
    app = await initIntegrationTestingModule(app)
    token = await getToken(app)
  })

  const dto = {
    title: 'title',
    content: '<p>I am content</p>',
  } satisfies CreateArticleDto

  describe('/article (POST)', () => {
    it('should return 201 when create article given an valid form', async () => {
      const restoreMockDate = mockDate('2017-11-25T12:34:56Z')

      const response = await request(app.getHttpServer())
        .post('/article')
        .auth(token, { type: 'bearer' })
        .send(dto)

      restoreMockDate()

      expect(response.status, JSON.stringify(response.body)).toBe(201)
      expect(response.body).toEqual({
        id: 3,
        ...dto,
        tags: [],
        author: expect.objectContaining({ username: 'admin' }),
        createdAt: expect.stringMatching(anyDateString),
        updatedAt: expect.stringMatching(anyDateString),
      } satisfies ArticleEntity)
      expect(response.body.author).not.toHaveProperty('password')
    })

    it('should return 401 when create article with invalid token', async () => {
      const response = await request(app.getHttpServer())
        .post('/article')
        .send(dto)

      expect(response.status).toBe(401)
    })

    it('should return 422 when create article given an invalid form', async () => {
      const requestBody = { content: '<p>I am content</p>' } as CreateArticleDto

      const response = await request(app.getHttpServer())
        .post('/article')
        .auth(token, { type: 'bearer' })
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('title', ['isNotEmpty'])
    })

    it('should return 422 when create article given an invalid tag', async () => {
      const requestBody: CreateArticleDto = {
        ...dto,
        tags: ['not-exist'],
      }

      const response = await request(app.getHttpServer())
        .post('/article')
        .auth(token, { type: 'bearer' })
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('tags', ['not-exist is not exists.'])
    })
  })

  describe('/article (GET)', () => {
    it('should return 200 when retrieve articles', async () => {
      const response = await request(app.getHttpServer())
        .get('/article')

      expect(response.status, JSON.stringify(response.body)).toBe(200)
      expect(response.body).toHaveProperty('metadata')
      expect(response.body).toHaveProperty('items')

      expect(response.body.metadata).toEqual({
        total: 3,
        limit: 10,
        totalPages: 1,
        currentPage: 1,
      } satisfies PaginatedMetadata)

      expect(response.body.items).toHaveLength(3)
      expect(response.body.items[2]).toEqual({
        id: 3,
        ...dto,
        tags: [],
        author: expect.objectContaining({ username: 'admin' }),
        createdAt: expect.stringMatching(anyDateString),
        updatedAt: expect.stringMatching(anyDateString),
      } satisfies ArticleEntity)
      expect(response.body.items[2].author).not.toHaveProperty('password')
    })
  })

  describe('/article/:id (GET)', () => {
    it('should return 200 when retrieve article by article id', async () => {
      const response = await request(app.getHttpServer())
        .get('/article/3')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        id: 3,
        ...dto,
        tags: [],
        author: expect.objectContaining({ username: 'admin' }),
        createdAt: expect.stringMatching(anyDateString),
        updatedAt: expect.stringMatching(anyDateString),
      } satisfies ArticleEntity)
    })

    it('should throw not found when retrieve a not existed article', async () => {
      const response = await request(app.getHttpServer())
        .get('/article/999')

      expect(response.status).toBe(404)
    })
  })

  describe('/article/:id (PUT)', () => {
    it('should return 200 when submit an valid form', async () => {
      const requestBody: CreateArticleDto = {
        ...dto,
        content: '<p>Bla bla</p>',
      }
      const response = await request(app.getHttpServer())
        .put('/article/3')
        .auth(token, { type: 'bearer' })
        .send(requestBody)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.objectContaining({
        content: requestBody.content,
        author: expect.objectContaining({ username: 'admin' }),
      } satisfies Partial<ArticleEntity>))
    })

    it('should return 401 when submit a valid form without login', async () => {
      const response = await request(app.getHttpServer())
        .put('/article/1')
        .send(dto)

      expect(response.status).toBe(401)
    })
  })
})
