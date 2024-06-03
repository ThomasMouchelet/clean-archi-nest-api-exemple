import { Controller, Get, Post as HttpPost, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PostService } from '../../application/services/post.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { User as UserModel } from '../../domain/models/user.model';
import { CreatePostDto } from '../../application/dtos/post/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.postService.findOne({id: +id});
  }

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  async create(@Body() post: CreatePostDto, @User() user: UserModel) {
    return this.postService.create(post, user);
  }
}
