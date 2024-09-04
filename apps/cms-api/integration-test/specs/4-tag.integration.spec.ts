import type { INestApplication } from '@nestjs/common'
import type { PaginatedMetadata } from 'common/entity/paginated.entity'
import { getToken, initIntegrationTestingModule, mockDate } from 'integration-test/test-utils'
import request from 'supertest'
import type { CreateTagDto } from 'src/tag/dto/create-tag.dto'
import type { TagEntity } from 'src/tag/entity/tag.entity'
import { anyDateString } from '../../test-utils/expect.util'

describe('tag module', () => {
  let app: INestApplication
  let token: string

  beforeAll(async () => {
    app = await initIntegrationTestingModule(app)
    token = await getToken(app)
  })

  const dto: CreateTagDto = {
    key: 'vue',
    name: 'Vue',
    description: '<p>Evan You YYDS!</p>',
  }

  describe('/tag (POST)', () => {
    it('should return 201 when create tag given an valid form', async () => {
      const restoreMockDate = mockDate('2017-11-25T12:34:56Z')

      const response = await request(app.getHttpServer())
        .post('/tag')
        .auth(token, { type: 'bearer' })
        .send(dto)

      restoreMockDate()

      expect(response.status, JSON.stringify(response.body)).toBe(201)
      expect(response.body).toEqual({
        ...dto,
        createdAt: expect.stringMatching(anyDateString),
        updatedAt: expect.stringMatching(anyDateString),
      } satisfies TagEntity)
    })

    it('should return 401 when create tag with invalid token', async () => {
      const requestBody: CreateTagDto = {
        key: 'semantic-ui',
        name: 'Semantic UI',
        description: '<p>I am description</p>',
      }

      const response = await request(app.getHttpServer())
        .post('/tag')
        .send(requestBody)

      expect(response.status).toBe(401)
    })

    it('should return 422 when create tag given an invalid form', async () => {
      const requestBody = { key: dto.key } as CreateTagDto

      const response = await request(app.getHttpServer())
        .post('/tag')
        .auth(token, { type: 'bearer' })
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('name', ['isNotEmpty'])
    })
  })

  describe('/tag (GET)', () => {
    it('should return 200 when retrieve tags', async () => {
      const response = await request(app.getHttpServer())
        .get('/tag')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('metadata')
      expect(response.body).toHaveProperty('items')

      expect(response.body.metadata).toEqual({
        total: 4,
        limit: 10,
        totalPages: 1,
        currentPage: 1,
      } satisfies PaginatedMetadata)

      expect(response.body.items).toHaveLength(4)
      expect(response.body.items[3]).toEqual({
        ...dto,
        createdAt: expect.stringMatching(anyDateString),
        updatedAt: expect.stringMatching(anyDateString),
      } satisfies TagEntity)
    })
  })
})
