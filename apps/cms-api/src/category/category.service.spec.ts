import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { PrismaService } from 'infra/prisma.service'
import type { PrismaDeepMock } from 'test-utils/prisma-mock'
import { mockDeep } from 'vitest-mock-extended'
import { categoryFixture } from 'src/category/category.fixture'
import { CategoryService } from './category.service'

describe('category service', () => {
  let service: CategoryService
  let mockedPrisma: PrismaDeepMock

  beforeEach(async () => {
    mockedPrisma = mockDeep()

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

      await service.createCategory(categoryFixture.creationDto)

      expect(mockedPrisma.category.create).toBeCalledWith({ data: categoryFixture.creationDto })
    })

    it('should return created category given a valid form and existed parent category id', async () => {
      mockedPrisma.category.create.mockResolvedValueOnce(categoryFixture.entity)
      mockedPrisma.category.findFirst
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(categoryFixture.entity)

      await service.createCategory({ ...categoryFixture.creationDto, parentId: 1 })

      expect(mockedPrisma.category.create).toBeCalledWith({ data: { ...categoryFixture.creationDto, parentId: 1 } })
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
