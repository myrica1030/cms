import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { IsEmail, IsUrl } from 'class-validator'
import { IsDatetimeProperty, IsIdProperty } from 'common/decorator/api-property.decorator'
import { NullToUndefined } from 'types/fest'

export class UserEntity implements NullToUndefined<User> {
  @IsIdProperty()
  id: number

  @ApiProperty({ example: 'foo@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'foo' })
  username: string

  @IsDatetimeProperty({ created: true })
  createdAt: Date

  @IsDatetimeProperty({ updated: true })
  updatedAt: Date

  @ApiPropertyOptional({ title: 'The biography of the user', example: 'This guy is lazy and has left nothing.' })
  bio?: string

  @ApiPropertyOptional({ title: 'The URL of the user avatar image', example: 'https://picsum.photos/200', format: 'url' })
  @IsUrl()
  image?: string

  constructor(user: UserEntity) {
    this.id = user.id
    this.email = user.email
    this.username = user.username
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
    this.bio = user.bio ?? undefined
    this.image = user.image ?? undefined
  }
}
