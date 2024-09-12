import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, Matches, Max, Min } from 'class-validator'
import { IsQueryNumber } from '../decorator/validation.decorator'

export type SortOrder = 'asc' | 'desc'

export class PaginationQuery<T extends Record<string, SortOrder> = Record<string, SortOrder>> {
  @ApiPropertyOptional({ title: 'The page number of the items', default: 1 })
  @IsQueryNumber() @IsInt() @Min(1)
  @IsOptional()
  page: number

  @ApiPropertyOptional({ title: 'The limit of the items per page', default: 10 })
  @IsQueryNumber() @IsInt() @Min(1) @Max(500)
  @IsOptional()
  limit: number

  @ApiPropertyOptional({ title: 'The order of the items property', example: 'articles_count:desc,name:asc,updatedAt:desc' })
  @IsOptional()
  @Matches(/^(\w+):(asc|desc)(?:,(\w+):(asc|desc))*$/, { message: `The order should following this format 'field1:asc,field2:desc'` })
  order?: string

  constructor(query?: PaginationQuery) {
    this.page = query?.page ?? 1
    this.limit = query?.limit ?? 10
    this.order = query?.order
  }

  get parsedOrder(): T {
    if (!this.order) return {} as T
    const result = {} as Record<string, SortOrder | undefined>
    for (const order of this.order.split(',')) {
      const [field, sortOrder] = order.split(':')
      if (!field || !sortOrder) continue
      result[field] = sortOrder as SortOrder
    }
    return result as T
  }
}
