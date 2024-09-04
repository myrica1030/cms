import { NotFoundException } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { PrismaClient, User } from '@prisma/client'
import { PaginatedEntity } from 'common/entity/paginated.entity'
import { PrismaService } from 'infra/prisma.service'
import { expect } from 'vitest'
import type { DeepMockProxy } from 'vitest-mock-extended'
import { mockDeep } from 'vitest-mock-extended'
import { articleFixture } from 'src/article/article.fixture'
import { articleIncludeAuthorAndTags } from 'src/article/article.model'
import { ArticleService } from 'src/article/article.service'
import type { CreateArticleDto } from 'src/article/dto/create-article.dto'
import { categoryFixture } from 'src/category/category.fixture'
import { CategoryService } from 'src/category/category.service'
import { FormException } from 'src/exception'
import { tagFixture } from 'src/tag/tag.fixture'
import { TagService } from 'src/tag/tag.service'
import { userFixture } from 'src/user/user.fixture'
import { UserService } from 'src/user/user.service'

describe('article service', () => {
  let service: ArticleService
  let userService: UserService
  let categoryService: CategoryService
  let tagService: TagService
  let mockedPrisma: DeepMockProxy<PrismaClient>

  const createArticleDto: CreateArticleDto = {
    title: 'title',
    tags: ['semantic-ui'],
    content: '<p>content</p>',
  }

  beforeEach(async () => {
    mockedPrisma = mockDeep<PrismaClient>()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        UserService,
        TagService,
        CategoryService,
        { provide: PrismaService, useValue: mockedPrisma },
      ],
    }).compile()

    service = module.get(ArticleService)
    userService = module.get(UserService)
    categoryService = module.get(CategoryService)
    tagService = module.get(TagService)
  })

  describe('createArticle', () => {
    it('should create article correctly', async () => {
      vi.spyOn(tagService, 'getTags').mockResolvedValue([tagFixture.entity])
      vi.spyOn(categoryService, 'findCategory').mockResolvedValue(categoryFixture.entity)
      vi.spyOn(userService, 'findUser').mockResolvedValue(userFixture.adminEntity as User)

      const articleDto: CreateArticleDto = { ...createArticleDto, categoryId: 1 }
      await service.createArticle(articleFixture.entity.id, articleDto)

      expect(mockedPrisma.article.create).toHaveBeenCalledWith({
        include: articleIncludeAuthorAndTags,
        data: {
          title: articleDto.title,
          content: articleDto.content,
          author: expect.any(Object),
          category: expect.any(Object),
          tags: expect.any(Object),
        },
      })
    })

    it('should throw error when create article given tags not exist', async () => {
      vi.spyOn(tagService, 'getTags').mockRejectedValue(new FormException({}))

      await expect(
        service.createArticle(1, { title: 'foo', content: 'content', tags: ['not-exist'] }),
      ).rejects.toThrow(FormException)
    })

    it('should throw error given not existed categoryId', async () => {
      vi.spyOn(tagService, 'getTags').mockResolvedValue([tagFixture.entity])
      vi.spyOn(categoryService, 'findCategory').mockResolvedValue(null)

      const articleDto: CreateArticleDto = { ...createArticleDto, categoryId: 999 }
      await expect(service.createArticle(articleFixture.entity.id, articleDto))
        .rejects.toThrow(FormException)
    })
  })

  describe('retrieveArticles', () => {
    it('should find articles correctly', async () => {
      mockedPrisma.article.findMany.mockResolvedValue([])
      mockedPrisma.article.count.mockResolvedValue(0)

      const articlesPaginatedEntity = await service.retrievePaginatedArticles({ page: 1, limit: 10, order: 'desc' })

      expect(articlesPaginatedEntity).toEqual(new PaginatedEntity(1, 10, 0, []))
      expect(mockedPrisma.article.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 10,
        include: articleIncludeAuthorAndTags,
      })
    })
  })

  describe('retrieveArticle', () => {
    it('should return article entity when article is exist', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(articleFixture.entity)

      const articleEntity = await service.findArticle(articleFixture.entity.id)

      expect(articleEntity).toEqual(articleFixture.entity)
      expect(mockedPrisma.article.findUnique).toHaveBeenCalledWith({
        where: { id: articleFixture.entity.id },
        include: articleIncludeAuthorAndTags,
      })
    })

    it('should throw NotFound error when article is not exist', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(null)

      const result = await service.findArticle(articleFixture.entity.id)

      expect(result).toBeNull()
    })
  })

  describe('updateArticle', () => {
    it('should return the article when submit a valid article with login', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(articleFixture.entity)
      mockedPrisma.article.update.mockResolvedValue(articleFixture.entity)
      vi.spyOn(tagService, 'getTags').mockResolvedValue([tagFixture.entity])
      vi.spyOn(categoryService, 'findCategory').mockResolvedValue(categoryFixture.entity)
      vi.spyOn(userService, 'findUser').mockResolvedValue(userFixture.adminEntity as User)

      const dto: CreateArticleDto = { ...createArticleDto, categoryId: 2 }
      const articleEntity = await service.updateArticle(1, dto, 1)

      expect(mockedPrisma.article.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining({
          ...createArticleDto,
          tags: { set: expect.any(Array) },
          categoryId: categoryFixture.entity.id,
        }),
        include: articleIncludeAuthorAndTags,
      })
      expect(articleEntity).toHaveProperty('id')
    })

    it('should throw NotFound error when article is not exist', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(null)
      vi.spyOn(tagService, 'getTags').mockResolvedValue([])

      await expect(service.updateArticle(articleFixture.entity.id, createArticleDto, 1))
        .rejects.toThrow(NotFoundException)
    })

    it('should throw FormException when submit a not existed category', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(null)
      vi.spyOn(tagService, 'getTags').mockResolvedValue([])
      vi.spyOn(categoryService, 'findCategory').mockResolvedValue(null)

      const dto: CreateArticleDto = { ...createArticleDto, categoryId: 999 }
      await expect(service.updateArticle(articleFixture.entity.id, dto, 1))
        .rejects.toThrow(NotFoundException)
    })

    it('should throw FormException when submit a not existed tag', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(articleFixture.entity)
      vi.spyOn(tagService, 'getTags').mockRejectedValue(new FormException({}))

      const dto = { ...createArticleDto, tags: ['not-exist'] }
      await expect(service.updateArticle(articleFixture.entity.id, dto, 1))
        .rejects.toThrow(FormException)
    })
  })
})
