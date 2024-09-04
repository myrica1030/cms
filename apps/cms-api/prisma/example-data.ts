import process from 'node:process'
import { PrismaClient } from '@prisma/client'
import { cryptoPassword } from 'common/utils/crypto.util'
import { config } from 'dotenv-flow'
import { categoryFixture } from 'src/category/category.fixture'
import { userFixture } from 'src/user/user.fixture'

config()

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'mutoe',
      email: 'imutoe@gmail.com',
      password: cryptoPassword('123456'),
      bio: 'This guy is lazy and has left nothing.',
    },
  })

  const category = await prisma.category.create({
    data: {
      key: 'study-notes',
      label: 'Study notes',
      description: '<p>This is personal study notes</p>',
    },
  })

  await prisma.tag.createMany({
    data: [
      { key: 'semantic-ui', name: 'Semantic UI', description: 'Semantic UI is a smoothly UI library' },
      { key: 'database', name: 'Database' },
      { key: 'linux', name: 'Linux' },
    ],
  })

  await prisma.article.createMany({
    data: [{
      title: 'Article title',
      authorId: userFixture.adminEntity.id,
      categoryId: categoryFixture.uncategorizedCategoryEntity.id,
      content: '# Article content',
    }, {
      title: 'Article title 2',
      authorId: user.id,
      categoryId: category.id,
      content: '# Article content 2',
    }],
  })
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
