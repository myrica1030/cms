import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiInvalidFormResponse, ApiListResponse } from 'common/decorator/api-response.decorator'
import { UseJwtGuards } from 'common/decorator/auth-guard.decorator'
import { PaginatedEntity } from 'common/entity/paginated.entity'
import { CreateTagDto } from 'src/tag/dto/create-tag.dto'
import { TagPaginationQuery } from 'src/tag/dto/tag-pagination.query'
import { TagEntity } from 'src/tag/entity/tag.entity'
import { TagService } from 'src/tag/tag.service'

@Controller('tag')
@ApiTags('Tag')
export class TagController {
  constructor(
    private readonly service: TagService,
  ) {}

  @UseJwtGuards()
  @Post('/')
  @ApiOperation({ operationId: 'createTag', summary: 'Create tag' })
  @ApiCreatedResponse({ type: TagEntity })
  @ApiInvalidFormResponse()
  async createTag(@Body() createTagDto: CreateTagDto): Promise<TagEntity> {
    const tag = await this.service.createTag(createTagDto)
    return new TagEntity(tag)
  }

  @Get('/')
  @ApiOperation({ operationId: 'retrieveTags', summary: 'Retrieve tags' })
  @ApiListResponse(TagEntity)
  async retrieveTags(@Query() query: TagPaginationQuery): Promise<PaginatedEntity<TagEntity>> {
    return await this.service.retrievePaginatedTags(query)
  }
}
