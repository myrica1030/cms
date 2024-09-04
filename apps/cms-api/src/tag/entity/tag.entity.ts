import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import type { Tag } from '@prisma/client'
import { ApiPropertyDatetime } from 'common/decorator/api-property.decorator'
import { NullToUndefined } from 'types/fest'

export class TagEntity implements NullToUndefined<Tag> {
  @ApiProperty({ title: 'The key of the tag' })
  key: string

  @ApiProperty({ title: 'The name of the tag' })
  name: string

  @ApiPropertyOptional({ title: 'The description of the tag' })
  description?: string

  @ApiPropertyDatetime({ title: 'The creation date of the tag' })
  createdAt: Date

  @ApiPropertyDatetime({ title: 'The last update date of the tag' })
  updatedAt: Date

  constructor(tag: Tag) {
    this.key = tag.key
    this.name = tag.name
    this.description = tag.description ?? undefined
    this.createdAt = tag.createdAt
    this.updatedAt = tag.updatedAt
  }
}
