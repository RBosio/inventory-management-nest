import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from "@nestjs/common"
import { ProductService } from "./product.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { AuthGuard } from "src/auth/auth.guard"
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: "create product" })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "product created",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "user not found",
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  @Get()
  @ApiOperation({ summary: "find all products" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "get all products",
  })
  findAll() {
    return this.productService.findAll()
  }

  @Get(":productId")
  @ApiOperation({ summary: "find one product" })
  @ApiParam({
    name: "productId",
    type: "number",
    example: 1,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "get one product",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "product not found",
  })
  findOne(@Param("productId", ParseIntPipe) productId: number) {
    return this.productService.findOne(productId)
  }

  @Patch(":productId")
  @ApiOperation({ summary: "update product" })
  @ApiParam({
    name: "productId",
    type: "number",
    example: 1,
    required: true,
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "product updated",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "product not found",
  })
  update(
    @Param("productId", ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(productId, updateProductDto)
  }

  @Delete(":productId")
  @ApiOperation({ summary: "delete product" })
  @ApiParam({
    name: "productId",
    type: "number",
    example: 1,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "product deleted",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "product not found",
  })
  delete(@Param("productId", ParseIntPipe) productId: number) {
    return this.productService.delete(productId)
  }
}
