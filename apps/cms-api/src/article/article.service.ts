import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, Tag } from '@prisma/client'
import { PaginationQuery } from 'common/dto/pagination.query'
import { PaginatedEntity } from 'common/entity/paginated.entity'
import { FormException } from 'common/exception/form-exception.exception'
import { PrismaService } from 'infra/prisma.service'
import { CreateArticleDto } from 'src/article/dto/create-article.dto'
import { ArticlePublic, ArticlePublicEntity, articlePublicArgs } from 'src/article/entity/article-public.entity'
import { CategoryService } from 'src/category/category.service'
import { TagService } from 'src/tag/tag.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class ArticleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tagService: TagService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async createArticle(userId: number, createArticleDto: CreateArticleDto): Promise<ArticlePublic> {
    const { categoryId, tags: tagLabels = [], ...dto } = createArticleDto

    const [tags, category] = await Promise.all([
      tagLabels.length ? this.tagService.getTags(tagLabels) : [],
      categoryId ? this.categoryService.findCategory(categoryId) : null,
    ])

    if (categoryId && !category) throw new FormException({ categoryId: ['isNotExist'] })
    if (tagLabels.length !== tags.length) throw new FormException({ tags: ['isInvalid'] })

    const article = await this.prisma.article.create({
      ...articlePublicArgs,
      data: {
        ...dto,
        tags: {
          createMany: { data: tags.map(({ key }) => ({ tagKey: key })) },
        },
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        author: { connect: { id: userId } },
      },
    })

    return article
  }

  async retrievePaginatedArticles(query: PaginationQuery<Prisma.ArticleOrderByWithRelationInput>): Promise<PaginatedEntity<ArticlePublicEntity>> {
    const { page, limit, order } = query
    const [count, articles] = await Promise.all([
      this.prisma.article.count(),
      this.prisma.article.findMany({
        ...articlePublicArgs,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: order },
      }),
    ])

    return new PaginatedEntity(page, limit, count, articles.map(article => new ArticlePublicEntity(article)))
  }

  async findArticle(id: number): Promise<ArticlePublic | null> {
    return await this.prisma.article.findUnique({
      ...articlePublicArgs,
      where: { id },
    })
  }

  // FIXME: using update article dto
  async updateArticle(id: number, createArticleDto: CreateArticleDto, userId: number): Promise<ArticlePublic> {
    const { tags: tagNames, categoryId, ...dto } = createArticleDto
    const [
      article,
      tags,
      category,
      user,
    ] = await Promise.all([
      this.prisma.article.findUnique({ where: { id } }),
      tagNames?.length ? this.tagService.getTags(tagNames) : [] as Tag[],
      categoryId ? this.categoryService.findCategory(categoryId) : null,
      this.userService.findUser({ id: userId }),
    ] as const)
    if (!article) throw new NotFoundException()
    if (!user) throw new BadRequestException('User not found')
    if (userId !== article.authorId) throw new ForbiddenException('You are not the author of this article')
    if (categoryId && !category) throw new FormException({ categoryId: ['isNotExist'] })

    return await this.prisma.article.update({
      ...articlePublicArgs,
      where: { id },
      data: {
        ...dto,
        tags: {
          set: tags.map(({ key }) => ({ articleId_tagKey: { articleId: id, tagKey: key } })),
        },
        categoryId,
      },
    })
  }
}
