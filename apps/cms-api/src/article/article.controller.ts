import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query, Request } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { ApiListResponse } from 'common/decorator/api-response.decorator'
import { PaginationQuery } from 'common/dto/pagination.query'
import { PaginatedEntity } from 'common/entity/paginated.entity'
import { ArticleService } from 'src/article/article.service'
import { AuthRequest } from 'src/auth/jwt.strategy'
import { ApiInvalidFormResponse } from 'src/decorators'
import { UseJwtGuards } from 'src/guards'
import { CreateArticleDto } from './dto/create-article.dto'
import { ArticleEntity } from './entity/article-entity'

@Controller('article')
@ApiTags('Article')
export class ArticleController {
  constructor(
    private readonly service: ArticleService,
  ) {}

  @Post('/')
  @UseJwtGuards()
  @ApiOperation({ summary: 'Create article' })
  @ApiCreatedResponse({ type: ArticleEntity })
  @ApiInvalidFormResponse()
  async createArticle(@Request() { user: { userId } }: AuthRequest, @Body() createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const article = await this.service.createArticle(userId, createArticleDto)
    return new ArticleEntity(article)
  }

  @Get('/')
  @ApiOperation({ summary: 'Retrieve articles' })
  @ApiListResponse(ArticleEntity)
  async retrieveArticles(@Query() { page, limit }: PaginationQuery): Promise<PaginatedEntity<ArticleEntity>> {
    return await this.service.retrievePaginatedArticles({ page, limit })
  }

  @Get('/:articleId')
  @ApiOperation({ summary: 'Retrieve article by article id' })
  @ApiParam({ name: 'articleId', type: Number, example: '1' })
  @ApiOkResponse({ type: ArticleEntity })
  @ApiNotFoundResponse()
  async retrieveArticle(@Param('articleId') articleId: string): Promise<ArticleEntity> {
    const article = await this.service.findArticle(+articleId)
    if (!article) throw new NotFoundException('Article not found')
    return new ArticleEntity(article)
  }

  @Put('/:articleId')
  @UseJwtGuards()
  @ApiOperation({ summary: 'Update article' })
  @ApiParam({ name: 'articleId', type: Number, example: '1' })
  @ApiOkResponse({ type: ArticleEntity })
  @ApiNotFoundResponse()
  @ApiInvalidFormResponse()
  async updateArticle(
    @Param('articleId') articleId: number,
    @Request() { user: { userId } }: AuthRequest,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = await this.service.updateArticle(articleId, createArticleDto, userId)
    return new ArticleEntity(article)
  }
}
