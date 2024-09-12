import type { Prisma } from '@prisma/client'
import type { SortOrder } from 'common/dto/pagination.query'
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

  private fieldMappings: Record<string, [string[], (field: string, sortOrder: SortOrder) => Prisma.ArticleOrderByWithRelationInput]> = {
    author: [UserPaginationQuery.fields, (field, sortOrder) => ({ author: { [field]: sortOrder } })],
    category: [CategoryPaginationQuery.fields, (field, sortOrder) => ({ category: { [field]: sortOrder } })],
  }

  private handleSpecialCases(field: string, sortOrder: SortOrder): Prisma.ArticleOrderByWithRelationInput {
    if (field === 'tags_count') return { tags: { _count: sortOrder } }
    if (field === 'author_articles_count') return { author: { articles: { _count: sortOrder } } }
    if (field === 'category_articles_count') return { category: { articles: { _count: sortOrder } } }
    if (field === 'category_children_count') return { category: { children: { _count: sortOrder } } }
    return null
  }

  get orderInput(): Prisma.TagOrderByWithRelationInput[] {
    return Object.entries(this.parsedOrder).map(([field, sortOrder]) => {
      const specialCase = this.handleSpecialCases(field, sortOrder)
      if (specialCase) return specialCase

      const [prefix, subfield] = field.split('_')
      if (this.fieldMappings[prefix]) {
        const [allowedFields, sortInput] = this.fieldMappings[prefix]
        if (allowedFields.includes(subfield)) return sortInput(subfield, sortOrder)
        throw new FormException({ order: [`Invalid order field: ${field}`] })
      }

      if (ArticlePaginationQuery.fields.includes(field)) {
        return { [field]: sortOrder }
      }

      throw new FormException({ order: [`Invalid order field: ${field}`] })
    })
  }
}
