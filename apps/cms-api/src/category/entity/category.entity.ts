import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Category } from '@prisma/client'
import { ApiPropertyDatetime, ApiPropertyRichText } from 'common/decorator/api-property.decorator'
import { NullToUndefined } from 'types/fest'

export class CategoryEntity implements NullToUndefined<Category> {
  @ApiProperty({ example: 1 })
  id: number

  @ApiPropertyOptional({ description: 'Category parent ID' })
  parentId?: number

  @ApiProperty({ description: 'The key of the category', example: 'study-notes' })
  key: string

  @ApiProperty({ description: 'The display text of the category', example: 'Study notes' })
  label: string

  @ApiPropertyRichText({ required: false })
  description?: string

  @ApiPropertyDatetime({ description: 'The creation date of the category' })
  createdAt: Date

  @ApiPropertyDatetime({ description: 'The last update date of the category' })
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
