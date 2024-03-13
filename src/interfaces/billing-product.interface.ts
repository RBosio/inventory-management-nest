import { BaseRepositoryInterface } from "src/repositories/base/base.repository.interface"
import { BillingProduct } from "src/entities/billing-product.entity"

export interface BillingProductRepositoryInterface
  extends BaseRepositoryInterface<BillingProduct> {}
