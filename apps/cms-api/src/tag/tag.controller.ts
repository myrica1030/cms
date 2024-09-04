import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiListResponse } from 'common/decorator/api-response.decorator'
import { PaginationQuery } from 'common/dto/pagination.query'
import { PaginatedEntity } from 'common/entity/paginated.entity'
import { ApiInvalidFormResponse } from 'src/decorators'
import { UseJwtGuards } from 'src/guards'
import { CreateTagDto } from 'src/tag/dto/createTag.dto'
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
  async retrieveTags(@Query() query: PaginationQuery): Promise<PaginatedEntity<TagEntity>> {
    return await this.service.retrievePaginatedTags(query)
  }
}
