import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { ArticleEntity } from 'src/article/article.entity'
import type { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import type { CategoryService } from 'src/category/category.service'
import { FormException } from 'src/exception'
import type { TagService } from 'src/tag/tag.service'
import type { UserService } from 'src/user/user.service'
import type { PaginationOptions, PaginationRo } from 'src/utils/paginate'
import { paginate } from 'src/utils/paginate'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repository: Repository<ArticleEntity>,
    private readonly tagService: TagService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async createArticle(userId: number, createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const { categoryId, tags, ...dto } = createArticleDto

    const articleEntity = this.repository.create(dto)

    const [
      tagEntities,
      categoryEntity,
      userSafeEntity,
    ] = await Promise.all([
      tags?.length ? this.tagService.getTags(tags) : [],
      categoryId ? this.categoryService.findCategory(categoryId) : undefined,
      this.userService.findUser({ id: userId }),
    ])

    if (categoryId && !categoryEntity) throw new FormException({ categoryId: ['isNotExist'] })

    this.repository.merge(articleEntity, {
      ...dto,
      tags: tagEntities,
      category: categoryEntity ?? undefined,
      author: userSafeEntity ?? undefined,
    })
    return await this.repository.save(articleEntity)
  }

  async retrieveArticles(options: PaginationOptions): Promise<PaginationRo<ArticleEntity>> {
    return await paginate(this.repository, options)
  }

  async findArticle(id: number): Promise<ArticleEntity | null> {
    return await this.repository.findOneBy({ id })
  }

  async updateArticle(id: number, createArticleDto: CreateArticleDto, userId: number): Promise<ArticleEntity> {
    const { tags, categoryId, ...dto } = createArticleDto
    const [
      articleEntity,
      tagEntities,
      categoryEntity,
      userSafeEntity,
    ] = await Promise.all([
      this.repository.findOneBy({ id }),
      tags?.length ? this.tagService.getTags(tags) : [],
      categoryId ? this.categoryService.findCategory(categoryId) : undefined,
      this.userService.findUser({ id: userId }),
    ])
    if (!articleEntity) throw new NotFoundException()

    if (categoryId && !categoryEntity) throw new FormException({ categoryId: ['isNotExist'] })

    this.repository.merge(articleEntity, {
      ...dto,
      tags: tagEntities,
      category: categoryEntity ?? undefined,
      author: userSafeEntity ?? undefined,
    })
    return await this.repository.save(articleEntity)
  }
}
