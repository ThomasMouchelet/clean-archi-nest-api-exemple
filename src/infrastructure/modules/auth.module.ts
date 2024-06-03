import { Module } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { UserService } from '../../application/services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { USER_REPOSITORY_TOKEN } from '../../domain/repositories/tokens';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { AuthController } from '../controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserOrmEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepositoryImpl },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
