import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import type { Tag } from '@prisma/client'
import { IsDatetimeProperty, IsKeyProperty } from 'common/decorator/api-property.decorator'
import { NullToUndefined } from 'types/fest'

export class TagEntity implements NullToUndefined<Tag> {
  @IsKeyProperty()
  key: string

  @ApiProperty({ title: 'The name of the tag' })
  name: string

  @ApiPropertyOptional({ title: 'The description of the tag' })
  description?: string

  @IsDatetimeProperty({ created: true })
  createdAt: Date

  @IsDatetimeProperty({ updated: true })
  updatedAt: Date

  constructor(tag: Tag) {
    this.key = tag.key
    this.name = tag.name
    this.description = tag.description ?? undefined
    this.createdAt = tag.createdAt
    this.updatedAt = tag.updatedAt
  }
}
