import type { PrismaClient } from '@prisma/client'
import type { DeepMockProxy } from 'vitest-mock-extended'

/**
 * @see https://github.com/prisma/prisma/issues/10203#issuecomment-1451897646
 */
export type PrismaDeepMock = DeepMockProxy<{
  // this is needed to resolve the issue with circular types definition
  // https://github.com/prisma/prisma/issues/10203
  [K in keyof PrismaClient]: Omit<PrismaClient[K], 'groupBy'>;
}>
