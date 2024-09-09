import { Injectable } from '@nestjs/common'
import { Category } from '@prisma/client'
import { PrismaService } from 'infra/prisma.service'
import { CreateCategoryDto } from 'src/category/dto/create-category.dto'

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const category = await this.prisma.category.create({
      data: {
        key: dto.key,
        label: dto.label,
        description: dto.description,
        parentId: dto.parentId,
      },
    })

    return category
  }

  // FIXME
  async retrieveRootCategories(): Promise<Category[]> {
    return await this.prisma.category.findMany()
  }

  async findCategory(categoryId: number): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: { id: categoryId },
    })
  }
}
