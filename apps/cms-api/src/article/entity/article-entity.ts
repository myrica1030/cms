import { ApiProperty } from '@nestjs/swagger'
import { Article } from '@prisma/client'
import { IsDatetimeProperty, IsIdProperty } from 'common/decorator/api-property.decorator'
import { ArticleIncludeAuthorAndTags } from 'src/article/article.model'
import { TagEntity } from 'src/tag/entity/tag.entity'
import { UserEntity } from 'src/user/entity/user.entity'
import { NullToUndefined } from 'types/fest'

export class ArticleEntity implements NullToUndefined<Article> {
  @IsIdProperty({ title: 'The ID of the article' })
  id: number

  @ApiProperty({ title: 'The title of the article' })
  title: string

  @ApiProperty({ title: 'The content of the article' })
  content: string

  @IsIdProperty({ title: 'The category ID of the article', required: false })
  categoryId?: number

  @IsDatetimeProperty({ created: true })
  createdAt: Date

  @IsDatetimeProperty({ updated: true })
  updatedAt: Date

  @ApiProperty({ title: 'The author of the article' })
  author: UserEntity

  @ApiProperty({ title: 'The tags of the article', type: [TagEntity] })
  tags: TagEntity[]

  constructor(article: ArticleIncludeAuthorAndTags) {
    this.id = article.id
    this.title = article.title
    this.content = article.content ?? ''
    this.categoryId = article.categoryId ?? undefined
    this.createdAt = article.createdAt
    this.updatedAt = article.updatedAt
    this.author = new UserEntity(article.author)
    this.tags = article.tags.map(({ tag }) => new TagEntity(tag))
  }
}
