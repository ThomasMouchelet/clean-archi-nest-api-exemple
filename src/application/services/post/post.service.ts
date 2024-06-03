import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../../../domain/repositories/post.repository';
import { Post } from '../../../domain/models/post.model';
import { POST_REPOSITORY_TOKEN } from '../../../domain/repositories/tokens';
import { User } from '../../../domain/models/user.model';
import { CreatePostDto } from '../../dtos/post/create-post.dto';

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

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const post = Post.create({ ...createPostDto, user });
    return this.postRepository.create(post);
  }
}
