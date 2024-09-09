import { ApiProperty } from '@nestjs/swagger'
import { Article } from '@prisma/client'
import { ApiPropertyNullable, IsDatetimeProperty, IsIdProperty } from 'common/decorator/api-property.decorator'
import type { NullableOptional } from 'types/fest'

export class ArticleEntity implements Article {
  @IsIdProperty({ title: 'The ID of the article' })
  id: number

  @ApiProperty({ title: 'The title of the article' })
  title: string

  @ApiProperty({ title: 'The content of the article' })
  content: string

  @IsDatetimeProperty({ created: true })
  createdAt: Date

  @IsDatetimeProperty({ updated: true })
  updatedAt: Date

  @ApiPropertyNullable({ type: Number, title: 'The category ID of the article' })
  categoryId: number | null

  @ApiProperty({ title: 'The author of the article' })
  authorId: number

  constructor(article: NullableOptional<ArticleEntity>) {
    this.id = article.id
    this.title = article.title
    this.content = article.content
    this.createdAt = article.createdAt
    this.updatedAt = article.updatedAt
    this.categoryId = article.categoryId ?? null
    this.authorId = article.authorId
  }
}
