import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { CategoryService } from 'src/category/category.service'
import { CreateCategoryDto } from 'src/category/dto/create-category.dto'
import { CategoryEntity } from 'src/category/entity/category.entity'
import { ApiInvalidFormResponse } from 'src/decorators'
import { UseJwtGuards } from 'src/guards'

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(
    private readonly service: CategoryService,
  ) {}

  @UseJwtGuards()
  @ApiOperation({ summary: 'Create a category' })
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiInvalidFormResponse()
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = await this.service.createCategory(createCategoryDto)
    return new CategoryEntity(category)
  }

  @ApiOperation({ summary: 'Retrieve some categories that not have parent category' })
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  @ApiNotFoundResponse()
  @Get()
  async retrieveRootCategories(): Promise<CategoryEntity[]> {
    const categories = await this.service.retrieveRootCategories()
    return categories.map(category => new CategoryEntity(category))
  }

  @ApiOperation({ summary: 'Retrieve a category' })
  @ApiParam({ name: 'categoryId', example: 1, type: 'number' })
  @ApiOkResponse({ type: CategoryEntity })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @Get(':categoryId')
  async retrieveCategory(@Param('categoryId') categoryId: number): Promise<CategoryEntity> {
    const category = await this.service.findCategory(categoryId)
    if (!category) throw new NotFoundException()
    return new CategoryEntity(category)
  }
}
