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
} from "@nestjs/common"
import { BillingProductService } from "./billing-product.service"
import { CreateBillingProductDto } from "./dto/create-billing-product.dto"
import { AuthGuard } from "src/auth/auth.guard"

@UseGuards(AuthGuard)
@Controller("billingProduct")
export class BillingProductController {
  constructor(private readonly billingProductService: BillingProductService) {}

  @Post()
  create(@Body() createBillingProductDto: CreateBillingProductDto) {
    return this.billingProductService.create(createBillingProductDto)
  }

  @Get(":billingId")
  findAll(@Param("billingId", ParseIntPipe) billingId: number) {
    return this.billingProductService.findAll(billingId)
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.billingProductService.findOne(id)
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.billingProductService.delete(id)
  }
}
