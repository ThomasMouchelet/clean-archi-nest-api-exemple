import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Post } from '../../domain/models/post.model';
import { UserOrmEntity } from './user.orm-entity';

@Entity('post')
export class PostOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserOrmEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toDomain(): Post {
    return new Post(this.id, this.title, this.content, this.createdAt, this.updatedAt, this.user.toDomain());
  }

  static fromDomain(post: Post): PostOrmEntity {
    const ormEntity = new PostOrmEntity();
    ormEntity.id = post.id;
    ormEntity.title = post.title;
    ormEntity.content = post.content;
    ormEntity.user = UserOrmEntity.fromDomain(post.user);
    return ormEntity;
  }
}
