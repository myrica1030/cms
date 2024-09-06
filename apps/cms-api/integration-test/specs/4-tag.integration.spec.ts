import type { INestApplication } from '@nestjs/common'
import type { PaginatedMetadata } from 'common/entity/paginated.entity'
import { FormErrorCause } from 'common/exception/form-exception.exception'
import { getToken, initIntegrationTestingModule, mockDate, prettyResponse } from 'integration-test/test-utils'
import type { Response } from 'supertest'
import request from 'supertest'
import { anyDateString } from 'test-utils/expect.util'
import { beforeEach, onTestFailed } from 'vitest'
import type { CreateTagDto } from 'src/tag/dto/create-tag.dto'
import type { TagEntity } from 'src/tag/entity/tag.entity'
import { tagFixture } from 'src/tag/tag.fixture'

describe('tag module', () => {
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
    return () => onTestFailed(() => console.info(prettyResponse(response)))
  })

  const dto: CreateTagDto = {
    key: 'vue',
    name: 'Vue',
    description: '<p>Evan You YYDS!</p>',
  }

  describe('/tag (POST)', () => {
    it('should return 201 given an valid form', async () => {
      const restoreMockDate = mockDate('2017-11-25T12:34:56Z')

      response = await request(app.getHttpServer())
        .post('/tag')
        .auth(token, { type: 'bearer' })
        .send(dto)

      restoreMockDate()

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        ...dto,
        createdAt: expect.stringMatching(anyDateString),
        updatedAt: expect.stringMatching(anyDateString),
      } satisfies TagEntity)
    })

    it('should return 401 given an invalid token', async () => {
      const requestBody: CreateTagDto = {
        key: 'semantic-ui',
        name: 'Semantic UI',
        description: '<p>I am description</p>',
      }

      response = await request(app.getHttpServer())
        .post('/tag')
        .send(requestBody)

      expect(response.status).toBe(401)
    })

    it('should return 422 given an invalid form', async () => {
      response = await request(app.getHttpServer())
        .post('/tag')
        .auth(token, { type: 'bearer' })
        .send({})

      expect(response.status).toBe(422)
      expect(response.body).toMatchInlineSnapshot(`
        {
          "key": [
            "key should not be empty",
            "key must be a string with only letters (a-z, A-Z), numbers (0-9) and dashes (-)",
          ],
          "name": [
            "name should not be empty",
            "name must be a string",
          ],
        }
      `)
    })

    it('should return 422 given an invalid tag key', async () => {
      const requestBody = { key: 'invalid key', name: 'React' } as CreateTagDto

      response = await request(app.getHttpServer())
        .post('/tag')
        .auth(token, { type: 'bearer' })
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('key', ['key must be a string with only letters (a-z, A-Z), numbers (0-9) and dashes (-)',
      ])
    })

    it('should return 422 when create tag given an existing tag key', async () => {
      const requestBody = { key: tagFixture.entity.key, name: 'React' } as CreateTagDto

      response = await request(app.getHttpServer())
        .post('/tag')
        .auth(token, { type: 'bearer' })
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('key', [FormErrorCause.IsExist])
    })

    it('should return 422 when create tag given an existing tag name', async () => {
      const requestBody = { key: 'foobar', name: tagFixture.entity.name } as CreateTagDto

      response = await request(app.getHttpServer())
        .post('/tag')
        .auth(token, { type: 'bearer' })
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('name', [FormErrorCause.IsExist])
    })
  })

  describe('/tag (GET)', () => {
    it('should return 200 when retrieve tags', async () => {
      response = await request(app.getHttpServer())
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
      expect(response.body.items[0]).toEqual({
        ...dto,
        createdAt: expect.stringMatching(anyDateString),
        updatedAt: expect.stringMatching(anyDateString),
      } satisfies TagEntity)
    })
  })
})
