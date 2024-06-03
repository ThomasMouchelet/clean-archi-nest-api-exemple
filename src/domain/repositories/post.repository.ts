import { BaseRepository } from '../base/repository';
import { Post } from '../models/post.model';

export abstract class PostRepository extends BaseRepository<Post> {}