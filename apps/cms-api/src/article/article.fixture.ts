import { omit } from 'lodash'
import type { CreateArticleDto } from 'src/article/dto/create-article.dto'
import { ArticlePublicEntity } from 'src/article/entity/article-public.entity'
import { ArticleEntity } from 'src/article/entity/article.entity'
import { categoryFixture } from 'src/category/category.fixture'
import { TagOnArticleEntity } from 'src/tag/entity/tag-on-article.entity'
import { tagFixture } from 'src/tag/tag.fixture'
import { userFixture } from 'src/user/user.fixture'

const tagOnArticleEntity = new TagOnArticleEntity({
  tag: tagFixture.entity,
  createdAt: tagFixture.entity.createdAt,
})

const creationDto = {
  title: 'Article title',
  content: '# Article content',
  categoryId: categoryFixture.entity.id,
  tags: [tagOnArticleEntity.tag.key],
} satisfies CreateArticleDto

const entity = new ArticleEntity({
  id: 1,
  ...creationDto,
  authorId: userFixture.adminEntity.id,
  categoryId: categoryFixture.entity.id,
  createdAt: new Date('2021-04-18T07:51:33.299Z'),
  updatedAt: new Date('2021-04-18T07:51:33.299Z'),
})

const publicEntity = new ArticlePublicEntity({
  ...omit(entity, ['authorId', 'categoryId']),
  author: userFixture.adminEntity,
  category: categoryFixture.entity,
  tags: [tagOnArticleEntity],
})

const creationDto2 = {
  title: 'Article title 2',
  content: '# Article content 2',
  categoryId: categoryFixture.entity.id,
  tags: [tagOnArticleEntity.tag.name],
} satisfies CreateArticleDto

const publicEntity2 = new ArticlePublicEntity({
  id: 2,
  ...creationDto2,
  author: userFixture.entity,
  category: categoryFixture.entity,
  tags: [tagOnArticleEntity],
  createdAt: new Date('2021-04-18T07:51:33.299Z'),
  updatedAt: new Date('2021-04-18T07:51:33.299Z'),
})

const publicEntities: ArticlePublicEntity[] = [
  publicEntity,
  publicEntity2,
]

export const articleFixture = {
  creationDto,
  creationDto2,
  entity,
  publicEntity,
  publicEntities,
  tagOnArticleEntity,
}
