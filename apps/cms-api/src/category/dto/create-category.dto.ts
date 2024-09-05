import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { IsIdProperty, IsRichTextProperty } from 'common/decorator/api-property.decorator'

// TODO: implement Prisma creation type
export class CreateCategoryDto {
  @ApiProperty({ title: 'The identifier of the category', example: 'study-notes' })
  @IsString() @MaxLength(32)
  @IsNotEmpty()
  key: string

  @ApiProperty({ title: 'The display text of the category', example: 'Study notes' })
  @IsString()
  @IsNotEmpty()
  label: string

  @IsRichTextProperty()
  @IsOptional()
  description?: string

  @IsIdProperty({ title: 'Category parent ID' })
  @IsOptional()
  parentId?: number
}
