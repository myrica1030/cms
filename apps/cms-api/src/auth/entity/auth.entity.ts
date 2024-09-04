import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { UserEntity } from 'src/user/entity/user.entity'

export class AuthEntity extends UserEntity {
  @ApiProperty({ example: 'jwt' })
  token: string

  constructor(user: Omit<User, 'password'>, token: string) {
    super(user)
    this.token = token
  }
}
