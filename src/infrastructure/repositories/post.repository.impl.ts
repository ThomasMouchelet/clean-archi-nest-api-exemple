import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostRepository } from '../../domain/repositories/post.repository';
import { Post } from '../../domain/models/post.model';
import { PostOrmEntity } from '../entities/post.orm-entity';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(
    @InjectRepository(PostOrmEntity)
    private readonly repository: Repository<PostOrmEntity>
  ) {}

  async findAll(): Promise<Post[]> {
    const ormEntities = await this.repository.find({ relations: ['user'] });
    return ormEntities.map(entity => entity.toDomain());
  }

  async findOne(options: Partial<Post>): Promise<Post | undefined> {
    const ormEntity = await this.repository.findOne({where: options, relations: ['user'] });
    return ormEntity ? ormEntity.toDomain() : undefined;
  }

  async create(post: Post): Promise<Post> {
    const ormEntity = this.repository.create(PostOrmEntity.fromDomain(post));
    const savedEntity = await this.repository.save(ormEntity);
    return savedEntity.toDomain();
  }
}
