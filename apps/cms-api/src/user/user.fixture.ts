import type { User } from '@prisma/client'
import { cryptoPassword } from 'common/utils/crypto.util'
import { omit } from 'lodash'
import { UserEntity } from 'src/user/entity/user.entity'

const adminEntity: UserEntity = new UserEntity({
  id: 1,
  username: 'admin',
  email: 'admin@cms.mutoe.com',
  bio: '',
  image: null,
  createdAt: new Date('2020-01-01T00:00:00Z'),
  updatedAt: new Date('2020-01-01T00:00:00Z'),
})

const creationDto = {
  username: 'mutoe',
  email: 'imutoe@gmail.com',
  password: cryptoPassword('123456'),
  bio: 'This guy is lazy and has left nothing.',
} satisfies Partial<User>

const entity: UserEntity = new UserEntity({
  id: 2,
  ...omit(creationDto, 'password'),
  image: null,
  createdAt: new Date('2020-01-01T00:00:00Z'),
  updatedAt: new Date('2020-01-01T00:00:00Z'),
})

export const userFixture = {
  adminEntity,
  creationDto,
  entity,
}
