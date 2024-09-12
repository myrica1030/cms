import type { Prisma } from '@prisma/client'
import { PaginationQuery } from 'common/dto/pagination.query'
import { FormException } from 'common/exception/form-exception.exception'

export class CategoryPaginationQuery extends PaginationQuery {
  static fields = [
    'id',
    'key',
    'label',
    'description',
    'createdAt',
    'updatedAt',
    'parentId',
  ] satisfies (keyof Prisma.CategoryOrderByWithRelationInput)[] as string[]

  get orderInput(): Prisma.CategoryOrderByWithRelationInput[] {
    const order: Prisma.CategoryOrderByWithRelationInput[] = Object.entries(this.parsedOrder)
      .map(([field, sortOrder]) => {
        if (field === 'children_count') return { children: { _count: sortOrder } }
        if (field === 'articles_count') return { articles: { _count: sortOrder } }
        if (CategoryPaginationQuery.fields.includes(field)) return { [field]: sortOrder }
        throw new FormException({ order: [`Invalid order field: ${field}`] })
      })
    return order
  }
}
