import { IsEmail } from 'class-validator'
import { LoginDto } from 'src/auth/dto/login.dto'

export class RegisterDto extends LoginDto {
  @IsEmail()
  readonly email: string
}
