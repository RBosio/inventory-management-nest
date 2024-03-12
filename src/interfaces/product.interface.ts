import { BaseRepositoryInterface } from "src/repositories/base/base.repository.interface"
import { Product } from "src/entities/product.entity"

export interface ProductRepositoryInterface
  extends BaseRepositoryInterface<Product> {}
