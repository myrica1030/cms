import process from 'node:process'
import { PrismaClient } from '@prisma/client'
import { cryptoPassword } from 'common/utils/crypto.util'
import { config } from 'dotenv-flow'
import { omit } from 'lodash'
import { articleFixture } from 'src/article/article.fixture'
import { categoryFixture } from 'src/category/category.fixture'
import { tagFixture } from 'src/tag/tag.fixture'
import { userFixture } from 'src/user/user.fixture'

config()

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      ...omit(userFixture.entity, 'id'),
      password: cryptoPassword('123456'),
    },
  })

  await prisma.category.create({
    data: categoryFixture.creationDto,
  })

  await prisma.tag.createMany({
    data: tagFixture.createTagsDto,
  })

  await prisma.article.create({ data: {
    ...omit(articleFixture.creationDto, 'tags'),
    authorId: userFixture.adminEntity.id,
  } })
  await prisma.article.create({ data: {
    ...omit(articleFixture.creationDto, 'tags'),
    authorId: userFixture.entity.id,
    tags: {
      createMany: { data: articleFixture.creationDto.tags.map(key => ({ tagKey: key })) },
    },
  } })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
