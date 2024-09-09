import type { CreateCategoryDto } from 'src/category/dto/create-category.dto'
import { CategoryEntity } from 'src/category/entity/category.entity'

const creationDto = {
  key: 'study-notes',
  label: 'Study notes',
  description: '<p>This is personal study notes</p>',
} satisfies CreateCategoryDto

const uncategorizedCategoryEntity: CategoryEntity = new CategoryEntity({
  id: 1,
  key: 'uncategorized',
  label: 'Uncategorized',
  description: null,
  createdAt: new Date('2024-09-02T20:04:58+0800'),
  updatedAt: new Date('2024-09-02T20:04:58+0800'),
  parentId: null,
})

const entity: CategoryEntity = new CategoryEntity({
  id: 2,
  ...creationDto,
  createdAt: new Date('2021-04-18T07:51:33.299Z'),
  updatedAt: new Date('2021-04-18T07:51:33.299Z'),
  parentId: null,
})

const entities: CategoryEntity[] = [
  uncategorizedCategoryEntity,
  entity,
]

export const categoryFixture = {
  creationDto,
  uncategorizedCategoryEntity,
  entity,
  entities,
}
