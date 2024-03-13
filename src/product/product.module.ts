import { Module } from "@nestjs/common"
import { ProductService } from "./product.service"
import { ProductController } from "./product.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProductRepository } from "./product.repository"
import { Product } from "src/entities/product.entity"
import { UserModule } from "src/user/user.module"

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UserModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
