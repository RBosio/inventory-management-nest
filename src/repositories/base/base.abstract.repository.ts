import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from "typeorm"
import { BaseRepositoryInterface } from "./base.repository.interface"

interface HasId {
  id: number
}

export abstract class BaseAbstractRepository<T extends HasId>
  implements BaseRepositoryInterface<T>
{
  private entity: Repository<T>

  protected constructor(entity: Repository<T>) {
    this.entity = entity
  }

  create(data: DeepPartial<T>): T {
    return this.entity.create(data)
  }

  async save(data: DeepPartial<T>): Promise<T> {
    return this.entity.save(data)
  }

  async findAll(): Promise<T[]> {
    return this.entity.find()
  }

  async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id,
    }

    return this.entity.findOneBy(options)
  }

  async findOneByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return this.entity.findOne(filterCondition)
  }

  async softDelete(id: any): Promise<UpdateResult> {
    const options: FindOptionsWhere<T> = {
      id,
    }
    
    return this.entity.softDelete(options)
  }
}
