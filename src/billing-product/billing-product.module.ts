import { Module } from "@nestjs/common"
import { BillingProductService } from "./billing-product.service"
import { BillingProductController } from "./billing-product.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BillingProductRepository } from "./billing-product.repository"
import { BillingProduct } from "src/entities/billing-product.entity"
import { BillingModule } from "src/billing/billing.module"
import { ProductModule } from "src/product/product.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([BillingProduct]),
    BillingModule,
    ProductModule,
  ],
  controllers: [BillingProductController],
  providers: [BillingProductService, BillingProductRepository],
  exports: [BillingProductService],
})
export class BillingProductModule {}
