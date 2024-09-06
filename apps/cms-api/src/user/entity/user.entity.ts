import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { IsEmail, IsString, IsUrl } from 'class-validator'
import { IsDatetimeProperty, IsIdProperty } from 'common/decorator/api-property.decorator'
import { NullableOptional } from 'types/fest'

export class UserEntity implements Omit<User, 'password'> {
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

  // FIXME nullable property
  @ApiProperty({ title: 'The biography of the user', example: 'This guy is lazy and has left nothing.' })
  @IsString()
  bio: string | null

  // FIXME nullable property
  @ApiPropertyOptional({ title: 'The URL of the user avatar image', example: 'https://picsum.photos/200', format: 'url' })
  @IsUrl()
  image: string | null

  constructor(user: NullableOptional<UserEntity>) {
    this.id = user.id
    this.email = user.email
    this.username = user.username
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
    this.bio = user.bio ?? null
    this.image = user.image ?? null
  }
}
