import { ApiProperty } from '@nestjs/swagger'
import { Category } from '@prisma/client'
import { IsDatetimeProperty, IsIdProperty, IsRichTextProperty } from 'common/decorator/api-property.decorator'
import { NullableOptional } from 'types/fest'

const validation = false
const nullable = true

export class CategoryEntity implements Category {
  @IsIdProperty({ title: 'The identifier of the category', validation })
  id: number

  @IsIdProperty({ title: 'Category parent ID', nullable, validation })
  parentId: number | null

  @ApiProperty({ title: 'The key of the category', example: 'study-notes' })
  key: string

  @ApiProperty({ title: 'The display text of the category', example: 'Study notes' })
  label: string

  @IsRichTextProperty({ title: 'The description of the category', nullable, validation })
  description: string | null

  @IsDatetimeProperty({ created: true })
  createdAt: Date

  @IsDatetimeProperty({ updated: true })
  updatedAt: Date

  constructor(category: NullableOptional<CategoryEntity>) {
    this.id = category.id
    this.parentId = category.parentId ?? null
    this.key = category.key
    this.label = category.label
    this.description = category.description ?? null
    this.createdAt = category.createdAt
    this.updatedAt = category.updatedAt
  }
}
