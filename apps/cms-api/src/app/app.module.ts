import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from 'common/filter/http-exception.filter'
import { InfraModule } from 'infra/infra.module'
import { AppController } from 'src/app/app.controller'
import { ArticleModule } from 'src/article/article.module'
import { AuthModule } from 'src/auth/auth.module'
import { CategoryModule } from 'src/category/category.module'
import { TagModule } from 'src/tag/tag.module'
import { UserModule } from 'src/user/user.module'

// TODO: add global auth guard
@Module({
  imports: [
    InfraModule,
    UserModule,
    AuthModule,
    ArticleModule,
    CategoryModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
