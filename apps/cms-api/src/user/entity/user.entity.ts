import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { IsEmail } from 'class-validator'
import { ApiPropertyNullable, IsDatetimeProperty, IsIdProperty } from 'common/decorator/api-property.decorator'
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

  @ApiPropertyNullable({
    title: 'The biography of the user',
    example: 'This guy is lazy and has left nothing.',
    type: String,
  })
  bio: string | null

  @ApiPropertyNullable({
    title: 'The URL of the user avatar image',
    example: 'https://picsum.photos/200',
    type: String,
    format: 'url',
  })
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
