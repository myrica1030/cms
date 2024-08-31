import assert from 'node:assert'
import { Controller, Get, Request } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthRequest } from 'src/auth/jwt.strategy'
import { UseJwtGuards } from 'src/guards'
import { ProfileRo } from 'src/user/ro/profile.ro'
import { UserService } from 'src/user/user.service'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly service: UserService,
  ) {}

  @UseJwtGuards()
  @Get('/')
  @ApiOperation({ operationId: 'profile' })
  @ApiOkResponse({ type: ProfileRo })
  async profile(@Request() { user }: AuthRequest): Promise<ProfileRo> {
    const userSafeEntity = await this.service.findUser({ id: user.userId })
    assert(userSafeEntity, `User ${user.userId} not exist`)
    return userSafeEntity
  }
}
