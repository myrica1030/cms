import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'
import { IsIdProperty, IsRichTextProperty } from 'common/decorator/api-property.decorator'

export class CreateArticleDto {
  @JSONSchema({ title: 'The title of the article', example: 'Lorem ipsum' })
  @IsString() @MaxLength(60)
  @IsNotEmpty()
  title: string

  @IsRichTextProperty({ title: 'The content of the article' })
  content: string

  @IsIdProperty({ title: 'The category ID of the article' })
  @IsOptional()
  categoryId?: number

  @JSONSchema({ title: 'The tag names of the article', example: ['semantic-ui', 'material-ui'] })
  @MinLength(1, { each: true }) @MaxLength(20, { each: true })
  @IsOptional()
  tags?: string[]
}
