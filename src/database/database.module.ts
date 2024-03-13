import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BillingProduct } from "src/entities/billing-product.entity"
import { Billing } from "src/entities/billing.entity"
import { Product } from "src/entities/product.entity"
import { User } from "src/entities/user.entity"

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        url: configService.get("MYSQL_URI"),
        database: configService.get("MYSQL_DATABASE"),
        entities: [User, Product, Billing, BillingProduct],
        synchronize: configService.get("MYSQL_SYNC"),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
