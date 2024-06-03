import { Controller, Get, Post as HttpPost, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PostService } from '../../application/services/post.service';
import { Post } from '../../domain/models/post.model';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

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
  async create(@Body() post: Post, @Req() req) {
    const user = req.user;
    return this.postService.create(post, user);
  }
}
