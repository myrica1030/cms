import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { IsKeyProperty, IsRichTextProperty } from 'common/decorator/api-property.decorator'

export class CreateTagDto {
  @IsKeyProperty({ title: 'The key of the tag', example: 'semantic-ui' })
  key: string

  @ApiProperty({ title: 'The display name of the tag', example: 'Semantic UI' })
  @IsString()
  @IsNotEmpty()
  name: string

  @IsRichTextProperty({ title: 'The description of the tag' })
  @IsOptional()
  description?: string
}
