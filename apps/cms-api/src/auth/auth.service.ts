import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { FormException } from 'common/exception/form-exception.exception'
import { cryptoPassword } from 'common/utils/crypto.util'
import { omit } from 'lodash'
import { LoginDto } from 'src/auth/dto/login.dto'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { AuthEntity } from 'src/auth/entity/auth.entity'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthEntity> {
    let user: User | null
    user = await this.userService.findUser({ username: registerDto.username })
    if (user) throw new FormException({ username: ['isExist'] })

    user = await this.userService.findUser({ email: registerDto.email })
    if (user) throw new FormException({ email: ['isExist'] })

    user = await this.userService.createUser(registerDto)
    const token = this.generateToken(user.id, user.email)
    return new AuthEntity(user, token)
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const user = await this.validateUser(loginDto.username, loginDto.password)
    const token = this.generateToken(user.id, user.email)
    return new AuthEntity(user, token)
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findUser({ username }, true)
    if (!user) throw new FormException({ username: ['isNotExist'] })

    if (user.password !== cryptoPassword(password)) throw new FormException({ password: ['isInvalid'] })

    return omit(user, 'password') as User
  }

  generateToken(userId: number, email: string): string {
    return this.jwtService.sign({ userId, email })
  }
}
