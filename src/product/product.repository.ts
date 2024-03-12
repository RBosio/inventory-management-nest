import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { BaseAbstractRepository } from "../repositories/base/base.abstract.repository"
import { Product } from "src/entities/product.entity"
import { ProductRepositoryInterface } from "src/interfaces/product.interface"

export class ProductRepository
  extends BaseAbstractRepository<Product>
  implements ProductRepositoryInterface
{
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository)
  }
}
