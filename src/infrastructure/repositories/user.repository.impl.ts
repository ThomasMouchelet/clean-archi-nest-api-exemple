import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/models/user.model';
import { UserOrmEntity } from '../entities/user.orm-entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>
  ) {}

  async findAll(): Promise<User[]> {
    const ormEntities = await this.repository.find();
    return ormEntities.map(entity => entity.toDomain());
  }

  async findOne(options: Partial<User>): Promise<User | undefined> {
    const ormEntity = await this.repository.findOneBy(options);
    return ormEntity ? ormEntity.toDomain() : undefined;
  }

  async create(user: User): Promise<User> {
    const ormEntity = this.repository.create(UserOrmEntity.fromDomain(user));
    const savedEntity = await this.repository.save(ormEntity);
    return savedEntity.toDomain();
  }
}
