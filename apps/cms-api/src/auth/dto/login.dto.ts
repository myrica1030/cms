import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  // TODO not allow some special characters (e.g. only allow 0-9 a-z A-Z . _ - [space])
  @ApiProperty({ example: 'admin' })
  @IsString() @IsNotEmpty()
  readonly username: string

  @ApiProperty({ format: 'password' })
  @IsString() @MinLength(6) @MaxLength(32)
  readonly password: string
}
