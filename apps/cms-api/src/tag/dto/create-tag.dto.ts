import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ApiPropertyRichText } from 'common/decorator/api-property.decorator'

export class CreateTagDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'semantic-ui' })
  readonly key: string

  @IsNotEmpty()
  @ApiProperty({ example: 'Semantic UI' })
  readonly name: string

  @ApiPropertyRichText()
  readonly description?: string
}
