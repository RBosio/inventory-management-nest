import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { BaseAbstractRepository } from "../repositories/base/base.abstract.repository"
import { Billing } from "src/entities/billing.entity"
import { BillingRepositoryInterface } from "src/interfaces/billing.interface"

export class BillingRepository
  extends BaseAbstractRepository<Billing>
  implements BillingRepositoryInterface
{
  constructor(
    @InjectRepository(Billing) private readonly billingRepository: Repository<Billing>,
  ) {
    super(billingRepository)
  }
}
