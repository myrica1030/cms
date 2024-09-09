import assert from 'node:assert'
import { Controller, Get, Request } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UseJwtGuards } from 'common/decorator/auth-guard.decorator'
import { AuthRequest } from 'src/auth/jwt.strategy'
import { UserEntity } from 'src/user/entity/user.entity'
import { UserService } from 'src/user/user.service'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly service: UserService,
  ) {}

  @UseJwtGuards()
  @ApiOkResponse({ type: UserEntity })
  @Get('/')
  async profile(@Request() { user: { userId } }: AuthRequest): Promise<UserEntity> {
    const user = await this.service.findUser({ id: userId })
    assert(user, `User ${userId} not exist`)
    return new UserEntity(user)
  }
}
