import { ApiProperty } from '@nestjs/swagger'
import { UserEntity } from 'src/user/entity/user.entity'

export class AuthEntity extends UserEntity {
  @ApiProperty({ example: 'jwt' })
  token: string

  constructor(user: UserEntity, token: string) {
    super(user)
    this.token = token
  }
}
