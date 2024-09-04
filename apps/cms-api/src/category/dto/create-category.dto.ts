import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ApiPropertyRichText } from 'common/decorator/api-property.decorator'

// TODO: implement Prisma creation type
export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'study-notes' })
  key: string = ''

  @IsNotEmpty()
  @ApiProperty({ example: 'Study notes' })
  label: string = ''

  @ApiPropertyRichText()
  description?: string = ''

  @ApiPropertyOptional({ example: 1 })
  parentId?: number
}
