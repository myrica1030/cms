import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { PrismaClient } from '@prisma/client'
import { PrismaService } from 'infra/prisma.service'
import type { DeepMockProxy } from 'vitest-mock-extended'
import { mockDeep } from 'vitest-mock-extended'
import { categoryFixture } from 'src/category/category.fixture'
import { FormException } from 'src/exception'
import { CategoryService } from './category.service'

describe('category service', () => {
  let service: CategoryService
  let mockedPrisma: DeepMockProxy<PrismaClient>

  beforeEach(async () => {
    mockedPrisma = mockDeep<PrismaClient>()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: PrismaService, useValue: mockedPrisma },
      ],
    }).compile()

    service = module.get(CategoryService)
  })

  describe('create category', () => {
    it('should return created category given a valid create category form', async () => {
      mockedPrisma.category.create.mockResolvedValueOnce(categoryFixture.entity)
      mockedPrisma.category.findFirst.mockResolvedValueOnce(null)

      await service.createCategory(categoryFixture.dto)

      expect(mockedPrisma.category.create).toBeCalledWith({ data: categoryFixture.dto })
    })

    it('should return created category given a valid form and existed parent category id', async () => {
      mockedPrisma.category.create.mockResolvedValueOnce(categoryFixture.entity)
      mockedPrisma.category.findFirst
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(categoryFixture.entity)

      await service.createCategory({ ...categoryFixture.dto, parentId: 1 })

      expect(mockedPrisma.category.create).toBeCalledWith({ data: { ...categoryFixture.dto, parentId: 1 } })
    })

    it('should throw category key exist error given existed category key', async () => {
      mockedPrisma.category.findFirst.mockResolvedValueOnce(categoryFixture.entity)

      await expect(service.createCategory(categoryFixture.dto))
        .rejects.toThrow(FormException)
    })

    it('should throw parent category not found error given not existed parent category id', async () => {
      mockedPrisma.category.findFirst.mockResolvedValueOnce(null)
      mockedPrisma.category.create.mockResolvedValueOnce(categoryFixture.entity)

      await expect(service.createCategory({ ...categoryFixture.dto, parentId: 10 }))
        .rejects.toThrow(FormException)
    })
  })

  describe.skip('retrieve root categories', () => {
    it('should return root categories given empty categories', async () => {
      // vi.spyOn(repository, 'findBy').mockResolvedValue([categoryFixture.entity])
      mockedPrisma.category.findMany.mockResolvedValue([categoryFixture.entity])

      const categoryEntities = await service.retrieveRootCategories()

      expect(categoryEntities).toEqual([categoryFixture.entity])
    })
  })

  describe('findCategory', () => {
    it('should return category given a valid category id', async () => {
      mockedPrisma.category.findUnique.mockResolvedValue(categoryFixture.entity)

      const categoryEntity = await service.findCategory(1)

      expect(categoryEntity).toEqual(categoryFixture.entity)
    })

    it('should return null given a not existed category id', async () => {
      mockedPrisma.category.findUnique.mockResolvedValue(null)

      const result = await service.findCategory(1)

      expect(result).toBeNull()
    })
  })
})
