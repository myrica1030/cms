import { ApiProperty } from '@nestjs/swagger'
import { Category } from '@prisma/client'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { IsDatetimeProperty, IsIdProperty, IsRichTextProperty } from 'common/decorator/api-property.decorator'
import { NullToUndefined } from 'types/fest'

export class CategoryEntity implements NullToUndefined<Category> {
  @IsIdProperty({ title: 'The identifier of the category' })
  id: number

  @IsIdProperty({ title: 'Category parent ID' })
  @IsOptional()
  parentId?: number

  // TODO remove this property
  @ApiProperty({ title: 'The key of the category', example: 'study-notes' })
  @IsString()
  key: string

  @ApiProperty({ title: 'The display text of the category', example: 'Study notes' })
  @IsString()
  @IsNotEmpty()
  label: string

  @IsRichTextProperty({ title: 'The description of the category' })
  @IsOptional()
  description?: string

  @IsDatetimeProperty({ created: true })
  createdAt: Date

  @IsDatetimeProperty({ updated: true })
  updatedAt: Date

  constructor(category: Category) {
    this.id = category.id
    this.parentId = category.parentId ?? undefined
    this.key = category.key
    this.label = category.label
    this.description = category.description ?? undefined
    this.createdAt = category.createdAt
    this.updatedAt = category.updatedAt
  }
}
