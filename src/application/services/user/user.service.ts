import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/models/user.model';
import { USER_REPOSITORY_TOKEN } from '../../../domain/repositories/tokens';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly userRepository: UserRepository
      ) {}

  async findOne(options: Partial<User>): Promise<User | undefined> {
    return this.userRepository.findOne(options);
  }

  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
