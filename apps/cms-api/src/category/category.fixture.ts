import type { Category } from '@prisma/client'
import type { CreateCategoryDto } from 'src/category/dto/create-category.dto'

const dto: CreateCategoryDto = {
  key: 'study-notes',
  label: 'Study notes',
  description: '<p>This is personal study notes</p>',
}

const uncategorizedCategoryEntity: Category = {
  id: 1,
  key: 'uncategorized',
  label: 'Uncategorized',
  description: '',
  createdAt: new Date('2024-09-02T20:04:58+0800'),
  updatedAt: new Date('2024-09-02T20:04:58+0800'),
  parentId: null,
}

const entity: Category = {
  id: 2,
  key: 'study-notes',
  label: 'Study notes',
  description: '<p>This is personal study notes</p>',
  createdAt: new Date('2021-04-18T07:51:33.299Z'),
  updatedAt: new Date('2021-04-18T07:51:33.299Z'),
  parentId: null,
}

const entities: Category[] = [
  uncategorizedCategoryEntity,
  entity,
]

export const categoryFixture = {
  dto,
  uncategorizedCategoryEntity,
  entity,
  entities,
}
