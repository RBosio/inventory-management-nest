import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateBillingProductDto } from "./dto/create-billing-product.dto"
import { BillingProductRepository } from "./billing-product.repository"
import { BillingProduct } from "src/entities/billing-product.entity"
import { BillingService } from "src/billing/billing.service"
import { ProductService } from "src/product/product.service"

@Injectable()
export class BillingProductService {
  constructor(
    private billingProductRepository: BillingProductRepository,
    private billingService: BillingService,
    private productService: ProductService,
  ) {}

  async create(
    createBillingProductDto: CreateBillingProductDto,
  ): Promise<BillingProduct> {
    const billing = await this.billingService.findOne(
      createBillingProductDto.billingId,
    )
    const product = await this.productService.findOne(
      createBillingProductDto.productId,
    )
    const bP = this.billingProductRepository.create(createBillingProductDto)
    bP.billing = billing
    bP.product = product

    return this.billingProductRepository.save(bP)
  }

  async findAll(id: number) {
    return this.billingProductRepository.findAll({
      where: {
        billing: {
          id,
        },
      },
      relations: {
        product: true,
      },
    })
  }

  async findOne(id: number): Promise<BillingProduct> {
    const billingProduct = await this.billingProductRepository.findOneById(id)
    if (!billingProduct) throw new NotFoundException("billingProduct not found")

    return billingProduct
  }

  async delete(id: number): Promise<BillingProduct> {
    const billingProduct = await this.findOne(id)
    await this.billingProductRepository.softDelete(id)

    return billingProduct
  }
}
