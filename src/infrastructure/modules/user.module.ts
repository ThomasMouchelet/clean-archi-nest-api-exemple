import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_REPOSITORY_TOKEN } from '../../domain/repositories/tokens';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { UserService } from '../../application/services/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [
    UserService,
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepositoryImpl },
  ],
})
export class UserModule {}
