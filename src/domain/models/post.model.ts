import { User } from './user.model';

export class Post {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public createdAt: Date,
    public updatedAt: Date,
    public user: User
  ) {}
}
