import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/models/user.model';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const user = new User(1, 'test', 'test');
      mockUserService.create.mockResolvedValue(user);

      expect(await service.signUp(user)).toEqual(user);
      expect(mockUserService.create).toHaveBeenCalledWith(user);
    });
  });

  describe('signIn', () => {
    it('should return a token for a valid user', async () => {
      const user = new User(1, 'test', 'test');
      mockUserService.findOne.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue('token');

      expect(await service.signIn(user)).toEqual({ access_token: 'token' });
      expect(mockUserService.findOne).toHaveBeenCalledWith({ username: 'test' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({ username: 'test' });
    });

    it('should throw an error for invalid credentials', async () => {
      const user = new User(1, 'test', 'wrong');
      mockUserService.findOne.mockResolvedValue(null);

      await expect(service.signIn(user)).rejects.toThrow('Invalid credentials');
    });
  });
});
