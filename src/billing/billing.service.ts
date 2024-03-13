import {
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { CreateBillingDto } from "./dto/create-billing.dto"
import { Billing } from "src/entities/billing.entity"
import { BillingRepository } from "./billing.repository"
import { UserService } from "src/user/user.service"

@Injectable()
export class BillingService {
  constructor(
    private billingRepository: BillingRepository,
    private userService: UserService,
  ) {}

  async create(createBillingDto: CreateBillingDto): Promise<Billing> {
    const user = await this.userService.findOne(createBillingDto.userId)
    const customer = await this.userService.findOne(createBillingDto.customerId)
    const billing = this.billingRepository.create(createBillingDto)

    billing.user = user
    billing.customer = customer

    return this.billingRepository.save(billing)
  }

  async findAll() {
    return this.billingRepository.findAll()
  }

  async findOne(id: number): Promise<Billing> {
    const billing = await this.billingRepository.findOneById(id)
    if (!billing) throw new NotFoundException("billing not found")

    return billing
  }

  async delete(id: number): Promise<Billing> {
    const billing = await this.findOne(id)
    await this.billingRepository.softDelete(id)

    return billing
  }
}
