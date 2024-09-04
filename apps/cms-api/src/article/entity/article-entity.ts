import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Article } from '@prisma/client'
import { ArticleIncludeAuthorAndTags } from 'src/article/article.model'
import { TagOnArticleEntity } from 'src/tag/entity/tag-on-article.entity'
import { UserEntity } from 'src/user/entity/user.entity'
import { NullToUndefined } from 'types/fest'

export class ArticleEntity implements NullToUndefined<Article> {
  @ApiProperty({ title: 'The ID of the article' })
  id: number

  @ApiProperty({ title: 'The title of the article' })
  title: string

  @ApiProperty({ title: 'The content of the article' })
  content: string

  @ApiPropertyOptional({ title: 'The category ID of the article' })
  categoryId?: number

  @ApiProperty({ title: 'The creation date of the article', format: 'date-time' })
  createdAt: Date

  @ApiProperty({ title: 'The last update date of the article', format: 'date-time' })
  updatedAt: Date

  @ApiProperty({ title: 'The author of the article' })
  author: UserEntity

  @ApiProperty({ title: 'The tags of the article' })
  tags: TagOnArticleEntity[]

  constructor(article: ArticleIncludeAuthorAndTags) {
    this.id = article.id
    this.title = article.title
    this.content = article.content ?? ''
    this.categoryId = article.categoryId ?? undefined
    this.createdAt = article.createdAt
    this.updatedAt = article.updatedAt
    this.author = new UserEntity(article.author)
    this.tags = article.tags.map(({ tag }) => new TagOnArticleEntity(tag))
  }
}
