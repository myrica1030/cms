import type { Prisma } from '@prisma/client'
import { PaginationQuery } from 'common/dto/pagination.query'
import { FormException } from 'common/exception/form-exception.exception'
import { CategoryPaginationQuery } from 'src/category/dto/category-pagination.query'
import { UserPaginationQuery } from 'src/user/dto/user-pagination.query'

export class ArticlePaginationQuery extends PaginationQuery {
  static fields = [
    'id',
    'title',
    'content',
    'authorId',
    'createdAt',
    'updatedAt',
    'categoryId',
    'author',
    'category',
  ] satisfies (keyof Prisma.ArticleOrderByWithRelationInput)[] as string[]

  get orderInput(): Prisma.TagOrderByWithRelationInput[] {
    const order: Prisma.TagOrderByWithRelationInput[] = Object.entries(this.parsedOrder)
      .map(([field, sortOrder]) => {
        if (field === 'tags_count') return { articles: { _count: sortOrder } }
        if (field.startsWith('author_')) {
          const authorField = field.replace('author_', '')
          if (authorField === 'articles_count') return { author: { articles: { _count: sortOrder } } }
          if (UserPaginationQuery.fields.includes(authorField)) return { author: { [authorField]: sortOrder } }
          throw new FormException({ order: [`Invalid order field: ${field}`] })
        }
        if (field.startsWith('category_')) {
          const categoryField = field.replace('category_', '')
          if (categoryField === 'articles_count') return { category: { articles: { _count: sortOrder } } }
          if (categoryField === 'children_count') return { category: { children: { _count: sortOrder } } }
          if (CategoryPaginationQuery.fields.includes(categoryField)) return { category: { [categoryField]: sortOrder } }
          throw new FormException({ order: [`Invalid order field: ${field}`] })
        }
        if ((ArticlePaginationQuery.fields).includes(field)) {
          return { [field]: sortOrder }
        }
        throw new FormException({ order: [`Invalid order field: ${field}`] })
      })
    return order
  }
}
