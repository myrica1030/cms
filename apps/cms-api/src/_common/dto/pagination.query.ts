import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { IsQueryNumber } from '../decorator/validation.decorator'

// TODO: order by prisma orderBy type
export class PaginationQuery<_T = unknown> {
  @ApiPropertyOptional()
  @IsQueryNumber({ onlyPositiveInteger: true })
  @IsOptional()
  page: number = 1

  @ApiPropertyOptional()
  @IsQueryNumber({ onlyPositiveInteger: true })
  @IsOptional()
  limit: number = 10

  @ApiPropertyOptional({ description: 'The order of the items `createdAt` property', enum: ['asc', 'desc'], default: 'desc' })
  @IsEnum(['asc', 'desc'])
  @IsOptional()
  order?: 'asc' | 'desc'
}
