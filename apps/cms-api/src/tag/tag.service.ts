import { Injectable } from '@nestjs/common'
import { Tag } from '@prisma/client'
import { PaginatedEntity } from 'common/entity/paginated.entity'
import { FormException } from 'common/exception/form-exception.exception'
import { PrismaService } from 'infra/prisma.service'
import { xor } from 'lodash'
import { CreateTagDto } from 'src/tag/dto/create-tag.dto'
import { TagPaginationQuery } from 'src/tag/dto/tag-pagination.query'
import { TagEntity } from 'src/tag/entity/tag.entity'

@Injectable()
export class TagService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    return await this.prisma.tag.create({
      data: createTagDto,
    })
  }

  async retrievePaginatedTags(query: TagPaginationQuery): Promise<PaginatedEntity<TagEntity>> {
    const { page, limit, orderInput } = query
    const [tags, count] = await Promise.all([
      this.prisma.tag.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: orderInput,
      }),
      this.prisma.tag.count(),
    ])

    return new PaginatedEntity(page, limit, count, tags.map(tag => new TagEntity(tag)))
  }

  async getTags(tagNames: string[]): Promise<Tag[]> {
    const tags = await this.prisma.tag.findMany({
      where: {
        key: { in: tagNames },
      },
    })
    const differenceTags = xor(tags.map(entity => entity.key), tagNames)
    if (differenceTags.length > 0) {
      throw new FormException({ tags: differenceTags.map(tag => `${tag} is not exists.`) })
    }
    return tags
  }
}
