import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  @ApiProperty({ example: 'foo@example.com' })
  readonly email: string

  @IsNotEmpty()
  @ApiProperty({ example: 'username' })
  readonly username: string

  @IsNotEmpty()
  @ApiProperty({ example: '123456', format: 'password' })
  readonly password: string
}
