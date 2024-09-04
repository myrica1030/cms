import { OmitType } from '@nestjs/swagger'
import { CategoryEntity } from 'src/category/entity/category.entity'

export class CategoryOnArticleEntity extends OmitType(CategoryEntity, ['parentId'] as const) {}
