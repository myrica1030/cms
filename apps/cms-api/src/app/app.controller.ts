import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('App')
export class AppController {
  @ApiOperation({ summary: 'Health check' })
  @ApiQuery({ name: 'name', type: 'string', required: false, example: 'foo' })
  @ApiOkResponse({ type: String, example: 'Hello world!' })
  @Get('/hello')
  healthCheck(@Query('name') name?: string): string {
    return `Hello ${name || 'world'}!`
  }
}
