import { ApiProperty } from '@nestjs/swagger'
import { IsDatetimeProperty } from 'common/decorator/api-property.decorator'
import { TagOnArticle } from 'src/article/entity/article-public.entity'
import { TagEntity } from 'src/tag/entity/tag.entity'
import { NullableOptional } from 'types/fest'

export class TagOnArticleEntity implements TagOnArticle {
  @ApiProperty({ title: 'Tag entity' })
  tag: TagEntity

  @IsDatetimeProperty({ created: true })
  createdAt: Date

  constructor(tagOnArticle: NullableOptional<TagOnArticleEntity>) {
    this.tag = new TagEntity(tagOnArticle.tag)
    this.createdAt = tagOnArticle.createdAt
  }
}
