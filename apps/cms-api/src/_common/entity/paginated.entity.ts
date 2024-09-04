import { ApiProperty } from '@nestjs/swagger'

export class PaginatedMetadata {
  @ApiProperty({ title: 'The number of items per page', example: 10 })
  limit: number

  @ApiProperty({ title: 'The total number of items', example: 24 })
  total: number

  @ApiProperty({ title: 'The total number of pages', example: 3 })
  totalPages: number

  @ApiProperty({ title: 'The current page number', example: 1 })
  currentPage: number
}

export class PaginatedEntity<T = unknown> {
  @ApiProperty({ title: 'The metadata of the paginated items', type: PaginatedMetadata })
  metadata: PaginatedMetadata

  @ApiProperty({ title: 'The items on the current page', type: 'object' })
  items: T[]

  constructor(page: number, limit: number, total: number, items: T[]) {
    this.metadata = {
      currentPage: page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    }
    this.items = items
  }
}
