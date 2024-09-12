import type { Prisma } from '@prisma/client'
import { PaginationQuery } from 'common/dto/pagination.query'
import { FormException } from 'common/exception/form-exception.exception'

export class TagPaginationQuery extends PaginationQuery {
  private fields = [
    'key',
    'name',
    'description',
    'createdAt',
    'updatedAt',
  ] satisfies (keyof Prisma.TagOrderByWithRelationInput)[] as string[]

  get orderInput(): Prisma.TagOrderByWithRelationInput[] {
    const order: Prisma.TagOrderByWithRelationInput[] = Object.entries(this.parsedOrder)
      .map(([field, sortOrder]) => {
        if (field === 'articles_count') return { articles: { _count: sortOrder } }
        if ((this.fields).includes(field)) return { [field]: sortOrder }
        throw new FormException({ order: [`Invalid order field: ${field}`] })
      })
    return order
  }
}
