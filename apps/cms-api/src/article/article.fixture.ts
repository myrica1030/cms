import type { ArticleIncludeAuthorAndTags } from 'src/article/article.model'
import type { CreateArticleDto } from 'src/article/dto/create-article.dto'
import { categoryFixture } from 'src/category/category.fixture'
import { tagFixture } from 'src/tag/tag.fixture'
import { userFixture } from 'src/user/user.fixture'

const dto: CreateArticleDto = {
  title: 'Article title',
  categoryId: 1,
  tags: ['semantic-ui'],
  content: '# Article content',
}

const entity: ArticleIncludeAuthorAndTags = {
  id: 1,
  title: 'Article title',
  authorId: userFixture.adminEntity.id,
  author: userFixture.adminEntity,
  categoryId: categoryFixture.uncategorizedCategoryEntity.id,
  tags: [{ tag: tagFixture.entity }],
  content: '# Article content',
  createdAt: new Date('2021-04-18T07:51:33.299Z'),
  updatedAt: new Date('2021-04-18T07:51:33.299Z'),
}
const entity2: ArticleIncludeAuthorAndTags = {
  id: 2,
  title: 'Article title 2',
  authorId: userFixture.adminEntity.id,
  author: userFixture.adminEntity,
  categoryId: categoryFixture.entity.id,
  tags: tagFixture.entities.map(tag => ({ tag })),
  content: '# Article content 2',
  createdAt: new Date('2021-04-18T07:51:33.299Z'),
  updatedAt: new Date('2021-04-18T07:51:33.299Z'),
}

const entities: ArticleIncludeAuthorAndTags[] = [
  entity,
  entity2,
]

export const articleFixture = {
  dto,
  entity,
  entities,
}
