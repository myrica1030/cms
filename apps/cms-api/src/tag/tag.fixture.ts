import type { CreateTagDto } from 'src/tag/dto/create-tag.dto'
import { TagEntity } from 'src/tag/entity/tag.entity'

const dto = {
  key: 'semantic-ui',
  name: 'Semantic UI',
  description: 'Semantic UI is a smoothly UI library',
} satisfies CreateTagDto

const createTagsDto = [
  dto,
  { key: 'database', name: 'Database' },
  { key: 'linux', name: 'Linux' },
] as const satisfies CreateTagDto[]

const entity = new TagEntity({
  ...dto,
  createdAt: new Date('2021-04-18T07:51:33.299Z'),
  updatedAt: new Date('2021-04-18T07:51:33.299Z'),
})

const entities: TagEntity[] = [
  entity,
  new TagEntity({
    ...createTagsDto[1],
    createdAt: new Date('2021-04-18T07:51:33.299Z'),
    updatedAt: new Date('2021-04-18T07:51:33.299Z'),
  }),
  new TagEntity({
    ...createTagsDto[2],
    createdAt: new Date('2021-04-18T07:51:33.299Z'),
    updatedAt: new Date('2021-04-18T07:51:33.299Z'),
  }),
]

export const tagFixture = {
  dto,
  createTagsDto,
  entity,
  entities,
}
