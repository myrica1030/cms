import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { PrismaClient } from '@prisma/client'
import { PaginatedEntity } from 'common/entity/paginated.entity'
import { PrismaService } from 'infra/prisma.service'
import type { DeepMockProxy } from 'vitest-mock-extended'
import { mockDeep } from 'vitest-mock-extended'
import { FormException } from 'src/exception'
import { tagFixture } from 'src/tag/tag.fixture'
import { TagService } from './tag.service'

describe('tag service', () => {
  let service: TagService
  let mockedPrisma: DeepMockProxy<PrismaClient>

  beforeEach(async () => {
    mockedPrisma = mockDeep<PrismaClient>()
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        { provide: PrismaService, useValue: mockedPrisma },
      ],
    }).compile()

    service = module.get<TagService>(TagService)
  })

  describe('createTag', () => {
    it('should return tag entity when create tag given a valid tag', async () => {
      await service.createTag(tagFixture.dto)

      expect(mockedPrisma.tag.create).toHaveBeenCalledWith({ data: tagFixture.dto })
    })
  })

  describe('find all tags', () => {
    it('should find tags correctly', async () => {
      mockedPrisma.tag.findMany.mockResolvedValue([])
      mockedPrisma.tag.count.mockResolvedValue(0)

      const articlesPaginatedEntity = await service.retrievePaginatedTags({ page: 1, limit: 10, order: 'desc' })

      expect(articlesPaginatedEntity).toEqual(new PaginatedEntity(1, 10, 0, []))
      expect(mockedPrisma.tag.findMany).toHaveBeenCalledWith({ orderBy: { createdAt: 'desc' }, skip: 0, take: 10 })
      expect(mockedPrisma.tag.count).toHaveBeenCalledWith()
    })
  })

  describe('getTags', () => {
    it('should return tag entities given existing tag keys', async () => {
      mockedPrisma.tag.findMany.mockResolvedValue([tagFixture.entity])

      const result = await service.getTags(['semantic-ui'])

      expect(result).toEqual([tagFixture.entity])
    })

    it('should throw exception given not existed tag key', async () => {
      mockedPrisma.tag.findMany.mockResolvedValue([tagFixture.entity])

      await expect(service.getTags(['semantic-ui', 'not-exist']))
        .rejects.toThrowError(FormException)
    })
  })
})
