import process from 'node:process'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      omit: {
        user: { password: true },
      },
    })
  }

  async onModuleInit() {
    if (process.env.ONLY_SWAGGER) {
      // eslint-disable-next-line no-console
      return void console.log('You are running in ONLY_SWAGGER mode, will not connect the database')
    }
    await this.$connect()
  }
}
