import { BaseModel } from './model';

export abstract class BaseRepository<TModel extends BaseModel> {
  abstract create(data: TModel): Promise<TModel>;
  abstract findAll(filter?: Partial<TModel>): Promise<TModel[]>;
  abstract findOne(options: Partial<TModel>): Promise<TModel>;
//   abstract update(id: number, data: Partial<TModel>): Promise<TModel>;
//   abstract remove(id: number): Promise<void>;
}
