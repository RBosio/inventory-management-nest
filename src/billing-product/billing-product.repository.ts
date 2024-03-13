import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { BillingProduct } from "src/entities/billing-product.entity"
import { BaseAbstractRepository } from "../repositories/base/base.abstract.repository"
import { BillingProductRepositoryInterface } from "src/interfaces/billing-product.interface"

export class BillingProductRepository
  extends BaseAbstractRepository<BillingProduct>
  implements BillingProductRepositoryInterface
{
  constructor(
    @InjectRepository(BillingProduct)
    private readonly billingProductRepository: Repository<BillingProduct>,
  ) {
    super(billingProductRepository)
  }
}
