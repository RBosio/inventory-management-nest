import { BaseRepositoryInterface } from "src/repositories/base/base.repository.interface"
import { Billing } from "src/entities/billing.entity"

export interface BillingRepositoryInterface
  extends BaseRepositoryInterface<Billing> {}
