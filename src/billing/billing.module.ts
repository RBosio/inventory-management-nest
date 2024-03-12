import { Module } from "@nestjs/common"
import { BillingService } from "./billing.service"
import { BillingController } from "./billing.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BillingRepository } from "./billing.repository"
import { Billing } from "src/entities/billing.entity"
import { UserModule } from "src/user/user.module"

@Module({
  imports: [TypeOrmModule.forFeature([Billing]), UserModule],
  controllers: [BillingController],
  providers: [BillingService, BillingRepository],
})
export class BillingModule {}
