import type { User } from '@prisma/client'

const adminEntity: Omit<User, 'password'> = {
  id: 1,
  username: 'admin',
  email: 'admin@cms.mutoe.com',
  bio: '',
  image: null,
  createdAt: new Date('2020-01-01T00:00:00Z'),
  updatedAt: new Date('2020-01-01T00:00:00Z'),
}

const entity: Omit<User, 'password'> = {
  id: 2,
  username: 'mutoe',
  email: 'imutoe@gmail.com',
  bio: 'This guy is lazy and has left nothing.',
  image: null,
  createdAt: new Date('2020-01-01T00:00:00Z'),
  updatedAt: new Date('2020-01-01T00:00:00Z'),
}

export const userFixture = {
  adminEntity,
  entity,
}
