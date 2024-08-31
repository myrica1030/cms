import { NotFoundException } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { ArticleEntity } from 'src/article/article.entity'
import { articleFixture } from 'src/article/article.fixture'
import { ArticleService } from 'src/article/article.service'
import type { ArticlesRo } from 'src/article/dto/articles.ro'
import type { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import { CategoryEntity } from 'src/category/category.entity'
import { categoryFixture } from 'src/category/category.fixture'
import { CategoryService } from 'src/category/category.service'
import { FormException } from 'src/exception'
import { TagEntity } from 'src/tag/tag.entity'
import { tagFixture } from 'src/tag/tag.fixture'
import { TagService } from 'src/tag/tag.service'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'

describe('article service', () => {
  let service: ArticleService
  let userService: UserService
  let categoryService: CategoryService
  let tagService: TagService
  let repository: Repository<ArticleEntity>

  const createArticleDto: CreateArticleDto = {
    title: 'title',
    tags: ['semantic-ui'],
    content: '<p>content</p>',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        UserService,
        TagService,
        CategoryService,
        {
          provide: getRepositoryToken(ArticleEntity),
          useValue: {
            create: vi.fn(),
            save: vi.fn(),
            findOneBy: vi.fn(),
            findAndCount: vi.fn(),
            merge: Object.assign,
          },
        },
        {
          provide: getRepositoryToken(TagEntity),
          useValue: {
            find: vi.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: vi.fn(),
          },
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get(ArticleService)
    userService = module.get(UserService)
    categoryService = module.get(CategoryService)
    tagService = module.get(TagService)
    repository = module.get(getRepositoryToken(ArticleEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(userService).toBeDefined()
    expect(categoryService).toBeDefined()
    expect(tagService).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('createArticle', () => {
    it('should create article correctly', async () => {
      vi.spyOn(tagService, 'getTags').mockResolvedValue([tagFixture.entity])
      vi.spyOn(categoryService, 'findCategory').mockResolvedValue(categoryFixture.entity)
      vi.spyOn(repository, 'create').mockReturnValue(articleFixture.entity)

      const articleDto: CreateArticleDto = { ...createArticleDto, categoryId: 1 }
      await service.createArticle(articleFixture.entity.id, articleDto)

      expect(repository.save).toHaveBeenCalledWith(articleFixture.entity)
    })

    it('should throw error when create article given tags not exist', async () => {
      vi.spyOn(tagService, 'getTags').mockRejectedValue(new FormException({}))
      vi.spyOn(repository, 'create').mockReturnValue({ title: 'foo', content: 'content', id: 1 } as ArticleEntity)

      await expect(
        service.createArticle(1, { title: 'foo', content: 'content', tags: ['not-exist'] }),
      ).rejects.toThrow(FormException)
    })

    it('should throw error given not existed categoryId', async () => {
      vi.spyOn(tagService, 'getTags').mockResolvedValue([tagFixture.entity])
      vi.spyOn(repository, 'create').mockReturnValue(articleFixture.entity)
      vi.spyOn(categoryService, 'findCategory').mockResolvedValue(null)

      const articleDto: CreateArticleDto = { ...createArticleDto, categoryId: 999 }
      await expect(service.createArticle(articleFixture.entity.id, articleDto))
        .rejects.toThrow(FormException)
    })
  })

  describe('retrieveArticles', () => {
    it('should find articles correctly', async () => {
      vi.spyOn(repository, 'findAndCount').mockResolvedValue([[], 0])
      const articlesRo = await service.retrieveArticles({ page: 1, limit: 10 })

      expect(articlesRo).toEqual({
        items: [],
        meta: {
          limit: 10,
          currentPage: 1,
          total: 0,
          totalPages: 0,
        },
      } as ArticlesRo)
      expect(repository.findAndCount).toHaveBeenCalledWith({ order: { createdAt: 'DESC' }, skip: 0, take: 10 })
    })
  })

  describe('retrieveArticle', () => {
    it('should return article entity when article is exist', async () => {
      vi.spyOn(repository, 'findOneBy').mockResolvedValue(articleFixture.entity)

      const articleEntity = await service.findArticle(articleFixture.entity.id)

      expect(articleEntity).toEqual(articleFixture.entity)
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: articleFixture.entity.id })
    })

    it('should throw NotFound error when article is not exist', async () => {
      vi.spyOn(repository, 'findOneBy').mockResolvedValue(null)

      const result = await service.findArticle(articleFixture.entity.id)

      expect(result).toBeNull()
    })
  })

  describe('updateArticle', () => {
    it('should return the article when submit a valid article with login', async () => {
      vi.spyOn(repository, 'findOneBy').mockResolvedValue(articleFixture.entity)
      vi.spyOn(repository, 'save').mockResolvedValue(articleFixture.entity)
      vi.spyOn(tagService, 'getTags').mockResolvedValue([tagFixture.entity])
      vi.spyOn(categoryService, 'findCategory').mockResolvedValue(categoryFixture.entity)

      const dto: CreateArticleDto = { ...createArticleDto, categoryId: 2 }
      const articleEntity = await service.updateArticle(1, dto, 1)

      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
        ...createArticleDto,
        tags: [tagFixture.entity],
        category: categoryFixture.entity,
      }))
      expect(articleEntity).toHaveProperty('id')
    })

    it('should throw NotFound error when article is not exist', async () => {
      vi.spyOn(repository, 'findOneBy').mockResolvedValue(null)
      vi.spyOn(tagService, 'getTags').mockResolvedValue([])

      await expect(service.updateArticle(articleFixture.entity.id, createArticleDto, 1))
        .rejects.toThrow(NotFoundException)
    })

    it('should throw FormException when submit a not existed category', async () => {
      vi.spyOn(repository, 'findOneBy').mockResolvedValue(null)
      vi.spyOn(tagService, 'getTags').mockResolvedValue([])
      vi.spyOn(categoryService, 'findCategory').mockResolvedValue(null)

      const dto: CreateArticleDto = { ...createArticleDto, categoryId: 999 }
      await expect(service.updateArticle(articleFixture.entity.id, dto, 1))
        .rejects.toThrow(NotFoundException)
    })

    it('should throw FormException when submit a not existed tag', async () => {
      vi.spyOn(repository, 'findOneBy').mockResolvedValue(articleFixture.entity)
      vi.spyOn(tagService, 'getTags').mockRejectedValue(new FormException({}))

      const dto = { ...createArticleDto, tags: ['not-exist'] }
      await expect(service.updateArticle(articleFixture.entity.id, dto, 1))
        .rejects.toThrow(FormException)
    })
  })
})
