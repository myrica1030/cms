import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { ApiPropertyNullable } from 'common/decorator/api-property.decorator'
import { ArticleEntity } from 'src/article/entity/article.entity'
import { CategoryEntity } from 'src/category/entity/category.entity'
import { TagOnArticleEntity } from 'src/tag/entity/tag-on-article.entity'
import { UserEntity } from 'src/user/entity/user.entity'
import { NullableOptional } from 'types/fest'

export const articlePublicArgs = Prisma.validator<Prisma.ArticleDefaultArgs>()({
  omit: {
    authorId: true,
    categoryId: true,
  },
  include: {
    author: { omit: { password: true } },
    tags: { select: { tag: true, createdAt: true } },
    category: true,
  },
})
export type ArticlePublic = Prisma.ArticleGetPayload<typeof articlePublicArgs>
export type TagOnArticle = ArticlePublic['tags'][number]

export class ArticlePublicEntity
  extends OmitType(ArticleEntity, ['authorId', 'categoryId'] as const)
  implements ArticlePublic {
  @ApiPropertyNullable({
    type: CategoryEntity,
    title: 'The category ID of the article',
  })
  category: CategoryEntity | null

  @ApiProperty({ title: 'The author of the article' })
  author: UserEntity

  @ApiProperty({ title: 'The tags of the article', type: [TagOnArticleEntity] })
  tags: TagOnArticleEntity[]

  constructor(article: NullableOptional<ArticlePublicEntity>) {
    super(article)
    this.id = article.id
    this.title = article.title
    this.content = article.content
    this.createdAt = article.createdAt
    this.updatedAt = article.updatedAt
    this.category = article.category ? new CategoryEntity(article.category) : null
    this.author = new UserEntity(article.author)
    this.tags = article.tags.map(tagOnArticle => new TagOnArticleEntity(tagOnArticle))
  }
}
