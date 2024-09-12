import type { Prisma } from '@prisma/client'
import { PaginationQuery } from 'common/dto/pagination.query'
import { FormException } from 'common/exception/form-exception.exception'

export class UserPaginationQuery extends PaginationQuery {
  static fields = [
    'id',
    'email',
    'username',
    'password',
    'bio',
    'image',
    'createdAt',
    'updatedAt',
  ] satisfies (keyof Prisma.UserOrderByWithRelationInput)[] as string[]

  get orderInput(): Prisma.UserOrderByWithRelationInput[] {
    const order: Prisma.UserOrderByWithRelationInput[] = Object.entries(this.parsedOrder)
      .map(([field, sortOrder]) => {
        if (field === 'articles_count') return { articles: { _count: sortOrder } }
        if ((UserPaginationQuery.fields).includes(field)) return { [field]: sortOrder }
        throw new FormException({ order: [`Invalid order field: ${field}`] })
      })
    return order
  }
}
