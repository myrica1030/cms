import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { cryptoPassword } from 'common/utils/crypto.util'
import { PrismaService } from 'infra/prisma.service'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createUser(userInfo: { email: string, username: string, password: string }): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: userInfo.email,
        username: userInfo.username,
        password: cryptoPassword(userInfo.password),
      },
    })
    return user
  }

  async findUser(where: Prisma.UserWhereInput, withPassword: boolean = false): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where,
      omit: { password: !withPassword },
    })
  }
}
