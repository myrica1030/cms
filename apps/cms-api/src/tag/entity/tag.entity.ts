import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import type { Tag } from '@prisma/client'
import { IsNotEmpty, IsString } from 'class-validator'
import { IsDatetimeProperty, IsKeyProperty } from 'common/decorator/api-property.decorator'
import { NullToUndefined } from 'types/fest'

export class TagEntity implements NullToUndefined<Tag> {
  @IsKeyProperty()
  key: string

  @ApiProperty({ title: 'The name of the tag' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiPropertyOptional({ title: 'The description of the tag' })
  @IsString()
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
