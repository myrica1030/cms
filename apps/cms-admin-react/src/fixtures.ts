import type { ArticlePublicEntity, PaginatedMetadata, TagEntity, UserEntity } from 'src/client/cms/cms-api'

// TODO extract fixtures to common library
export const paginatedMetadataFixture: PaginatedMetadata = {
  currentPage: 1,
  limit: 10,
  total: 5,
  totalPages: 1,
}

export const userFixture = {
  entity: {
    id: 1,
    username: 'admin',
    email: 'admin@cms.myrica.com',
    createdAt: '2024-09-05T11:47:59+0800',
    updatedAt: '2024-09-05T11:47:59+0800',
  } as UserEntity,
}

export const tagFixture = {
  entity: {
    key: 'semantic-ui',
    name: 'Semantic UI',
    description: '<p>I am description</p>',
    createdAt: '2024-09-05T11:47:59+0800',
    updatedAt: '2024-09-05T11:47:59+0800',
  } as TagEntity,
}

export const articleFixture = {
  entity: {
    id: 1,
    author: userFixture.entity,
    createdAt: '2022-01-05T12:01:59+0800',
    updatedAt: '2022-01-05T12:01:59+0800',
  } as ArticlePublicEntity,
}
