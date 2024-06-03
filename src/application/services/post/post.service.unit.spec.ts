import { Post } from "../../../domain/models/post.model";
import { PostService } from "./post.service";
import { User } from "../../../domain/models/user.model";
import { Test, TestingModule } from "@nestjs/testing";
import { POST_REPOSITORY_TOKEN } from "../../../domain/repositories/tokens";

describe('PostService', () => {
    let service: PostService;
    

    const mockPostRepository = {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PostService,
                { provide: POST_REPOSITORY_TOKEN, useValue: mockPostRepository },
            ],
        }).compile();

        service = module.get<PostService>(PostService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return all posts', async () => {
            const user = new User(1, 'test', 'test');
            const post = new Post(1, 'test', 'test', new Date(),new Date(), user);
            mockPostRepository.findAll.mockReturnValue([post]);

            expect(await service.findAll()).toEqual([post]);
      
        })
    })
    describe('create', () => {
        it('should create a new post', async () => {
            const user = new User(1, 'test', 'test');
            const post = {
                title: 'test',
                content: 'test'
            }
            mockPostRepository.create.mockReturnValue(post);

            expect(await service.create(post, user)).toEqual(post);
        })
    })
    describe('findOne', () => {
        it('should return a post', async () => {
            const user = new User(1, 'test', 'test');
            const post = new Post(1, 'test', 'test',new Date(),new Date(), user);
            mockPostRepository.findOne.mockReturnValue(post);

            expect(await service.findOne({id: 1})).toEqual(post);
        })
    })
})