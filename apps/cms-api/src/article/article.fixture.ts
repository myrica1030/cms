import type { ArticleEntity } from 'src/article/article.entity'
import type { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import { categoryFixture } from 'src/category/category.fixture'
import { tagFixture } from 'src/tag/tag.fixture'
import { userFixture } from 'src/user/user.fixture'

const dto: CreateArticleDto = {
  title: 'Article title',
  categoryId: 1,
  tags: ['semantic-ui'],
  content: '# Article content',
}

const entity: ArticleEntity = {
  id: 1,
  title: 'Article title',
  author: userFixture.adminEntity,
  category: categoryFixture.uncategorizedCategoryEntity,
  tags: [tagFixture.entity],
  content: '# Article content',
  createdAt: '2021-04-18T07:51:33.299Z',
  updatedAt: '2021-04-18T07:51:33.299Z',
}
const entity2: ArticleEntity = {
  id: 2,
  title: 'Article title 2',
  author: userFixture.adminEntity,
  category: categoryFixture.entity,
  tags: tagFixture.entities,
  content: '# Article content 2',
  createdAt: '2021-04-18T07:51:33.299Z',
  updatedAt: '2021-04-18T07:51:33.299Z',
}

const entities: ArticleEntity[] = [
  entity,
  entity2,
]

export const articleFixture = {
  dto,
  entity,
  entities,
}
