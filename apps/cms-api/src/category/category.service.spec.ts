import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { CategoryEntity } from 'src/category/category.entity'
import { categoryFixture } from 'src/category/category.fixture'
import { FormException } from 'src/exception'
import { CategoryService } from './category.service'

describe('category service', () => {
  let service: CategoryService
  let repository: Repository<CategoryEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            findBy: vi.fn(),
            findOneBy: vi.fn(),
            create: vi.fn(),
            save: vi.fn(),
          },
        },
      ],
    }).compile()

    service = module.get(CategoryService)
    repository = module.get(getRepositoryToken(CategoryEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('create category', () => {
    it('should return created category given a valid create category form', async () => {
      vi.spyOn(repository, 'create').mockReturnValueOnce(categoryFixture.entity)
      vi.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null)

      await service.createCategory(categoryFixture.dto)

      expect(repository.save).toHaveBeenCalledWith(categoryFixture.entity)
    })

    it('should return created category given a valid form and existed parent category id', async () => {
      vi.spyOn(repository, 'create').mockReturnValueOnce(categoryFixture.entity)
      vi.spyOn(repository, 'findOneBy')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(categoryFixture.entity)

      await service.createCategory({ ...categoryFixture.dto, parentId: 1 })

      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
        ...categoryFixture.entity,
        parent: { id: 1 },
      }))
    })

    it('should throw category key exist error given existed category key', async () => {
      vi.spyOn(repository, 'findOneBy').mockResolvedValueOnce(categoryFixture.entity)

      await expect(service.createCategory(categoryFixture.dto))
        .rejects.toThrow(FormException)
    })

    it('should throw parent category not found error given not existed parent category id', async () => {
      vi.spyOn(repository, 'findOneBy').mockResolvedValue(null)
      vi.spyOn(repository, 'create').mockReturnValueOnce(categoryFixture.entity)

      await expect(service.createCategory({ ...categoryFixture.dto, parentId: 10 }))
        .rejects.toThrow(FormException)
    })
  })

  describe('retrieve root categories', () => {
    it('should return root categories given empty categories', async () => {
      vi.spyOn(repository, 'findBy').mockResolvedValue([categoryFixture.entity])

      const categoryEntities = await service.retrieveRootCategories()

      expect(categoryEntities).toEqual([categoryFixture.entity])
    })
  })

  describe('findCategory', () => {
    it('should return category given a valid category id', async () => {
      vi.spyOn(repository, 'findOneBy').mockResolvedValue(categoryFixture.entity)

      const categoryEntity = await service.findCategory(1)

      expect(categoryEntity).toEqual(categoryFixture.entity)
    })

    it('should return null given a not existed category id', async () => {
      vi.spyOn(repository, 'findOneBy').mockResolvedValue(null)

      const result = await service.findCategory(1)

      expect(result).toBeNull()
    })
  })
})
