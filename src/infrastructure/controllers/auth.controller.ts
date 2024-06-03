import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { User } from '../../domain/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: User) {
    return this.authService.signUp(user);
  }

  @Post('signin')
  async signIn(@Body() user: User) {
    return this.authService.signIn(user);
  }
}
