import { Module } from '@nestjs/common'
import { ArticleController } from 'src/article/article.controller'
import { CategoryService } from 'src/category/category.service'
import { TagService } from 'src/tag/tag.service'
import { UserService } from 'src/user/user.service'
import { ArticleService } from './article.service'

@Module({
  providers: [ArticleService, TagService, CategoryService, UserService],
  controllers: [ArticleController],
})
export class ArticleModule {}
