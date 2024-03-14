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
        type: "postgres",
        url: configService.get("POSTGRES_URI"),
        database: configService.get("POSTGRES_DATABASE"),
        entities: [User, Product, Billing, BillingProduct],
        synchronize: configService.get("POSTGRES_SYNC"),
        ssl: configService.get("POSTGRES_SSL") === "true",
        extra:
          configService.get("POSTGRES_SSL") === "true"
            ? {
                ssl: { rejectUnauthorized: false },
              }
            : null,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
