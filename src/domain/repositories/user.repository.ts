import { BaseRepository } from '../base/repository';
import { User } from '../models/user.model';

export abstract class UserRepository extends BaseRepository<User> {}
