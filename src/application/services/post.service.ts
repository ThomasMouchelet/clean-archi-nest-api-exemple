import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../../domain/repositories/post.repository';
import { Post } from '../../domain/models/post.model';
import { POST_REPOSITORY_TOKEN } from '../../domain/repositories/tokens';
import { User } from 'src/domain/models/user.model';

@Injectable()
export class PostService {
    constructor(
        @Inject(POST_REPOSITORY_TOKEN)
        private readonly postRepository: PostRepository
      ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async findOne(options: Partial<Post>): Promise<Post | undefined> {
    return this.postRepository.findOne(options);
  }

  async create(post: Post, user: User): Promise<Post> {
    const postCreate = {
      ...post,
      user
    }
    return this.postRepository.create(postCreate);
  }
}
