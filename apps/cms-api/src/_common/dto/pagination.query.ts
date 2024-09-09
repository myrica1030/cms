import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, Max, Min } from 'class-validator'
import { IsEnumProperty } from 'src/_common/decorator/api-property.decorator'
import { IsQueryNumber } from '../decorator/validation.decorator'

export enum SortOrder { Asc = 'asc', Desc = 'desc' }

// TODO: order by prisma orderBy type
export class PaginationQuery<_T = unknown> {
  @ApiPropertyOptional({ title: 'The page number of the items', default: 1 })
  @IsQueryNumber() @IsInt() @Min(1)
  @IsOptional()
  page: number

  @ApiPropertyOptional({ title: 'The limit of the items per page', default: 10 })
  @IsQueryNumber() @IsInt() @Min(1) @Max(500)
  @IsOptional()
  limit: number

  @IsEnumProperty({ SortOrder }, { title: 'The order of the items `createdAt` property', default: SortOrder.Desc, required: false })
  @IsOptional()
  order: SortOrder

  constructor(query?: PaginationQuery) {
    this.page = query?.page ?? 1
    this.limit = query?.limit ?? 10
    this.order = query?.order ?? SortOrder.Desc
  }
}
