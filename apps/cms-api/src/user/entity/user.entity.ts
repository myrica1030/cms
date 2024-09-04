import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { ApiPropertyDatetime } from 'src/decorators'
import { NullToUndefined } from 'types/fest'

export class UserEntity implements NullToUndefined<User> {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'foo@example.com' })
  email: string

  @ApiProperty({ example: 'foo' })
  username: string

  @ApiPropertyDatetime()
  createdAt: Date

  @ApiPropertyDatetime()
  updatedAt: Date

  @ApiPropertyOptional({ example: 'This guy is lazy and has left nothing.' })
  bio?: string

  @ApiPropertyOptional({ example: 'https://picsum.photos/200' })
  image?: string

  constructor(user: Omit<User, 'password'>) {
    this.id = user.id
    this.email = user.email
    this.username = user.username
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
    this.bio = user.bio ?? undefined
    this.image = user.image ?? undefined
  }
}
