import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../../domain/models/user.model';

@Entity('user')
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  toDomain(): User {
    return new User(this.id, this.username, this.password);
  }

  static fromDomain(user: User): UserOrmEntity {
    const ormEntity = new UserOrmEntity();
    ormEntity.id = user.id;
    ormEntity.username = user.username;
    ormEntity.password = user.password;
    return ormEntity;
  }
}
