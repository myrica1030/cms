import { ForbiddenException, NotFoundException } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { User } from '@prisma/client'
import { SortOrder } from 'common/dto/pagination.query'
import { PaginatedEntity } from 'common/entity/paginated.entity'
import { FormException } from 'common/exception/form-exception.exception'
import { PrismaService } from 'infra/prisma.service'
import type { PrismaDeepMock } from 'test-utils/prisma-mock'
import type { Mock } from 'vitest'
import { expect, vi } from 'vitest'
import { mockDeep } from 'vitest-mock-extended'
import { articleFixture } from 'src/article/article.fixture'
import { ArticleService } from 'src/article/article.service'
import type { CreateArticleDto } from 'src/article/dto/create-article.dto'
import type { ArticlePublic } from 'src/article/entity/article-public.entity'
import { articlePublicArgs } from 'src/article/entity/article-public.entity'
import { categoryFixture } from 'src/category/category.fixture'
import { CategoryService } from 'src/category/category.service'
import { tagFixture } from 'src/tag/tag.fixture'
import { TagService } from 'src/tag/tag.service'
import { userFixture } from 'src/user/user.fixture'
import { UserService } from 'src/user/user.service'

describe('article service', () => {
  let service: ArticleService
  let userService: UserService
  let categoryService: CategoryService
  let tagService: TagService
  let mockedPrisma: PrismaDeepMock
  let mockedFindUnique: Mock<() => ArticlePublic>
  let mockedUpdate: Mock<() => ArticlePublic>

  const createArticleDto: CreateArticleDto = {
    title: 'title',
    tags: ['semantic-ui'],
    content: '<p>content</p>',
  }

  beforeEach(async () => {
    mockedPrisma = mockDeep()
    mockedFindUnique = mockedPrisma.article.findUnique as any
    mockedUpdate = mockedPrisma.article.update as any

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
      await service.createArticle(articleFixture.publicEntity.id, articleDto)

      expect(mockedPrisma.article.create).toHaveBeenCalledWith({
        ...articlePublicArgs,
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
      await expect(service.createArticle(articleFixture.publicEntity.id, articleDto))
        .rejects.toThrow(FormException)
    })
  })

  describe('retrieveArticles', () => {
    it('should find articles correctly', async () => {
      mockedPrisma.article.findMany.mockResolvedValue([])
      mockedPrisma.article.count.mockResolvedValue(0)

      const articlesPaginatedEntity = await service.retrievePaginatedArticles({ page: 1, limit: 10, order: SortOrder.Desc })

      expect(articlesPaginatedEntity).toEqual(new PaginatedEntity(1, 10, 0, []))
      expect(mockedPrisma.article.findMany).toHaveBeenCalledWith({
        ...articlePublicArgs,
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 10,
      })
    })
  })

  describe('retrieveArticle', () => {
    it('should return article entity when article is exist', async () => {
      mockedFindUnique.mockResolvedValue(articleFixture.publicEntity)

      const articleEntity = await service.findArticle(articleFixture.publicEntity.id)

      expect(articleEntity).toEqual(articleFixture.publicEntity)
      expect(mockedPrisma.article.findUnique).toHaveBeenCalledWith({
        ...articlePublicArgs,
        where: { id: articleFixture.publicEntity.id },
      })
    })

    it('should throw NotFound error when article is not exist', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(null)

      const result = await service.findArticle(articleFixture.publicEntity.id)

      expect(result).toBeNull()
    })
  })

  describe('updateArticle', () => {
    it('should return the article when submit a valid article with login', async () => {
      mockedUpdate.mockResolvedValue(articleFixture.publicEntity)
      mockedPrisma.article.findUnique.mockResolvedValue(articleFixture.entity)
      vi.spyOn(tagService, 'getTags').mockResolvedValue([tagFixture.entity])
      vi.spyOn(categoryService, 'findCategory').mockResolvedValue(categoryFixture.entity)
      vi.spyOn(userService, 'findUser').mockResolvedValue(articleFixture.publicEntity.author as User)

      const dto: CreateArticleDto = { ...createArticleDto, categoryId: 2 }
      const articleEntity = await service.updateArticle(1, dto, articleFixture.publicEntity.author.id)

      expect(mockedPrisma.article.update).toHaveBeenCalledWith({
        ...articlePublicArgs,
        where: { id: 1 },
        data: expect.objectContaining({
          ...createArticleDto,
          tags: { set: expect.any(Array) },
          categoryId: categoryFixture.entity.id,
        }),
      })
      expect(articleEntity).toHaveProperty('id')
    })

    it('should throw NotFound error when article is not exist', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(null)
      vi.spyOn(tagService, 'getTags').mockResolvedValue([])

      await expect(service.updateArticle(articleFixture.publicEntity.id, createArticleDto, 1))
        .rejects.toThrow(NotFoundException)
    })

    it('should throw Forbidden error when user is not author', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(articleFixture.entity)
      vi.spyOn(tagService, 'getTags').mockResolvedValue([tagFixture.entity])
      vi.spyOn(categoryService, 'findCategory').mockResolvedValue(categoryFixture.entity)
      vi.spyOn(userService, 'findUser').mockResolvedValue(articleFixture.publicEntity.author as User)

      expect(mockedPrisma.article.update).not.toBeCalled()
      await expect(service.updateArticle(articleFixture.publicEntity.id, createArticleDto, 9999))
        .rejects.toThrow(ForbiddenException)
    })

    it('should throw FormException when submit a not existed category', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(null)
      vi.spyOn(tagService, 'getTags').mockResolvedValue([])
      vi.spyOn(categoryService, 'findCategory').mockResolvedValue(null)

      const dto: CreateArticleDto = { ...createArticleDto, categoryId: 999 }
      await expect(service.updateArticle(articleFixture.publicEntity.id, dto, 1))
        .rejects.toThrow(NotFoundException)
    })

    it('should throw FormException when submit a not existed tag', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(articleFixture.tagOnArticleEntity as any)
      vi.spyOn(tagService, 'getTags').mockRejectedValue(new FormException({}))

      const dto = { ...createArticleDto, tags: ['not-exist'] }
      await expect(service.updateArticle(articleFixture.publicEntity.id, dto, 1))
        .rejects.toThrow(FormException)
    })
  })
})
