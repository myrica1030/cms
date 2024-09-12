import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { User } from '@prisma/client'
import { PrismaService } from 'infra/prisma.service'
import type { PrismaDeepMock } from 'test-utils/prisma-mock'
import { mockDeep } from 'vitest-mock-extended'
import { UserService } from './user.service'

describe('user service', () => {
  let service: UserService
  let mockedPrisma: PrismaDeepMock

  beforeEach(async () => {
    mockedPrisma = mockDeep()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockedPrisma,
        },
      ],
    }).compile()

    service = module.get(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create user', () => {
    it('should create user correctly', async () => {
      const user = { email: 'myrica@foxmail.com', username: 'myrica', password: '12345678' }
      await service.createUser(user)

      expect(mockedPrisma.user.create).toHaveBeenCalledWith({ data: { ...user, password: expect.any(String) } })
    })
  })

  describe('find user', () => {
    it('should find user correctly', async () => {
      const user = { email: 'myrica@foxmail.com', username: 'myrica' }
      mockedPrisma.user.findFirst.mockResolvedValue(user as User)

      const userResult = await service.findUser({ username: user.username })

      expect(userResult).toBe(user)
      expect(userResult).not.toHaveProperty('password')
      expect(mockedPrisma.user.findFirst).toBeCalledWith({
        where: { username: user.username },
        omit: { password: true },
      })
    })

    it('should find user without password when pass withoutPassword true', async () => {
      const user = { email: 'myrica@foxmail.com', username: 'myrica', password: '12345678' }
      mockedPrisma.user.findFirst.mockResolvedValue(user as User)

      const userResult = await service.findUser({ username: user.username }, true)

      expect(userResult).toHaveProperty('password', '12345678')
      expect(mockedPrisma.user.findFirst).toBeCalledWith({
        where: { username: user.username },
        omit: { password: false },
      })
    })
  })
})
