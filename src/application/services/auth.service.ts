import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(user: User): Promise<User> {
    return this.userService.create(user);
  }

  async signIn(user: User): Promise<{ access_token: string }> {
    const foundUser = await this.userService.findOne({ username: user.username });
    if (foundUser && foundUser.password === user.password) { // Simplified password check
      const payload = { username: user.username };
      return { access_token: this.jwtService.sign(payload) };
    }
    throw new Error('Invalid credentials');
  }
}
