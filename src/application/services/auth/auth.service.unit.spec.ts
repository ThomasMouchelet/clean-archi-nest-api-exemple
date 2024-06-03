import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service'; // Assurez-vous du bon chemin
import { AuthService } from './auth.service';
import { HashService } from './hash.service';
import { CreateUserDto } from '../../../application/dtos/user/create-user.dto';
import { SigninDTO } from '../../../application/dtos/auth/signin.dto';
import { User } from '../../../domain/models/user.model';


describe('AuthService', () => {
  let authService: AuthService;
  let hashService: HashService;
  let userService: UserService; // Déclarer le UserService mock
  let jwtService: JwtService; // Déclarer JwtService mock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        HashService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedToken'),
          },
        }, // Moquer JwtService
        {
          provide: UserService, // Moquer le UserService
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    hashService = module.get<HashService>(HashService);
    userService = module.get<UserService>(UserService); // Obtenir le UserService mock
    jwtService = module.get<JwtService>(JwtService); // Obtenir le JwtService mock
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { username: 'test', password: 'test' };
      const hashedPassword = await hashService.hashPassword('test');
      const user = new User(null, 'test', hashedPassword);
      jest.spyOn(userService, 'create').mockResolvedValue(user);

      const result = await authService.signUp(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(expect.objectContaining({
        username: 'test',
        password: expect.any(String),
      }));

      expect(result).toEqual(expect.objectContaining({
        username: 'test',
        password: expect.any(String),
      }));
    });
  });

  describe('signIn', () => {
    it('should return a token for a valid user', async () => {
      const signInDto: SigninDTO = { username: 'test', password: 'test' };
      const hashedPassword = await hashService.hashPassword('test');
      const user = new User(1, 'test', hashedPassword);
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
      jest.spyOn(hashService, 'comparePassword').mockResolvedValue(true);

      const result = await authService.signIn(signInDto);

      expect(result).toEqual(expect.objectContaining({ access_token: 'mockedToken' }));
    });

    it('should throw an error for invalid credentials', async () => {
      const signInDto: SigninDTO = { username: 'test', password: 'wrongPassword' };
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      await expect(authService.signIn(signInDto)).rejects.toThrow('Invalid credentials');
    });
  });
});