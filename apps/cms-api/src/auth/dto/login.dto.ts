import { IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

export class LoginDto {
  @JSONSchema({ example: 'admin' })
  @IsNotEmpty()
  @IsString()
  readonly username: string

  @MaxLength(32)
  @IsStrongPassword({ minLength: 6, minUppercase: 0, minSymbols: 0, minNumbers: 0, minLowercase: 0 })
  readonly password: string
}
