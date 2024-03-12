import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { Product } from "src/entities/product.entity"
import { ProductRepository } from "./product.repository"
import { UserService } from "src/user/user.service"

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private userService: UserService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const user = await this.userService.findOne(createProductDto.userId)
    const product = this.productRepository.create(createProductDto)

    product.user = user

    return this.productRepository.save(product)
  }

  async findAll() {
    return this.productRepository.findAll()
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneById(id)
    if (!product) throw new NotFoundException("product not found")

    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id)

    const productUpdated = Object.assign(product, updateProductDto)

    return this.productRepository.save(productUpdated)
  }

  async delete(id: number): Promise<Product> {
    const product = await this.findOne(id)
    await this.productRepository.softDelete(id)

    return product
  }
}
