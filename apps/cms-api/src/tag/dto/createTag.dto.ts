import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ApiPropertyRichText } from 'src/decorators'

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
