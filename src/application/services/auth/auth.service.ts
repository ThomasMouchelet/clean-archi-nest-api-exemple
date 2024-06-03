import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User as UserModel } from '../../../domain/models/user.model';
import { CreateUserDto } from '../../../application/dtos/user/create-user.dto';
import { HashService } from './hash.service';
import { SigninDTO } from '../../../application/dtos/auth/signin.dto';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<UserModel> {
    const hashedPassword = await this.hashService.hashPassword(createUserDto.password);
    const user = new UserModel(null, createUserDto.username, hashedPassword);
    return this.userService.create(user);
  }

  async signIn(signinDTO: SigninDTO): Promise<{ access_token: string }> {
    const foundUser = await this.userService.findOne({ username: signinDTO.username });
    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await this.hashService.comparePassword(signinDTO.password, foundUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: foundUser.username };

    return { access_token: this.jwtService.sign(payload) };
  }
}
