import { JwtService } from '@nestjs/jwt'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { User } from '@prisma/client'
import { FormException } from 'common/exception/form-exception.exception'
import { cryptoPassword } from 'common/utils/crypto.util'
import { InfraModule } from 'infra/infra.module'
import type { LoginDto } from 'src/auth/dto/login.dto'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'

describe('auth service', () => {
  let authService: AuthService
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfraModule],
      providers: [
        AuthService,
        UserService,
        {
          provide: JwtService,
          useValue: {
            sign: vi.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile()

    authService = module.get(AuthService)
    userService = module.get(UserService)
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('register', () => {
    it('should return user profile when register successful', async () => {
      vi.spyOn(userService, 'findUser').mockResolvedValue(null)
      vi.spyOn(userService, 'createUser').mockResolvedValue({ username: 'bar' } as User)
      vi.spyOn(authService, 'generateToken').mockReturnValue('token')
      const registerDto = { email: 'foo@bar.com', username: 'foobar', password: '123456' }

      const authEntity = await authService.register(registerDto)

      expect(authEntity).not.toHaveProperty('password')
      expect(authEntity).toHaveProperty('username', 'bar')
      expect(authEntity).toHaveProperty('token', 'token')
    })

    it('should throw error when user name is exist', async () => {
      vi.spyOn(userService, 'findUser').mockResolvedValue({ id: 1, username: 'exist_user' } as User)
      const registerDto = { email: 'foo@bar.com', username: 'exist_user', password: '123456' }

      await expect(authService.register(registerDto)).rejects.toThrow(new FormException({ username: ['isExist'] }))
    })

    it('should throw error when email is exist', async () => {
      vi.spyOn(userService, 'findUser').mockResolvedValueOnce(null)
      vi.spyOn(userService, 'findUser').mockResolvedValueOnce({ id: 1, email: 'exist_email@bar.com' } as User)
      const registerDto = { email: 'exist_email@bar.com', username: 'username', password: '123456' }

      await expect(authService.register(registerDto)).rejects.toThrow(new FormException({ email: ['isExist'] }))
    })
  })

  describe('login', () => {
    it('should return user profile when login successful', async () => {
      vi.spyOn(authService, 'validateUser').mockResolvedValue({ username: 'bar' } as User)
      vi.spyOn(authService, 'generateToken').mockReturnValue('token')
      const loginDto: LoginDto = { username: 'admin', password: '123456' }

      const authEntity = await authService.login(loginDto)

      expect(authEntity).not.toHaveProperty('password')
      expect(authEntity).toHaveProperty('username', 'bar')
      expect(authEntity).toHaveProperty('token', 'token')
    })
  })

  describe('validate user', () => {
    it('should return user info without password when validate successful', async () => {
      const email = 'foo@bar.com'
      const password = cryptoPassword('12345678')
      vi.spyOn(userService, 'findUser').mockResolvedValue({ email, password } as User)
      const user = await authService.validateUser(email, '12345678')

      expect(user).toHaveProperty('email', email)
      expect(user).not.toHaveProperty('password')
    })

    it('should throw bad request exception when invalid user', async () => {
      vi.spyOn(userService, 'findUser').mockResolvedValue(null)

      const validateUser = authService.validateUser('foo@bar.com', '')
      await expect(validateUser).rejects.toThrow(new FormException({ username: ['isNotExist'] }))
    })

    it('should throw bad request exception when invalid password', async () => {
      const password = '4a83854cf6f0112b4295bddd535a9b3fbe54a3f90e853b59d42e4bed553c55a4'
      vi.spyOn(userService, 'findUser').mockResolvedValue({ email: 'foo@bar.com', password } as User)

      const validateUser = authService.validateUser('foo@bar.com', 'invalidPassword')
      await expect(validateUser).rejects.toThrow(new FormException({ password: ['isInvalid'] }))
    })
  })

  describe('generateToken', () => {
    it('should return JWT', () => {
      const token = authService.generateToken(1, 'foo@bar.com')

      expect(token).toBe('token')
    })
  })
})
