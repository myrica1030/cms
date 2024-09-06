import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { IsIdProperty, IsRichTextProperty } from 'common/decorator/api-property.decorator'

export class CreateCategoryDto implements Prisma.CategoryUncheckedCreateInput {
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
