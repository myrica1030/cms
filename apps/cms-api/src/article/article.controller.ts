import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query, Request } from '@nestjs/common'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { ApiInvalidFormResponse, ApiListResponse } from 'common/decorator/api-response.decorator'
import { UseJwtGuards } from 'common/decorator/auth-guard.decorator'
import { PaginatedEntity } from 'common/entity/paginated.entity'
import { ArticleService } from 'src/article/article.service'
import { ArticlePaginationQuery } from 'src/article/dto/article-pagination.query'
import { ArticlePublicEntity } from 'src/article/entity/article-public.entity'
import { AuthRequest } from 'src/auth/jwt.strategy'
import { CreateArticleDto } from './dto/create-article.dto'

@Controller('article')
@ApiTags('Article')
export class ArticleController {
  constructor(
    private readonly service: ArticleService,
  ) {}

  @Post('/')
  @UseJwtGuards()
  @ApiOperation({ summary: 'Create article' })
  @ApiCreatedResponse({ type: ArticlePublicEntity })
  @ApiInvalidFormResponse()
  async createArticle(@Request() { user: { userId } }: AuthRequest, @Body() createArticleDto: CreateArticleDto): Promise<ArticlePublicEntity> {
    const article = await this.service.createArticle(userId, createArticleDto)
    return new ArticlePublicEntity(article)
  }

  @Get('/')
  @ApiOperation({ summary: 'Retrieve articles' })
  @ApiListResponse(ArticlePublicEntity)
  async retrieveArticles(@Query() query: ArticlePaginationQuery): Promise<PaginatedEntity<ArticlePublicEntity>> {
    return await this.service.retrievePaginatedArticles(query)
  }

  @Get('/:articleId')
  @ApiOperation({ summary: 'Retrieve article by article id' })
  @ApiParam({ name: 'articleId', type: Number, example: '1' })
  @ApiOkResponse({ type: ArticlePublicEntity })
  @ApiNotFoundResponse()
  async retrieveArticle(@Param('articleId') articleId: string): Promise<ArticlePublicEntity> {
    const article = await this.service.findArticle(+articleId)
    if (!article) throw new NotFoundException('Article not found')
    return new ArticlePublicEntity(article)
  }

  @Put('/:articleId')
  @UseJwtGuards()
  @ApiOperation({ summary: 'Update article' })
  @ApiParam({ name: 'articleId', type: Number, example: '1' })
  @ApiOkResponse({ type: ArticlePublicEntity })
  @ApiNotFoundResponse()
  @ApiInvalidFormResponse()
  async updateArticle(
    @Param('articleId') articleId: number,
    @Request() { user: { userId } }: AuthRequest,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticlePublicEntity> {
    const article = await this.service.updateArticle(articleId, createArticleDto, userId)
    return new ArticlePublicEntity(article)
  }
}
