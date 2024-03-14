import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from "@nestjs/common"
import { BillingProductService } from "./billing-product.service"
import { CreateBillingProductDto } from "./dto/create-billing-product.dto"
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
@ApiTags("billingProduct")
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: "unauthorized",
})
@Controller("billingProduct")
export class BillingProductController {
  constructor(private readonly billingProductService: BillingProductService) {}

  @Post()
  @ApiOperation({ summary: "add product into billing" })
  @ApiBody({ type: CreateBillingProductDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "product added succesfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "product not found",
  })
  create(@Body() createBillingProductDto: CreateBillingProductDto) {
    return this.billingProductService.create(createBillingProductDto)
  }

  @Get(":billingId")
  @ApiOperation({ summary: "find products of one billing" })
  @ApiParam({
    name: "billingId",
    type: "number",
    example: 1,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "get products of one billing",
  })
  findAll(@Param("billingId", ParseIntPipe) billingId: number) {
    return this.billingProductService.findAll(billingId)
  }

  @Get(":billingProductId")
  @ApiOperation({ summary: "find one product of one billing" })
  @ApiParam({
    name: "billingProductId",
    type: "number",
    example: 1,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "get one product of one billing",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "billingProduct not found",
  })
  findOne(@Param("billingProductId", ParseIntPipe) billingProductId: number) {
    return this.billingProductService.findOne(billingProductId)
  }

  @Delete(":billingProductId")
  @ApiOperation({ summary: "delete one product of one billing" })
  @ApiParam({
    name: "billingProductId",
    type: "number",
    example: 1,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "product of one billing deleted",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "billingProduct not found",
  })
  delete(@Param("billingProductId", ParseIntPipe) billingProductId: number) {
    return this.billingProductService.delete(billingProductId)
  }
}
