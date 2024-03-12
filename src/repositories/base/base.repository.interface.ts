import { DeepPartial, FindOneOptions, UpdateResult } from "typeorm"

export interface BaseRepositoryInterface<T> {
  create(data: DeepPartial<T>): T

  save(data: DeepPartial<T>): Promise<T>

  findAll(): Promise<T[]>

  findOneById(id: number): Promise<T>

  findOneByCondition(options: FindOneOptions<T>): Promise<T>

  softDelete(id: number): Promise<UpdateResult>
}
