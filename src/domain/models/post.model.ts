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

  static create(postDto: { title: string; content: string; user: User }): Post {
    return new Post(
      null, // id will be set by the ORM
      postDto.title,
      postDto.content,
      new Date(), // createdAt will be set by the ORM or database
      new Date(), // updatedAt will be set by the ORM or database
      postDto.user
    );
  }
}
