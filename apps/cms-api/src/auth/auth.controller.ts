import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiInvalidFormResponse } from 'common/decorator/api-response.decorator'
import { LoginDto } from 'src/auth/dto/login.dto'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { AuthEntity } from 'src/auth/entity/auth.entity'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'register', operationId: 'register' })
  @ApiCreatedResponse({ type: AuthEntity })
  @ApiInvalidFormResponse()
  async register(@Body() registerDto: RegisterDto): Promise<AuthEntity> {
    return await this.service.register(registerDto)
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login', operationId: 'login' })
  @ApiOkResponse({ type: AuthEntity })
  @ApiInvalidFormResponse()
  async login(@Body() loginDto: LoginDto): Promise<AuthEntity> {
    return await this.service.login(loginDto)
  }
}
