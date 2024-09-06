import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator'

export class LoginDto {
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @IsString()
  readonly username: string

  @MaxLength(32)
  @IsStrongPassword({ minLength: 6, minUppercase: 0, minSymbols: 0, minNumbers: 0, minLowercase: 0 })
  readonly password: string
}
