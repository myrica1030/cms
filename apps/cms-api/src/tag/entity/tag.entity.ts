import { ApiProperty } from '@nestjs/swagger'
import type { Tag } from '@prisma/client'
import { ApiPropertyNullable, IsDatetimeProperty, IsKeyProperty } from 'common/decorator/api-property.decorator'
import { NullableOptional } from 'types/fest'

export class TagEntity implements Tag {
  @IsKeyProperty()
  key: string

  @ApiProperty({ title: 'The name of the tag' })
  name: string

  @ApiPropertyNullable({
    title: 'The description of the tag',
    type: String,
  })
  description: string | null

  @IsDatetimeProperty({ created: true })
  createdAt: Date

  @IsDatetimeProperty({ updated: true })
  updatedAt: Date

  constructor(tag: NullableOptional<TagEntity>) {
    this.key = tag.key
    this.name = tag.name
    this.description = tag.description ?? null
    this.createdAt = tag.createdAt
    this.updatedAt = tag.updatedAt
  }
}
