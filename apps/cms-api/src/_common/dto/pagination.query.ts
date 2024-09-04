import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { ApiEnumPropertyOptional } from 'src/_common/decorator/api-property.decorator'
import { IsQueryNumber } from '../decorator/validation.decorator'

export enum SortOrder { Asc = 'asc', Desc = 'desc' }

// TODO: order by prisma orderBy type
export class PaginationQuery<_T = unknown> {
  @ApiPropertyOptional({ description: 'The page number of the items', default: 1 })
  @IsQueryNumber({ onlyPositiveInteger: true })
  @IsOptional()
  page: number = 1

  @ApiPropertyOptional({ description: 'The limit of the items per page', default: 10 })
  @IsQueryNumber({ onlyPositiveInteger: true, max: 500 })
  @IsOptional()
  limit: number = 10

  @ApiEnumPropertyOptional({ SortOrder }, { title: 'The order of the items `createdAt` property', default: SortOrder.Desc })
  @IsEnum(SortOrder)
  @IsOptional()
  order?: SortOrder
}
