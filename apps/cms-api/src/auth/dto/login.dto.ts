import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'
import { IsUsernameProperty } from 'common/decorator/api-property.decorator'

export class LoginDto {
  @IsUsernameProperty()
  readonly username: string

  @ApiProperty({ format: 'password' })
  @IsString() @MinLength(6) @MaxLength(32)
  readonly password: string
}
