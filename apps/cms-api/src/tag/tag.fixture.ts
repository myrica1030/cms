import type { Tag } from '@prisma/client'
import type { CreateTagDto } from 'src/tag/dto/create-tag.dto'

const dto: CreateTagDto = {
  key: 'semantic-ui',
  name: 'Semantic UI',
  description: 'Semantic UI is a smoothly UI library',
}

const entity: Tag = {
  key: 'semantic-ui',
  name: 'Semantic UI',
  description: 'Semantic UI is a smoothly UI library',
  createdAt: new Date('2021-04-18T07:51:33.299Z'),
  updatedAt: new Date('2021-04-18T07:51:33.299Z'),
}

const entities: Tag[] = [
  entity,
  {
    key: 'database',
    name: 'Database',
    description: '',
    createdAt: new Date('2021-04-18T07:51:33.299Z'),
    updatedAt: new Date('2021-04-18T07:51:33.299Z'),
  },
  {
    key: 'linux',
    name: 'Linux',
    description: '',
    createdAt: new Date('2021-04-18T07:51:33.299Z'),
    updatedAt: new Date('2021-04-18T07:51:33.299Z'),
  },
]

export const tagFixture = {
  dto,
  entity,
  entities,
}
