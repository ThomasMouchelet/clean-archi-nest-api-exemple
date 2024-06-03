import { Module } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_REPOSITORY_TOKEN } from 'src/domain/repositories/tokens';
import { UserOrmEntity } from '../entities/user.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [
    UserService,
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepositoryImpl },
  ],
})
export class UserModule {}
