import { Prisma } from '@prisma/client'

export const articleIncludeAuthorAndTags = Prisma.validator<Prisma.ArticleInclude>()({
  author: { omit: { password: true } },
  tags: { select: { tag: true } },
})
export type ArticleIncludeAuthorAndTags = Prisma.ArticleGetPayload<{ include: typeof articleIncludeAuthorAndTags }>
