import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { IsIdProperty, IsKeyProperty, IsRichTextProperty } from 'common/decorator/api-property.decorator'

export class CreateArticleDto implements Omit<Prisma.ArticleUncheckedUpdateInput, 'tags' | 'authorId'> {
  @ApiProperty({ title: 'The title of the article', example: 'Lorem ipsum' })
  @IsString() @MaxLength(60)
  @IsNotEmpty()
  title: string

  @IsRichTextProperty({ title: 'The content of the article' })
  content: string

  @IsIdProperty({ title: 'The category ID of the article' })
  @IsOptional()
  categoryId?: number

  @ApiProperty({ title: 'The tag keys of the article', example: ['semantic-ui', 'vue'] })
  @IsKeyProperty({ each: true }) @MaxLength(20, { each: true })
  @IsOptional()
  tags?: string[]

  constructor(dto?: CreateArticleDto) {
    this.title = dto?.title!
    this.content = dto?.content!
    this.categoryId = dto?.categoryId
    this.tags = dto?.tags
  }
}
