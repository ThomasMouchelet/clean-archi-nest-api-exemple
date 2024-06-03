import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostRepositoryImpl } from '../../infrastructure/repositories/post.repository.impl';
import { PostOrmEntity } from '../../infrastructure/entities/post.orm-entity';
import { UserOrmEntity } from '../../infrastructure/entities/user.orm-entity';
import { Post } from '../../domain/models/post.model';
import { POST_REPOSITORY_TOKEN } from '../../domain/repositories/tokens';
import { Repository } from 'typeorm';

describe('PostService (Integration)', () => {
  let service: PostService;
  let module: TestingModule;
  let userRepository: Repository<UserOrmEntity>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: "localhost",
          port: 5433,
          username: "test",
          password: "test",
          database: "test",
          entities: [PostOrmEntity, UserOrmEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([PostOrmEntity, UserOrmEntity]),
      ],
      providers: [
        PostService,
        { provide: POST_REPOSITORY_TOKEN, useClass: PostRepositoryImpl },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    userRepository = module.get('UserOrmEntityRepository');
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create and find', () => {
    it('should create and find a post with timestamps', async () => {
      const userEntity = new UserOrmEntity();
      userEntity.username = 'test';
      userEntity.password = 'test';
      const savedUser = await userRepository.save(userEntity);

      const post = new Post(1, 'title', 'content', new Date(), new Date(), savedUser);

      const createdPost = await service.create(post, savedUser);
      const foundPost = await service.findOne({id: createdPost.id});
      
      expect(foundPost).toBeDefined();
      expect(foundPost?.createdAt).toBeInstanceOf(Date);
      expect(foundPost?.updatedAt).toBeInstanceOf(Date);
      expect(foundPost?.title).toBe('title');
      expect(foundPost?.content).toBe('content');
    });
  });
});
