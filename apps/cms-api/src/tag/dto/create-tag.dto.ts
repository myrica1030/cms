import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiPropertyRichText } from 'common/decorator/api-property.decorator'

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'semantic-ui' })
  readonly key: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Semantic UI' })
  readonly name: string

  @ApiPropertyRichText({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string
}
