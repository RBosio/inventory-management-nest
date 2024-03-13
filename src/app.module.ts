import { Module } from "@nestjs/common"
import { DatabaseModule } from "./database/database.module"
import { ConfigModule } from "@nestjs/config"
import { UserModule } from "./user/user.module"
import { ProductModule } from "./product/product.module"
import { BillingModule } from "./billing/billing.module"
import { BillingProductModule } from "./billing-product/billing-product.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    DatabaseModule,
    UserModule,
    ProductModule,
    BillingModule,
    BillingProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
