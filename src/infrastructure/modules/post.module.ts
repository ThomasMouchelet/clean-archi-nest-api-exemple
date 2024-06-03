import { Module } from '@nestjs/common';
import { PostService } from '../../application/services/post.service';
import { PostRepositoryImpl } from '../repositories/post.repository.impl';
import { PostController } from '../controllers/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POST_REPOSITORY_TOKEN } from '../../domain/repositories/tokens';
import { PostOrmEntity } from '../entities/post.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostOrmEntity])],
  providers: [
    PostService,
    { provide: POST_REPOSITORY_TOKEN, useClass: PostRepositoryImpl },
  ],
  controllers: [PostController],
})
export class PostModule {}
