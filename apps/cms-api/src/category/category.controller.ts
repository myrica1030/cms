import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { CategoryEntity } from 'src/category/category.entity'
import type { CategoryService } from 'src/category/category.service'
import type { CreateCategoryDto } from 'src/category/dto/createCategory.dto'
import { ApiInvalidFormResponse } from 'src/decorators'
import { UseJwtGuards } from 'src/guards'

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(
    private readonly service: CategoryService,
  ) {}

  @Post()
  @UseJwtGuards()
  @ApiOperation({ operationId: 'createCategory', summary: 'Create a category' })
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiInvalidFormResponse()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.service.createCategory(createCategoryDto)
  }

  @Get()
  @ApiOperation({ operationId: 'retrieveRootCategories', summary: 'Retrieve some categories that not have parent category' })
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  @ApiNotFoundResponse()
  async retrieveRootCategories(): Promise<CategoryEntity[]> {
    return await this.service.retrieveRootCategories()
  }

  @Get(':categoryId')
  @ApiParam({ name: 'categoryId', example: 1, type: 'number' })
  @ApiOperation({ operationId: 'retrieveCategory', summary: 'Retrieve a category' })
  @ApiOkResponse({ type: CategoryEntity })
  @ApiNotFoundResponse()
  async retrieveCategory(@Param('categoryId') categoryId: number): Promise<CategoryEntity> {
    const categoryEntity = await this.service.findCategory(categoryId)
    if (!categoryEntity) throw new NotFoundException()
    return categoryEntity
  }
}
