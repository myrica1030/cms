import process from 'node:process'
import { PrismaClient } from '@prisma/client'
import { cryptoPassword } from 'common/utils/crypto.util'
import { config } from 'dotenv-flow'
import { omit } from 'lodash'
import { categoryFixture } from 'src/category/category.fixture'

config()

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { id: 1 },
    create: {
      password: cryptoPassword('123456'),
      username: 'admin',
      email: 'admin@cms.myrica.com',
    },
    update: {},
  })

  await prisma.category.upsert({
    where: { id: categoryFixture.uncategorizedCategoryEntity.id },
    create: omit(categoryFixture.uncategorizedCategoryEntity, 'id'),
    update: {},
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
